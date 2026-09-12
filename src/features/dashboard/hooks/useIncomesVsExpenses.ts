import type { FinancialDataTypes } from "../types/dashboardTypes";
import { filterDataForChartBars } from "../utils/fiterDataForChartBars";

interface useIncomesVsExpensesPropsTypes {
  selectedMonth: string
  selectedYear: string
  currentYear: string
  currentMonth: number
  monthNames: string[]
  financialData: FinancialDataTypes[]
}

export const useIncomesVsExpenses = ({
  selectedMonth,
  selectedYear,
  currentYear,
  currentMonth,
  monthNames,
  financialData: incomesVsExpenses,
}: useIncomesVsExpensesPropsTypes) => {
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