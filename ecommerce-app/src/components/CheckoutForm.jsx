import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { CartContext } from "../context/CartContext";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
  });

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.telefono ||
      !formData.direccion ||
      !formData.ciudad ||
      !formData.codigoPostal
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const total = getTotalPrice();

      const orderData = {
        cliente: formData,
        items: cart.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.quantity,
          subtotal: item.precio * item.quantity,
        })),
        total: total,
        estado: "pendiente",
        fecha: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "ordenes"), orderData);
      
      setOrderId(docRef.id);
      clearCart();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setError("Error al procesar la compra. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="order-success">
        <div className="success-message">
          <h2>¡Compra realizada con éxito!</h2>
          <p>Tu número de orden es:</p>
          <p className="order-id">{orderId}</p>
          <p>Te redirigiremos a la página principal en unos momentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Información Personal</h3>

            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Dirección de Entrega</h3>

            <div className="form-group">
              <label htmlFor="direccion">Dirección *</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ciudad">Ciudad *</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoPostal">Código Postal *</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Procesando..." : "Confirmar Compra"}
          </button>
        </form>

        <div className="order-summary">
          <h3>Resumen de Orden</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.nombre}</span>
                <span>x{item.quantity}</span>
                <span>${(item.precio * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <h4>Total: ${getTotalPrice().toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
