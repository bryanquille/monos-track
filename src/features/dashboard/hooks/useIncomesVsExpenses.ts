import { useQuery } from "@tanstack/react-query";
import type { incomesVsExpensesDataTypes } from "../types/dashboardTypes";
import { supabase } from "../../../shared/lib/supabase";
import { filterDataForChartBars } from "../utils/fiterDataForChartBars";

interface useIncomesVsExpensesPropsTypes {
  selectedMonth: string
  selectedYear: string
  currentYear: string
  currentMonth: number
  monthNames: string[]
}

export const useIncomesVsExpenses = ({
  selectedMonth,
  selectedYear,
  currentYear,
  currentMonth,
  monthNames
}: useIncomesVsExpensesPropsTypes) => {
  const { data: incomesVsExpenses } = useQuery<incomesVsExpensesDataTypes[]>({
    queryKey: ['incomes-vs-expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('amount, movement_type, movement_date')

      if (error) throw new Error(error.message)
      return data
    }
  })

  let labels: string[] = []
  let incomesValues: number[] = []
  let expensesValues: number[] = []

  if (selectedMonth === 'nomonthselected' && selectedYear === 'noYearSelected'
    || selectedMonth !== 'nomonthselected' && selectedYear === 'noYearSelected'
  ) {
    labels = ['Sin datos para mostrar']
    incomesValues = []
    expensesValues = []
  } else if (selectedMonth === 'nomonthselected' && selectedYear !== 'noYearSelected') {
    // Get the all available months data for the current year
    if (selectedYear === currentYear) {
      const dataForChartBars = filterDataForChartBars(
        incomesVsExpenses ?? [],
        selectedYear,
        selectedMonth,
        currentMonth,
        monthNames,
        'available'
      )
      labels = dataForChartBars.labels
      incomesValues = dataForChartBars.incomesValues
      expensesValues = dataForChartBars.expensesValues

    } else {
      // Get the data of all months for past years
      const dataForChartBars = filterDataForChartBars(
        incomesVsExpenses ?? [],
        selectedYear,
        selectedMonth,
        currentMonth,
        monthNames,
        'all'
      )
      labels = dataForChartBars.labels
      incomesValues = dataForChartBars.incomesValues
      expensesValues = dataForChartBars.expensesValues
    }
  } else {
    // Get the last six months data based on the selected month and year
    const dataForChartBars = filterDataForChartBars(
      incomesVsExpenses ?? [],
      selectedYear,
      selectedMonth,
      currentMonth,
      monthNames,
      'lastSix'
    )
    labels = dataForChartBars.labels
    incomesValues = dataForChartBars.incomesValues
    expensesValues = dataForChartBars.expensesValues
  }
  return {
    labels,
    incomesValues,
    expensesValues
  }
}