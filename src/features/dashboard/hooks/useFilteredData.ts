import { useMemo } from "react";
import { monthNames } from "../../../shared/constants/constants";
import { dataByMonth, dataByYear, totalExpenseFromData, totalIncomeFromData } from "../utils/filterDataFunctions";

export interface FinancialDataTypes {
  movement_type: string
  amount: number
  movement_date: string
}

interface FilteredDataProps {
  selectedYear: string
  currentYear: string
  selectedMonth: string
  financialData: FinancialDataTypes[]
}

export const useFilteredData = ({ selectedYear, currentYear, selectedMonth, financialData }: FilteredDataProps) => {
  // Getting a list of available years in data
  const availableYears = useMemo(() => {
    const prevArray = Array.from(
      new Set(financialData.map(item => item.movement_date.slice(0, 4)))
    )
    return ['noYearSelected', ...prevArray]
  }, [financialData])

  const availableMonths = useMemo(() => {
    const currentMonthIndex = new Date().getMonth()
    const filteredMonths = selectedYear === currentYear
      ? monthNames.filter((_, index) => index <= currentMonthIndex)
      : monthNames
    return ['noMonthSelected', ...filteredMonths]
  }, [currentYear, selectedYear])

  // Get the array of data filtered by year
  const filteredByYearData = useMemo(() => {
    return financialData.filter(item => {
      if (selectedYear === 'noYearSelected') {
        return item.movement_date.slice(0, 4) === currentYear
      } else {
        return item.movement_date.slice(0, 4) === selectedYear
      }
    })
  }, [currentYear, selectedYear, financialData])

  // Get the arrat of data filtered by month
  const filteredByMonthData = useMemo(() => {
    if (selectedMonth === 'nomonthselected') {
      return filteredByYearData
    } else {
      const camelMonth = selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1)
      return filteredByYearData.filter(item => {
        return Number(item.movement_date.slice(5, 7)) === monthNames.indexOf(camelMonth) + 1
      })
    }
  }, [filteredByYearData, selectedMonth])

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

  return {
    availableYears,
    availableMonths,
    financialDataOutput,
    lastMonthFinancialData,
  }
}