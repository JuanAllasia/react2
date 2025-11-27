import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const subtotal = item.precio * item.quantity;

  return (
    <div className="cart-item">
      <img src={item.imagen} alt={item.nombre} />
      <div className="item-details">
        <h4>{item.nombre}</h4>
        <p className="precio">Precio: ${item.precio}</p>
      </div>

      <div className="quantity-control">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>

      <div className="subtotal">
        <p>${subtotal.toFixed(2)}</p>
      </div>

      <button
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
