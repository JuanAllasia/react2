import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productos } from "../data/productos";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simular un pequeño delay
    const timer = setTimeout(() => {
      const found = productos.find(p => p.id === itemId);
      setProducto(found || null);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [itemId]);

  if (loading) {
    return <div className="loading">Cargando producto...</div>;
  }

  return (
    <div className="item-detail-container">
      {producto ? <ItemDetail producto={producto} /> : <p>Producto no encontrado</p>}
    </div>
  );
};

export default ItemDetailContainer;
