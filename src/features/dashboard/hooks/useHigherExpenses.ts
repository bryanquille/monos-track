import type { FinancialDataTypes } from "../types/dashboardTypes";
import { MONTH_NAMES } from "../../../shared/constants/constants"

type dataOrganizedByYearTypes = Record<string, FinancialDataTypes[] | undefined>
type dataOrganizedByYearAndMonthTypes = Record<string, Record<string, FinancialDataTypes[] | undefined> | undefined>
type dataByMonthTypes = Record<string, FinancialDataTypes[] | undefined>

export interface top5DataTypes {
  value: string,
  currentAmount: number,
  previousAmount: number
}

interface useHigherExpensesProps {
  financialData: FinancialDataTypes[] | undefined,
  selectedYear: string,
  selectedMonth: string,
}

export const useHigherExpenses = ({
  financialData,
  selectedYear,
  selectedMonth,
}: useHigherExpensesProps) => {

  // Organize data by year
  const availableYearsInData = Array.from(new Set(financialData?.map(item => item.movement_date.slice(0, 4))))
  const expensesData = financialData?.filter(item => item.movement_type === 'expense')
  const dataOrganizedByYear: dataOrganizedByYearTypes = availableYearsInData.reduce((acc, item) => {
    acc[item] = expensesData?.filter(data => data.movement_date.slice(0, 4) === item)
    return acc
  }, {} as dataOrganizedByYearTypes)

  // Organize data by year and month
  const dataOrganizedByYearAndMonth: dataOrganizedByYearAndMonthTypes = Object
    .entries(dataOrganizedByYear).reduce((acc, [year, data]) => {
      const monthsInYear = Array.from(new Set(data?.map(item => item.movement_date.slice(5, 7))))
      const dataByMonth: dataByMonthTypes = monthsInYear.reduce((monthAcc, month) => {
        monthAcc[month] = data?.filter(item => item.movement_date.slice(5, 7) === month)
        return monthAcc
      }, {} as dataByMonthTypes)
      acc[year] = dataByMonth
      return acc
    }, {} as dataOrganizedByYearAndMonthTypes)

  // Function to calculate total accumulated expenses by category
  const calculateExpensesByCategory = (data: FinancialDataTypes[]) => {

    const dataByCategory: Record<string, number> = data.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount
      return acc
    }, {} as Record<string, number>)
    return dataByCategory
  }

  const getTopFive = (currentData: Record<string, number>, previousData: Record<string, number>) => {
    if (Object.keys(currentData).length > 0) {
      return Object.entries(currentData).map(([category, currentAmount]) => {
        const previousAmount = previousData[category] ?? 0
        return {
          value: category,
          currentAmount,
          previousAmount
        }
      }).sort((a, b) => b.currentAmount - a.currentAmount).slice(0, 5)
    }
    return []
  }

  const top5Data: top5DataTypes[] = (() => {
    if (selectedYear === 'NoYearSelected') return []
    if (selectedMonth === 'nomonthselected') {
      // Calculate top 5 of the higher expenses by year
      const previousSelectedYearData = dataOrganizedByYear[Number(selectedYear) - 1] ?? []
      const currentSelectedYearData = dataOrganizedByYear[selectedYear] ?? []

      const accumPreviousByCategory = calculateExpensesByCategory(previousSelectedYearData)
      const accumCurrentByCategory = calculateExpensesByCategory(currentSelectedYearData)

      return getTopFive(accumCurrentByCategory, accumPreviousByCategory)
    } else {
      // Calculate top 5 of the higher expenses by month within the selected year
      const selectedMonthIndex = MONTH_NAMES.indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1))
      const previousSelectedMonthData = dataOrganizedByYearAndMonth[selectedYear]?.[String(selectedMonthIndex).padStart(2, '0')] ?? []
      const currentSelectedMonthData = dataOrganizedByYearAndMonth[selectedYear]?.[String(selectedMonthIndex + 1).padStart(2, '0')] ?? []

      const accumPreviousByCategory = calculateExpensesByCategory(previousSelectedMonthData)
      const accumCurrentByCategory = calculateExpensesByCategory(currentSelectedMonthData)

      return getTopFive(accumCurrentByCategory, accumPreviousByCategory)
    }
  })()
  return { top5Data }
}