import { monthNames } from "../../../shared/constants/constants";
import type { FinancialDataTypes } from "../types/dashboardTypes";

interface UseExpensesByCategoryPropsTypes {
  financialData: FinancialDataTypes[]
  selectedYear: string
  selectedMonth: string
}

export const useExpensesByCategory = ({
  financialData,
  selectedYear,
  selectedMonth,
}: UseExpensesByCategoryPropsTypes) => {
  const expensesData = financialData
    .filter(item => item.movement_type === 'expense')
  if (selectedYear === 'noYearSelected') {
    return {
      labels: ['Sin datos para mostrar'],
      data: [],
    }
  } else if (selectedYear !== 'noYearSelected' && selectedMonth === 'nomonthselected') {
    const filteredByYear = expensesData
      .filter(item => item.movement_date.slice(0, 4) === selectedYear)
    const uniqueCategories = Array.from(new Set(filteredByYear
      .map(item => item.category)))
    const categoryAndAmount = filteredByYear.map(item => (
      {
        category: item.category,
        amount: item.amount,
      }))
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
    const monthSelectedIndex = monthNames
      .indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)) + 1
    const filteredByMonth = expensesData
      .filter(item => Number(item.movement_date.slice(5, 7)) === monthSelectedIndex)
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
