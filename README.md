# Monos Track (English)

Monos Track is a personal finance tracking app built with React, TypeScript, Vite, Supabase, TanStack Router, and TanStack Query. The app lets users register income and expense movements, review financial summaries, and manage protected access to their accounts.

## Highlights

- Supabase authentication for sign-up, login, logout, and session persistence.
- Protected routes for the dashboard, movement registration, and settings.
- Financial dashboard with summary cards, monthly filters, and charts for income vs. expenses and category breakdowns.
- Movement form with type, category, amount, payment method, date, description, and optional receipt upload.
- Movement history with real-time data from Supabase.
- Persistent light and dark themes using Zustand.
- Form validation with React Hook Form and Zod.
- Responsive interface for desktop and mobile screens.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Supabase JS
- Chart.js + react-chartjs-2
- Lucide React
- ESLint
- Prettier

## Current app flow

- `/` — public home page
- `/login` — login page
- `/register` — registration page
- `/dashboard` — protected dashboard
- `/dashboard/movements` — movement registration and history
- `/dashboard/settings` — user settings page

## Project structure

- `src/app/` — app bootstrap and global root component
- `src/features/auth/` — authentication pages, forms, store, and session logic
- `src/features/dashboard/` — dashboard UI, metrics hooks, chart logic, and filters
- `src/features/movements/` — movement form, list, validation, and API integration
- `src/features/home/` — home page
- `src/features/settings/` — settings screen
- `src/shared/` — reusable UI, stores, utilities, and Supabase client configuration
- `src/routes/` — route tree and protected route guards

## Environment variables

Create a `.env` file in the project root with the following values:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

The app also depends on the Supabase storage bucket `receipts` for uploaded movement receipts.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd monos-track
```

2. Install the dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open the app in your browser at `http://localhost:5173`.

## Available scripts

- `pnpm run dev` — starts the Vite development server
- `pnpm run build` — creates a production build
- `pnpm run lint` — runs ESLint across the project
- `pnpm run preview` — previews the production build locally

## Key implementation notes

- `src/main.tsx` initializes the React Query client and the app entry point.
- `src/app/RootComponent.tsx` syncs the Supabase session and applies the saved theme.
- `src/shared/lib/supabase.ts` contains the client setup and environment variable validation.
- `src/features/auth/store/authStore.ts` manages authentication state and session updates.
- `src/routes/*` uses TanStack Router `beforeLoad` guards to protect private pages.
- `src/features/movements/api/movements.api.ts` uploads files to the `receipts` bucket and stores movement records in Supabase.
- `src/features/dashboard/pages/DashboardPage.tsx` loads financial data and renders summary and chart components.
- `src/routeTree.gen.ts` is a generated route tree used by TanStack Router for app navigation.

## Notes

- The project uses Zustand for lightweight state management.
- Private pages are guarded before loading to prevent unauthorized access.
- The theme preference is persisted in the browser.
- Forms use `react-hook-form` with Zod schemas for validation.
- Development tools such as TanStack Query Devtools and Router Devtools are included for debugging.

## License

Private project. Do not distribute without authorization.

---

# Monos Track (Español)

Monos Track es una aplicación para controlar finanzas personales construida con React, TypeScript, Vite, Supabase, TanStack Router y TanStack Query. La app permite registrar movimientos de ingreso y gasto, revisar resúmenes financieros y gestionar el acceso protegido a la cuenta del usuario.

## Características principales

- Autenticación con Supabase para registro, inicio de sesión, cierre de sesión y persistencia de sesión.
- Rutas protegidas para el panel, registro de movimientos y configuración.
- Panel financiero con tarjetas de resumen, filtros mensuales y gráficos de ingresos vs gastos y desglose por categorías.
- Formulario de movimientos con tipo, categoría, monto, método de pago, fecha, descripción y carga opcional de comprobante.
- Historial de movimientos registrado con datos en tiempo real desde Supabase.
- Tema claro/oscuro persistente usando Zustand.
- Validación de formularios con React Hook Form y Zod.
- Interfaz responsive para pantallas de escritorio y móvil.

## Stack tecnológico

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Supabase JS
- Chart.js + react-chartjs-2
- Lucide React
- ESLint
- Prettier

## Flujo actual de la aplicación

- `/` — página pública de inicio
- `/login` — página de inicio de sesión
- `/register` — página de registro
- `/dashboard` — panel protegido
- `/dashboard/movements` — registro e historial de movimientos
- `/dashboard/settings` — página de configuración del usuario

## Estructura del proyecto

- `src/app/` — arranque de la app y componente raíz global
- `src/features/auth/` — páginas de autenticación, formularios, store y lógica de sesión
- `src/features/dashboard/` — interfaz del dashboard, hooks de métricas, lógica de gráficos y filtros
- `src/features/movements/` — formulario de movimientos, listado, validación e integración con la API
- `src/features/home/` — página de inicio
- `src/features/settings/` — pantalla de configuración
- `src/shared/` — UI reutilizable, stores, utilidades y configuración del cliente de Supabase
- `src/routes/` — árbol de rutas y guardas de rutas protegidas

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

La aplicación también depende del bucket de almacenamiento de Supabase llamado `receipts` para las pruebas o comprobantes de movimientos subidos.

## Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd monos-track
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
pnpm run dev
```

4. Abre la aplicación en el navegador en `http://localhost:5173`.

## Scripts disponibles

- `pnpm run dev` — inicia el servidor de desarrollo de Vite
- `pnpm run build` — crea una compilación de producción
- `pnpm run lint` — ejecuta ESLint en todo el proyecto
- `pnpm run preview` — previsualiza la compilación de producción localmente

## Notas clave de implementación

- `src/main.tsx` inicializa el cliente de React Query y el punto de entrada de la aplicación.
- `src/app/RootComponent.tsx` sincroniza la sesión de Supabase y aplica el tema guardado.
- `src/shared/lib/supabase.ts` contiene la configuración del cliente y la validación de variables de entorno.
- `src/features/auth/store/authStore.ts` gestiona el estado de autenticación y actualizaciones de sesión.
- `src/routes/*` usa guardas `beforeLoad` de TanStack Router para proteger páginas privadas.
- `src/features/movements/api/movements.api.ts` sube archivos al bucket `receipts` y guarda registros de movimientos en Supabase.
- `src/features/dashboard/pages/DashboardPage.tsx` carga los datos financieros y renderiza los componentes de resumen y gráficos.
- `src/routeTree.gen.ts` es un árbol de rutas generado usado por TanStack Router para la navegación de la app.

## Notas

- El proyecto usa Zustand para un manejo ligero del estado.
- Las páginas privadas se validan antes de cargar para evitar accesos no autorizados.
- La preferencia del tema se guarda en el navegador.
- Los formularios dependen de `react-hook-form` con esquemas de validación de Zod.
- Se incluyen utilidades de desarrollo como TanStack Query Devtools y Router Devtools para depuración.

## Licencia

Proyecto privado. No distribuir sin autorización.
