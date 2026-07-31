# Bertoldi Creators Club

Quiz/formulario de postulación para la red de creadores UGC de Bertoldi.

## Tech Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Fuentes**: Playfair Display + DM Sans (Google Fonts)

## Deploy en Vercel

### Opción 1 — GitHub (recomendada)
1. Subí este proyecto a un repo en GitHub
2. Entrá a [vercel.com](https://vercel.com) → **Add New Project**
3. Importá el repo
4. Vercel detecta Next.js automáticamente
5. Click **Deploy** — listo en ~2 minutos

### Opción 2 — Vercel CLI
```bash
npm i -g vercel
cd bertoldi-quiz
vercel
```

## Dev local
```bash
npm install
npm run dev
# → http://localhost:3000
```

## Estructura
```
app/
  globals.css    — tokens de diseño Bertoldi (colores, fuentes, animaciones)
  layout.tsx     — shell HTML + Google Fonts
  page.tsx       — todo el quiz (Landing + 5 pasos + Success)
```

## Para conectar el formulario a un backend

En `page.tsx`, buscá la función `handleSubmit` y reemplazá el `console.log` con:

```typescript
// Opción A — Formspree
await fetch("https://formspree.io/f/TU_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

// Opción B — tu API propia
await fetch("/api/postulacion", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

## Para agregar logo de Bertoldi

Reemplazá el eyebrow en el `Landing` component:
```tsx
// Donde dice <span>Bertoldi</span>, podés poner:
<Image src="/logo.svg" alt="Bertoldi" width={120} height={32} />
```
Y colocá el archivo `logo.svg` en la carpeta `/public/`.

## Paleta de colores
| Variable | Hex | Uso |
|---|---|---|
| `--bg` | `#0A0A0A` | Fondo principal |
| `--gold` | `#C9A84C` | Acento dorado |
| `--gold-light` | `#E2C87A` | Dorado claro |
| `--cream` | `#F5F0E8` | Texto principal |
| `--blush` | `#E8C9B8` | Acento suave |
