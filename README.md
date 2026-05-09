# Monos Track

Una aplicación web de seguimiento financiero que combina precisión técnica con una interfaz empática y accesible. Diseñada para gestionar ingresos y gastos con análisis en tiempo real, utilizando un diseño minimalista y responsivo.

## Características

- **Autenticación de usuarios**: Sistema de login y registro con formularios validados.
- **Interfaz responsiva**: Compatible con dispositivos móviles, tabletas y computadoras.
- **Modo oscuro**: Soporte para tema claro y oscuro.
- **Análisis en tiempo real**: Seguimiento instantáneo de ingresos y gastos (funcionalidad en desarrollo).
- **Navegación intuitiva**: Menú hamburguesa y navegación fluida.

## Tecnologías utilizadas

- **Frontend**: React 19 con TypeScript
- **Enrutamiento**: TanStack Router
- **Estado**: Zustand
- **Estilos**: Tailwind CSS
- **Formularios**: React Hook Form con Zod para validación
- **Iconos**: Lucide React
- **Build tool**: Vite
- **Linter**: ESLint
- **Consultas**: TanStack Query (configurado para futuras integraciones)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd monos-track
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173` (o el puerto indicado).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta el linter para verificar el código.
- `npm run preview`: Previsualiza la build de producción.

## Estructura del proyecto

- `src/components/`: Componentes reutilizables (header, footer, layouts, páginas).
- `src/features/`: Funcionalidades específicas (auth, profile, transactions).
- `src/hooks/`: Hooks personalizados.
- `src/lib/`: Utilidades y configuraciones.
- `src/routes/`: Definición de rutas con TanStack Router.
- `src/store/`: Estado global con Zustand (tema, menú).
- `src/types/`: Definiciones de tipos TypeScript.
- `src/utils/`: Funciones auxiliares.

## Contribución

Este proyecto está en desarrollo inicial. Las contribuciones son bienvenidas una vez que se establezcan guías específicas.

## Licencia

Privado - No distribuir sin autorización.