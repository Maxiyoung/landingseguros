# SOMOSMAS Seguros — Landing Page

Landing page de **SOMOSMAS Seguros** (Productor Asesor de Seguros **Victor Marcelo Young**, Matrícula SSN 68835) enfocada en cotización rápida de seguros de **autos y motos** en Córdoba con atención directa por WhatsApp.

Sitio publicado: <https://somosmasseguross.vercel.app/>

---

## Stack tecnológico

- **React 19** + **Vite 8**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Lucide React** para iconografía
- **Tipografías self-hosted** (`@fontsource-variable/fraunces` y `@fontsource-variable/plus-jakarta-sans`) sin peticiones externas en runtime

---

## Estructura del proyecto

```text
somosmas-seguros-dev/
├── docs/
│   └── estilo-colores-fuentes.txt   # Guía visual de marca, paleta y tipografías
├── public/
│   ├── img/                         # Logos de aseguradoras y assets Open Graph
│   ├── apple-touch-icon.png         # Icono iOS (180x180)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sm-icon.svg                  # Favicon vectorial
├── src/
│   ├── components/
│   │   ├── cotizador/
│   │   │   ├── Cotizador.jsx        # Formulario principal de cotización + validación
│   │   │   └── SelectorVehiculo.jsx # Selector dependiente de marca y modelo
│   │   ├── ui/
│   │   │   ├── ExternalLink.jsx     # Enlaces externos con rel="noopener noreferrer"
│   │   │   ├── Reveal.jsx           # Animación suave al hacer scroll
│   │   │   ├── SearchableSelect.jsx # Select buscable accesible (ARIA combobox/listbox)
│   │   │   ├── SegmentedControl.jsx # Selector deslizante reutilizable (tablist/radiogroup)
│   │   │   └── formStyles.js        # Clases compartidas para inputs del formulario
│   │   ├── BotonWhatsApp.jsx        # Acceso flotante WhatsApp + volver al cotizador
│   │   ├── BrandLogo.jsx            # Marca tipográfica SOMOSMAS seguros
│   │   ├── Emergencia.jsx           # Teléfonos de grúas 24 hs y pasos ante siniestros
│   │   ├── Footer.jsx               # Datos SSN y aviso de privacidad
│   │   ├── Header.jsx               # Barra de navegación sticky
│   │   ├── Hero.jsx                 # Encabezado principal + cotizador protagonista
│   │   ├── LogosCompanias.jsx       # Grilla de aseguradoras
│   │   ├── Planes.jsx               # Tarjetas comparativas de coberturas Auto/Moto
│   │   └── TopBar.jsx               # Barra superior con matrícula SSN y acceso a grúas
│   ├── data/
│   │   ├── coberturas.js            # Planes y beneficios por ramo (auto/moto)
│   │   ├── companias.js             # Aseguradoras, logos, dimensiones y líneas 0800
│   │   └── vehiculos.js             # Catálogo de marcas/modelos AR, años y localidades
│   ├── utils/
│   │   └── whatsapp.js              # Sanitización de campos y armado de links wa.me
│   ├── App.jsx                      # Estado compartido entre Hero, Cotizador y Planes
│   ├── config.js                    # Teléfono WhatsApp, datos del productor y límites
│   ├── index.css                    # Estilos base, animaciones y reduced-motion
│   └── main.jsx                     # Punto de entrada y carga de fuentes locales
├── .gitignore
├── eslint.config.js
├── index.html                       # Metadatos SEO, Open Graph y JSON-LD Schema.org
├── package.json
├── vercel.json                      # Headers de seguridad HTTP y caché para Vercel
└── vite.config.js
```

---

## Cómo correr el proyecto localmente

Requisitos: **Node.js 20+** y **npm**.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar servidor de desarrollo (Vite HMR)
npm run dev

# 3. Verificar linter
npm run lint

# 4. Generar build de producción en dist/
npm run build

# 5. Previsualizar el build de producción localmente
npm run preview
```

> **Nota en Windows PowerShell:** Si la política de ejecución restringe `npm.ps1`, ejecutá `npm.cmd` (por ejemplo `npm.cmd run dev`).

---

## Personalización rápida

- **Número de WhatsApp, productor o límites del formulario:** editar [`src/config.js`](src/config.js).
- **Marcas, modelos o localidades:** editar [`src/data/vehiculos.js`](src/data/vehiculos.js).
- **Planes de cobertura y aseguradoras:** editar [`src/data/coberturas.js`](src/data/coberturas.js) y [`src/data/companias.js`](src/data/companias.js).
- **Datos estructurados SEO (`Schema.org`):** cuando quieras sumar dirección exacta de oficina, horarios o redes en Google, podés completar `address.streetAddress`, `address.postalCode`, `openingHoursSpecification` y `sameAs` en [`index.html`](index.html) y validarlos en [Rich Results Test](https://search.google.com/test/rich-results).

---

## Despliegue en Vercel

El proyecto está preparado para desplegarse como sitio estático en **Vercel**:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Headers de seguridad:** configurados en [`vercel.json`](vercel.json) (`Content-Security-Policy` estricta con fuentes locales, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` y `Strict-Transport-Security`), además de caché inmutable para `/assets/*`.
