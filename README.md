# Monos Track

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
