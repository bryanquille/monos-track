# Monos Track

Monos Track is a personal finance tracking app built with React, TypeScript, Vite, Supabase, TanStack Router, and TanStack Query. The app lets users register income and expense movements, review financial summaries, and manage protected access to their account.

## Highlights

- Supabase authentication for sign up, login, logout, and session persistence.
- Protected routes for dashboard, movement registration, and settings.
- Financial dashboard with summary cards, monthly filters, and charts for income vs expenses and category breakdowns.
- Movement form with type, category, amount, payment method, date, description, and optional receipt upload.
- Registered history list with real-time data from Supabase.
- Persistent light/dark theme using Zustand.
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
- `src/features/home/` — landing page
- `src/features/settings/` — settings screen
- `src/shared/` — reusable UI, stores, utilities, and Supabase client config
- `src/routes/` — route tree and protected route guards

## Environment variables

Create a `.env` file in the project root with the following values:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

The app also depends on the Supabase storage bucket `receipts` for uploaded movement proofs.

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

4. Open the app in the browser at `http://localhost:5173`.

## Available scripts

- `pnpm run dev` — starts the Vite development server
- `pnpm run build` — creates a production build
- `pnpm run lint` — runs ESLint across the project
- `pnpm run preview` — previews the production build locally

## Key implementation notes

- `src/main.tsx` initializes the React Query client and app entrypoint.
- `src/app/RootComponent.tsx` syncs the Supabase session and applies the saved theme.
- `src/shared/lib/supabase.ts` contains the client setup and environment validation.
- `src/features/auth/store/authStore.ts` manages auth state and session updates.
- `src/routes/*` uses TanStack Router `beforeLoad` guards to protect private pages.
- `src/features/movements/api/movements.api.ts` uploads files to the `receipts` bucket and stores movement records in Supabase.
- `src/features/dashboard/pages/DashboardPage.tsx` loads financial data and renders summary and chart components.
- `src/routeTree.gen.ts` is a generated route tree used by TanStack Router for app navigation.

## Notes

- The project uses Zustand for lightweight state management.
- Private pages are gated before load to avoid unauthorized access.
- Theme preference is persisted in the browser.
- Forms rely on `react-hook-form` with Zod schemas for validation.
- Development utilities such as TanStack Query Devtools and Router Devtools are included for debugging.

## License

Private project. Do not distribute without authorization.
