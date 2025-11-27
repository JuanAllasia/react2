import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productos } from "../data/productos";
import ItemList from "./ItemList";

const CATEGORIES = ["tortas", "tartas", "panes"];

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simular un pequeño delay para que se vea el loading
    const timer = setTimeout(() => {
      if (categoryId) {
        const filtered = productos.filter((p) => p.categoria === categoryId);
        setItems(filtered);
      } else {
        // When no category selected, we won't set a flat items array — we'll render grouped view
        setItems(productos);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  // If a category is selected, render the full list for that category
  if (categoryId) {
    return (
      <div className="item-list-container">
        <h2>{`Categoría: ${categoryId}`}</h2>
        <ItemList items={items} />
      </div>
    );
  }

  // Otherwise, render grouped view with up to 3 products per category
  return (
    <div className="item-list-container">
      <h2>Catálogo de productos</h2>
      {CATEGORIES.map((cat) => {
        const productosCat = items.filter((p) => p.categoria === cat).slice(0, 3);
        if (productosCat.length === 0) return null;
        return (
          <section key={cat} className="category-group">
            <div className="category-header">
              <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
              <Link to={`/category/${cat}`} className="see-more-link">Ver más</Link>
            </div>
            <ItemList items={productosCat} />
          </section>
        );
      })}
    </div>
  );
};

export default ItemListContainer;
