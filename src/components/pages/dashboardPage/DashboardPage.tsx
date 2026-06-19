import { useAuthStore } from "../../../store/authStore";
import { cn } from "../../../utils/cn";
import LoaderPage from "../LoaderPage";
import { BanknoteArrowDown, BanknoteArrowUp, CircleCheck, Info, Landmark, MoveUpRight, PiggyBank } from "lucide-react";
import FinancialCard from "./FinancialCard";
import { useFinancialSummary } from "../../../features/movements/hooks/useFinancialSummary";
import DashboardHeader from "./DashboardHeader";

function DashboardPage() {
  const isLoading = useAuthStore((state) => state.isLoading)
  const { data, isPending, error } = useFinancialSummary()

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
      <DashboardHeader />
      <main>
        <div className={cn('p-4 grid grid-cols-1 gap-3 items-center md:grid-cols-2 lg:grid-cols-4')}>
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
        <div className={cn('p-4 grid grid-cols-1 gap-3 items-center md:grid-cols-2')}>
          <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
            <div className={cn('flex justify-between items-start')}>
              <div>
                <h3>Ingresos vs Gastos</h3>
                <p className={cn('text-sm text-gray-500 dark:text-gray-400')}>Comparativa mensual</p>
              </div>
              <div>
                <div className={cn('flex items-center gap-1.5')}>
                  <span className={cn('block w-3 h-3 rounded-4xl bg-blue-500')}></span>
                  <p>Ingresos</p>
                </div>
                <div className={cn('flex items-center gap-1.5')}>
                  <span className={cn('block w-3 h-3 rounded-4xl bg-red-400')}></span>
                  <p>Gastos</p>
                </div>
              </div>
            </div>
            <div className={cn('pt-4 px-2 pb-1 flex justify-evenly items-end border border-gray-400 rounded-2xl')}>
              <div>
                <div className={cn('flex items-end gap-0.5')}>
                  <div className={cn('w-4 h-32 bg-blue-500')}></div>
                  <div className={cn('w-4 h-24 bg-red-400')}></div>
                </div>
                <p className={cn('text-sm')}>Ene</p>
              </div>
              <div>
                <div className={cn('flex items-end gap-0.5')}>
                  <div className={cn('w-4 h-40 bg-blue-500')}></div>
                  <div className={cn('w-4 h-20 bg-red-400')}></div>
                </div>
                <p className={cn('text-sm')}>Feb</p>
              </div>
              <div>
                <div className={cn('flex items-end gap-0.5')}>
                  <div className={cn('w-4 h-28 bg-blue-500')}></div>
                  <div className={cn('w-4 h-26 bg-red-400')}></div>
                </div>
                <p className={cn('text-sm')}>Mar</p>
              </div>
              <div>
                <div className={cn('flex items-end gap-0.5')}>
                  <div className={cn('w-4 h-50 bg-blue-500')}></div>
                  <div className={cn('w-4 h-32 bg-red-400')}></div>
                </div>
                <p className={cn('text-sm')}>Apr</p>
              </div>
              <div>
                <div className={cn('flex items-end gap-0.5')}>
                  <div className={cn('w-4 h-38 bg-blue-500')}></div>
                  <div className={cn('w-4 h-26 bg-red-400')}></div>
                </div>
                <p className={cn('text-sm')}>Jun</p>
              </div>
            </div>
          </article>
        </div>
      </main>
    </section>
  )
}

export default DashboardPage