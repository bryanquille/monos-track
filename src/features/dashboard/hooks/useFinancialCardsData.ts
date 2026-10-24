import { useMemo } from "react"
import { monthNames as MONTH_NAMES } from "../../../shared/constants/constants"
import {
  getDataByMonth,
  getDataByYear,
  getLastUpdatesDate,
  getTotalExpenseFromData,
  getTotalIncomeFromData,
  type dataTypes
} from "../utils/filterDataFunctions"
import type { FinancialDataTypes } from "../types/dashboardTypes"

interface FinancialCardsDataPropsTypes {
  selectedYear: string
  selectedMonth: string
  financialData: FinancialDataTypes[]
}

// Define a strict type for the structure of each financial card
export type CardType = 'incomes' | 'expenses' | 'balance'

export interface FinancialCardSummary {
  cardType: CardType
  currentTotalIncomes?: number
  lastTotalIncomes?: number
  currentTotalExpenses?: number
  lastTotalExpenses?: number
  currentTotalBalance?: number
  lastUpdatedDate?: number
}

export const useFinancialCardsData = ({
  selectedYear,
  selectedMonth,
  financialData = []
}: FinancialCardsDataPropsTypes): FinancialCardSummary[] => {

  // Get the last updated date in movements
  const lastUpdatedDate = useMemo(() => {
    return getLastUpdatesDate(financialData)
  }, [financialData])

  const cardsData = useMemo<FinancialCardSummary[]>(() => {

    // CASE A: There is no year selected
    if (selectedYear === 'noYearSelected') {
      return [
        { cardType: 'incomes', currentTotalIncomes: undefined, lastTotalIncomes: undefined },
        { cardType: 'expenses', currentTotalExpenses: undefined, lastTotalExpenses: undefined },
        { cardType: 'balance', currentTotalBalance: undefined, lastUpdatedDate }
      ]
    }

    // CASE B: There is a year selected but no a month
    if (selectedMonth === 'nomonthselected') {
      const currentYearData = getDataByYear(financialData, selectedYear)
      const lastYearData = getDataByYear(financialData, String(Number(selectedYear) - 1))

      const currentYearTotalIncomes = getTotalIncomeFromData(currentYearData)
      const currentYearTotalExpenses = getTotalExpenseFromData(currentYearData)

      const lastYearTotalIncomes = getTotalIncomeFromData(lastYearData)
      const lastYearTotalExpenses = getTotalExpenseFromData(lastYearData)

      const currentYearTotalBalance = currentYearTotalIncomes - currentYearTotalExpenses

      return [
        { cardType: 'incomes', currentTotalIncomes: currentYearTotalIncomes, lastTotalIncomes: lastYearTotalIncomes },
        { cardType: 'expenses', currentTotalExpenses: currentYearTotalExpenses, lastTotalExpenses: lastYearTotalExpenses },
        { cardType: 'balance', currentTotalBalance: currentYearTotalBalance, lastUpdatedDate }
      ]
    }

    // CASE C: There is a year and a month selected
    const currentYearData = getDataByYear(financialData, selectedYear)
    const normalizedMonth = selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)
    const monthIndex = MONTH_NAMES.indexOf(normalizedMonth)

    // Validación defensiva por si el mes no es válido
    if (monthIndex === -1) {
      return [
        { cardType: 'incomes', currentTotalIncomes: 0, lastTotalIncomes: 0 },
        { cardType: 'expenses', currentTotalExpenses: 0, lastTotalExpenses: 0 },
        { cardType: 'balance', currentTotalBalance: 0, lastUpdatedDate }
      ]
    }

    const currentMonthIndex = monthIndex + 1 // 1 al 12
    let lastMonthData: dataTypes[] = []

    // Lógica segura para Enero y meses regulares
    if (selectedMonth.toLowerCase() === 'enero') {
      const previousYear = String(Number(selectedYear) - 1)
      const previousYearData = getDataByYear(financialData, previousYear)
      lastMonthData = getDataByMonth(previousYearData, '12')
    } else {
      const lastMonthIndex = currentMonthIndex - 1
      const lastMonthArgument = String(lastMonthIndex).padStart(2, '0')
      lastMonthData = getDataByMonth(currentYearData, lastMonthArgument)
    }

    const currentMonthArgument = String(currentMonthIndex).padStart(2, '0')
    const currentMonthData = getDataByMonth(currentYearData, currentMonthArgument)

    // Cálculos finales de montos
    const currentMonthTotalIncomes = getTotalIncomeFromData(currentMonthData)
    const currentMonthTotalExpenses = getTotalExpenseFromData(currentMonthData)

    const lastMonthTotalIncomes = getTotalIncomeFromData(lastMonthData)
    const lastMonthTotalExpenses = getTotalExpenseFromData(lastMonthData)

    const currentMonthTotalBalance = currentMonthTotalIncomes - currentMonthTotalExpenses

    return [
      { cardType: 'incomes', currentTotalIncomes: currentMonthTotalIncomes, lastTotalIncomes: lastMonthTotalIncomes },
      { cardType: 'expenses', currentTotalExpenses: currentMonthTotalExpenses, lastTotalExpenses: lastMonthTotalExpenses },
      { cardType: 'balance', currentTotalBalance: currentMonthTotalBalance, lastUpdatedDate }
    ]

  }, [selectedYear, selectedMonth, financialData, lastUpdatedDate])

  return cardsData
}