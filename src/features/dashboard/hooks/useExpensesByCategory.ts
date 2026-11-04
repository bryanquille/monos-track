import { EXPENSE_CATEGORIES, MONTH_NAMES } from "../../../shared/constants/constants";
import type { FinancialDataTypes } from "../types/dashboardTypes";

interface UseExpensesByCategoryPropsTypes {
  financialData: FinancialDataTypes[]
  selectedYear: string
  selectedMonth: string
}

const getSpanishCategoryLabel = (category: string) => {
  const foundCategory = EXPENSE_CATEGORIES.find(item => item.value === category)
  return foundCategory ? foundCategory.label : category
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
      colors: [],
      border: []
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
      labels: uniqueCategories.map(category => getSpanishCategoryLabel(category)),
      data: amounts,
      colors: uniqueCategories.map(category => {
        const foundCategory = EXPENSE_CATEGORIES.find(item => item.value === category)
        return foundCategory ? foundCategory.color : '#000000'
      }),
      border: uniqueCategories.map(category => {
        const foundCategory = EXPENSE_CATEGORIES.find(item => item.value === category)
        return foundCategory ? foundCategory.border : '#000000'
      })
    }
  } else {
    const monthSelectedIndex = MONTH_NAMES
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
      labels: uniqueCategories.map(category => getSpanishCategoryLabel(category)),
      data: amounts,
      colors: uniqueCategories.map(category => {
        const foundCategory = EXPENSE_CATEGORIES.find(item => item.value === category)
        return foundCategory ? foundCategory.color : '#000000'
      }),
      border: uniqueCategories.map(category => {
        const foundCategory = EXPENSE_CATEGORIES.find(item => item.value === category)
        return foundCategory ? foundCategory.border : '#000000'
      })
    }
  }
}