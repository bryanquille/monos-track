import { monthNames } from "../../../shared/constants/constants";
import type { FinancialDataTypes } from "../types/dashboardTypes";

interface UseExpensesByCategoryPropsTypes {
  financialData: FinancialDataTypes[]
  selectedYear: string
  selectedMonth: string
}

const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Alimentación', color: '#EF4444' },
  { value: 'housing', label: 'Vivienda', color: '#0EA5E9' },
  { value: 'transport', label: 'Transporte', color: '#FF6B6B' },
  { value: 'utilities', label: 'Servicios', color: '#F97316' },
  { value: 'health', label: 'Salud y Cuidado', color: '#2563EB' },
  { value: 'entertainment', label: 'Entretenimiento y Ocio', color: '#EC4899' },
  { value: 'shopping', label: 'Compras Personales', color: '#10B981' },
  { value: 'education', label: 'Educación', color: '#14B8A6' },
  { value: 'debt', label: 'Pago de Deudas', color: '#D946EF' },
  { value: 'other_expense', label: 'Otros Gastos', color: '#EAB308' },
]

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
      })
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
      labels: uniqueCategories.map(category => getSpanishCategoryLabel(category)),
      data: amounts,
      colors: uniqueCategories.map(category => {
        const foundCategory = EXPENSE_CATEGORIES.find(item => item.value === category)
        return foundCategory ? foundCategory.color : '#000000'
      })
    }
  }
}
