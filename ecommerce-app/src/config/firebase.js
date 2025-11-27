
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDb4Z8grKcqB7Y9wnTGKgqCgnwB7xjPbz4",
  authDomain: "gustitos-6748d.firebaseapp.com",
  projectId: "gustitos-6748d",
  storageBucket: "gustitos-6748d.appspot.com",
  messagingSenderId: "977826878864",
  appId: "1:977826878864:web:c4cea01b89d78582188f15",
  measurementId: "G-YQDDSTC285"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


try {
  getAnalytics(app);
} catch (e) {
  
  console.warn('Firebase analytics init warning:', e.message || e);
}