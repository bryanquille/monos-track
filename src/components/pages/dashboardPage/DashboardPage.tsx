import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { cn } from "../../../utils/cn";
import UserName from "../../ui/UserName";
import LoaderPage from "../LoaderPage";
import { BanknoteArrowDown, BanknoteArrowUp, CircleCheck, Info, Landmark, MoveUpRight, PiggyBank } from "lucide-react";

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
          <h1 className={cn('font-semibold text-xl')}>Panel principal</h1>
          <p>Resumen de Finanzas</p>
          {currentDate &&
            (<time dateTime={String(currentDate)}>{String(currentDate)}</time>)
          }
        </div>
      </header>
      <main>
        <div className={cn('p-4 grid grid-cols-1 gap-3 items-center')}>
          <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
            <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
              <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>Ingresos Totales</h3>
              <div className={cn('p-1 rounded-md grid place-items-center bg-secondary-light/15')}>
                <BanknoteArrowUp className={cn('text-primary')} />
              </div>
            </div>
            <p className={cn('font-Geist-Mono font-semibold text-2xl')}>$300.00</p>
            <p className={cn('flex flex-row gap-2 text-green-600 text-sm')}>
              <MoveUpRight size={18} />
              <span> +12.5% desde el mes pasado</span>
            </p>
          </article>
          <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
            <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
              <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>Gastos Totales</h3>
              <div className={cn('p-1 rounded-md grid place-items-center bg-red-100')}>
                <BanknoteArrowDown className={cn('text-red-500')} />
              </div>
            </div>
            <p className={cn('font-Geist-Mono font-semibold text-2xl')}>$120.00</p>
            <p className={cn('flex flex-row gap-2 text-red-600 text-sm')}>
              <MoveUpRight size={18} />
              <span> +2.4% desde el mes pasado</span>
            </p>
          </article>
          <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
            <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
              <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>Saldo Actual</h3>
              <div className={cn('p-1 rounded-md grid place-items-center bg-sky-100')}>
                <Landmark className={cn('text-sky-500')} />
              </div>
            </div>
            <p className={cn('font-Geist-Mono font-semibold text-2xl')}>$180.00</p>
            <p className={cn('flex flex-row gap-2 text-gray-600 text-sm')}>
              <Info size={18} />
              <span> Actualizado hace 3 minutos</span>
            </p>
          </article>
          <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
            <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
              <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>Ahorro mensual</h3>
              <div className={cn('p-1 rounded-md grid place-items-center bg-blue-100')}>
                <PiggyBank className={cn('text-blue-500')} />
              </div>
            </div>
            <p className={cn('font-Geist-Mono font-semibold text-2xl')}>$40.00</p>
            <p className={cn('flex flex-row gap-2 text-green-600 text-sm')}>
              <CircleCheck size={18} />
              <span> meta lograda al 85%</span>
            </p>
          </article>
        </div>
      </main>
    </section>
  )
}

export default DashboardPage