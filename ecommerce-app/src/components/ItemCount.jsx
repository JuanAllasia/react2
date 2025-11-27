import React, { useState } from "react";

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(quantity);
  };

  return (
    <div className="item-count">
      <div className="quantity-selector">
        <button onClick={handleDecrease} disabled={quantity <= 1}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrease} disabled={quantity >= stock}>
          +
        </button>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={stock === 0}
      >
        {stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
      </button>
    </div>
  );
};

export default ItemCount;
