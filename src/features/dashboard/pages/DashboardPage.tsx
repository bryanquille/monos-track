import { useAuthStore } from "../../auth/store/authStore";
import { cn } from "../../../shared/utils/cn";
import FinancialCard from "../components/FinancialCard";
// import { useFinancialSummary } from "../hooks/useFinancialSummary";
import DashboardHeader from "../components/DashboardHeader";
import { useExpensesByCategory } from "../hooks/useExpensesByCategory";
import ExpensePercentageInfo from "../components/ExpensePercentageInfo";
import { EXPENSE_CATEGORIES } from "../../movements/schemas/movementsSchema";
import { useIncomesVsExpenses } from "../hooks/useIncomesVsExpenses";
import IncomeExpenseBars from "../components/IncomeExpenseBars";
import { getGraphicsText } from "../utils/getGraphicsText";
import FullScreenLoader from "../../../shared/components/FullScreenLoader";
import { mockFinancialData } from "../mocks/mockup-data";
import { useForm, useWatch } from "react-hook-form";
import { monthNames } from "../../../shared/constants/constants";

function DashboardPage() {
  const { register, control } = useForm()
  const isLoading = useAuthStore((state) => state.isLoading)

  // const { data: financialInfo, isPending: isFinancialInfoPending, error: financialInfoError } = useFinancialSummary()
  const { data: chartData, isPending: isPendingCharData, error: charDataError } = useExpensesByCategory()
  const {
    data: incomesVsExpenses,
    // isPending: isIncomesVsExpensesPending,
    // error: incomesVsExpensesError
  } = useIncomesVsExpenses()

  // if (isFinancialInfoPending) { return <FullScreenLoader text="Cargando aplicación..." /> }
  // if (financialInfoError) {
  //   return (
  //     <div className={cn('p-4 border border-red-500/20 rounded-xl text-center bg-red-500/10 text-red-500')}>
  //       Error al cargar los datos: {financialInfoError.message}
  //     </div>
  //   )
  // }





  /* Getting financial data */
  // For empty data, no data registered yet
  // const financialData = {
  //   totalIncome: null,
  //   totalExpense: null,
  //   totalBalance: null,
  // }

  // Getting a list of available years in data
  const availableYears = Array.from(new Set(mockFinancialData.map(item => item.movement_date.slice(0, 4))))
  availableYears.unshift('noYearSelected')

  // Getting current date
  const currentMonth = new Date().getMonth() + 1 // Get current month
  const currentYear = String(new Date().getFullYear())  // Get current year

  const selectedYear = useWatch({
    control,
    name: 'year'
  })

  // Getting the list of available months
  const getAvailableMonths = (SelectedYear: string, currentYear: string) => {
    const currentMonth = new Date().getMonth()
    if (SelectedYear === currentYear) {
      return monthNames.filter((_, index) => index <= currentMonth)
    } else return monthNames
  }
  // TODO: fix an issue, using a useEffect
  const availableMonths = getAvailableMonths(selectedYear, currentYear)
  availableMonths.unshift('noMonthSelected')

  // Get the array of data filtered by year
  const filteredByYearData = mockFinancialData.filter(item => {
    return item.movement_date.slice(0, 4) === currentYear
  })

  // Get the arrat of data filtered by month
  const filteredByMonthData = filteredByYearData.filter(item => {
    return Number(item.movement_date.slice(5, 7)) === currentMonth
  })

  // Get the total information data
  const totalIncome = filteredByMonthData
    .filter(item => item.movement_type === 'income')
    .reduce((acc, item) => acc + item.amount, 0)

  const totalExpense = filteredByMonthData
    .filter(item => item.movement_type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0)

  const financialData = {
    totalIncome,
    totalExpense,
    totalBalance: totalIncome - totalExpense,
  }

  const lastMonthFinancialData = {
    lastMonthTotalIncome: 1532,
    lastMonthTotalExpense: 840,
  }





  const graphicsText = getGraphicsText({ registerExpenses: chartData ?? [] })
  if (isPendingCharData) return <FullScreenLoader text="Cargando datos..." />

  if (isLoading) return <FullScreenLoader text="Cargando aplicación..." />

  return (
    <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
      <DashboardHeader />
      <main>
        {/* Filtros */}
        <div className={cn('w-fit ml-auto px-8 py-4')}>
          <h2 className={cn('mb-2 text-center font-semibold')}>Filtrar</h2>
          <form className={cn('flex items-center gap-6')}>
            <div className={cn('flex items-center gap-1.5')}>
              <label
                htmlFor="year"
                className={cn('opacity-70')}
              >
                Año
              </label>
              <select
                id="year"
                className={cn('py-1 px-2 border-2 border-gray-500 rounded-md')}
                {...register('year')}
              >
                {
                  availableYears.map(item => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === 'noYearSelected' ? 'Escoger un año' : item}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className={cn('flex items-center gap-1.5')}>
              <label
                htmlFor="month"
                className={cn('opacity-70')}
              >
                Mes
              </label>
              <select
                id="month"
                className={cn('py-1 px-2 border-2 border-gray-500 rounded-md')}
                {...register('month')}
              >
                {
                  availableMonths.map(month => (
                    <option
                      key={month.toLowerCase()}
                      value={month.toLowerCase()}
                    >
                      {month === 'noMonthSelected' ? 'Escoge un mes' : month}
                    </option>
                  ))
                }
              </select>
            </div>
          </form>
        </div>
        {/* Financial cards */}
        <div className={cn('p-4 grid grid-cols-1 gap-3 items-center md:grid-cols-2 lg:grid-cols-3')}>
          {Object.entries(financialData).map((item, index) => {
            return (
              <FinancialCard
                key={index}
                title={item[0]}
                cashValue={item[1]}
                lastMonthTotalExpense={lastMonthFinancialData.lastMonthTotalExpense}
                lastMonthTotalIncome={lastMonthFinancialData.lastMonthTotalIncome}
              />
            )
          })}
        </div>
        {/* Charts */}
        <div className={cn('p-4 grid grid-cols-1 gap-3 md:grid-cols-2')}>
          <article className={cn('p-4 flex flex-col justify-between gap-4 rounded-2xl bg-neutral-light/20')}>
            <div className={cn('flex justify-between items-start')}>
              <div>
                <h3 className={cn('font-semibold text-lg')}>Ingresos vs Gastos</h3>
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
            <div className={cn('pt-4 px-2 pb-1 flex justify-evenly items-end border border-gray-400 rounded-2xl md:mb-16')}>
              {incomesVsExpenses?.map((item) => (
                <IncomeExpenseBars
                  key={item.label}
                  label={item.label}
                  incomeHeight={item.incomeHeight}
                  expenseHeight={item.expenseHeight}
                />
              ))}
            </div>
          </article>
          <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
            <h3 className={cn('font-semibold text-lg')}>Gastos por categoría</h3>
            {charDataError ?
              (<p className={cn('text-center text-red-500')}>Error al obtener los datos de los gastos: {charDataError.message}</p>)
              : (
                <div className={cn('relative flex flex-col justify-center items-center gap-4')}>
                  <div className={cn('relative w-60 h-60 flex justify-center items-center')}>
                    <div
                      style={{ "--graphicsColors": graphicsText } as React.CSSProperties}
                      className={cn(
                        'absolute top-1/2 left-1/2 w-60 h-60 rounded-full transform -translate-1/2',
                        `bg-conic-(--graphicsColors)`
                      )}
                    ></div>
                    <div className={cn('absolute top-1/2 left-1/2 w-48 h-48 overflow-hidden rounded-full bg-white transform -translate-1/2 dark:bg-secondary-light')}>
                      <div className={cn('w-full h-full bg-neutral-light/20')}></div>
                    </div>
                  </div>
                  <div className={cn('w-full')}>
                    <div className={cn('flex flex-col gap-2')}>
                      {
                        chartData?.map(item => (
                          <ExpensePercentageInfo
                            key={item.category}
                            category={EXPENSE_CATEGORIES.filter((expItem) => expItem.value === item.category)[0].label}
                            percentageValue={item.percentage}
                            color={EXPENSE_CATEGORIES.filter((expItem) => expItem.value === item.category)[0].color}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>)}
          </article>
        </div>
      </main>
    </section>
  )
}

export default DashboardPage