import React from "react";
import { Link } from "react-router-dom";
import { productos } from "../data/productos";
import Item from "./Item";

const CATEGORIES = ["tortas", "tartas", "panes"];

const Home = () => {

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a El Bocadito</h1>
          <p>Los mejores productos de panadería y repostería artesanal</p>
          <Link to="/productos" className="hero-btn">
            Ver Catálogo Completo
          </Link>
        </div>
        <div className="hero-background">
          <div className="hero-shape">🥐</div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Nuestras Categorías</h2>
        <div className="categories-grid">
          <Link to="/category/tortas" className="category-card">
            <div className="category-icon">🎂</div>
            <h3>Tortas</h3>
            <p>Elaboradas con los mejores ingredientes</p>
          </Link>

          <Link to="/category/tartas" className="category-card">
            <div className="category-icon">🍰</div>
            <h3>Tartas</h3>
            <p>Frescas y deliciosas, perfectas para cualquier momento</p>
          </Link>

          <Link to="/category/panes" className="category-card">
            <div className="category-icon">🍞</div>
            <h3>Panes</h3>
            <p>Artesanales y recién horneados diariamente</p>
          </Link>
        </div>
      </section>

      {/* Categorías con hasta 3 productos cada una */}
      <section className="featured-section">
        <div className="max-width-container">
          <h2>Catálogo Destacado</h2>
          {CATEGORIES.map((cat) => {
            const productosCat = productos.filter((p) => p.categoria === cat).slice(0, 3);
            if (productosCat.length === 0) return null;
            return (
              <div key={cat} className="home-category-group">
                <div className="category-header">
                  <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                  <Link to={`/category/${cat}`} className="see-more-link">Ver más</Link>
                </div>
                <div className="item-list">
                  {productosCat.map((producto) => (
                    <Item key={producto.id} item={producto} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">✨</div>
          <h3>Calidad Premium</h3>
          <p>Utilizamos los mejores ingredientes seleccionados</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Entrega Rápida</h3>
          <p>Llega fresco a tu puerta en 24 horas</p>
        </div>

        <div className="feature">
          <div className="feature-icon">❤️</div>
          <h3>Hecho con Amor</h3>
          <p>Cada producto es elaborado con dedicación</p>
        </div>

        <div className="feature">
          <div className="feature-icon">💯</div>
          <h3>Garantía</h3>
          <p>Satisfacción garantizada o tu dinero de vuelta</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>¿Qué esperas?</h2>
        <p>Explora nuestro catálogo y disfruta de los mejores productos de panadería</p>
        <Link to="/productos" className="cta-btn">
          Comenzar a Comprar
        </Link>
      </section>
    </div>
  );
};

export default Home;
