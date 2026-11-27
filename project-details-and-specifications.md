# Monos Track — Especificaciones y Detalles del Proyecto

## 1. Resumen ejecutivo

**Monos Track** es una aplicación web de una sola página (SPA) para la **gestión de finanzas personales**. Permite a un usuario autenticado registrar movimientos de **ingresos** y **gastos** y visualizar su comportamiento financiero mediante un dashboard interactivo (tarjetas de resumen, gráfico de barras, gráfico de dona y ranking de mayores gastos). Está construida con **React 19 + TypeScript + Vite** y usa **Supabase** como proveedor de autenticación, base de datos relacional y almacenamiento de archivos. Toda la aplicación se renderiza en el cliente y se comunica con Supabase mediante su SDK de JavaScript; **no existe una capa de servidor propia**. La interfaz está en español y se organiza en torno a un modelo financiero de dos ejes (ingreso vs. gasto).

El proyecto es privado y no distribuible sin autorización (según el `README.md`).

---

## 2. Planteamiento del problema y propósito

El control manual de finanzas en hojas de cálculo es propenso a errores y ofrece poca visibilidad sobre los patrones de gasto. Monos Track resuelve esto con un flujo enfocado y de baja fricción:

1. Registrar cada movimiento con un conjunto pequeño de campos estructurados.
2. Ver de inmediato totales, tendencias y distribución por categoría para un año/mes seleccionado.

El objetivo de producto es convertir el seguimiento financiero en una tarea simple, precisa y visual, con persistencia en la nube y aislamiento por usuario.

---

## 3. Alcance funcional por módulo y rutas

La aplicación se organiza en cuatro superficies autenticadas y tres públicas:

| Ruta | Tipo | Componente | Descripción |
|------|------|-----------|-------------|
| `/` | Pública (redirige a `/dashboard` si hay sesión) | `HomePage` | Landing page con propuesta de valor, características y CTA de registro. |
| `/login` | Pública (redirige a `/dashboard` si hay sesión) | `LoginPage` | Inicio de sesión con email y contraseña. |
| `/register` | Pública (redirige a `/dashboard` si hay sesión) | `RegisterPage` | Registro con nombre, apellido, email, contraseña, confirmación y aceptación de términos. |
| `/dashboard` | Protegida | `DashboardPage` | Panel financiero con tarjetas, filtros y gráficos. |
| `/dashboard/movements` | Protegida | `MovementsRegisterPage` | Registro de movimientos, historial y modales de detalle/edición/eliminación. |
| `/dashboard/settings` | Protegida | `SettingsPage` | Configuración de perfil (sección de información personal). |

**Funcionalidades clave:**

- **Autenticación (Supabase):** registro, login, logout y persistencia/observación de sesión.
- **Protección de rutas** mediante `beforeLoad` de TanStack Router.
- **Dashboard:** tarjetas de Ingresos, Gastos y Balance, con variación porcentual vs. período anterior; filtros de año y mes derivados de los datos; gráfico de barras Ingresos vs. Gastos; gráfico de dona de gastos por categoría; panel Top 5 de mayores gastos con comparación vs. período anterior.
- **Movimientos:** formulario con tipo, categoría, monto, fecha, método de pago, descripción y comprobante opcional; historial paginado; detalle con recibo firmado; edición (incluido reemplazo de comprobante); eliminación con confirmación.
- **Perfil:** visualización de datos del usuario y formulario de edición (parcialmente conectado).
- **Tema claro/oscuro persistente**, diseño responsive y notificaciones tipo toast.
- **Validación de formularios** con React Hook Form + Zod.

---

## 4. Arquitectura

### 4.1 Patrón general

La aplicación sigue una arquitectura **SPA cliente-servidor (BaaS)** con organización **feature-sliced** (por funcionalidad). Cada feature encapsula sus propias `pages`, `components`, `hooks`, `schemas`, `store`, `api`, `types`, `utils` y `mocks`, mientras que `src/shared` concentra lo reutilizable y `src/routes` el árbol de rutas.

**Capas lógicas:**

- **Presentación:** `pages` (composición de pantalla) y `components` (UI reutilizable/presentacional).
- **Lógica de estado y efectos:** `hooks` (estado local, `useMutation`/`useQuery`, medidas de layout, temporizadores).
- **Acceso a datos:** `api/*.api.ts` con llamadas a Supabase (auth, tablas, storage).
- **Validación:** `schemas` con Zod (login, registro, movimientos).
- **Estado global:** `stores` con Zustand (sesión, tema, menú hamburguesa).
- **Utilidades puras:** `utils` (formateo, filtrado y agregación de datos).
- **Tipos:** `types/*.d.ts` (datos financieros, perfil).

### 4.2 Flujo de arranque y renderizado

1. `index.html` monta `<div id="root">` y carga `/src/main.tsx`.
2. `main.tsx` crea un `QueryClient` (TanStack Query) con `staleTime` de 5 minutos, `retry: 1` y `refetchOnWindowFocus: false`, y envuelve la app en `QueryClientProvider`.
3. `App.tsx` crea el router con `routeTree` generado y renderiza `RouterProvider`.
4. `__root.tsx` monta `RootComponent`, que:
   - Aplica/retira la clase `dark` en `documentElement` según el tema.
   - Sincroniza la sesión con `supabase.auth.getSession()` y se suscribe a `onAuthStateChange` para actualizar el `authStore`.
   - Muestra un `FullScreenLoader` mientras la sesión se resuelve.
   - Renderiza el `Toaster` de `sileo` (posición `top-center`) y el `Outlet`.

### 4.3 Enrutamiento y protección

- Enrutamiento **file-based** con **TanStack Router**; el plugin `@tanstack/router-plugin/vite` genera `routeTree.gen.ts` con `autoCodeSplitting: true`.
- El layout `_app` (`AppLayout`) envuelve las rutas con `Header`, `Outlet` y `Footer`.
- Las guardas se ejecutan en `beforeLoad`: leen `useAuthStore.getState()`, y si `isLoading` es `true` consultan `supabase.auth.getSession()`. Las rutas privadas redirigen a `/login` con un `search.redirect`; las públicas redirigen a `/dashboard` si ya hay usuario.
- `routeTree.gen.ts` es **autogenerado** y está marcado con `eslint-disable` y `@ts-nocheck`; no debe editarse.

### 4.4 Gestión de estado

- **Estado del servidor:** TanStack Query. La clave compartida `['financial-data']` se usa tanto en el dashboard como en el listado de movimientos. Las mutaciones (crear/editar/eliminar) invalidan esa clave para refrescar la UI.
- **Estado global de cliente (Zustand):**
  - `authStore`: `user`, `isLoading`, `setSession`, `setLoading`, `logout` (importa dinámicamente el cliente Supabase y ejecuta `signOut`).
  - `themeStore`: `isDark` (inicializado desde `prefers-color-scheme`), `toggleTheme`, persistido en `localStorage` con `persist` bajo la clave `theme`.
  - `hambMenuStore`: `isHambMenuOpen`, `toggleHambMenu`, `closeHambMenu` (no persistido).
- **Estado local:** modales de movimientos (`useReadMovement`, `useEditMovement`, `useDeleteMovementModal`), visibilidad de contraseña (`useShowPassword`), preview de archivos y medidas de layout (`useElementHeight`).

### 4.5 Flujo de datos y mutaciones

- **Lectura:** consultas directas a la tabla `movements` con `supabase.from('movements').select(...)`, ordenadas por `movement_date` descendente en el historial.
- **Escritura:** `movements.api.ts` valida la sesión con `supabase.auth.getUser()` antes de cada operación.
  - `submitMovementToSupabase`: sube el comprobante (si existe) al bucket `receipts` con nombre único, inserta la fila y, si falla la inserción, elimina el archivo huérfano.
  - `updateMovementInSupabase`: valida sesión, sube el nuevo comprobante (si existe), elimina el anterior, actualiza la fila por `id` y limpia el nuevo archivo si la actualización falla.
  - `deleteMovementFromSupabase`: valida sesión, elimina el comprobante (si existe) y borra la fila por `id`.
- **Comprobantes:** `useSignedReceiptUrl` genera una URL firmada privada con expiración de 60 segundos al abrir el modal de detalle.

### 4.6 Manejo de notificaciones y errores

- **Toasts:** `sileo` para éxito/error/advertencia (login, registro parcial, crear/editar/eliminar movimientos, "sin cambios").
- **Errores de mutaciones:** se capturan con `onError` y se muestran como toast; algunos `console.log` permanecen como depuración.
- **Validación de entorno:** `shared/lib/supabase.ts` lanza un error si faltan `VITE_SUPABASE_URL` o `VITE_SUPABASE_PUBLISHABLE_KEY`.

---

## 5. Modelo de datos y backend (Supabase)

### 5.1 Tabla `movements`

Campos utilizados por la aplicación:

| Campo | Tipo esperado | Uso |
|-------|---------------|-----|
| `id` | UUID/identificador | Clave para editar/eliminar. |
| `user_id` | UUID | Propietario del movimiento. |
| `movement_type` | `'income' \| 'expense'` | Tipo de movimiento. |
| `amount` | numérico | Monto en dólares. |
| `category` | string | Categoría (vocabulario fijo). |
| `movement_date` | fecha ISO (`YYYY-MM-DD`) | Fecha del movimiento. |
| `payment_method` | string | Método de pago. |
| `description` | string (opcional) | Descripción libre. |
| `receipt_path` | string (opcional) | Ruta del comprobante en Storage. |
| `created_at` | timestamp | Fecha de creación; usada para "última actualización". |

### 5.2 Storage

- Bucket llamado **`receipts`**.
- Archivos con nombre `${Date.now()}-${random}.${ext}`.
- Acceso mediante **URLs firmadas** de corta duración (60 s).

### 5.3 Autenticación y metadatos

- Supabase Auth con email/contraseña.
- El registro guarda `first_name` y `last_name` en `user_metadata`.
- `updateUserProfile` (settings) actualiza `first_name`, `last_name` y `email` dentro de `user_metadata`.

### 5.4 Vocabulario de dominio (`shared/constants/constants.ts`)

- **`MONTH_NAMES`:** 12 meses en español (`Enero`…`Diciembre`).
- **`EXPENSE_CATEGORIES` (11):** `food`, `housing`, `transport`, `utilities`, `health`, `entertainment`, `shopping`, `education`, `debt`, `pets`, `other_expense`; cada una con `label`, `color`, `border` y `emoji`.
- **`INCOME_CATEGORIES` (8):** `salary`, `freelance`, `sales`, `investments`, `gifts`, `refunds`, `carry_over`, `other_income`; cada una con `label`.
- **`MONEY_METHOD_CATEGORIES` (4):** `cash`, `transfer`, `deposit`, `credit_card`; cada una con `label`.

---

## 6. Estructura de archivos detallada

```text
monos-track/
├── .env.local                     # Variables de entorno locales (no versionar)
├── .gitignore
├── eslint.config.js               # Configuración ESLint 9 (flat config)
├── file-structure.md              # Documentación del árbol de archivos
├── index.html                     # Punto de entrada HTML + favicons
├── package.json                   # Dependencias y scripts
├── pnpm-lock.yaml                 # Lockfile de pnpm
├── project-distribution.svg       # Diagrama de distribución del proyecto
├── README.md                      # Documentación (inglés/español)
├── tsconfig.json                  # Configuración raíz (referencias + strict)
├── tsconfig.app.json              # Config TS de la app (ES2023, bundler, noEmit)
├── tsconfig.node.json             # Config TS para tooling de Node
├── vite.config.ts                 # Plugins: TanStack Router, React, Tailwind, Babel/React Compiler
├── .tanstack/tmp/                 # Archivos temporales del plugin de TanStack
├── public/
│   └── favicons/                  # Favicons y tiles (Apple, MS, PNG, ICO)
├── node_modules/
└── src/
    ├── main.tsx                   # Bootstrap: QueryClient + App
    ├── index.css                  # Tailwind v4, tokens de tema, fuentes, utilidades
    ├── routeTree.gen.ts           # Árbol de rutas autogenerado
    ├── app/
    │   ├── App.tsx                # Router + RouterProvider
    │   └── RootComponent.tsx      # Tema, sesión, Toaster, Outlet, loader global
    ├── assets/
    │   └── images/
    │       ├── monos-track-logo-circle.png
    │       └── monos-track-logo.png
    ├── features/
    │   ├── auth/
    │   │   ├── components/
    │   │   │   ├── LoginButton.tsx          # Link a /login
    │   │   │   ├── LoginForm.tsx            # Formulario de login (RHF + Zod)
    │   │   │   ├── PasswordStrength.tsx     # Indicador de fortaleza de contraseña
    │   │   │   ├── RegisterButton.tsx       # Link a /register
    │   │   │   └── RegisterForm.tsx         # Formulario de registro (RHF + Zod)
    │   │   ├── hooks/
    │   │   │   ├── useLoginForm.ts          # useMutation signInWithPassword
    │   │   │   ├── useRegisterForm.ts       # useMutation signUp + metadata
    │   │   │   └── useShowPassword.ts       # Toggle de visibilidad
    │   │   ├── pages/
    │   │   │   ├── LoginPage.tsx
    │   │   │   └── RegisterPage.tsx
    │   │   ├── schemas/
    │   │   │   ├── loginSchema.ts           # email + password (≥8)
    │   │   │   └── registerSchema.ts        # nombre, apellido, email, password, confirmación, términos
    │   │   └── store/
    │   │       └── authStore.ts             # Zustand: user, isLoading, logout
    │   ├── dashboard/
    │   │   ├── components/
    │   │   │   ├── BarsChart.tsx            # Chart.js Bar (Ingresos vs Gastos)
    │   │   │   ├── DashboardFilters.tsx     # Selects de año/mes
    │   │   │   ├── DashboardHeader.tsx      # Saludo + fecha actual
    │   │   │   ├── DoughnutChart.tsx        # Chart.js Doughnut + leyenda
    │   │   │   ├── ExpensePercentageInfo.tsx# Indicador categoría/porcentaje (no referenciado)
    │   │   │   ├── FinancialCard.tsx        # Tarjeta Ingresos/Gastos/Balance
    │   │   │   └── HigherExpenses.tsx       # Top 5 de gastos
    │   │   ├── hooks/
    │   │   │   ├── useDashboardFilters.tsx  # RHF + useWatch para filtros
    │   │   │   ├── useExpensesByCategory.ts # Agregado para dona
    │   │   │   ├── useFinancialCardsData.ts # Cálculo de tarjetas y tendencias
    │   │   │   ├── useHigherExpenses.ts     # Top 5 y comparación previa
    │   │   │   ├── useIncomesVsExpenses.ts  # Datos para gráfico de barras
    │   │   │   └── useTimeAgo.ts            # Tick cada 30 s
    │   │   ├── mocks/
    │   │   │   └── mockup-data.ts           # Dataset de prueba (2025–2026)
    │   │   ├── pages/
    │   │   │   └── DashboardPage.tsx        # Composición del dashboard y query
    │   │   ├── types/
    │   │   │   └── dashboardTypes.d.ts      # FinancialDataTypes
    │   │   └── utils/
    │   │       ├── filterDataFunctions.ts   # Filtros por año/mes y totales
    │   │       ├── fiterDataForChartBars.ts # Datos del gráfico (nombre con typo)
    │   │       ├── getGraphicsText.ts       # Gradiente CSS para gráficos (no usado)
    │   │       └── getTimeAgo.ts            # Formato relativo en español
    │   ├── home/
    │   │   └── pages/
    │   │       └── HomePage.tsx             # Landing page
    │   ├── movements/
    │   │   ├── api/
    │   │   │   └── movements.api.ts         # CRUD + Storage en Supabase
    │   │   ├── components/
    │   │   │   ├── MovementDeleteModal.tsx  # Confirmación de borrado
    │   │   │   ├── MovementDetailsModal.tsx # Detalle + recibo firmado
    │   │   │   ├── MovementEditModal.tsx    # Edición con nuevo comprobante
    │   │   │   ├── MovementsList.tsx        # Tarjetas móvil / tabla desktop
    │   │   │   └── MovementsRegisterForm.tsx# Formulario de alta
    │   │   ├── hooks/
    │   │   │   ├── useCreateMovement.ts
    │   │   │   ├── useDeleteMovement.ts
    │   │   │   ├── useDeleteMovementModal.ts
    │   │   │   ├── useEditMovement.ts
    │   │   │   ├── useReadMovement.ts
    │   │   │   ├── useSignedReceiptUrl.ts   # URL firmada (60 s)
    │   │   │   └── useUpdateMovement.ts
    │   │   ├── pages/
    │   │   │   └── MovementsRegisterPage.tsx# Query + formulario + lista + modales
    │   │   └── schemas/
    │   │       └── movementsSchema.ts       # Zod + superRefine categoría/tipo
    │   └── settings/
    │       ├── api/
    │       │   └── settings.api.ts          # updateUserProfile (auth.updateUser)
    │       ├── components/
    │       │   └── ProfileSection.tsx       # Formulario de perfil (parcial)
    │       ├── pages/
    │       │   └── SettingsPage.tsx         # Cabecera + ProfileSection
    │       └── types/
    │           └── settingsTypes.d.ts       # ProfileFormData
    ├── routes/
    │   ├── __root.tsx                       # createRootRoute -> RootComponent
    │   ├── _app.tsx                         # Layout (AppLayout)
    │   ├── login.tsx                        # /login + guarda pública
    │   ├── register.tsx                     # /register + guarda pública
    │   └── _app/
    │       ├── index.tsx                    # / (HomePage)
    │       └── dashboard/
    │           ├── index.tsx                # /dashboard + guarda privada
    │           ├── movements.tsx            # /dashboard/movements + guarda
    │           └── settings.tsx             # /dashboard/settings + guarda
    └── shared/
        ├── components/
        │   ├── DarkThemeButton.tsx          # Toggle claro/oscuro animado
        │   ├── Footer.tsx
        │   ├── FullScreenLoader.tsx
        │   ├── Loader.tsx
        │   ├── UserName.tsx                 # Saludo con user_metadata
        │   └── header/
        │       ├── BackScreen.tsx           # Overlay del menú móvil
        │       ├── BrandLogo.tsx            # Logo -> /
        │       ├── HamburguerMenuButton.tsx # Toggle menú + no-scroll
        │       ├── Header.tsx               # Cabecera + logout + tema
        │       └── Navbar.tsx               # Navegación responsive
        ├── constants/
        │   └── constants.ts                 # Meses, categorías y métodos
        ├── hooks/
        │   └── useElementWidthHeight.ts     # Medidas de layout (altura/anchura/izquierda)
        ├── layouts/
        │   └── AppLayout.tsx                # Header + Outlet + Footer
        ├── lib/
        │   └── supabase.ts                  # Cliente Supabase + validación de env
        ├── stores/
        │   ├── hambMenuStore.ts
        │   └── themeStore.ts
        └── utils/
            └── cn.ts                        # clsx + tailwind-merge
```

---

## 7. Dependencias

### 7.1 Dependencias de producción (`package.json`)

| Dependencia | Versión | Rol |
|-------------|---------|-----|
| `react` | `^19.2.4` | Biblioteca de UI. |
| `react-dom` | `^19.2.4` | Renderizado en el DOM. |
| `@supabase/supabase-js` | `^2.105.4` | Auth, base de datos y Storage. |
| `@tanstack/react-router` | `^1.168.23` | Enrutamiento file-based con tipado. |
| `@tanstack/react-query` | `^5.99.2` | Estado del servidor, caché y mutaciones. |
| `@tanstack/react-query-devtools` | `^5.99.2` | Devtools de Query (incluido como dependencia). |
| `@tanstack/react-router-devtools` | `^1.166.13` | Devtools del router. |
| `zustand` | `^5.0.12` | Estado global ligero (auth, tema, menú). |
| `react-hook-form` | `^7.72.1` | Manejo de formularios. |
| `@hookform/resolvers` | `^5.2.2` | Integración RHF + Zod. |
| `zod` | `^4.3.6` | Validación de esquemas. |
| `chart.js` | `^4.5.1` | Motor de gráficos. |
| `react-chartjs-2` | `^5.3.1` | Wrappers React para Chart.js. |
| `lucide-react` | `^1.3.0` | Iconografía. |
| `sileo` | `^0.1.5` | Notificaciones tipo toast. |
| `clsx` | `^2.1.1` | Composición condicional de clases. |
| `tailwind-merge` | `^3.5.0` | Fusión de clases Tailwind sin conflictos. |
| `tailwindcss` | `^4.2.2` | Framework de estilos (v4). |
| `@tailwindcss/vite` | `^4.2.2` | Plugin oficial de Tailwind para Vite. |

### 7.2 Dependencias de desarrollo

| Dependencia | Versión | Rol |
|-------------|---------|-----|
| `vite` | `^8.0.4` | Bundler y servidor de desarrollo. |
| `typescript` | `~6.0.2` | Tipado estático. |
| `@vitejs/plugin-react` | `^6.0.1` | Soporte React (Fast Refresh/transform). |
| `@rolldown/plugin-babel` | `^0.2.2` | Integración de Babel con Vite. |
| `babel-plugin-react-compiler` | `^1.0.0` | React Compiler (optimización automática). |
| `@babel/core` | `^7.29.0` | Núcleo de Babel. |
| `@types/babel__core` | `^7.20.5` | Tipos de Babel. |
| `@tanstack/router-plugin` | `^1.167.22` | Generación del árbol de rutas y code splitting. |
| `@tanstack/eslint-plugin-query` | `^5.99.2` | Reglas ESLint para Query. |
| `eslint` | `^9.39.4` | Linter. |
| `@eslint/js` | `^9.39.4` | Configuraciones recomendadas base. |
| `typescript-eslint` | `^8.58.0` | Soporte TypeScript para ESLint. |
| `eslint-plugin-react-hooks` | `^7.0.1` | Reglas de hooks. |
| `eslint-plugin-react-refresh` | `^0.5.2` | Reglas de React Refresh. |
| `globals` | `^17.4.0` | Globales de entorno (navegador). |
| `prettier` | `^3.8.3` | Formateo (sin archivo de configuración visible). |
| `@types/react` | `^19.2.14` | Tipos de React. |
| `@types/react-dom` | `^19.2.3` | Tipos de React DOM. |
| `@types/node` | `^24.12.2` | Tipos de Node para tooling. |

### 7.3 Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `vite` | Servidor de desarrollo (por defecto `http://localhost:5173`). |
| `build` | `tsc -b && vite build` | Typecheck por proyectos + build de producción. |
| `lint` | `eslint .` | Linter sobre todo el proyecto. |
| `preview` | `vite preview` | Previsualización del build. |

> No hay script de pruebas ni framework de testing configurado.

---

## 8. Configuración del proyecto

### 8.1 `vite.config.ts`

Plugins en orden: `tanstackRouter({ target: 'react', autoCodeSplitting: true })`, `react()`, `tailwindcss()` y `babel({ presets: [reactCompilerPreset()] })`. Esto habilita **React Compiler** y la generación automática de rutas.

### 8.2 TypeScript

- `tsconfig.json`: `strict: true`, referencias a `tsconfig.app.json` y `tsconfig.node.json`.
- `tsconfig.app.json`: `target: ES2023`, `lib: [ES2023, DOM, DOM.Iterable]`, `module: esnext`, `moduleResolution: bundler`, `verbatimModuleSyntax`, `noEmit`, `jsx: react-jsx`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`. Incluye `src`.

### 8.3 ESLint (`eslint.config.js`)

- Flat config que ignora `dist`.
- Aplica a `**/*.{ts,tsx}`: `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`.
- `ecmaVersion: 2020`, `globals: browser`.

### 8.4 `index.html`

- `lang="en"` (aunque el contenido es español).
- Conjunto completo de favicons/tiles desde `public/favicons/`.
- `<title>Monos Track App</title>` y `<div id="root">`.

### 8.5 `src/index.css`

- Importa fuentes **Geist**, **Geist Mono** y **Plus Jakarta Sans** desde Google Fonts.
- Importa Tailwind v4 (`@import "tailwindcss"`).
- Define variante dark personalizada: `@custom-variant dark (&:where(.dark, .dark *))`.
- Tokens de tema (`@theme`): `primary #08f`, `secondary-light #0f172a`, `tertiary-light #df6402`, `neutral-light #b4becc`, `primary-dark #0A0E15`, `secondary-dark #38bdf8`, `tertiary-dark #102036`, `neutral-dark #f5f5f5`, `gray-text #404754`, más familias tipográficas.
- Estilos base para `body` y `#root`, utilidades `.sr-only` y `.no-scroll`.

### 8.6 Variables de entorno

Archivo `.env.local` (no versionado) con:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

`shared/lib/supabase.ts` valida su existencia y lanza `"Faltan las variables de entorno de Supabase"` si faltan. El proyecto también depende del bucket **`receipts`** en Supabase Storage.

### 8.7 Configuración de TanStack y build

- `.tanstack/tmp/` contiene artefactos temporales del plugin.
- `routeTree.gen.ts` se regenera automáticamente y está excluido de lint/typecheck efectivo.

---

## 9. Detalle de los módulos de funcionalidad

### 9.1 Autenticación

- **`loginSchema`:** email válido; contraseña de 8–100 caracteres.
- **`registerSchema`:** nombre y apellido (1–50), email, contraseña de ≥8 con al menos una mayúscula, un número y un carácter especial, confirmación que debe coincidir (`superRefine`) y aceptación obligatoria de términos (`literal(true)`).
- **`useLoginForm`:** `useMutation` con `signInWithPassword`; en éxito navega a `/dashboard`; en error muestra toast.
- **`useRegisterForm`:** `signUp` con `options.data.first_name/last_name`; en éxito `alert` y navega a `/login`; en error `alert`.
- **`PasswordStrength`:** evalúa 4 requisitos y muestra 4 niveles (Muy Débil, Débil, Moderada, Fuerte) con barra visual.
- **`authStore`:** mantiene el usuario y el estado de carga; `logout` cierra sesión y limpia el estado.

### 9.2 Dashboard

- **Consulta:** selecciona `movement_type`, `amount`, `movement_date`, `created_at`, `category` de `movements`.
- **Filtros (`useDashboardFilters`):** `useForm` + `useWatch`; niveles `noYearSelected` / `noMonthSelected`; años disponibles se derivan de los datos más el año actual; meses se limitan al mes actual si el año seleccionado es el actual.
- **Tarjetas (`useFinancialCardsData`):** Ingresos, Gastos y Balance; compara con el mes/año anterior; invierte la semántica de tendencia en gastos (subir = negativo); muestra tiempo relativo de la última actualización.
- **Barras (`useIncomesVsExpenses` + `fiterDataForChartBars`):** modos `available` (año actual hasta el mes actual), `all` (años pasados, 12 meses) y `lastSix` (últimos 6 meses al seleccionar mes).
- **Dona (`useExpensesByCategory`):** agrega gastos por categoría para el año o el mes seleccionado, usando colores/bordes de las constantes.
- **Top 5 (`useHigherExpenses`):** agrega gastos por categoría y compara con el período previo; muestra emoji, monto actual, monto anterior y variación porcentual.
- **Tiempo relativo (`getTimeAgo` + `useTimeAgo`):** "hace un momento", "hace X min/horas/días/meses"; refresco cada 30 s.
- **Componentes:** `FinancialCard`, `BarsChart` (Chart.js, colores adaptados al tema), `DoughnutChart` (leyenda con montos y porcentajes), `HigherExpenses`, `DashboardHeader`, `DashboardFilters`.

### 9.3 Movimientos

- **Query del historial:** `select('*')` ordenado por `movement_date` descendente.
- **Formulario de alta:** RHF + Zod con `zodResolver`; cambio de tipo (Ingreso/Gasto) actualiza `movementType` y reinicia `category`; preview de imagen con `URL.createObjectURL` y limpieza del objeto URL; validación de archivo (≤5 MB; JPEG/PNG/WebP); reseteo tras éxito.
- **Historial:** vista de tarjetas en móvil y tabla en desktop; "Cargar más" de 10 en 10; acciones ver/editar/eliminar; etiquetas de categoría y método desde las constantes.
- **Detalle:** bloquea el scroll del body; muestra tipo, categoría, monto, fecha, método, descripción, recibo firmado (o mensaje si no hay) y fecha de registro.
- **Edición:** precarga valores; detecta cambios con `isDirty` o nuevo archivo; advierte si no hay cambios; permite reemplazar el comprobante; bloquea scroll.
- **Eliminación:** confirmación con resumen del movimiento; advierte que es irreversible y que borra el comprobante; mutación con `receiptPath`.
- **Sincronización:** todas las mutaciones invalidan `['financial-data']`.

### 9.4 Perfil / Settings

- `SettingsPage` muestra una cabecera y `ProfileSection`.
- `ProfileSection` lee `user_metadata.first_name/last_name` y `email`, y presenta un formulario con RHF.
- `settings.api.ts` expone `updateUserProfile`, que llama a `supabase.auth.updateUser` con los datos del perfil.
- **Estado actual:** el formulario no tiene un `onSubmit` conectado a `updateUserProfile`; es una superficie de UI parcialmente implementada.

### 9.5 Landing y navegación

- `HomePage`: hero con mensaje de producto, grid de características (análisis en tiempo real, seguridad, flujo inteligente, multiplataforma) y CTA de registro.
- `Header`: logo, botón de tema, icono de usuario, logout y menú hamburguesa; mide altura/anchura/posición del header para posicionar el menú móvil.
- `Navbar`: enlaces autenticados a Panel, Registrar Movimientos y Perfil; en modo público muestra Login/Registro; en móvil se desliza y usa un overlay (`BackScreen`).
- `Footer`: marca y copyright 2026.

---

## 10. Seguridad, validación y calidad

- **Autenticación:** Supabase Auth con persistencia de sesión.
- **Autorización:** guardas de ruta en cliente (`beforeLoad`) y verificación de usuario con `getUser()` antes de escrituras en `movements.api.ts`.
- **Aislamiento de datos:** se espera que las políticas **Row Level Security (RLS)** de Supabase restrinjan `movements` por `user_id`; dichas políticas **no están incluidas en el repositorio**.
- **Storage:** URLs firmadas de 60 s para comprobantes privados.
- **Validación de entrada:** Zod en login, registro y movimientos; restricciones de tipo y tamaño de archivo.
- **Manejo de archivos huérfanos:** limpieza en fallos parciales de inserción/actualización.
- **Accesibilidad:** uso de `aria-invalid`, `aria-describedby`, `role="alert"`, `sr-only` y etiquetas asociadas; no obstante, los modales no implementan `role="dialog"` ni trampa de foco.

---

## 11. Estado actual, observaciones y deuda técnica

El proyecto es un **MVP centrado en el frontend** con todas las operaciones persistidas en Supabase. Observaciones detectadas en el código:

- **Sin pruebas automatizadas** ni script de test.
- **Guardas de ruta solo en cliente:** son UX, no un mecanismo de seguridad; la seguridad real depende de RLS.
- **`search.redirect`** se envía desde las guardas, pero `LoginPage`/`useLoginForm` no lo consumen (siempre navega a `/dashboard`).
- **`alert()`** en `useRegisterForm` en lugar de toast.
- **`ProfileSection`** no conecta el submit con `updateUserProfile`; además `updateUserProfile` escribe `email` en `user_metadata` (no cambia el email de autenticación).
- **Clave de caché compartida `['financial-data']`** con selecciones de columnas distintas entre dashboard y movimientos; puede provocar datos incompletos al compartir caché.
- **`getGraphicsText.ts`** importa `EXPENSE_CATEGORIES` desde `movementsSchema`, que no lo reexporta; además no está referenciado (código no usado/broken si se usara).
- **`ExpensePercentageInfo.tsx`** y `mockup-data.ts` no están referenciados en producción.
- **`fiterDataForChartBars.ts`** tiene un typo en el nombre.
- **`useHigherExpenses`** compara `'NoYearSelected'` con mayúscula inicial en una comprobación, mientras el resto usa `'noYearSelected'`.
- **`Header`** contiene un `TODO` para reemplazar el icono de usuario por la imagen de perfil.
- **Errores de copy** en textos ("comprete", "térmimos", "finaciera", "analístas") y `lang="en"` con contenido en español.
- **Prettier** está instalado pero no hay archivo de configuración visible.
- **Devtools de Query/Router** figuran como dependencias de producción.
- **`routeTree.gen.ts`** es generado; cualquier cambio manual se pierde.

---

## 12. Conclusión

Monos Track es una SPA de finanzas personales bien estructurada bajo un enfoque **feature-sliced**, con una separación clara entre presentación, lógica de estado, acceso a datos y validación. Su stack moderno (React 19, Vite, TanStack Router/Query, Zustand, Tailwind v4, Zod y Supabase) permite un desarrollo rápido y tipado, con autenticación, persistencia en la nube, almacenamiento privado de comprobantes y visualizaciones financieras interactivas. El proyecto se encuentra en una fase de MVP funcional: las áreas de autenticación, dashboard y movimientos están completas, mientras que la configuración de perfil, las pruebas automatizadas y algunas políticas de seguridad del backend quedan como trabajo pendiente. Es un proyecto privado y no debe distribuirse sin autorización.

---

# Monos Track — Project Details and Specifications (English)

## 1. Executive summary

**Monos Track** is a single-page web application (SPA) for **personal finance management**. It allows an authenticated user to record **income** and **expense** movements and visualize their financial behavior through an interactive dashboard (summary cards, bar chart, doughnut chart, and ranking of the largest expenses). It is built with **React 19 + TypeScript + Vite** and uses **Supabase** as the authentication provider, relational database, and file storage. The entire application renders on the client and communicates with Supabase through its JavaScript SDK; **there is no server layer of its own**. The interface is in Spanish and is organized around a two-axis financial model (income vs. expense).

The project is private and not distributable without authorization (according to `README.md`).

---

## 2. Problem statement and purpose

Manual finance control in spreadsheets is error-prone and offers little visibility into spending patterns. Monos Track solves this with a focused, low-friction flow:

1. Record each movement with a small set of structured fields.
2. Immediately see totals, trends, and distribution by category for a selected year/month.

The product goal is to turn financial tracking into a simple, accurate, and visual task, with cloud persistence and per-user isolation.

---

## 3. Functional scope by module and routes

The application is organized into four authenticated surfaces and three public ones:

| Route | Type | Component | Description |
|------|------|-----------|-------------|
| `/` | Public (redirects to `/dashboard` if there is a session) | `HomePage` | Landing page with value proposition, features, and registration CTA. |
| `/login` | Public (redirects to `/dashboard` if there is a session) | `LoginPage` | Login with email and password. |
| `/register` | Public (redirects to `/dashboard` if there is a session) | `RegisterPage` | Registration with first name, last name, email, password, confirmation, and acceptance of terms. |
| `/dashboard` | Protected | `DashboardPage` | Financial panel with cards, filters, and charts. |
| `/dashboard/movements` | Protected | `MovementsRegisterPage` | Movement registration, history, and detail/edit/delete modals. |
| `/dashboard/settings` | Protected | `SettingsPage` | Profile configuration (personal information section). |

**Key features:**

- **Authentication (Supabase):** registration, login, logout, and session persistence/observation.
- **Route protection** via TanStack Router's `beforeLoad`.
- **Dashboard:** Income, Expenses, and Balance cards, with percentage variation vs. the previous period; year and month filters derived from the data; Income vs. Expenses bar chart; expenses-by-category doughnut chart; Top 5 largest expenses panel with comparison vs. the previous period.
- **Movements:** form with type, category, amount, date, payment method, description, and optional receipt; paginated history; detail with signed receipt; editing (including receipt replacement); deletion with confirmation.
- **Profile:** display of user data and editing form (partially connected).
- **Persistent light/dark theme**, responsive design, and toast-type notifications.
- **Form validation** with React Hook Form + Zod.

---

## 4. Architecture

### 4.1 General pattern

The application follows a **client-server SPA (BaaS)** architecture with a **feature-sliced** organization (by feature). Each feature encapsulates its own `pages`, `components`, `hooks`, `schemas`, `store`, `api`, `types`, `utils`, and `mocks`, while `src/shared` concentrates the reusable code and `src/routes` the route tree.

**Logical layers:**

- **Presentation:** `pages` (screen composition) and `components` (reusable/presentational UI).
- **State and effects logic:** `hooks` (local state, `useMutation`/`useQuery`, layout measurements, timers).
- **Data access:** `api/*.api.ts` with calls to Supabase (auth, tables, storage).
- **Validation:** `schemas` with Zod (login, registration, movements).
- **Global state:** `stores` with Zustand (session, theme, hamburger menu).
- **Pure utilities:** `utils` (formatting, filtering, and data aggregation).
- **Types:** `types/*.d.ts` (financial data, profile).

### 4.2 Startup and rendering flow

1. `index.html` mounts `<div id="root">` and loads `/src/main.tsx`.
2. `main.tsx` creates a `QueryClient` (TanStack Query) with a `staleTime` of 5 minutes, `retry: 1`, and `refetchOnWindowFocus: false`, and wraps the app in `QueryClientProvider`.
3. `App.tsx` creates the router with the generated `routeTree` and renders `RouterProvider`.
4. `__root.tsx` mounts `RootComponent`, which:
   - Applies/removes the `dark` class on `documentElement` according to the theme.
   - Synchronizes the session with `supabase.auth.getSession()` and subscribes to `onAuthStateChange` to update the `authStore`.
   - Shows a `FullScreenLoader` while the session is being resolved.
   - Renders the `sileo` `Toaster` (position `top-center`) and the `Outlet`.

### 4.3 Routing and protection

- **File-based** routing with **TanStack Router**; the `@tanstack/router-plugin/vite` plugin generates `routeTree.gen.ts` with `autoCodeSplitting: true`.
- The `_app` layout (`AppLayout`) wraps the routes with `Header`, `Outlet`, and `Footer`.
- Guards run in `beforeLoad`: they read `useAuthStore.getState()`, and if `isLoading` is `true` they query `supabase.auth.getSession()`. Private routes redirect to `/login` with a `search.redirect`; public routes redirect to `/dashboard` if there is already a user.
- `routeTree.gen.ts` is **auto-generated** and is marked with `eslint-disable` and `@ts-nocheck`; it must not be edited.

### 4.4 State management

- **Server state:** TanStack Query. The shared key `['financial-data']` is used both in the dashboard and in the movements list. Mutations (create/edit/delete) invalidate that key to refresh the UI.
- **Global client state (Zustand):**
  - `authStore`: `user`, `isLoading`, `setSession`, `setLoading`, `logout` (dynamically imports the Supabase client and runs `signOut`).
  - `themeStore`: `isDark` (initialized from `prefers-color-scheme`), `toggleTheme`, persisted in `localStorage` with `persist` under the `theme` key.
  - `hambMenuStore`: `isHambMenuOpen`, `toggleHambMenu`, `closeHambMenu` (not persisted).
- **Local state:** movement modals (`useReadMovement`, `useEditMovement`, `useDeleteMovementModal`), password visibility (`useShowPassword`), file preview, and layout measurements (`useElementHeight`).

### 4.5 Data flow and mutations

- **Reading:** direct queries to the `movements` table with `supabase.from('movements').select(...)`, sorted by `movement_date` descending in the history.
- **Writing:** `movements.api.ts` validates the session with `supabase.auth.getUser()` before each operation.
  - `submitMovementToSupabase`: uploads the receipt (if any) to the `receipts` bucket with a unique name, inserts the row, and, if the insert fails, deletes the orphaned file.
  - `updateMovementInSupabase`: validates the session, uploads the new receipt (if any), deletes the previous one, updates the row by `id`, and cleans up the new file if the update fails.
  - `deleteMovementFromSupabase`: validates the session, deletes the receipt (if any), and deletes the row by `id`.
- **Receipts:** `useSignedReceiptUrl` generates a private signed URL with a 60-second expiration when the detail modal is opened.

### 4.6 Notifications and error handling

- **Toasts:** `sileo` for success/error/warning (login, partial registration, create/edit/delete movements, "no changes").
- **Mutation errors:** captured with `onError` and shown as a toast; some `console.log` calls remain as debugging.
- **Environment validation:** `shared/lib/supabase.ts` throws an error if `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY` are missing.

---

## 5. Data model and backend (Supabase)

### 5.1 `movements` table

Fields used by the application:

| Field | Expected type | Usage |
|-------|---------------|-------|
| `id` | UUID/identifier | Key for editing/deleting. |
| `user_id` | UUID | Owner of the movement. |
| `movement_type` | `'income' \| 'expense'` | Movement type. |
| `amount` | numeric | Amount in dollars. |
| `category` | string | Category (fixed vocabulary). |
| `movement_date` | ISO date (`YYYY-MM-DD`) | Date of the movement. |
| `payment_method` | string | Payment method. |
| `description` | string (optional) | Free description. |
| `receipt_path` | string (optional) | Path of the receipt in Storage. |
| `created_at` | timestamp | Creation date; used for "last update". |

### 5.2 Storage

- Bucket named **`receipts`**.
- Files named `${Date.now()}-${random}.${ext}`.
- Access via short-lived **signed URLs** (60 s).

### 5.3 Authentication and metadata

- Supabase Auth with email/password.
- Registration stores `first_name` and `last_name` in `user_metadata`.
- `updateUserProfile` (settings) updates `first_name`, `last_name`, and `email` inside `user_metadata`.

### 5.4 Domain vocabulary (`shared/constants/constants.ts`)

- **`MONTH_NAMES`:** 12 months in Spanish (`Enero`…`Diciembre`).
- **`EXPENSE_CATEGORIES` (11):** `food`, `housing`, `transport`, `utilities`, `health`, `entertainment`, `shopping`, `education`, `debt`, `pets`, `other_expense`; each with `label`, `color`, `border`, and `emoji`.
- **`INCOME_CATEGORIES` (8):** `salary`, `freelance`, `sales`, `investments`, `gifts`, `refunds`, `carry_over`, `other_income`; each with `label`.
- **`MONEY_METHOD_CATEGORIES` (4):** `cash`, `transfer`, `deposit`, `credit_card`; each with `label`.

---

## 6. Detailed file structure

```text
monos-track/
├── .env.local                     # Local environment variables (do not version)
├── .gitignore
├── eslint.config.js               # ESLint 9 configuration (flat config)
├── file-structure.md              # Documentation of the file tree
├── index.html                     # HTML entry point + favicons
├── package.json                   # Dependencies and scripts
├── pnpm-lock.yaml                 # pnpm lockfile
├── project-distribution.svg       # Project distribution diagram
├── README.md                      # Documentation (English/Spanish)
├── tsconfig.json                  # Root configuration (references + strict)
├── tsconfig.app.json              # App TS config (ES2023, bundler, noEmit)
├── tsconfig.node.json             # TS config for Node tooling
├── vite.config.ts                 # Plugins: TanStack Router, React, Tailwind, Babel/React Compiler
├── .tanstack/tmp/                 # Temporary files from the TanStack plugin
├── public/
│   └── favicons/                  # Favicons and tiles (Apple, MS, PNG, ICO)
├── node_modules/
└── src/
    ├── main.tsx                   # Bootstrap: QueryClient + App
    ├── index.css                  # Tailwind v4, theme tokens, fonts, utilities
    ├── routeTree.gen.ts           # Auto-generated route tree
    ├── app/
    │   ├── App.tsx                # Router + RouterProvider
    │   └── RootComponent.tsx      # Theme, session, Toaster, Outlet, global loader
    ├── assets/
    │   └── images/
    │       ├── monos-track-logo-circle.png
    │       └── monos-track-logo.png
    ├── features/
    │   ├── auth/
    │   │   ├── components/
    │   │   │   ├── LoginButton.tsx          # Link to /login
    │   │   │   ├── LoginForm.tsx            # Login form (RHF + Zod)
    │   │   │   ├── PasswordStrength.tsx     # Password strength indicator
    │   │   │   ├── RegisterButton.tsx       # Link to /register
    │   │   │   └── RegisterForm.tsx         # Registration form (RHF + Zod)
    │   │   ├── hooks/
    │   │   │   ├── useLoginForm.ts          # useMutation signInWithPassword
    │   │   │   ├── useRegisterForm.ts       # useMutation signUp + metadata
    │   │   │   └── useShowPassword.ts       # Visibility toggle
    │   │   ├── pages/
    │   │   │   ├── LoginPage.tsx
    │   │   │   └── RegisterPage.tsx
    │   │   ├── schemas/
    │   │   │   ├── loginSchema.ts           # email + password (≥8)
    │   │   │   └── registerSchema.ts        # first name, last name, email, password, confirmation, terms
    │   │   └── store/
    │   │       └── authStore.ts             # Zustand: user, isLoading, logout
    │   ├── dashboard/
    │   │   ├── components/
    │   │   │   ├── BarsChart.tsx            # Chart.js Bar (Income vs Expenses)
    │   │   │   ├── DashboardFilters.tsx     # Year/month selects
    │   │   │   ├── DashboardHeader.tsx      # Greeting + current date
    │   │   │   ├── DoughnutChart.tsx        # Chart.js Doughnut + legend
    │   │   │   ├── ExpensePercentageInfo.tsx# Category/percentage indicator (not referenced)
    │   │   │   ├── FinancialCard.tsx        # Income/Expenses/Balance card
    │   │   │   └── HigherExpenses.tsx       # Top 5 expenses
    │   │   ├── hooks/
    │   │   │   ├── useDashboardFilters.tsx  # RHF + useWatch for filters
    │   │   │   ├── useExpensesByCategory.ts # Aggregate for doughnut
    │   │   │   ├── useFinancialCardsData.ts # Card and trend calculations
    │   │   │   ├── useHigherExpenses.ts     # Top 5 and previous comparison
    │   │   │   ├── useIncomesVsExpenses.ts  # Data for bar chart
    │   │   │   └── useTimeAgo.ts            # Tick every 30 s
    │   │   ├── mocks/
    │   │   │   └── mockup-data.ts           # Test dataset (2025–2026)
    │   │   ├── pages/
    │   │   │   └── DashboardPage.tsx        # Dashboard composition and query
    │   │   ├── types/
    │   │   │   └── dashboardTypes.d.ts      # FinancialDataTypes
    │   │   └── utils/
    │   │       ├── filterDataFunctions.ts   # Year/month filters and totals
    │   │       ├── fiterDataForChartBars.ts # Chart data (name has a typo)
    │   │       ├── getGraphicsText.ts       # CSS gradient for charts (not used)
    │   │       └── getTimeAgo.ts            # Relative format in Spanish
    │   ├── home/
    │   │   └── pages/
    │   │       └── HomePage.tsx             # Landing page
    │   ├── movements/
    │   │   ├── api/
    │   │   │   └── movements.api.ts         # CRUD + Storage in Supabase
    │   │   ├── components/
    │   │   │   ├── MovementDeleteModal.tsx  # Deletion confirmation
    │   │   │   ├── MovementDetailsModal.tsx # Detail + signed receipt
    │   │   │   ├── MovementEditModal.tsx    # Editing with new receipt
    │   │   │   ├── MovementsList.tsx        # Mobile cards / desktop table
    │   │   │   └── MovementsRegisterForm.tsx# Creation form
    │   │   ├── hooks/
    │   │   │   ├── useCreateMovement.ts
    │   │   │   ├── useDeleteMovement.ts
    │   │   │   ├── useDeleteMovementModal.ts
    │   │   │   ├── useEditMovement.ts
    │   │   │   ├── useReadMovement.ts
    │   │   │   ├── useSignedReceiptUrl.ts   # Signed URL (60 s)
    │   │   │   └── useUpdateMovement.ts
    │   │   ├── pages/
    │   │   │   └── MovementsRegisterPage.tsx# Query + form + list + modals
    │   │   └── schemas/
    │   │       └── movementsSchema.ts       # Zod + superRefine category/type
    │   └── settings/
    │       ├── api/
    │       │   └── settings.api.ts          # updateUserProfile (auth.updateUser)
    │       ├── components/
    │       │   └── ProfileSection.tsx       # Profile form (partial)
    │       ├── pages/
    │       │   └── SettingsPage.tsx         # Header + ProfileSection
    │       └── types/
    │           └── settingsTypes.d.ts       # ProfileFormData
    ├── routes/
    │   ├── __root.tsx                       # createRootRoute -> RootComponent
    │   ├── _app.tsx                         # Layout (AppLayout)
    │   ├── login.tsx                        # /login + public guard
    │   ├── register.tsx                     # /register + public guard
    │   └── _app/
    │       ├── index.tsx                    # / (HomePage)
    │       └── dashboard/
    │           ├── index.tsx                # /dashboard + private guard
    │           ├── movements.tsx            # /dashboard/movements + guard
    │           └── settings.tsx             # /dashboard/settings + guard
    └── shared/
        ├── components/
        │   ├── DarkThemeButton.tsx          # Animated light/dark toggle
        │   ├── Footer.tsx
        │   ├── FullScreenLoader.tsx
        │   ├── Loader.tsx
        │   ├── UserName.tsx                 # Greeting with user_metadata
        │   └── header/
        │       ├── BackScreen.tsx           # Mobile menu overlay
        │       ├── BrandLogo.tsx            # Logo -> /
        │       ├── HamburguerMenuButton.tsx # Menu toggle + no-scroll
        │       ├── Header.tsx               # Header + logout + theme
        │       └── Navbar.tsx               # Responsive navigation
        ├── constants/
        │   └── constants.ts                 # Months, categories, and methods
        ├── hooks/
        │   └── useElementWidthHeight.ts     # Layout measurements (height/width/left)
        ├── layouts/
        │   └── AppLayout.tsx                # Header + Outlet + Footer
        ├── lib/
        │   └── supabase.ts                  # Supabase client + env validation
        ├── stores/
        │   ├── hambMenuStore.ts
        │   └── themeStore.ts
        └── utils/
            └── cn.ts                        # clsx + tailwind-merge
```

---

## 7. Dependencies

### 7.1 Production dependencies (`package.json`)

| Dependency | Version | Role |
|-------------|---------|-----|
| `react` | `^19.2.4` | UI library. |
| `react-dom` | `^19.2.4` | DOM rendering. |
| `@supabase/supabase-js` | `^2.105.4` | Auth, database, and Storage. |
| `@tanstack/react-router` | `^1.168.23` | File-based routing with typing. |
| `@tanstack/react-query` | `^5.99.2` | Server state, cache, and mutations. |
| `@tanstack/react-query-devtools` | `^5.99.2` | Query Devtools (included as a dependency). |
| `@tanstack/react-router-devtools` | `^1.166.13` | Router Devtools. |
| `zustand` | `^5.0.12` | Lightweight global state (auth, theme, menu). |
| `react-hook-form` | `^7.72.1` | Form handling. |
| `@hookform/resolvers` | `^5.2.2` | RHF + Zod integration. |
| `zod` | `^4.3.6` | Schema validation. |
| `chart.js` | `^4.5.1` | Charting engine. |
| `react-chartjs-2` | `^5.3.1` | React wrappers for Chart.js. |
| `lucide-react` | `^1.3.0` | Iconography. |
| `sileo` | `^0.1.5` | Toast-type notifications. |
| `clsx` | `^2.1.1` | Conditional class composition. |
| `tailwind-merge` | `^3.5.0` | Conflict-free Tailwind class merging. |
| `tailwindcss` | `^4.2.2` | Styling framework (v4). |
| `@tailwindcss/vite` | `^4.2.2` | Official Tailwind plugin for Vite. |

### 7.2 Development dependencies

| Dependency | Version | Role |
|-------------|---------|-----|
| `vite` | `^8.0.4` | Bundler and development server. |
| `typescript` | `~6.0.2` | Static typing. |
| `@vitejs/plugin-react` | `^6.0.1` | React support (Fast Refresh/transform). |
| `@rolldown/plugin-babel` | `^0.2.2` | Babel integration with Vite. |
| `babel-plugin-react-compiler` | `^1.0.0` | React Compiler (automatic optimization). |
| `@babel/core` | `^7.29.0` | Babel core. |
| `@types/babel__core` | `^7.20.5` | Babel types. |
| `@tanstack/router-plugin` | `^1.167.22` | Route tree generation and code splitting. |
| `@tanstack/eslint-plugin-query` | `^5.99.2` | ESLint rules for Query. |
| `eslint` | `^9.39.4` | Linter. |
| `@eslint/js` | `^9.39.4` | Base recommended configurations. |
| `typescript-eslint` | `^8.58.0` | TypeScript support for ESLint. |
| `eslint-plugin-react-hooks` | `^7.0.1` | Hooks rules. |
| `eslint-plugin-react-refresh` | `^0.5.2` | React Refresh rules. |
| `globals` | `^17.4.0` | Environment globals (browser). |
| `prettier` | `^3.8.3` | Formatting (no visible configuration file). |
| `@types/react` | `^19.2.14` | React types. |
| `@types/react-dom` | `^19.2.3` | React DOM types. |
| `@types/node` | `^24.12.2` | Node types for tooling. |

### 7.3 Available scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Development server (default `http://localhost:5173`). |
| `build` | `tsc -b && vite build` | Per-project typecheck + production build. |
| `lint` | `eslint .` | Linter over the whole project. |
| `preview` | `vite preview` | Preview of the build. |

> There is no test script or testing framework configured.

---

## 8. Project configuration

### 8.1 `vite.config.ts`

Plugins in order: `tanstackRouter({ target: 'react', autoCodeSplitting: true })`, `react()`, `tailwindcss()`, and `babel({ presets: [reactCompilerPreset()] })`. This enables **React Compiler** and automatic route generation.

### 8.2 TypeScript

- `tsconfig.json`: `strict: true`, references to `tsconfig.app.json` and `tsconfig.node.json`.
- `tsconfig.app.json`: `target: ES2023`, `lib: [ES2023, DOM, DOM.Iterable]`, `module: esnext`, `moduleResolution: bundler`, `verbatimModuleSyntax`, `noEmit`, `jsx: react-jsx`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`. Includes `src`.

### 8.3 ESLint (`eslint.config.js`)

- Flat config that ignores `dist`.
- Applies to `**/*.{ts,tsx}`: `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`.
- `ecmaVersion: 2020`, `globals: browser`.

### 8.4 `index.html`

- `lang="en"` (although the content is in Spanish).
- Complete set of favicons/tiles from `public/favicons/`.
- `<title>Monos Track App</title>` and `<div id="root">`.

### 8.5 `src/index.css`

- Imports the **Geist**, **Geist Mono**, and **Plus Jakarta Sans** fonts from Google Fonts.
- Imports Tailwind v4 (`@import "tailwindcss"`).
- Defines a custom dark variant: `@custom-variant dark (&:where(.dark, .dark *))`.
- Theme tokens (`@theme`): `primary #08f`, `secondary-light #0f172a`, `tertiary-light #df6402`, `neutral-light #b4becc`, `primary-dark #0A0E15`, `secondary-dark #38bdf8`, `tertiary-dark #102036`, `neutral-dark #f5f5f5`, `gray-text #404754`, plus typography families.
- Base styles for `body` and `#root`, utilities `.sr-only` and `.no-scroll`.

### 8.6 Environment variables

`.env.local` file (not versioned) with:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

`shared/lib/supabase.ts` validates their existence and throws `"Faltan las variables de entorno de Supabase"` if they are missing. The project also depends on the **`receipts`** bucket in Supabase Storage.

### 8.7 TanStack and build configuration

- `.tanstack/tmp/` contains temporary artifacts from the plugin.
- `routeTree.gen.ts` is regenerated automatically and is excluded from effective lint/typecheck.

---

## 9. Feature module details

### 9.1 Authentication

- **`loginSchema`:** valid email; password of 8–100 characters.
- **`registerSchema`:** first name and last name (1–50), email, password of ≥8 with at least one uppercase letter, one number, and one special character, confirmation that must match (`superRefine`), and mandatory acceptance of terms (`literal(true)`).
- **`useLoginForm`:** `useMutation` with `signInWithPassword`; on success navigates to `/dashboard`; on error shows a toast.
- **`useRegisterForm`:** `signUp` with `options.data.first_name/last_name`; on success `alert` and navigates to `/login`; on error `alert`.
- **`PasswordStrength`:** evaluates 4 requirements and shows 4 levels (Very Weak, Weak, Moderate, Strong) with a visual bar.
- **`authStore`:** holds the user and the loading state; `logout` signs out and clears the state.

### 9.2 Dashboard

- **Query:** selects `movement_type`, `amount`, `movement_date`, `created_at`, `category` from `movements`.
- **Filters (`useDashboardFilters`):** `useForm` + `useWatch`; levels `noYearSelected` / `noMonthSelected`; available years are derived from the data plus the current year; months are limited to the current month if the selected year is the current year.
- **Cards (`useFinancialCardsData`):** Income, Expenses, and Balance; compares with the previous month/year; inverts the trend semantics for expenses (rising = negative); shows the relative time of the last update.
- **Bars (`useIncomesVsExpenses` + `fiterDataForChartBars`):** modes `available` (current year up to the current month), `all` (past years, 12 months), and `lastSix` (last 6 months when a month is selected).
- **Doughnut (`useExpensesByCategory`):** aggregates expenses by category for the selected year or month, using colors/borders from the constants.
- **Top 5 (`useHigherExpenses`):** aggregates expenses by category and compares with the previous period; shows emoji, current amount, previous amount, and percentage variation.
- **Relative time (`getTimeAgo` + `useTimeAgo`):** "hace un momento", "hace X min/horas/días/meses"; refresh every 30 s.
- **Components:** `FinancialCard`, `BarsChart` (Chart.js, theme-adapted colors), `DoughnutChart` (legend with amounts and percentages), `HigherExpenses`, `DashboardHeader`, `DashboardFilters`.

### 9.3 Movements

- **History query:** `select('*')` sorted by `movement_date` descending.
- **Creation form:** RHF + Zod with `zodResolver`; changing type (Income/Expense) updates `movementType` and resets `category`; image preview with `URL.createObjectURL` and cleanup of the object URL; file validation (≤5 MB; JPEG/PNG/WebP); reset after success.
- **History:** card view on mobile and table on desktop; "Load more" 10 at a time; view/edit/delete actions; category and method labels from the constants.
- **Detail:** locks body scroll; shows type, category, amount, date, method, description, signed receipt (or a message if there is none), and registration date.
- **Editing:** preloads values; detects changes with `isDirty` or a new file; warns if there are no changes; allows replacing the receipt; locks scroll.
- **Deletion:** confirmation with a summary of the movement; warns that it is irreversible and that it deletes the receipt; mutation with `receiptPath`.
- **Synchronization:** all mutations invalidate `['financial-data']`.

### 9.4 Profile / Settings

- `SettingsPage` shows a header and `ProfileSection`.
- `ProfileSection` reads `user_metadata.first_name/last_name` and `email`, and presents a form with RHF.
- `settings.api.ts` exposes `updateUserProfile`, which calls `supabase.auth.updateUser` with the profile data.
- **Current state:** the form does not have an `onSubmit` connected to `updateUserProfile`; it is a partially implemented UI surface.

### 9.5 Landing and navigation

- `HomePage`: hero with a product message, feature grid (real-time analysis, security, smart flow, multiplatform), and registration CTA.
- `Header`: logo, theme button, user icon, logout, and hamburger menu; measures the header's height/width/position to position the mobile menu.
- `Navbar`: authenticated links to Panel, Register Movements, and Profile; in public mode it shows Login/Register; on mobile it slides and uses an overlay (`BackScreen`).
- `Footer`: brand and copyright 2026.

---

## 10. Security, validation, and quality

- **Authentication:** Supabase Auth with session persistence.
- **Authorization:** client-side route guards (`beforeLoad`) and user verification with `getUser()` before writes in `movements.api.ts`.
- **Data isolation:** Supabase **Row Level Security (RLS)** policies are expected to restrict `movements` by `user_id`; such policies **are not included in the repository**.
- **Storage:** 60 s signed URLs for private receipts.
- **Input validation:** Zod in login, registration, and movements; file type and size restrictions.
- **Orphaned file handling:** cleanup on partial insert/update failures.
- **Accessibility:** use of `aria-invalid`, `aria-describedby`, `role="alert"`, `sr-only`, and associated labels; however, the modals do not implement `role="dialog"` or focus trapping.

---

## 11. Current state, observations, and technical debt

The project is a **frontend-focused MVP** with all operations persisted in Supabase. Observations detected in the code:

- **No automated tests** or test script.
- **Client-only route guards:** they are UX, not a security mechanism; real security depends on RLS.
- **`search.redirect`** is sent from the guards, but `LoginPage`/`useLoginForm` do not consume it (it always navigates to `/dashboard`).
- **`alert()`** in `useRegisterForm` instead of a toast.
- **`ProfileSection`** does not connect the submit with `updateUserProfile`; moreover, `updateUserProfile` writes `email` into `user_metadata` (it does not change the authentication email).
- **Shared cache key `['financial-data']`** with different column selections between dashboard and movements; this can cause incomplete data when sharing the cache.
- **`getGraphicsText.ts`** imports `EXPENSE_CATEGORIES` from `movementsSchema`, which does not re-export it; moreover, it is not referenced (unused/broken code if it were used).
- **`ExpensePercentageInfo.tsx`** and `mockup-data.ts` are not referenced in production.
- **`fiterDataForChartBars.ts`** has a typo in its name.
- **`useHigherExpenses`** compares `'NoYearSelected'` with a capital first letter in one check, while the rest use `'noYearSelected'`.
- **`Header`** contains a `TODO` to replace the user icon with the profile image.
- **Copy errors** in texts ("comprete", "térmimos", "finaciera", "analístas") and `lang="en"` with Spanish content.
- **Prettier** is installed but there is no visible configuration file.
- **Query/Router Devtools** are listed as production dependencies.
- **`routeTree.gen.ts`** is generated; any manual change is lost.

---

## 12. Conclusion

Monos Track is a well-structured personal finance SPA under a **feature-sliced** approach, with a clear separation between presentation, state logic, data access, and validation. Its modern stack (React 19, Vite, TanStack Router/Query, Zustand, Tailwind v4, Zod, and Supabase) enables fast, typed development, with authentication, cloud persistence, private receipt storage, and interactive financial visualizations. The project is in a functional MVP phase: the authentication, dashboard, and movements areas are complete, while profile configuration, automated tests, and some backend security policies remain as pending work. It is a private project and must not be distributed without authorization.
