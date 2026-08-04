interface dataTypes {
  movement_type: string;
  amount: number;
  movement_date: string;
}

interface dataByYearTypes {
  data: dataTypes[]
  year?: string
}

export const dataByYear = ({ data, year }: dataByYearTypes) => {
  return data.filter(item => {
    return item.movement_date.slice(0, 4) === year
  })
}