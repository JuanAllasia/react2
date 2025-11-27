# El Bocadito - E-Commerce

Una aplicación de e-commerce moderna construida con **React**, **Firebase** y **Firestore** que permite a los usuarios navegar productos, agregar artículos al carrito y realizar compras.

## Características principales

### ✨ Funcionalidades implementadas

- **Catálogo de productos dinámico**: Carga de productos desde Firestore en tiempo real
- **Navegación por categorías**: Filtrado de productos por categoría (Tortas, Tartas, Panes)
- **Detalle de productos**: Vista detallada con información completa de cada artículo
- **Carrito de compras**: Gestión del estado global del carrito con Context API
- **Checkout**: Formulario para procesar compras con validación
- **Base de datos en la nube**: Almacenamiento de productos y órdenes en Firestore
- **Generación de órdenes**: Creación de documentos de compra en Firestore con ID único
- **Interfaz responsive**: Diseño adaptable para dispositivos móviles, tablets y desktop
- **SPA sin recargas**: Navegación fluida con React Router

## Estructura del proyecto

```
src/
├── components/
│   ├── NavBar.jsx              # Barra de navegación
│   ├── CartWidget.jsx          # Icono del carrito con contador
│   ├── ItemListContainer.jsx   # Contenedor de lista de productos
│   ├── ItemList.jsx            # Componente de presentación de lista
│   ├── Item.jsx                # Tarjeta individual de producto
│   ├── ItemDetailContainer.jsx # Contenedor de detalle
│   ├── ItemDetail.jsx          # Detalle del producto
│   ├── ItemCount.jsx           # Selector de cantidad
│   ├── Cart.jsx                # Página del carrito
│   ├── CartItem.jsx            # Item del carrito
│   └── CheckoutForm.jsx        # Formulario de compra
├── context/
│   └── CartContext.jsx         # Context global del carrito
├── config/
│   └── firebase.js             # Configuración de Firebase
├── data/
│   └── productos.js            # Datos de productos (usado como respaldo)
├── App.jsx                     # Componente raíz con rutas
├── App.css                     # Estilos globales
└── main.jsx                    # Punto de entrada

```

## Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con catálogo completo |
| `/category/:categoryId` | Productos filtrados por categoría |
| `/item/:itemId` | Detalle de un producto específico |
| `/cart` | Carrito de compras |
| `/checkout` | Formulario de compra |

## Componentes principales

### CartContext
Proporciona estado global para el carrito con las siguientes funciones:
- `addToCart(product, quantity)` - Agregar producto al carrito
- `removeFromCart(productId)` - Eliminar producto del carrito
- `updateQuantity(productId, quantity)` - Actualizar cantidad
- `clearCart()` - Vaciar el carrito
- `getTotalItems()` - Obtener total de artículos
- `getTotalPrice()` - Obtener precio total

### ItemCount
Componente que permite seleccionar cantidad con validaciones:
- Cantidad mínima: 1
- Cantidad máxima: Stock disponible
- Validación de stock antes de permitir agregar

### ItemDetail
Muestra detalles del producto y oculta ItemCount después de agregar:
- Mostrar disponibilidad de stock
- Selector de cantidad (ItemCount)
- Mensaje de "Producto agregado" después de la compra
- Enlace para ir al carrito

## Integración con Firebase/Firestore

### Colecciones requeridas

#### `productos`
```json
{
  "id": "doc_id",
  "nombre": "Torta de Chocolate",
  "categoria": "tortas",
  "precio": 3500,
  "stock": 10,
  "descripcion": "Deliciosa torta de chocolate casera",
  "imagen": "url_imagen"
}
```

#### `ordenes`
```json
{
  "cliente": {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "direccion": "Calle Principal 123",
    "ciudad": "Madrid",
    "codigoPostal": "28001"
  },
  "items": [
    {
      "id": "producto_id",
      "nombre": "Torta de Chocolate",
      "precio": 3500,
      "cantidad": 2,
      "subtotal": 7000
    }
  ],
  "total": 7000,
  "estado": "pendiente",
  "fecha": "timestamp"
}
```

## Instalación y configuración

### Requisitos
- Node.js 14+
- npm o yarn
- Cuenta en Firebase

### Pasos

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd ecommerce-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Ir a [Firebase Console](https://console.firebase.google.com/)
   - Crear nuevo proyecto
   - Obtener credenciales de configuración
   - Actualizar `src/config/firebase.js` con tus credenciales

4. **Configurar Firestore**
   - Crear colección `productos` con documentos de ejemplo
   - Crear colección `ordenes` (se poblará con las compras)

5. **Ejecutar la aplicación**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Dependencias principales

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.x.x",
  "firebase": "^10.x.x"
}
```

## Estilos

La aplicación utiliza **CSS vanilla** con:
- Grid CSS para layouts responsivos
- Flexbox para alineación
- Variables CSS para colores y estilos reutilizables
- Media queries para diferentes breakpoints
- Animaciones y transiciones suaves

### Paleta de colores
- **Primario**: #ff6b6b (Rojo)
- **Secundario**: #4ecdc4 (Turquesa)
- **Oscuro**: #2d3436 (Gris oscuro)
- **Claro**: #f0f0f0 (Gris claro)

## Funcionalidades de UX

- **Loaders**: Mensajes "Cargando..." mientras se traen datos de Firestore
- **Validaciones**: Campos requeridos, validación de email, stock
- **Mensajes de estado**: 
  - "Carrito vacío"
  - "Producto sin stock"
  - "Producto agregado al carrito"
  - "Compra realizada con éxito"
- **Redireccionamiento**: Después de confirmar compra, redirige a home
- **ID de orden**: Muestra ID único de Firestore para seguimiento

## Ejemplo de flujo de compra

1. Usuario navega al catálogo (ItemListContainer)
2. Selecciona una categoría o ve todos los productos
3. Hace clic en "Ver detalle" de un producto (ItemDetail)
4. Selecciona cantidad con ItemCount
5. Agrega al carrito (CartContext actualiza)
6. Navega a /cart para ver resumen
7. Procede a checkout (CheckoutForm)
8. Completa formulario con datos de envío
9. Confirma compra → Se crea documento en Firestore (ordenes)
10. Recibe ID de orden único
11. Redirige a home

## Mejoras futuras

- [ ] Sistema de autenticación de usuarios
- [ ] Historial de compras por usuario
- [ ] Integración de pasarela de pago (Stripe, Mercado Pago)
- [ ] Sistema de reviews y calificaciones
- [ ] Wishlist/Favoritos
- [ ] Carrito persistente en localStorage
- [ ] Búsqueda de productos
- [ ] Filtros avanzados
- [ ] Notificaciones por email
- [ ] Panel de administración

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Autor

Desarrollado como proyecto de React y Firebase.

---

**Última actualización**: Noviembre 2025
