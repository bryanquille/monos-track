import type { FinancialDataTypes } from "../types/dashboardTypes";

interface dataTypes {
  movement_type: string;
  amount: number;
  movement_date: string;
}

export const getDataByYear = (data: dataTypes[], year: string): dataTypes[] => {
  return data.filter(item => {
    return item.movement_date.slice(0, 4) === year
  })
}

export const getDataByMonth = (data: dataTypes[], month: string) => {
  return data.filter(item => {
    return item.movement_date.slice(5, 7) === month
  })
}

export const getTotalIncomeFromData = (data: dataTypes[]) => {
  return data
    .filter(item => item.movement_type === 'income')
    .reduce((acc, item) => acc + item.amount, 0)
}

export const getTotalExpenseFromData = (data: dataTypes[]) => {
  return data
    .filter(item => item.movement_type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0)
}

export const getLastUpdatesDate = (financialData: FinancialDataTypes[] | undefined) => {
  if (!financialData || financialData.length === 0) return 0

  const sortDataByDate = [...financialData].sort((a, b) => (
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ))

  return new Date(sortDataByDate[0].created_at).getTime()
}