import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>El carrito está vacío</h2>
        <p>¡Comienza a agregar productos!</p>
        <Link to="/" className="continue-shopping">
          Continuar comprando
        </Link>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>

        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Vaciar Carrito
          </button>
          <Link to="/checkout" className="checkout-btn">
            Ir a Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
