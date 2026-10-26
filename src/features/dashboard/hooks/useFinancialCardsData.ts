import { useMemo } from "react"
import { MONTH_NAMES } from "../../../shared/constants/constants"
import { getDataByMonth, getDataByYear, getLastUpdatesDate, getTotalExpenseFromData, getTotalIncomeFromData, type dataTypes } from "../utils/filterDataFunctions"
import type { FinancialDataTypes } from "../types/dashboardTypes"

interface FinancialCardsDataProps {
  selectedYear: string
  selectedMonth: string
  financialData: FinancialDataTypes[]
}

export type CardType = 'incomes' | 'expenses' | 'balance'

export interface FinancialCardData {
  cardType: CardType
  title: string
  amount?: number
  iconBg: string
  iconColor: string
  diffText?: string
  trend?: 'positive' | 'negative' | 'neutral'
  lastUpdatedDate?: number
}

export const useFinancialCardsData = ({
  selectedYear,
  selectedMonth,
  financialData = []
}: FinancialCardsDataProps): FinancialCardData[] => {

  const lastUpdatedDate = useMemo(() => {
    return getLastUpdatesDate(financialData)
  }, [financialData])

  const periodLabel = selectedYear === 'noYearSelected'
    ? null
    : selectedMonth === 'nomonthselected'
      ? 'año'
      : 'mes'

  return useMemo<FinancialCardData[]>(() => {
    if (selectedYear === 'noYearSelected') {
      return [
        { cardType: 'incomes', title: 'Ingresos', iconBg: 'bg-cyan-100', iconColor: 'text-primary' },
        { cardType: 'expenses', title: 'Gastos', iconBg: 'bg-red-100', iconColor: 'text-red-500' },
        { cardType: 'balance', title: 'Balance', iconBg: 'bg-sky-100', iconColor: 'text-sky-500', lastUpdatedDate }
      ]
    }

    // Vista Anual o Mensual (Calculamos datos actuales y anteriores)
    const isYearView = selectedMonth === 'nomonthselected'
    const currentYearData = getDataByYear(financialData, selectedYear)

    let currentData = currentYearData
    let previousData: dataTypes[] = []

    if (isYearView) {
      previousData = getDataByYear(financialData, String(Number(selectedYear) - 1))
    } else {
      const normalizedMonth = selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)
      const monthIndex = MONTH_NAMES.indexOf(normalizedMonth)
      const currentMonthIndex = monthIndex + 1

      const currentMonthArg = String(currentMonthIndex).padStart(2, '0')
      currentData = getDataByMonth(currentYearData, currentMonthArg)

      if (selectedMonth.toLowerCase() === 'enero') {
        const prevYearData = getDataByYear(financialData, String(Number(selectedYear) - 1))
        previousData = getDataByMonth(prevYearData, '12')
      } else {
        const prevMonthArg = String(currentMonthIndex - 1).padStart(2, '0')
        previousData = getDataByMonth(currentYearData, prevMonthArg)
      }
    }

    // Totales
    const currentIncomes = getTotalIncomeFromData(currentData)
    const currentExpenses = getTotalExpenseFromData(currentData)
    const currentBalance = currentIncomes - currentExpenses

    const lastIncomes = getTotalIncomeFromData(previousData)
    const lastExpenses = getTotalExpenseFromData(previousData)

    // Cálculo de porcentajes de diferencia encapsulado aquí
    const incomeDiff = lastIncomes > 0 ? ((currentIncomes - lastIncomes) * 100) / lastIncomes : 0
    const expenseDiff = lastExpenses > 0 ? ((currentExpenses - lastExpenses) * 100) / lastExpenses : 0

    const suffix = periodLabel ? `% desde el ${periodLabel} pasado` : ''

    // Helper para formatear tendencia de ingresos
    const getIncomeTrend = (diff: number) => {
      const abs = Math.abs(diff).toFixed(2)
      if (diff > 0) return { text: `+${abs}${suffix}`, trend: 'positive' as const }
      if (diff < 0) return { text: `-${abs}${suffix}`, trend: 'negative' as const }
      return { text: `0.00${suffix}`, trend: 'neutral' as const }
    }

    // Helper para formatear tendencia de gastos (invertida: subir es negative/rojo, bajar es positive/verde)
    const getExpenseTrend = (diff: number) => {
      const abs = Math.abs(diff).toFixed(2)
      if (diff > 0) return { text: `+${abs}${suffix}`, trend: 'negative' as const }
      if (diff < 0) return { text: `-${abs}${suffix}`, trend: 'positive' as const }
      return { text: `0.00${suffix}`, trend: 'neutral' as const }
    }

    const incomeTrend = getIncomeTrend(incomeDiff)
    const expenseTrend = getExpenseTrend(expenseDiff)

    return [
      {
        cardType: 'incomes',
        title: 'Ingresos',
        amount: currentIncomes,
        iconBg: 'bg-cyan-100',
        iconColor: 'text-primary',
        diffText: incomeTrend.text,
        trend: incomeTrend.trend
      },
      {
        cardType: 'expenses',
        title: 'Gastos',
        amount: currentExpenses,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-500',
        diffText: expenseTrend.text,
        trend: expenseTrend.trend
      },
      {
        cardType: 'balance',
        title: 'Balance',
        amount: currentBalance,
        iconBg: 'bg-sky-100',
        iconColor: 'text-sky-500',
        lastUpdatedDate
      }
    ]

  }, [selectedYear, selectedMonth, financialData, lastUpdatedDate, periodLabel])
}