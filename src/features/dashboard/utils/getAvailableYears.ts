interface financialData {
  amount: number
  movement_type: string
  movement_date: string
  created_at?: string
}

export const getAvailableYears = (list: financialData[]) => {
  return Array.from(new Set(list.map(item => item.movement_date.slice(0, 4))))
}
