# Spiced

<img src="public/logos/logo-spiced-pos.png" alt="Logo de Spiced" width="300">

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/evagandiabelda/spiced">Spiced</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/evagandiabelda">Eva Gandia Belda</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>

Esta aplicación es una plataforma de apoyo para personas neurodivergentes, diseñada para conectar, compartir experiencias y acceder a recursos útiles. Entre sus características clave, podemos encontrar:

- 👥 **Comunidad neurodivergente:** Espacios interactivos para compartir experiencias y recursos.
- 📌 **Publicación y guardado de contenido:** Sistema de ‘shares’ para compartir y organizar información útil.
- 🔎 **Búsqueda optimizada:** Filtrado y categorización para encontrar recursos fácilmente.
- 🎨 **Diseño accesible:** Adaptación a distintas necesidades visuales, modo oscuro y navegación intuitiva.

## Primer vistazo a la plataforma

*Página principal de Spiced:*
<img src="public/imgs/screenshots/Spiced-screenshot-index.png" alt="Página principal de Spiced" width="800">

*Feed de publicaciones:*
<img src="public/imgs/screenshots/Spiced-screenshot-feed.png" alt="Feed de publicaciones" width="800">

*Página de registro:*
<img src="public/imgs/screenshots/Spiced-screenshot-singin.png" alt="Página de registro" width="800">

*Panel de usuario:*
<img src="public/imgs/screenshots/Spiced-screenshot-dashboard.png" alt="Panel de usuario" width="800">

# Tecnologías utilizadas

- **Frontend:** Next.js + TypeScript + Tailwind
- **Backend:** Prisma + PostgreSQL (Neon)
- **Autenticación:** NextAuth
- **Almacenamiento de imágenes:** Cloudinary
- **Despliegue:** Vercel

# Instalación y Configuración

## **Paso 1:** Configuración de variables de entorno

Este proyecto utiliza variables de entorno para gestionar configuraciones sensibles. Para ejecutarlo en local, se debe crear un archivo ".env.local" en la raíz del proyecto con el siguiente formato:

```
# Base de datos
DATABASE_URL=postgres://USER:PASSWORD@HOST/DATABASE?sslmode=require

# Autenticación
AUTH_SECRET=your_secret_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (gestión de imágenes)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

A continuación, se debe copiar el contenido del archivo ".env.example" a ".env.local" y completar los valores según la configuración deseada.

## **Paso 2:** Clonar el repositorio y ejecutar el proyecto en local

Estos son los pasos básicos:

```bash
# Clonar el repositorio:
git clone https://github.com/evagandiabelda/spiced
# Situarse en la carpeta del proyecto:
cd spiced
# Instalar las dependencias necesarias:
npm install
# Ejecutar el servidor de desarrollo:
npm run dev # (o 'pnpm dev')
# Generar los clientes de Prisma:
pnpm prisma generate
# Ejecutar todas las migraciones desde cero (opcional):
npx prisma migrate reset
# Poblar la base de datos:
npx prisma db seed
```

Podremos ver la aplicación en ejecución desde el navegador, en la siguiente dirección:

[http://localhost:3000](http://localhost:3000)

# Estructura del proyecto

Éste es un breve esquema con las carpetas principales y su función:

```
📦 spiced
    ┣ 📂 app
    ┃   ┣ 📂 api              # Gestión y operaciones sobre la BD, autenticación.
    ┃   ┣ 📂 lib              # Funciones auxiliares y lógica compartida.
    ┃   ┣ 📂 nombre-pagina    # Páginas principales (feed, login, panel, register, share...).
    ┃   ┃   ┣ 🖽 layout.tsx    # Estructura de cada página.
    ┃   ┃   ┗ 📄 page.tsx      # Archivo de cada página.
    ┃   ┣ 🎨 globals.css      # Estilos globales CSS.
    ┃   ┣ 🖽 layout.tsx        # Estructura global para las páginas hijas.
    ┃   ┗ 📄 page.tsx          # Archivo de la página principal.
    ┣ 📂 components           # Componentes reutilizables.
    ┣ 📂 lib                  # Funciones auxiliares y lógica compartida.
    ┣ 📂 prisma               # Configuración de Prisma.
    ┣ 📂 public               # Archivos estáticos (imágenes, fuentes, etc.).
    ┣ 📂 utils                # Utilidades y funciones auxiliares.
    ┣ ⚙️ .env.example         # Ejemplo de archivo de variables de entorno.
    ┣ 📜 README.md            # Documentación sobre la aplicación.
    ┗ 🎨 tailwind.config.ts   # Estilos globales de Tailwind.
```

# Contacto

Para cualquier duda o ampliación de la información, puedes ponerte en contacto con el equipo de desarrollo:

[Enviar email](mailto:evaganbel@alu.edu.gva.es)
