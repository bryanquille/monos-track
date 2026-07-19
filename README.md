# Monos Track

Monos Track es una aplicación web para el seguimiento de finanzas personales creada con React, TypeScript, Supabase y TanStack Router. Está diseñada para ofrecer una experiencia moderna de registro de ingresos y gastos con validación, métricas de dashboard y rutas protegidas.

## Características principales

- Autenticación con Supabase: registro, login y gestión de sesión con correo y contraseña.
- Rutas protegidas para dashboard, registro de movimientos y ajustes.
- Dashboard financiero con métricas resumidas y comparativas.
- Registro de movimientos con tipo, categoría, monto, fecha, método de pago y adjuntos.
- Carga opcional de comprobantes en PDF, PNG y JPG.
- Tema claro/oscuro persistente con Zustand.
- Validación de formularios con React Hook Form y Zod.
- Uso de Supabase Storage para gestionar archivos de recibos.
- Interfaz responsive para escritorio y móvil.

## Tecnologías usadas

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Zustand
- Zod
- React Hook Form
- Supabase JS
- Lucide React
- Sileo
- ESLint

## Estructura principal del proyecto

- `src/app/`: Configuración general y `RootComponent`.
- `src/features/auth/`: Autenticación, formularios y estado de usuario.
- `src/features/dashboard/`: Página de dashboard y hooks financieros.
- `src/features/movements/`: Formulario de movimientos, API y validaciones.
- `src/features/settings/`: Página de ajustes.
- `src/features/home/`: Página pública de bienvenida.
- `src/shared/`: Componentes reutilizables, utilidades, stores y Supabase.
- `src/routes/`: Definición de rutas y protección con TanStack Router.

## Rutas principales

- `/`: Página pública de inicio.
- `/login`: Login.
- `/register`: Registro.
- `/dashboard`: Dashboard protegido.
- `/dashboard/movements`: Registro de movimientos.
- `/dashboard/settings`: Ajustes del usuario.

## Entorno y variables

Crea un archivo `.env` en la raíz del proyecto con estas variables:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=tu_supabase_anon_key
```

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd monos-track
   ```
2. Instala dependencias:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   pnpm run dev
   ```
4. Abre la aplicación en `http://localhost:5173`.

## Scripts disponibles

- `pnpm run dev`: Inicia el servidor de desarrollo.
- `pnpm run build`: Construye la aplicación para producción.
- `pnpm run lint`: Ejecuta ESLint en todo el proyecto.
- `pnpm run preview`: Previsualiza la build de producción.

## Detalles de implementación

- `src/main.tsx`: Configura `QueryClientProvider` de TanStack Query.
- `src/app/RootComponent.tsx`: Sincroniza sesión de Supabase y aplica el tema oscuro/claro.
- `src/shared/lib/supabase.ts`: Cliente Supabase con validación de variables de entorno.
- `src/shared/stores/themeStore.ts`: Persistencia del tema con Zustand.
- `src/features/auth/store/authStore.ts`: Maneja usuario, carga de sesión y logout.
- `src/routes/_app/dashboard/index.tsx`: Protege el acceso al dashboard con `beforeLoad`.
- `src/features/movements/api/movements.api.ts`: Envía movimientos a Supabase y guarda recibos en el bucket `receipts`.

## Notas adicionales

- El estado global ligero se maneja con Zustand.
- Las rutas privadas se validan en TanStack Router antes de cargar el componente.
- El tema se guarda automáticamente en el navegador.
- Los formularios emplean `zodResolver` para validación declarativa.

## Licencia

Privado - No distribuir sin autorización.

---

# Monos Track (English)

Monos Track is a web application for tracking personal finances built with React, TypeScript, Supabase and TanStack Router. It provides a modern experience for adding income and expenses with validation, dashboard metrics and protected routes.

## Main features

- Supabase authentication: register, login and session management.
- Protected routes for dashboard, movements and settings.
- Financial dashboard with summary metrics.
- Movement registration with type, category, amount, date, payment method and attachments.
- Optional receipt upload in PDF, PNG and JPG.
- Persistent dark/light theme with Zustand.
- Form validation with React Hook Form and Zod.
- Supabase Storage for receipt files.
- Responsive UI for desktop and mobile.

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Router
- TanStack Query
- Zustand
- Zod
- React Hook Form
- Supabase JS
- Lucide React
- Sileo
- ESLint

## Project structure

- `src/app/`: App configuration and `RootComponent`.
- `src/features/auth/`: Authentication, forms and user state.
- `src/features/dashboard/`: Dashboard page and financial hooks.
- `src/features/movements/`: Movement form, API and validation.
- `src/features/settings/`: Settings page.
- `src/features/home/`: Public landing page.
- `src/shared/`: Reusable components, utilities, stores and Supabase config.
- `src/routes/`: Route definitions and TanStack Router protection.

## Key routes

- `/`: Public home page.
- `/login`: Login page.
- `/register`: Register page.
- `/dashboard`: Protected dashboard.
- `/dashboard/movements`: Movement registration.
- `/dashboard/settings`: User settings.

## Environment variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Installation

1. Clone the repo:
   ```bash
   git clone <repository-url>
   cd monos-track
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```
4. Open the app at `http://localhost:5173`.

## Available scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the app for production.
- `pnpm run lint`: Runs ESLint across the project.
- `pnpm run preview`: Previews the production build.

## Key implementation points

- `src/main.tsx`: TanStack Query client provider and query defaults.
- `src/app/RootComponent.tsx`: Session sync with Supabase and theme class handling.
- `src/shared/lib/supabase.ts`: Supabase client with environment validation.
- `src/shared/stores/themeStore.ts`: Persistent theme store.
- `src/features/auth/store/authStore.ts`: User session state and logout.
- `src/routes/_app/dashboard/index.tsx`: Dashboard route protection and redirect.
- `src/features/movements/api/movements.api.ts`: Movement submission and receipt upload.

## Notes

- The app uses Zustand for lightweight global state.
- Private route protection is handled with TanStack Router `beforeLoad` hooks.
- Theme preference persists in the browser.
- Forms use `zodResolver` and declarative Zod schemas.

## License

Private - Do not distribute without authorization.
