import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.imagen} alt={item.nombre} />
      <h3>{item.nombre}</h3>
      <p>${item.precio}</p>
      <Link to={`/item/${item.id}`} className="ver-detalle">Ver detalle</Link>
    </div>
  );
};

export default Item;
