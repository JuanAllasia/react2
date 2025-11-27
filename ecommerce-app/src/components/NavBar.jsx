import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h2>🥐 El Bocadito</h2>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Todos los Productos</Link>
        </li>
        <li>
          <Link to="/category/tortas">Tortas</Link>
        </li>
        <li>
          <Link to="/category/tartas">Tartas</Link>
        </li>
        <li>
          <Link to="/category/panes">Panes</Link>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
};

export default NavBar;
