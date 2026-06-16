import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { cn } from "../../../utils/cn";
import UserName from "../../ui/UserName";
import LoaderPage from "../LoaderPage";

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function DashboardPage() {
  const isLoading = useAuthStore((state) => state.isLoading)
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const getDate = () => {
      const todayDate = new Date()
      const year = todayDate.getFullYear()
      const month = todayDate.getMonth()
      setCurrentDate(`${monthNames[month]}, ${year}`)
    }
    getDate()
  }, [])

  if (isLoading) return <LoaderPage text="Cargando aplicación..." />

  return (
    <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
      <header className={cn('p-4 flex flex-col justify-center gap-8 bg-neutral-light/50 dark:bg-secondary-light md:p-8')}>
        <UserName />
        <div>
          <h1>Panel principal</h1>
          <p>Resumen de Finanzas</p>
          {currentDate &&
            (<time dateTime={String(currentDate)}>{String(currentDate)}</time>)
          }
        </div>
      </header>
    </section>
  )
}

export default DashboardPage