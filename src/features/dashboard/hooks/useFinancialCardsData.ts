import { useMemo } from "react"
import { monthNames as MONTH_NAMES } from "../../../shared/constants/constants"
import { getDataByMonth, getDataByYear, getLastUpdatesDate, getTotalExpenseFromData, getTotalIncomeFromData } from "../utils/filterDataFunctions"
import type { FinancialDataTypes } from "../types/dashboardTypes"

interface FinancialCardsDataProps {
  selectedYear: string
  selectedMonth: string
  financialData: FinancialDataTypes[]
}

export const useFinancialCardsData = ({ selectedYear, selectedMonth, financialData }: FinancialCardsDataProps) => {
  // Getting last updated data
  const lastUpdatedDate = useMemo(() => {
    return getLastUpdatesDate(financialData ?? [])
  }, [financialData])

  // Conditional logic to handle cases for filters
  if (selectedYear === 'noYearSelected') {
    return {
      currentPeriodData: undefined,
      lastPeriodData: undefined,
      lastUpdatedDate: undefined
    }
  } else if (selectedMonth === 'nomonthselected') {
    // Get the array of data filtered by year
    const currentYearData = getDataByYear(financialData, selectedYear)
    // Get the array fot data filtered by last year
    const lastYearData = getDataByYear(financialData, String(Number(selectedYear) - 1))

    // Get current year data by incomes and expenses
    const currentYearTotalIncome = getTotalIncomeFromData(currentYearData)
    const currentYearTotalExpense = getTotalExpenseFromData(currentYearData)

    // Get last year data by incomes and expenses
    const lastYearTotalIncome = getTotalIncomeFromData(lastYearData)
    const lastYearTotalExpense = getTotalExpenseFromData(lastYearData)

    // Get current total balance
    const currentYearTotalBalance = currentYearTotalIncome - currentYearTotalExpense

    return {
      currentPeriodData: {
        currentTotalIncome: currentYearTotalIncome,
        currentTotalExpense: currentYearTotalExpense,
        currentTotalBalance: currentYearTotalBalance
      },
      lastPeriodData: {
        lastTotalIncome: lastYearTotalIncome,
        lastYearTotalExpense: lastYearTotalExpense
      },
      lastUpdatedDate
    }
  } else {
    // Calculate the data for the selected month in the selected year
    // Get the array of data filtered by year
    const currentYearData = getDataByYear(financialData, selectedYear)

    // Get the array of data filtered by current month in the current year
    const numberOfSelectedMonth = MONTH_NAMES.indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)) + 1
    const currentMonthArgument = String(numberOfSelectedMonth).length === 1 ? `0${String(numberOfSelectedMonth)}` : String(numberOfSelectedMonth)
    const currentMonthData = getDataByMonth(currentYearData, currentMonthArgument)

    // Get the array of data filtered by last month in the last year
    const numberOfLastMonth = MONTH_NAMES.indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1))
    const lastMonthArgument = String(numberOfLastMonth).length === 1 ? `0${String(numberOfLastMonth)}` : String(numberOfLastMonth)
    const lastMonthData = getDataByMonth(currentYearData, lastMonthArgument)

    // Get current month data by incomes and expenses
    const currentMonthTotalIncome = getTotalIncomeFromData(currentMonthData)
    const currentMonthTotalExpense = getTotalExpenseFromData(currentMonthData)

    // Get last month data by incomes and expenses
    const lastMonthTotalIncome = getTotalIncomeFromData(lastMonthData)
    const lastMonthTotalExpense = getTotalExpenseFromData(lastMonthData)

    // Get current total balance
    const currentMonthTotalBalance = currentMonthTotalIncome - currentMonthTotalExpense

    return {
      currentPeriodData: {
        currentTotalIncome: currentMonthTotalIncome,
        currentTotalExpense: currentMonthTotalExpense,
        currentTotalBalance: currentMonthTotalBalance
      },
      lastPeriodData: {
        lastTotalIncome: lastMonthTotalIncome,
        lastYearTotalExpense: lastMonthTotalExpense
      },
      lastUpdatedDate
    }
  }
}