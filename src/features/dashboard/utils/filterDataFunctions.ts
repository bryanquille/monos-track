interface dataTypes {
  movement_type: string;
  amount: number;
  movement_date: string;
}

export const dataByYear = (data: dataTypes[], year: string): dataTypes[] => {
  return data.filter(item => {
    return item.movement_date.slice(0, 4) === year
  })
}

export const dataByMonth = (data: dataTypes[], month: string) => {
  return data.filter(item => {
    return item.movement_date.slice(5, 7) === month
  })
}

export const totalIncomeFromData = (data: dataTypes[]) => {
  return data
    .filter(item => item.movement_type === 'income')
    .reduce((acc, item) => acc + item.amount, 0)
}

export const totalExpenseFromData = (data: dataTypes[]) => {
  return data
    .filter(item => item.movement_type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0)
}