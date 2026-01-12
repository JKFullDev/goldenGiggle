# Golden Giggle - Premium Gold & Silver Bullion Store


## 📖 **Descripción del Proyecto**

**Golden Giggle** es una aplicación web responsive de comercio electrónico ficticio especializada en la compra y venta de lingotes de oro y plata. La aplicación consume precios en tiempo real de la [Gold API](https://gold-api.com/) y ofrece una experiencia de usuario moderna con:

- **Navegación SPA** (Single Page Application) sin recargas
- **Sistema de carrito** persistente con localStorage
- **Modo claro/oscuro** con persistencia
- **Formulario de tasación** realista para venta de metales
- **Animaciones CSS** suaves y transiciones
- **Notificaciones** elegantes con SweetAlert2
- **Diseño responsive** mobile-first con CSS Grid y Flexbox

El proyecto demuestra habilidades avanzadas de **componentización**, **gestión de estado local**, **consumo de APIs externas**, y **arquitectura modular** usando Vanilla JavaScript con Vite.

---

## ✨ **Características Principales**

### **Funcionalidades Core**

- 🏠 **Página Principal**: Muestra precios en tiempo real de oro y plata con cards interactivas
- 🛒 **Catálogo de Productos**: Lingotes desde 1g hasta 1kg con precios calculados (+200 USD comisión)
- 🧺 **Carrito de Compras**: Agregar/eliminar productos, controles de cantidad, total dinámico
- 📅 **Sistema de Tasación**: Formulario profesional para agendar citas de valoración
- 🔐 **Autenticación Simple**: Login por email con localStorage
- 🎨 **Tema Dual**: Claro/oscuro con transiciones suaves y sombras adaptativas

### **Experiencia de Usuario**

- 📱 **Totalmente Responsive**: Funciona perfectamente en desktop, tablet y móvil
- ⚡ **Rápida y Fluida**: Navegación SPA sin recargas, animaciones optimizadas
- 🔔 **Feedback Visual**: Notificaciones con SweetAlert2, badges del carrito en tiempo real
- 📊 **Precios en Tiempo Real**: Datos actualizados de la Gold API cada carga
- ♿ **Accesible**: HTML semántico, labels correctos, navegación por teclado

### **Arquitectura Técnica**

- 🏗️ **Componentes Modulares**: Estructura organizada con carpetas por componente
- 🔄 **Router Manual**: Sistema de navegación SPA sin librerías externas
- 💾 **Estado Persistente**: localStorage para carrito y preferencias; y sessionStorage para usuario
- 🎯 **API Integration**: Consumo seguro de Gold API con manejo de errores
- 🛠️ **Build Moderno**: Vite para desarrollo rápido y optimización de producción

---

## 🛠️ **Tecnologías Utilizadas**

### **Frontend Core**

| Tecnología | Descripción | Versión |
| --- | --- | --- |
| **HTML5** | Estructura semántica y accesible | 5 |
| **CSS3** | Estilos modernos con variables, Grid, Flexbox | 3 |
| **Vanilla JavaScript** | Lógica de negocio y DOM manipulation | ES6+ |

### **Herramientas de Desarrollo**

| Herramienta | Propósito | Versión |
| --- | --- | --- |
| **Vite** | Bundler y servidor de desarrollo | ^5.0.0 |
| **ES6 Modules** | Arquitectura modular | - |

### **Librerías Externas** *(Puntos Extra)*

| Librería | Uso | Versión | Peso |
| --- | --- | --- | --- |
| **SweetAlert2** | Notificaciones y confirmaciones elegantes | ^11.10.7 | ~20KB |
| **Day.js** | Formateo y validación de fechas | ^1.11.10 | ~2KB |
| **Anime.js** | Animaciones JavaScript (opcional) | ^3.2.1 | ~19KB |

### **APIs Externas**

| API | Propósito | Endpoint |
| --- | --- | --- |
| **Gold API** | Precios en tiempo real de metales | https://api.gold-api.com/price/{symbol} |

### **Almacenamiento**

| Tecnología | Uso | Persistencia |
| --- | --- | --- |
| **localStorage** | Carrito, usuario, tema | Hasta borrar caché |
| **sessionStorage** | Sesiones temporales | Hasta cerrar pestaña |

---

## 🚀 **Instalación y Uso**

### **Prerrequisitos**

- **Node.js** versión 16+ o superior
- **npm** (Node Package Manager) versión 8+
- **Git** (opcional, para clonar repositorio)
- Conexión a internet (para API y dependencias)

### **Instalación Rápida**

1. **Clona o descarga** el repositorio:

bash

`git clone https://github.com/tu-usuario/golden-giggle.gitcd golden-giggle`

1. **Instala dependencias**:

bash

`npm install`

2. **Inicia servidor de desarrollo**:

bash

`npm run dev`

3. **Abre tu navegador** en: http://localhost:"puerto que te indique la consola de VS Code al ejecutar el comando npm run dev"



---

## 📐 **Estructura del Proyecto**

````text
goldenGiggle
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ assets
│     ├─ gold-ingot.jpg
│     └─ vecteezy_luxurious-gold-bullion-bar_59393317.png
├─ README.md
└─ src
   ├─ components
   │  ├─ Cart
   │  │  ├─ Cart.css
   │  │  └─ Cart.js
   │  ├─ Footer
   │  │  ├─ Footer.css
   │  │  └─ Footer.js
   │  ├─ Header
   │  │  ├─ Header.css
   │  │  └─ Header.js
   │  ├─ Home
   │  │  ├─ Home.css
   │  │  └─ Home.js
   │  ├─ Modal
   │  │  ├─ Modal.css
   │  │  └─ Modal.js
   │  ├─ Products
   │  │  ├─ Products.css
   │  │  └─ Products.js
   │  └─ Sell
   │     ├─ Sell.css
   │     └─ Sell.js
   ├─ main.js
   ├─ styles
   │  ├─ global.css
   │  └─ variables.css
   └─ utils
      ├─ api.js
      ├─ cart.js
      └─ storage.js

````

---

### **Patrón de Componentes**

Cada componente sigue el patrón:

``` text

components/[Nombre]/├── [Nombre].js     
                    └── [Nombre].css    # Estilos encapsulados
```
---

## 🎨 **Sistema de Diseño**

### **Paleta de Colores**

| Color | Valor | Uso | Modo |
| --- | --- | --- | --- |
| **Primary** | #FFD700 | Botones, acentos | Ambos |
| **Primary Dark** | #CCAE00 | Hover primary | Ambos |
| **Background** | #FFFFFF / #1A1A1A | Fondo principal | Claro/Oscuro |
| **Surface** | #F8F9FA / #2D2D2D | Cards, secciones | Claro/Oscuro |
| **Text Primary** | #1A1A1A / #FFFFFF | Texto principal | Claro/Oscuro |
| **Text Secondary** | #6C757D / #ADB5BD | Texto secundario | Claro/Oscuro |

### **Tipografía**

- **Fuente Principal**: Inter (fallback: sistema)
- **Peso**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Tamaños**: Escala responsive con clamp()

### **Espaciado**

- **Escala**: 4px (0.25rem) base
- **Valores**: 4px, 8px, 16px, 24px, 32px (--spacing-xs a --spacing-xl)
- **Grid Gaps**: 16px-24px según contexto

### **Sombras Adaptativas**

- **Claro**: Negras sutiles (rgba(0,0,0,0.1-0.2))
- **Oscuro**: Blancas sutiles (rgba(255,255,255,0.05-0.12))
- **Hover**: Elevación + sombra aumentada

### **Breakpoints Responsive**

| Tamaño | Breakpoint | Descripción |
| --- | --- | --- |
| **Mobile** | ≤768px | Teléfonos |
| **Tablet** | 769px-1024px | Tablets |
| **Desktop** | ≥1025px | Escritorio |

---

## 🔌 **Integración de APIs**

### **Gold API**

La aplicación consume precios en tiempo real de metales preciosos:

**Endpoint**: GET https://api.gold-api.com/price/{symbol}

**Símbolos Soportados**:

- **XAU** → Oro (getMetalPrice('XAU'))
- **XAG** → Plata (getMetalPrice('XAG'))

**Respuesta Ejemplo**:

```json
{"price": "2639.90",  "name": "Gold",  "updatedAtReadable": "Sep 19, 2025 at 10:30 AM",  "symbol": "XAU"}
````
**Cálculo de Precios**:

1. **Precio Base**: API (por onza)
2. **Conversión**: / 31.1035 (gramos por onza)
3. **Comisión**: +200 USD por onza
4. **Precio Final**: (API + 200) / 31.1035 × peso_gramos



## 🐛 **Manejo de Errores**

- **Fallback UI**: Precios "Unavailable" con mensaje
- **Formularios**: required, type="email", min="1"
- **Email**: Regex simple (@ check)
- **Fechas**: min = hoy, formato ISO
- **Carrito Vacío**: Estado específico
- **Tema No Soportado**: Default light


---

## 🎓 **Aprendizajes del Proyecto**

### **Habilidades Desarrolladas**

1. **Componentización**: Arquitectura modular sin frameworks
2. **State Management**: localStorage + Custom Events
3. **API Integration**: Fetch, async/await, error handling
4. **Responsive Design**: CSS Grid, Flexbox, media queries
5. **Performance**: Lazy loading, optimized animations
6. **Accessibility**: HTML semántico, ARIA labels
7. **Build Tools**: Vite configuration, deployment

### **Desafíos Superados**

- **Routing SPA**: Navegación sin recargas
- **Estado Reactivo**: Badge carrito en tiempo real
- **Temas Dinámicos**: Sombras adaptativas claro/oscuro
- **API Real**: Manejo de datos externos no controlados
- **Performance**: Animaciones 60fps sin librerías pesadas


---

## 📬 Contacto

LinkedIn: [Juan Carlos Alonso Hernando](https://www.linkedin.com/in/jcah-dev/)

Email: jcarlos.al.hr@gmail.com

Ubicación: Madrid, España