import type { incomesVsExpensesDataTypes } from "../types/dashboardTypes";

export const filterDataForChartBars = (
  incomesVsExpenses: incomesVsExpensesDataTypes[],
  selectedYear: string,
  selectedMonth: string,
  currentMonth: number,
  monthNames: string[],
  neededMonths: string
) => {
  const selectedYearData = incomesVsExpenses
    .filter(item => item.movement_date.slice(0, 4) === selectedYear)

  let requiredMonths: { year: number, month: string }[] = []

  if (neededMonths === 'available') {
    requiredMonths = monthNames
      .filter((_, idx) => idx < currentMonth)
      .map(item => { return { year: Number(selectedYear), month: item } })
  } else if (neededMonths === 'all') {
    requiredMonths = monthNames
      .map(item => { return { year: Number(selectedYear), month: item } })
  } else if (neededMonths === 'lastSix') {
    const startMonthIndex = monthNames
      .indexOf(selectedMonth.slice(0, 1).toUpperCase() + selectedMonth.slice(1))
    const lastSixMonthsIndex = Array
      .from({ length: 6 }, (_, i) => startMonthIndex - i)
      .reverse()
    requiredMonths = lastSixMonthsIndex.map(item => {
      return item < 0
        ? { year: Number(selectedYear) - 1, month: monthNames[item + 12] }
        : { year: Number(selectedYear), month: monthNames[item] }
    })
  }

  const requiredMonthsData = requiredMonths.map(item => {
    const dataByMonth = selectedYearData.filter(data => {
      const dataYear = data.movement_date.slice(0, 4)
      const dataMonth = monthNames[Number(data.movement_date.slice(5, 7)) - 1]
      return item.year === Number(dataYear) && item.month === dataMonth
    })

    const incomes = dataByMonth?.filter(item => item.movement_type === 'income')
    const expenses = dataByMonth?.filter(item => item.movement_type === 'expense')

    const incomesAmount = incomes?.reduce((acc, item) => acc + item.amount, 0)
    const expensesAmount = expenses?.reduce((acc, item) => acc + item.amount, 0)

    return {
      month: item.month,
      year: item.year,
      incomesAmount,
      expensesAmount
    }
  })

  return {
    labels: requiredMonthsData.map(item => `${item.month} ${item.year}`),
    incomesValues: requiredMonthsData.map(item => item.incomesAmount ?? 0),
    expensesValues: requiredMonthsData.map(item => item.expensesAmount ?? 0),
  }
}