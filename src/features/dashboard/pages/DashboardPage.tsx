import { useAuthStore } from "../../auth/store/authStore";
import { cn } from "../../../shared/utils/cn";
import FinancialCard from "../components/FinancialCard";
import DashboardHeader from "../components/DashboardHeader";
import FullScreenLoader from "../../../shared/components/FullScreenLoader";
import { useForm, useWatch } from "react-hook-form";
import { monthNames as MONTH_NAMES } from "../../../shared/constants/constants";
import { useFinancialCardsData } from "../hooks/useFinancialCardsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/lib/supabase";
import { useMemo } from "react";
import BarsChart from "../components/BarsChart";
import { useIncomesVsExpenses } from "../hooks/useIncomesVsExpenses";
import type { FinancialDataTypes } from "../types/dashboardTypes";
import { DoughnutChart } from "../components/DoughnutChart";
import { useExpensesByCategory } from "../hooks/useExpensesByCategory";
import { HigherExpenses } from "../components/HigherExpenses";
import { useHigherExpenses } from "../hooks/useHigherExpenses";
import DashboardFilters, { type FilterFormValues } from "../components/DashboardFilters";

function DashboardPage() {
  // Getting current date
  const currentMonth = new Date().getMonth() + 1 // Get current month index
  const currentYear = String(new Date().getFullYear())  // Get current year

  // React Hook Form for managing the select inputs for year and month
  const { register, control } = useForm<FilterFormValues>({
    defaultValues: {
      'year': currentYear,
      'month': MONTH_NAMES[currentMonth - 1].toLowerCase()
    }
  })

  // Getting the selected year and month from the filters form
  const selectedYear = useWatch({
    control,
    name: 'year'
  })

  const selectedMonth = useWatch({
    control,
    name: 'month'
  })

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

  // Getting a list of available years in data for the select input
  const availableYears = useMemo(() => {
    const uniqueYears = Array.from(
      new Set([...(financialData ?? []).map(item => item.movement_date.slice(0, 4)), currentYear])
    )
    return ['noYearSelected', ...uniqueYears]
  }, [financialData, currentYear])

  // Getting a list of available months in data for the select input
  const availableMonths = useMemo(() => {
    const currentMonthIndex = new Date().getMonth()
    const filteredMonths = selectedYear === currentYear
      ? MONTH_NAMES.filter((_, index) => index <= currentMonthIndex)
      : MONTH_NAMES
    return ['noMonthSelected', ...filteredMonths]
  }, [currentYear, selectedYear])

  // Data for financial cards summary information
  const financialCardsData = useFinancialCardsData({ selectedYear, selectedMonth, financialData: financialData ?? [] })

  // Data for incomes vs expenses chart bars
  const {
    labels,
    incomesValues,
    expensesValues
  } = useIncomesVsExpenses({ selectedMonth, selectedYear, currentYear, currentMonth, financialData: financialData ?? [] })

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
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              currentTotalIncomes={item.currentTotalIncomes}
              currentTotalExpenses={item.currentTotalExpenses}
              currentTotalBalance={item.currentTotalBalance}
              lastTotalIncomes={item.lastTotalIncomes}
              lastTotalExpenses={item.lastTotalExpenses}
              lastUpdatedDate={item.lastUpdatedDate}
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