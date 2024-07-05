# Sistema de Información para la Venta de Ropa para Mascotas

Este es un sistema de información diseñado para la venta de ropa para mascotas. El sistema incluye una interfaz de usuario desarrollada con React y Vite, y un servidor que maneja la lógica de negocio y la base de datos SQL con Node.js.

## Características
- Interfaz amigable para la gestión de productos, clientes y pedidos.
- Catálogo de ropa para mascotas con imágenes y descripciones detalladas.
- Sistema de autenticación para usuarios administradores y clientes.
- Gestión de inventario y seguimiento de pedidos.
- Base de datos SQL para almacenamiento de datos.

## Estructura del Proyecto

El proyecto está estructurado en dos principales carpetas: `client` y `server`.

- `client/`: Contiene la aplicación frontend creada con React y Vite.
  - `public/`: Archivos públicos que serán servidos por el servidor.
  - `src/`: Contiene el código fuente de la aplicación.

- `server/`: Contiene la aplicación backend creada con Node.js.
  - `server.js`: Archivo principal del servidor.

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación del Frontend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndresGutierrezHurtado/pets-hoddies.git
   ```
2. Navega a la carpeta `client`:
   ```bash
   cd pets-hoddies/client
   ```
3. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```

### Instalación del Backend

1. Navega a la carpeta `server`:
   ```bash
   cd pets-hoddies/server
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```