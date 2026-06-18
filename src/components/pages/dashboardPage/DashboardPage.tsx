import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { cn } from "../../../utils/cn";
import UserName from "../../ui/UserName";
import LoaderPage from "../LoaderPage";
import { BanknoteArrowDown, BanknoteArrowUp, CircleCheck, Info, Landmark, MoveUpRight, PiggyBank } from "lucide-react";
import FinancialCard from "./FinancialCard";
import { useFinancialSummary } from "../../../features/movements/hooks/useFinancialSummary";

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function DashboardPage() {
  const isLoading = useAuthStore((state) => state.isLoading)
  const [currentDate, setCurrentDate] = useState<string>('')
  const { data, isPending, error } = useFinancialSummary()

  useEffect(() => {
    const getDate = () => {
      const todayDate = new Date()
      const year = todayDate.getFullYear()
      const month = todayDate.getMonth()
      setCurrentDate(`${monthNames[month]}, ${year}`)
    }
    getDate()
  }, [])

  if (isPending) return <LoaderPage text="Cargando aplicación..." />
  if (error) {
    return (
      <div className={cn('p-4 border border-red-500/20 rounded-xl text-center bg-red-500/10 text-red-500')}>
        Error al cargar los datos: {error.message}
      </div>
    )
  }

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
          <FinancialCard
            title="Ingresos Totales"
            mainIcon={BanknoteArrowUp}
            mainIconBg="bg-cyan-100"
            mainIconColor="text-primary"
            cashValue={data.totalIncome}
            recapIcon={MoveUpRight}
            recapText="+12.5% desde el mes pasado"
            recapTextColor="text-green-600"
          />
          <FinancialCard
            title="Gastos Totales"
            mainIcon={BanknoteArrowDown}
            mainIconBg="bg-red-100"
            mainIconColor="text-red-500"
            cashValue={data.totalExpenses}
            recapIcon={MoveUpRight}
            recapText="+2.4% desde el mes pasado"
            recapTextColor="text-red-600"
          />
          <FinancialCard
            title="Saldo Actual"
            mainIcon={Landmark}
            mainIconBg="bg-sky-100"
            mainIconColor="text-sky-500"
            cashValue={data.balance}
            recapIcon={Info}
            recapText="Actualizado hace 3 minutos"
            recapTextColor="text-indigo-500"
          />
          <FinancialCard
            title="Ahorro mensual"
            mainIcon={PiggyBank}
            mainIconBg="bg-blue-100"
            mainIconColor="text-blue-500"
            cashValue="40.00"
            recapIcon={CircleCheck}
            recapText="meta lograda al 85%"
            recapTextColor="text-green-600"
          />
        </div>
      </main>
    </section>
  )
}

export default DashboardPage