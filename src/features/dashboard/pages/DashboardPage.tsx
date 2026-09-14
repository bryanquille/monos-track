import { useAuthStore } from "../../auth/store/authStore";
import { cn } from "../../../shared/utils/cn";
import FinancialCard from "../components/FinancialCard";
import DashboardHeader from "../components/DashboardHeader";
import FullScreenLoader from "../../../shared/components/FullScreenLoader";
import { useForm, useWatch } from "react-hook-form";
import { monthNames } from "../../../shared/constants/constants";
import { useFinancialCardsData } from "../hooks/useFinancialCardsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/lib/supabase";
import { useMemo } from "react";
import BarsChart from "../components/BarsChart";
import { useIncomesVsExpenses } from "../hooks/useIncomesVsExpenses";
import type { FinancialDataTypes } from "../types/dashboardTypes";
import { DoughnutChart } from "../components/DoughnutChart";

function DashboardPage() {
  // Getting current date
  const currentMonth = new Date().getMonth() + 1 // Get current month index
  const currentYear = String(new Date().getFullYear())  // Get current year

  const { register, control } = useForm({
    defaultValues: {
      'year': currentYear,
      'month': monthNames[currentMonth - 1].toLowerCase()
    }
  })
  const isLoading = useAuthStore((state) => state.isLoading)

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

  const getLastDate = (financialData: FinancialDataTypes[] | undefined) => {
    if (!financialData || financialData.length === 0) return 0;

    const sortDataByDate = [...financialData].sort((a, b) => (
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ))

    return new Date(sortDataByDate[0].created_at).getTime()
  }

  const lastUpdatedDate = useMemo(() => {
    return getLastDate(financialData ?? [])
  }, [financialData])

  const selectedYear = useWatch({
    control,
    name: 'year'
  })

  const selectedMonth = useWatch({
    control,
    name: 'month'
  })

  // Data for financial cards summary information
  const {
    availableYears,
    availableMonths,
    financialDataOutput,
    lastMonthFinancialData
  } = useFinancialCardsData({ selectedYear, currentYear, selectedMonth, financialData: financialData ?? [] })

  // Data for incomes vs expenses chart bars
  const {
    labels,
    incomesValues,
    expensesValues
  } = useIncomesVsExpenses({ selectedMonth, selectedYear, currentYear, currentMonth, monthNames, financialData: financialData ?? [] })








  // Data for expenses by category donut chart
  // let doughnutLabels: string[] = []
  // let doughnutData: number[] = []
  const chartData = (
    {
      financialData,
      selectedYear,
      selectedMonth,
    }:
      {
        financialData: FinancialDataTypes[]
        selectedYear: string
        selectedMonth: string
      }
  ) => {
    const expensesData = financialData.filter(item => item.movement_type === 'expense')
    if (selectedYear === 'noYearSelected') {
      return {
        labels: ['Sin datos para mostrar'],
        data: [],
      }
    } else if (selectedYear !== 'noYearSelected' && selectedMonth === 'nomonthselected') {
      const filteredByYear = expensesData.filter(item => item.movement_date.slice(0, 4) === selectedYear)
      const uniqueCategories = Array.from(new Set(filteredByYear.map(item => item.category)))
      const categoryAndAmount = filteredByYear.map(item => {
        return {
          category: item.category,
          amount: item.amount,
        }
      })
      const amounts = uniqueCategories.map(category => {
        const totalAmount = categoryAndAmount
          .filter(item => item.category === category)
          .reduce((acc, curr) => acc + curr.amount, 0)
        return totalAmount
      })
      return {
        labels: uniqueCategories,
        data: amounts,
      }
    } else {
      const monthSelectedIndex = monthNames.indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)) + 1
      const filteredByMonth = expensesData.filter(item => Number(item.movement_date.slice(5, 7)) === monthSelectedIndex)
      const uniqueCategories = Array.from(new Set(filteredByMonth.map(item => item.category)))
      const categoryAndAmount = filteredByMonth.map(item => {
        return {
          category: item.category,
          amount: item.amount,
        }
      })
      const amounts = uniqueCategories.map(category => {
        const totalAmount = categoryAndAmount
          .filter(item => item.category === category)
          .reduce((acc, curr) => acc + curr.amount, 0)
        return totalAmount
      })
      return {
        labels: uniqueCategories,
        data: amounts,
      }
    }
  }

  console.log(chartData({ financialData: financialData ?? [], selectedYear, selectedMonth }))
  // console.log('doughnutLabels', doughnutLabels)
  // console.log('doughnutData', doughnutData)
  const chartDoughnutData = chartData({ financialData: financialData ?? [], selectedYear, selectedMonth })








  // Show loader while query data
  if (isLoading) return <FullScreenLoader text="Cargando aplicación..." />

  return (
    <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
      <DashboardHeader />
      <main>
        {/* Filters */}
        <div className={cn('w-fit mx-auto px-8 py-4 md:mx-[unset] md:ml-auto')}>
          <h2 className={cn('mb-2 text-center font-semibold')}>Filtrar</h2>
          <form className={cn('flex flex-col items-center gap-4 md:flex-row md:gap-6')}>
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
                      className={cn('dark:text-secondary-light')}
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
                      className={cn('dark:text-secondary-light')}
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
          {Object.entries(financialDataOutput).map((item, index) => {
            return (
              <FinancialCard
                key={index}
                title={item[0]}
                cashValue={item[1]}
                lastUpdatedDate={lastUpdatedDate ?? 0}
                lastMonthTotalExpense={lastMonthFinancialData.lastMonthTotalExpense}
                lastMonthTotalIncome={lastMonthFinancialData.lastMonthTotalIncome}
              />
            )
          })}
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
        {/* Doughnut Chart: Expenses by category */}
        <div className={cn('p-4 grid grid-cols-1 gap-3 md:grid-cols-2')}>
          <DoughnutChart
            labels={chartDoughnutData.labels}
            values={chartDoughnutData.data}
          />
        </div>
      </main>
    </section>
  )
}

export default DashboardPage