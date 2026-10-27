import { useAuthStore } from "../../auth/store/authStore"
import { cn } from "../../../shared/utils/cn"
import FinancialCard from "../components/FinancialCard"
import DashboardHeader from "../components/DashboardHeader"
import FullScreenLoader from "../../../shared/components/FullScreenLoader"
import { useFinancialCardsData } from "../hooks/useFinancialCardsData"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../../../shared/lib/supabase"
import BarsChart from "../components/BarsChart"
import { useIncomesVsExpenses } from "../hooks/useIncomesVsExpenses"
import type { FinancialDataTypes } from "../types/dashboardTypes"
import { DoughnutChart } from "../components/DoughnutChart"
import { useExpensesByCategory } from "../hooks/useExpensesByCategory"
import { HigherExpenses } from "../components/HigherExpenses"
import { useHigherExpenses } from "../hooks/useHigherExpenses"
import DashboardFilters from "../components/DashboardFilters"
import { useDashboardFilters } from "../hooks/useDashboardFilters"

function DashboardPage() {
  // Get the financial data for processing in dashboard elements
  const {
    data: financialData,
    // error: financialDataError,
    // isPending: isFinancialDataPending
  } = useQuery<FinancialDataTypes[]>({
    queryKey: ['financial-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('movement_type, amount, movement_date, created_at, category')

      if (error) throw new Error(error.message)
      return data as FinancialDataTypes[]
    }
  })

  // Data for managing filters
  const {
    currentYear,
    currentMonth,
    register,
    selectedYear,
    selectedMonth,
    availableYears,
    availableMonths
  } = useDashboardFilters({ financialData: financialData ?? [] })

  // Data for financial cards - summary information
  const financialCardsData = useFinancialCardsData({
    selectedYear,
    selectedMonth,
    financialData: financialData ?? []
  })

  // Data for incomes vs expenses chart bars
  const {
    labels,
    incomesValues,
    expensesValues
  } = useIncomesVsExpenses({
    selectedMonth,
    selectedYear,
    currentYear,
    currentMonth,
    financialData: financialData ?? []
  })

  // Data for expenses by category donut chart
  const chartData = useExpensesByCategory({ financialData: financialData ?? [], selectedYear, selectedMonth })

  // Data for higher expenses by category
  const { top5Data } = useHigherExpenses({ financialData: financialData ?? [], selectedYear, selectedMonth })

  // Getting the loading state from auth store
  const isLoading = useAuthStore((state) => state.isLoading)
  if (isLoading) return <FullScreenLoader text="Cargando aplicación..." />

  return (
    <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
      <DashboardHeader />
      <main>
        {/* Filters */}
        <DashboardFilters
          register={register}
          availableYears={availableYears}
          availableMonths={availableMonths}
        />
        {/* Financial cards */}
        <div className={cn('p-4 grid grid-cols-1 gap-3 items-center md:grid-cols-2 lg:grid-cols-3')}>
          {financialCardsData.map(item => (
            <FinancialCard
              key={item.cardType}
              cardType={item.cardType}
              title={item.title}
              amount={item.amount}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
              diffText={item.diffText}
              trend={item.trend}
              lastUpdatedDate={item.lastUpdatedDate}
              selectedYear={selectedYear}
            />
          ))}
        </div>
        {/* Charts */}
        {/* Bar Chart: Incomes vs Expenses */}
        <div className={cn('w-full p-4 grid grid-cols-1 place-items-center dark:text-neutral-dark')}>
          <BarsChart
            labels={labels}
            incomesValues={incomesValues}
            expensesValues={expensesValues}
          />
        </div>
        <div className={cn('p-4 grid grid-cols-1 gap-3 md:grid-cols-2')}>
          {/* Doughnut Chart: Expenses by category */}
          <DoughnutChart
            values={chartData.data}
            labels={chartData.labels}
            colors={chartData.colors}
            border={chartData.border}
            selectedYear={selectedYear}
          />
          {/* Highest Expenses by category */}
          <HigherExpenses
            top5Data={top5Data}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>
      </main>
    </section>
  )
}

export default DashboardPage