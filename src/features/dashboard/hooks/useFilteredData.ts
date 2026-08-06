import { useMemo } from "react";
import { mockFinancialData } from "../mocks/mockup-data";
import { monthNames } from "../../../shared/constants/constants";

interface FilteredDataProps {
  selectedYear: string
  currentYear: string
  selectedMonth: string
  currentMonth: number
}

export const useFilteredData = ({ selectedYear, currentYear, selectedMonth, currentMonth }: FilteredDataProps) => {
  // Getting a list of available years in data
  const availableYears = useMemo(() => {
    const prevArray = Array.from(
      new Set(mockFinancialData.map(item => item.movement_date.slice(0, 4)))
    )
    return ['noYearSelected', ...prevArray]
  }, [])

  const availableMonths = useMemo(() => {
    const currentMonthIndex = new Date().getMonth()
    const filteredMonths = selectedYear === currentYear
      ? monthNames.filter((_, index) => index <= currentMonthIndex)
      : monthNames
    return ['noMonthSelected', ...filteredMonths]
  }, [currentYear, selectedYear])

  // Get the array of data filtered by year
  const filteredByYearData = useMemo(() => {
    return mockFinancialData.filter(item => {
      if (selectedYear === 'noYearSelected') {
        return item.movement_date.slice(0, 4) === currentYear
      } else {
        return item.movement_date.slice(0, 4) === selectedYear
      }
    })
  }, [currentYear, selectedYear])

  // Get the arrat of data filtered by month
  const filteredByMonthData = useMemo(() => {
    return filteredByYearData.filter(item => {
      if (selectedMonth === 'nomonthselected') {
        return Number(item.movement_date.slice(5, 7)) === currentMonth
      } else {
        const camelMonth = selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)
        return Number(item.movement_date.slice(5, 7)) === monthNames.indexOf(camelMonth)
      }
    })
  }, [currentMonth, filteredByYearData, selectedMonth])

  // Get the total information data
  const totalIncome = useMemo(() => {
    return filteredByMonthData
      .filter(item => item.movement_type === 'income')
      .reduce((acc, item) => acc + item.amount, 0)
  }, [filteredByMonthData])

  const totalExpense = useMemo(() => {
    return filteredByMonthData
      .filter(item => item.movement_type === 'expense')
      .reduce((acc, item) => acc + item.amount, 0)
  }, [filteredByMonthData])

  const financialData = {
    totalIncome,
    totalExpense,
    totalBalance: totalIncome - totalExpense,
  }

  // Update to get the data of the last month
  const lastMonthFinancialData = {
    lastMonthTotalIncome: 1532,
    lastMonthTotalExpense: 840,
  }

  return {
    availableYears,
    availableMonths,
    financialData,
    lastMonthFinancialData,
  }
}