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

  // // Getting the list of available years from all the data
  // const availableYears = Array.from(new Set(data.map((item) => {
  //   return item.movement_date.slice(0, 4)
  // })))

  // // Create an object with the years as a key with an empty array as value
  // const dataByYears: Record<string, dataTypes[]> = {}
  // availableYears.forEach(year => { dataByYears[year] = [] })

  // // Fill the array of each year with data according to each year
  // data.forEach(item => {
  //   availableYears.forEach(year => {
  //     if (item.movement_date.slice(0, 4) === year) {
  //       dataByYears[year].push(item)
  //     }
  //   })
  // })

  // if (!year) return dataByYears
  // else return dataByYears[year]
  
  return data.filter(item => {
    return item.movement_date.slice(0, 4) === year
  })
}
