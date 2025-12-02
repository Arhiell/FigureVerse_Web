<div align="center">
  <img src="frontend/img/logo1.jpeg" alt="Figure Verse" height="64" />
  <h1>Figure Verse</h1>
  <p>🧩 E‑commerce de cultura pop: manga, figuras, anime, cómics y coleccionables</p>
  <p>
    <a href="https://github.com/Arhiell/FigureVerse_Web">Web</a> ·
    <a href="https://github.com/BautiC-9/FigureVerse-Escritorio">Escritorio</a> ·
    <a href="https://github.com/Arhiell/FigureVerse-API">API Node</a> ·
    <a href="https://github.com/Arhiell/FigureVerse_API_Python">API Python</a>
  </p>
</div>

## Visión General

- Plataforma orientada a ventas de productos del mundo otaku y cultura pop: 📚 manga, 🎎 figuras, 🎬 anime, 🦸 cómics y 🎮 gaming.
- Arquitectura modular: Frontend en React UMD con servidor estático y proxy; Backend en Node/Express con ORM Sequelize; integración de pagos, carrito, pedidos y soporte.
- Branding del sitio: `Figure Verse` (actualizado en la UI, cabecera y pie de página).

## Stack Tecnológico

- Frontend: React 18 UMD (CDN), JSX cargado en navegador, enrutamiento por hash, server estático con live‑reload y proxy.
- Backend: Node.js + Express, capas de rutas/controladores/middlewares, validación con Joi, ORM Sequelize.
- Base de datos: SQLite por defecto; guía incluida para configurar MySQL/MariaDB.
- Autenticación: JWT (Bearer o cookie) con middleware `requireAuth`.
- Email transaccional: Nodemailer (configurable por SMTP).

## Estructura del Proyecto

- `frontend/`
  - `index.html`: carga React y todos los controladores/componentes.
  - `app.jsx`: shell de la app, estado global y enrutamiento por `hash`.
  - `components/`: UI (Header, Landing, Catalog, ProductDetail, Cart, Checkout, Profile, Favorites, Support, Footer, etc.).
  - `controllers/`: consumo de API (`AuthController`, `ProductController`, `CartController`, `OrdersController`, `PaymentsController`, `SupportController`, `FavoritesController`).
  - `server.js`: servidor estático con SSE (live‑reload) y proxy a la API.
  - `styles.css`, `product.css`: estilos base.
- `backend/`
  - `src/server.js`: servidor Express, CORS, estáticos, montaje de rutas y `sequelize.sync()`.
  - `src/config/database.js`: inicialización de Sequelize (SQLite por defecto).
  - `src/models/`: entidades (`User`, `Product`, `ProductReview`, `Cart`/`CartItem`, `Order`/`OrderItem`/`Payment`, `SupportTicket`, `PasswordReset`).
  - `src/routes/`: definición de endpoints (auth, carrito, pedidos, pagos, productos, soporte).
  - `src/controllers/`: lógica de negocio y validaciones con Joi.
  - `src/middlewares/`: `auth.js` (JWT), `validate.js` (Joi).
  - `src/utils/email.js`: integración SMTP opcional.

## Arquitectura y Flujo

- Frontend SPA sin bundler: los componentes `.jsx` se inyectan vía `<script>` y usan el objeto global `window.Feraytek` como registro de módulos y navegación.
- Enrutamiento: `hash` (`#landing`, `#catalog`, `#product:ID`, etc.) gestionado en `frontend/app.jsx` (cambio de `route` y `productId`).
- Proxy: `frontend/server.js` expone `http://localhost:3001` y redirige `/api/*` y `/static/*` al backend (`http://localhost:3000`).
- Live‑reload: EventSource (`/live`) envía `reload` en cambios de archivos `.html/.css/.js/.jsx`.
- Backend: Express con capas separadas; validación con Joi en middlewares; ORM con Sequelize; `sequelize.sync()` crea/actualiza tablas.

## Modelado de Datos (Sequelize)

- `User` (`backend/src/models/User.js`): credenciales y perfil básico (rol, estado, datos de contacto).
- `Product` (`backend/src/models/Product.js`): catálogo (precio, stock, IVA, categoría, estado, imagen).
- `ProductReview` (`backend/src/models/ProductReview.js`): reseñas con `rating`, `comentario`, `estado` y `producto_id`/`user_id`.
- `Cart`/`CartItem` (`backend/src/models/Cart.js`): carrito activo por usuario, ítems con `precio_base`, `iva_porcentaje`.
- `Order`/`OrderItem`/`Payment` (`backend/src/models/Order.js`): pedidos, detalle, pagos con `estado_pago` y `id_transaccion`.
- `SupportTicket` (`backend/src/models/SupportTicket.js`): reclamos con `prioridad` y `estado`.
- `PasswordReset` (`backend/src/models/PasswordReset.js`): recuperación de contraseña (código y expiración).

## Endpoints Principales

- Autenticación (`backend/src/routes/authRoutes.js`)
  - `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
  - Compatibilidad: `/api/users/register`, `/api/users/login`, `/api/users/profile`.
  - Recuperación: `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `PUT /api/users/password`.
- Productos (`backend/src/routes/productsRoutes.js`)
  - `GET /api/productos`, `GET /api/productos/:id`.
  - Categorías: `GET /api/categorias/activas`, `GET /api/categorias/:id`, `GET /api/categorias/stats`.
  - Imágenes: `GET /api/imagenes_productos/producto/:id`.
  - Reseñas: `GET /api/resenas/producto/:id`, `POST /api/resenas` (auth), `PATCH /api/resenas/:id/aprobar` (admin).
  - ABM productos: `POST /api/productos`, `PUT /api/productos/:id`, `DELETE /api/productos/:id`.
- Carrito (`backend/src/routes/cartRoutes.js`)
  - `GET /api/carrito` (listar), `POST /api/carrito` o `/api/carrito/agregar` (agregar).
  - `PATCH /api/carrito/items/:id`, `PUT /api/carrito/item` (actualizar por payload).
  - `DELETE /api/carrito/items/:id`, `DELETE /api/carrito/item` (remover por payload), `DELETE /api/carrito` (vaciar).
  - Envíos: `GET /api/envios`, `GET /api/envios/metodos`, `POST /api/envios/costo`.
  - Checkout: `POST /api/carrito/checkout` (auth).
- Pedidos (`backend/src/routes/ordersRoutes.js`)
  - `POST /api/pedidos` (crear), `GET /api/pedidos`/`/api/historial_pedidos` (historial), `GET /api/pedidos/:id` (detalle).
- Pagos (`backend/src/routes/paymentsRoutes.js`)
  - `POST /api/pagos` (iniciar), `GET /api/pagos/consulta` (listar), `POST /api/pagos/simular-aprobacion/:id_transaccion`.
- Soporte (`backend/src/routes/supportRoutes.js`)
  - `POST /api/soporte` (crear ticket), `GET /api/soporte/mis-tickets`, `GET /api/soporte/:id`.

> Detalle ampliado de endpoints disponible en `endpoints` (documento auxiliar con rutas). El frontend consume estos servicios desde `frontend/controllers/*`.

## Controladores del Frontend

- `AuthController` (`frontend/controllers/auth.js`): login, registro, perfil, cambio/recuperación de contraseña.
- `ProductController` (`frontend/controllers/products.js`): listar, detalle, categorías, reseñas y enriquecimiento de imágenes desde `/static`.
- `CartController` (`frontend/controllers/cart.js`): CRUD del carrito, métodos de envío y checkout.
- `OrdersController` (`frontend/controllers/orders.js`): creación y consulta de pedidos.
- `PaymentsController` (`frontend/controllers/payments.js`): inicio y consulta de pagos.
- `SupportController` (`frontend/controllers/support.js`): creación y listado de reclamos.
- `FavoritesController` (`frontend/controllers/favorites.js`): favoritos localStorage.

## Configuración y Variables de Entorno

- Backend (`backend/.env`)
  - `PORT=3000`
  - `JWT_SECRET=un-secreto-seguro`
  - `DB_FILE=backend/dev.sqlite` (SQLite por defecto)
  - SMTP opcional para emails:
    - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

### Pasar de SQLite a MySQL/MariaDB

1. Instalar dependencias:
   - `npm i mysql2` (driver) y opcionalmente `npm i mariadb` si usa MariaDB.
2. Editar `backend/src/config/database.js`:

```js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
});
```

3. Definir `.env`:
   - `DB_HOST=localhost`
   - `DB_PORT=3306`
   - `DB_NAME=figureverse`
   - `DB_USER=usuario`
   - `DB_PASS=contraseña`
4. Ejecutar `npm run start` para `sequelize.sync()` y crear tablas. Para entornos productivos, considere migraciones con Sequelize CLI.

## Instalación y Ejecución

- Requisitos: Node.js 18+.

1. Backend (API):

   - `cd backend`
   - `npm install`
   - `npm run start`
   - API en `http://localhost:3000` (logs: "API escuchando...")

2. Frontend (UI + Proxy):
   - `cd frontend`
   - `node server.js`
   - UI en `http://localhost:3001` (proxy `/api/*` y `/static/*` al backend)
   - Live‑reload habilitado (SSE)

## Seguridad y Autenticación

- JWT portado por `Authorization: Bearer <token>` o por cookie (`token`, `auth`, `jwt`, etc.).
- Middleware `requireAuth` verifica el token y adjunta `req.user`.
- Roles (`User.rol`): `cliente`, `admin`, `superadmin` (restricciones en endpoints como aprobación de reseñas).

## Catálogo y Categorías

- Las categorías activas se derivan de productos (`/api/categorias/activas`).
- La UI normaliza categorías al nicho (Manga, Figuras, Anime, Cómics, Videojuegos, Coleccionables, Ropa, Ofertas).

## Envíos y Checkout

- Métodos de envío y cálculo aproximado de costos (`/api/envios/metodos`, `/api/envios/costo`) con geocodificación simple y `haversine`.
- `POST /api/carrito/checkout` crea pedido a partir del carrito y datos de envío.

## Pagos

- Inicio de pago (`POST /api/pagos`) genera `id_transaccion` y estado `pendiente`.
- Consulta (`GET /api/pagos/consulta`) y simulación de aprobación para QA (`POST /api/pagos/simular-aprobacion/:id_transaccion`).

## Soporte

- Tickets de soporte (`POST /api/soporte`) con `alta`/`media`/`baja`.
- Listado del usuario (`GET /api/soporte/mis-tickets`) y detalle (`GET /api/soporte/:id`).

## Estáticos e Imágenes

- El backend sirve `/static` (p.ej. `backend/static/productos/{id}.jpg`).
- El frontend enriquece productos con imágenes desde `/static` o URLs del API.

## Buenas Prácticas y Diseño

- Capas separadas: `routes` → `controllers` → `models`, validación en `middlewares/validate`.
- DTOs y normalización en el frontend para resiliencia ante variaciones del API.
- No se registran secretos; configurar `.env` en entornos seguros.
- CORS configurado para dev (`localhost:3000/3001/5173`).

## Mantenimiento y Extensiones

- Migrar a MySQL/MariaDB en producción (ver guía).
- Integrar pasarela de pago real (Mercado Pago/Stripe) reemplazando `paymentsController`.
- Agregar panel admin (web/escritorio) sobre rutas existentes de ABM y reportes.

## Créditos

- UTN – Facultad Regional Resistencia – Tec. Universitario en Programación.
- Autores: Ayala, Ariel · Capovilla, Bautista.
- Cátedra: Python (Goya, Juan Manuel) · JavaScript (Puljiz, Emilio).
