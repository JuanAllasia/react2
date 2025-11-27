import React from "react";
import Item from "./Item";

const ItemList = ({ items }) => {
  if (items.length === 0) {
    return <p className="no-items">No hay productos disponibles en esta categoría</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
