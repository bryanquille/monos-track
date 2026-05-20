import { useAuthStore } from "../../../store/authStore";
import { cn } from "../../../utils/cn";
import LoaderPage from "../LoaderPage";

function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) return <LoaderPage text="Cargando aplicación..." />

  return (
    <>
      <div className={cn('text-center dark:text-neutral-dark')}>Dashboard</div>
      <p
        className={cn('text-center dark:text-neutral-dark')}
      >
        Bienvenido, {user ? `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}` : 'usuario no logeado'}
      </p>
    </>
  )
}

export default DashboardPage