import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({ producto }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (quantity) => {
    addToCart(producto, quantity);
    setIsAdded(true);
  };

  return (
    <div className="item-detail">
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="detail-info">
        <h2>{producto.nombre}</h2>
        <p className="precio">Precio: ${producto.precio}</p>
        <p className="categoria">Categoría: {producto.categoria}</p>
        <p className="descripcion">{producto.descripcion || "Producto de calidad"}</p>
        <p className="stock">
          Stock disponible: <strong>{producto.stock}</strong>
        </p>

        {!isAdded ? (
          <ItemCount stock={producto.stock} onAdd={handleAddToCart} />
        ) : (
          <div className="added-message">
            <p>✓ Producto agregado al carrito</p>
            <Link to="/cart" className="ir-carrito">Ir al carrito</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
