# Monos Track

Monos Track es una aplicación web para el seguimiento de finanzas personales. Permite registrar ingresos y gastos con un flujo de registro moderno, validación de formularios y una experiencia soportada por rutas protegidas y tema oscuro.

## Características principales

- **Autenticación de usuarios** con Supabase: login, registro y gestión de sesión.
- **Rutas protegidas** para acceder al dashboard y registrar movimientos solo cuando el usuario está autenticado.
- **Registro de movimientos** con formulario dinámico de ingreso/gasto.
- **Categorías personalizadas** para ingresos y gastos.
- **Método de pago** seleccionado en el formulario: efectivo, transferencia o depósito.
- **Adjuntos opcionales**: carga de comprobantes en PDF, PNG o JPG.
- **Tema oscuro** persistente: la preferencia se guarda en local storage.
- **Interfaz responsive** diseñada para desktop y dispositivos móviles.
- **Validación de formularios** con React Hook Form + Zod.

## Tecnologías utilizadas

- **React 19** con TypeScript
- **Vite** como bundler
- **TanStack Router** para el enrutamiento
- **Zustand** para el estado global
- **Tailwind CSS** para estilos
- **React Hook Form** + **Zod** para formularios y validación
- **Supabase** para autenticación y sesión
- **Lucide React** para iconos
- **ESLint** para linting

## Estructura del proyecto

- `src/components/`: Componentes UI reutilizables y páginas.
- `src/features/auth/`: Formas, validaciones y botones de inicio de sesión / registro.
- `src/features/movements/`: Formulario de registro de movimientos y lógica de negocio.
- `src/hooks/`: Hooks personalizados.
- `src/lib/`: Configuración de Supabase.
- `src/routes/`: Rutas de la aplicación con protección y redirección.
- `src/store/`: Estado global con Zustand.
- `src/utils/`: Utilidades compartidas.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd monos-track
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Inicia la aplicación en modo desarrollo:
   ```bash
   pnpm run dev
   ```

4. Abre el proyecto en `http://localhost:5173`.

## Scripts disponibles

- `pnpm run dev`: Inicia el servidor de desarrollo.
- `pnpm run build`: Construye la aplicación para producción.
- `pnpm run lint`: Ejecuta ESLint en el proyecto.
- `pnpm run preview`: Previsualiza la build de producción.

## Flujo de uso

1. Navega a la pantalla de inicio.
2. Regístrate o inicia sesión.
3. Accede al dashboard protegido.
4. Registra movimientos financieros desde el módulo de ingresos/gastos.
5. Cambia entre tema claro y oscuro con el botón de tema.

## Notas importantes

- La autenticación está integrada con Supabase.
- La preferencia de tema se persiste en el navegador.
- Hay rutas protegidas que redirigen a `/dashboard` cuando el usuario ya está autenticado y a `/login` si no hay sesión válida.

## Licencia

Privado - No distribuir sin autorización.

---

# Monos Track (English)

Monos Track is a web application for tracking personal finances. It allows recording income and expenses with a modern entry flow, form validation, and an experience supported by protected routes and dark mode.

## Main features

- **User authentication** with Supabase: login, register and session handling.
- **Protected routes** to access the dashboard and movement registration only when the user is authenticated.
- **Movement registration** with a dynamic income/expense form.
- **Custom categories** for income and expenses.
- **Payment method** selection in the form: cash, transfer, or deposit.
- **Optional attachments**: upload receipts in PDF, PNG or JPG.
- **Persistent dark mode**: the preference is stored in local storage.
- **Responsive interface** designed for desktop and mobile devices.
- **Form validation** using React Hook Form + Zod.

## Technologies used

- **React 19** with TypeScript
- **Vite** as bundler
- **TanStack Router** for routing
- **Zustand** for global state
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for forms and validation
- **Supabase** for authentication and session management
- **Lucide React** for icons
- **ESLint** for linting

## Project structure

- `src/components/`: Reusable UI components and pages.
- `src/features/auth/`: Forms, validation and login/register buttons.
- `src/features/movements/`: Movement registration form and business logic.
- `src/hooks/`: Custom hooks.
- `src/lib/`: Supabase configuration.
- `src/routes/`: Application routes with protection and redirection.
- `src/store/`: Global state with Zustand.
- `src/utils/`: Shared utilities.

## Installation

1. Clone the repository:
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

## Usage flow

1. Go to the home screen.
2. Register or log in.
3. Access the protected dashboard.
4. Record financial movements from the income/expense module.
5. Toggle between light and dark theme using the theme button.

## Important notes

- Authentication is integrated with Supabase.
- Theme preference persists in the browser.
- Protected routes redirect to `/dashboard` when the user is already authenticated and to `/login` when there is no valid session.

## License

Private - Do not distribute without authorization.