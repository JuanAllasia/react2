import React from "react";

const ItemDetail = ({ producto }) => {
  return (
    <div className="item-detail">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio}</p>
      <p>Categoría: {producto.categoria}</p>
      <button className="btn-agregar">Agregar al carrito</button>
    </div>
  );
};

export default ItemDetail;
