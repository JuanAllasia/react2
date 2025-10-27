import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productos } from "../data/productos";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const obtenerProductos = new Promise((resolve) => {
      setTimeout(() => {
        resolve(productos);
      }, 1000);
    });

    obtenerProductos.then((res) => {
      if (categoryId) {
        setItems(res.filter((prod) => prod.categoria === categoryId));
      } else {
        setItems(res);
      }
    });
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h2>{categoryId ? `Categoría: ${categoryId}` : "Catálogo de productos"}</h2>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
