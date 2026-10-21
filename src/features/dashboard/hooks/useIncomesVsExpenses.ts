import type { FinancialDataTypes } from "../types/dashboardTypes"
import { filterDataForChartBars } from "../utils/fiterDataForChartBars"
import { monthNames as MONTH_NAMES } from "../../../shared/constants/constants"

interface useIncomesVsExpensesPropsTypes {
  selectedMonth: string
  selectedYear: string
  currentYear: string
  currentMonth: number
  financialData: FinancialDataTypes[]
}

export const useIncomesVsExpenses = ({
  selectedMonth,
  selectedYear,
  currentYear,
  currentMonth,
  financialData = [],
}: useIncomesVsExpensesPropsTypes) => {

  // Calculate the data immutably
  const { labels, incomesValues, expensesValues } = (() => {
    // If no year is selected, return the default empty state
    if (selectedYear === 'noYearSelected') {
      return {
        labels: ['Sin datos para mostrar'],
        incomesValues: [],
        expensesValues: [],
      }
    }

    // If the selected year is the current year, 
    // we show only the available months. 
    // Otherwise, we show all months for past years
    if (selectedMonth === 'nomonthselected') {
      const mode = selectedYear === currentYear ? 'available' : 'all';

      const dataForChartBars = filterDataForChartBars(
        financialData,
        selectedYear,
        selectedMonth,
        currentMonth,
        MONTH_NAMES,
        mode
      )

      return {
        labels: dataForChartBars.labels,
        incomesValues: dataForChartBars.incomesValues,
        expensesValues: dataForChartBars.expensesValues,
      }
    }

    // Default case: There is a selected year and month (we get the last six months)
    const dataForChartBars = filterDataForChartBars(
      financialData,
      selectedYear,
      selectedMonth,
      currentMonth,
      MONTH_NAMES,
      'lastSix'
    )

    return {
      labels: dataForChartBars.labels,
      incomesValues: dataForChartBars.incomesValues,
      expensesValues: dataForChartBars.expensesValues,
    }
  })()

  return {
    labels,
    incomesValues,
    expensesValues,
  }
}