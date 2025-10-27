import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productos } from "../data/productos";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const obtenerProducto = new Promise((resolve) => {
      setTimeout(() => {
        resolve(productos.find((p) => p.id === itemId));
      }, 800);
    });

    obtenerProducto.then((res) => setProducto(res));
  }, [itemId]);

  return (
    <div className="item-detail-container">
      {producto ? <ItemDetail producto={producto} /> : <p>Cargando...</p>}
    </div>
  );
};

export default ItemDetailContainer;
