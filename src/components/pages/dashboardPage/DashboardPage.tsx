import { useAuthStore } from "../../../store/authStore";
import { cn } from "../../../utils/cn";

function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) return <p>Cargando aplicación...</p>

  return (
    <>
      <div className={cn('dark:text-neutral-dark')}>Dashboard</div>
      <p>Bienvenido, {user ? `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}` : 'usuario no logeado'}</p>
    </>
  )
}

export default DashboardPage