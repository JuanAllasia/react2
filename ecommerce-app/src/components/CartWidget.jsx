import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <Link to="/cart" className="cart-widget">
      <span className="cart-icon">🛒</span>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
};

export default CartWidget;