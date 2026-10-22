import { useMemo } from "react"
import { monthNames } from "../../../shared/constants/constants"
import { dataByMonth, dataByYear, totalExpenseFromData, totalIncomeFromData } from "../utils/filterDataFunctions"
import type { FinancialDataTypes } from "../types/dashboardTypes"

interface FinancialCardsDataProps {
  currentYear: string
  selectedYear: string
  selectedMonth: string
  financialData: FinancialDataTypes[]
}

export const useFinancialCardsData = ({ selectedYear, currentYear, selectedMonth, financialData }: FinancialCardsDataProps) => {
  // Getting last updated data
  const getLastDate = (financialData: FinancialDataTypes[] | undefined) => {
    if (!financialData || financialData.length === 0) return 0

    const sortDataByDate = [...financialData].sort((a, b) => (
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ))

    return new Date(sortDataByDate[0].created_at).getTime()
  }

  const lastUpdatedDate = useMemo(() => {
    return getLastDate(financialData ?? [])
  }, [financialData])

  // Get the array of data filtered by year
  const filteredDataByYear = useMemo(() => {
    return financialData.filter(item => {
      if (selectedYear === 'noYearSelected') {
        return item.movement_date.slice(0, 4) === currentYear
      } else {
        return item.movement_date.slice(0, 4) === selectedYear
      }
    })
  }, [currentYear, selectedYear, financialData])

  // Conditional logic to handle cases for filters
  if (selectedYear === 'noYearSelected') {
    return {
      financialCardData: undefined,
      lastPeriodData: undefined,
      lastUpdatedDate: undefined
    }
  } else if (selectedMonth === 'nomonthselected') {
    // Calculate the data for the selected year
  } else {
    // Calculate the data for the selected month in the selected year
  }

  // Get the arrat of data filtered by month
  const filteredByMonthData = useMemo(() => {
    if (selectedMonth === 'nomonthselected') {
      return filteredDataByYear
    } else {
      const camelMonth = selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)
      return filteredDataByYear.filter(item => {
        return Number(item.movement_date.slice(5, 7)) === monthNames.indexOf(camelMonth) + 1
      })
    }
  }, [filteredDataByYear, selectedMonth])

  // Get the total information data
  const totalIncome = useMemo(() => {
    return totalIncomeFromData(filteredByMonthData)
  }, [filteredByMonthData])

  const totalExpense = useMemo(() => {
    return totalExpenseFromData(filteredByMonthData)
  }, [filteredByMonthData])

  const financialDataOutput = {
    totalIncome,
    totalExpense,
    totalBalance: totalIncome - totalExpense,
  }

  const lastMonthFinancialData = useMemo(() => {
    if (selectedMonth === 'enero') {
      const lastYear = String(Number(selectedYear) - 1)
      const filteredDataByLastYear = dataByYear(financialData, lastYear)
      const filteredDataOfDecember = dataByMonth(filteredDataByLastYear, '12')
      const lastMonthTotalIncome = totalIncomeFromData(filteredDataOfDecember)
      const lastMonthTotalExpense = totalExpenseFromData(filteredDataOfDecember)
      return {
        lastMonthTotalIncome,
        lastMonthTotalExpense,
      }
    } else {
      const lastMonthIndex = monthNames.indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1))
      const lastMonthIndexStr = String(lastMonthIndex).length === 1
        ? `0${String(lastMonthIndex)}`
        : String(lastMonthIndex)
      const filteredDataOfLastMonth = dataByMonth(financialData, lastMonthIndexStr)
      if (filteredDataOfLastMonth.length === 0) {
        return {
          lastMonthTotalIncome: 0,
          lastMonthTotalExpense: 0,
        }
      }
      const lastMonthTotalIncome = totalIncomeFromData(filteredDataOfLastMonth)
      const lastMonthTotalExpense = totalExpenseFromData(filteredDataOfLastMonth)
      return {
        lastMonthTotalIncome,
        lastMonthTotalExpense,
      }
    }
  }, [selectedMonth, selectedYear, financialData])

  if (selectedYear === 'noYearSelected') {
    return {
      financialDataOutput: {
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0,
      },
      lastMonthFinancialData: {
        lastMonthTotalIncome: 0,
        lastMonthTotalExpense: 0,
      }
    }
  }

  return {
    financialDataOutput,
    lastMonthFinancialData,
    lastUpdatedDate
  }
}