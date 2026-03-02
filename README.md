# Portafolio Jaime Rojas

Portafolio profesional desarrollado con React para presentar proyectos de gran impacto institucional, habilidades técnicas y canal de contacto.

## Stack

- React 19 + `react-scripts` (CRA)
- CSS custom
- `motion` para animaciones UI
- EmailJS (opcional) para formulario de contacto

## Requisitos

- Node.js 18+ (recomendado LTS)
- npm 9+

## Instalación

```bash
npm install
```

## Variables de entorno

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

2. Completa tus llaves de EmailJS en `.env.local`:

```env
REACT_APP_EMAILJS_SERVICE_ID=
REACT_APP_EMAILJS_TEMPLATE_ID=
REACT_APP_EMAILJS_PUBLIC_KEY=
```

Si no configuras estas variables, el formulario usará `mailto:` como fallback.

## Desarrollo local

```bash
npm start
```

App en `http://localhost:3000`.

## Testing y build

```bash
npm test -- --watchAll=false
npm run build
```

## SEO y dominio

Se configuraron:

- `public/index.html` (meta tags OG/Twitter + JSON-LD)
- `public/robots.txt`
- `public/sitemap.xml`
- `public/manifest.json`

Dominio actual configurado: `https://rojas.baby`.

## Deploy (Cloudflare Pages)

Este repo ya incluye soporte para Cloudflare Pages:

- `public/_redirects` para SPA fallback (`/* /index.html 200`)
- `public/_headers` con cabeceras de seguridad y cache

### Pasos

1. Conecta el repositorio en Cloudflare Pages.
2. Configura:
- Framework preset: `Create React App`
- Build command: `npm run build`
- Build output directory: `build`
3. Define variables de entorno (si usas EmailJS):
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`
4. Asocia el dominio personalizado `rojas.baby`.

## Deploy alternativo

- Vercel: `vercel.json`
- Netlify: `netlify.toml`

## CI (GitHub Actions)

El proyecto incluye workflow en `.github/workflows/ci.yml` que ejecuta:

- `npm ci`
- `npm test -- --watchAll=false --runInBand`
- `npm run build`

En cada `push` y `pull_request` a `main`.

## Seguridad

- No subir `.env` ni `.env.local` al repositorio.
- Si alguna key fue expuesta previamente, rotarla en EmailJS.
- Mantener dependencias actualizadas.
