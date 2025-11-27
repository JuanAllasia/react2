import { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { productos as productosLocales } from "../data/productos";

const productosCache = {};
const categoriasCache = {};
const productoCacheMap = {};

export const useProductos = (categoryId = null) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null);

        const cacheKey = categoryId || "todos";
        
        if (categoryId && categoriasCache[categoryId]) {
          setItems(categoriasCache[categoryId]);
          setLoading(false);
          return;
        }

        if (!categoryId && productosCache.todos) {
          setItems(productosCache.todos);
          setLoading(false);
          return;
        }

        let productos = [];

        try {
          let q;
          if (categoryId) {
            q = query(
              collection(db, "productos"),
              where("categoria", "==", categoryId)
            );
          } else {
            q = collection(db, "productos");
          }

          const querySnapshot = await getDocs(q);
          productos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (firebaseError) {
          console.warn("Firebase no disponible, usando datos locales", firebaseError);
          if (categoryId) {
            productos = productosLocales.filter(p => p.categoria === categoryId);
          } else {
            productos = productosLocales;
          }
        }

        if (categoryId) {
          categoriasCache[categoryId] = productos;
        } else {
          productosCache.todos = productos;
        }

        setItems(productos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoryId]);

  return { items, loading, error };
};

export const useProducto = (productId) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);

        if (productoCacheMap[productId]) {
          setProducto(productoCacheMap[productId]);
          setLoading(false);
          return;
        }

        let productoData = null;

        try {
          const docRef = doc(db, "productos", productId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            productoData = {
              id: docSnap.id,
              ...docSnap.data(),
            };
          }
        } catch (firebaseError) {
          console.warn("Firebase no disponible, buscando en datos locales", firebaseError);
          productoData = productosLocales.find(p => p.id === productId);
        }

        if (productoData) {
          // Guardar en caché
          productoCacheMap[productId] = productoData;
          setProducto(productoData);
        } else {
          setError("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [productId]);

  return { producto, loading, error };
};

export const clearProductosCache = () => {
  Object.keys(productosCache).forEach(key => delete productosCache[key]);
  Object.keys(categoriasCache).forEach(key => delete categoriasCache[key]);
  Object.keys(productoCacheMap).forEach(key => delete productoCacheMap[key]);
};
