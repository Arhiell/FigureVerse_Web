# FigureVerse_Web

## Estructura del proyecto
- `PaginaWeb_Admin/web`: Frontend Admin en React + Vite
- `PaginaWeb_Admin/backend`: Servidor Express que sirve el Admin construido y proxifica API
- `PaginaWeb_Cliente/frontend`: Frontend Cliente estático (HTML/JS)
- `PaginaWeb_Cliente/backend`: Servidor Express que sirve el Cliente y proxifica API

## Herramientas y versiones
- Node.js recomendado: `>=20` (React 19 y Vite 7 funcionan correctamente en Node 20+)
- Frontend Admin:
  - `react@19.2.0`, `react-dom@19.2.0`
  - `vite@7.2.2`
  - ESLint 9
- Backend Admin y Cliente:
  - `express@^4.18.2`
  - `http-proxy-middleware@^2.0.6`
  - `cors@^2.8.5`

## Variables de entorno
- `API_BASE_URL`: URL base del API a proxificar. Por defecto `http://localhost:3000`
- `API_PROXY_PATH`: Prefijo del proxy. Por defecto `/api`

## Levantar en desarrollo
1) Instalar Node.js `>=20` y npm.
2) Admin (Vite):
   - Ir a `PaginaWeb_Admin/web`
   - Instalar: `npm install`
   - Correr dev: `npm run dev`
3) Cliente (backend estático):
   - Ir a `PaginaWeb_Cliente/backend`
   - Instalar: `npm install`
   - Correr: `npm start` (por defecto puerto `8082`)

Notas:
- El backend Admin sirve el build del Admin en puerto `8081` según `PaginaWeb_Admin/backend/server.js:11`.
- El Cliente sirve en puerto `8082` según `PaginaWeb_Cliente/backend/server.js:10`.
- Ambos proxifican al API bajo `API_PROXY_PATH` hacia `API_BASE_URL` (`server.js` en cada backend).

## Build y servicio de Admin
1) Construir Admin:
   - `cd PaginaWeb_Admin/web`
   - `npm install`
   - `npm run build` (genera `dist/`)
2) Servir el Admin construido:
   - `cd ../backend`
   - `npm install`
   - `npm start` (sirve `web/dist` o `frontend` según `PaginaWeb_Admin/backend/server.js:37-45`)

## Publicación a GitHub (rama `web_figureVerse`)
- La rama incluye solo archivos necesarios; se excluyen `node_modules/` y `Requerimientos.txt` mediante `.gitignore`.
- Pasos ejecutados:
  - Crear rama: `git checkout -b web_figureVerse`
  - Añadir cambios: `git add -A`
  - Commit: `git commit -m "Preparar publicación segura (excluir dependencias y Requerimientos.txt)"`
  - Push: `git push -u origin web_figureVerse`

## Requisitos adicionales
- Asegurar que el API en `API_BASE_URL` esté disponible (por defecto `http://localhost:3000`).
- Si se usan credenciales, definirlas en `.env` y no subirlas al repo.
