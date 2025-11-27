
const fs = require('fs');
const path = require('path');

function parseArgs() {
  const out = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--serviceAccount=')) out.serviceAccount = arg.split('=')[1];
    else if (arg.startsWith('--projectId=')) out.projectId = arg.split('=')[1];
    else if (arg.startsWith('--data=')) out.data = arg.split('=')[1];
    else if (arg === '--yes') out.yes = true;
  });
  return out;
}

async function main() {
  const args = parseArgs();
  const dataPath = args.data || path.resolve(__dirname, '..', 'src', 'data', 'productos.json');

  if (!args.serviceAccount || !args.projectId) {
    console.error('Error: --serviceAccount and --projectId are required.');
    console.error('Example: node scripts/seedFirestore.js --serviceAccount=./serviceAccountKey.json --projectId=my-project-id');
    process.exit(1);
  }

  if (!fs.existsSync(dataPath)) {
    console.error(`Error: data file not found at ${dataPath}`);
    process.exit(1);
  }

  const admin = require('firebase-admin');
  let serviceAccount;
  try {
    serviceAccount = require(path.resolve(args.serviceAccount));
  } catch (err) {
    console.error('Error loading service account JSON:', err.message);
    process.exit(1);
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: args.projectId,
    });
  } catch (err) {
    console.error('Error initializing firebase-admin:', err.message);
    process.exit(1);
  }

  const db = admin.firestore();

  let raw;
  try {
    raw = fs.readFileSync(dataPath, 'utf8');
  } catch (err) {
    console.error('Error reading data file:', err.message);
    process.exit(1);
  }

  let products;
  try {
    products = JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing JSON:', err.message);
    process.exit(1);
  }

  if (!Array.isArray(products) || products.length === 0) {
    console.error('No products found in the data file. Expecting an array.');
    process.exit(1);
  }

  console.log(`Found ${products.length} products in ${dataPath}`);
  console.log(`Target project: ${args.projectId}`);
  console.log(`Collection: productos`);

  if (!args.yes) {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise(resolve => rl.question('Proceed to upload these documents to Firestore? (yes/no) ', ans => { rl.close(); resolve(ans); }));
    if (answer.trim().toLowerCase() !== 'yes') {
      console.log('Aborted by user. No changes made.');
      process.exit(0);
    }
  }

  
  const chunkSize = 500;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const batch = db.batch();
    chunk.forEach(prod => {
      const id = String(prod.id);
      const docRef = db.collection('productos').doc(id);
      const payload = {
        nombre: prod.nombre,
        categoria: prod.categoria,
        precio: prod.precio,
        stock: prod.stock,
        descripcion: prod.descripcion,
        imagen: prod.imagen,
      };
      batch.set(docRef, payload, { merge: true });
    });
    try {
      await batch.commit();
      console.log(`Uploaded documents ${i + 1}-${Math.min(i + chunkSize, products.length)}`);
    } catch (err) {
      console.error('Error committing batch:', err.message);
      process.exit(1);
    }
  }

  console.log('Seeding complete. Verify documents in the Firebase Console (Firestore).');
  process.exit(0);
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
