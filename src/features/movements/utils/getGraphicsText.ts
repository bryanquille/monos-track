import { EXPENSE_CATEGORIES } from "../schemas/movementsSchema";

interface chartData {
  category: string
  value: number
  percentage: number
}

interface getGraphicsTextProps {
  registerExpenses: chartData[] | undefined
}

interface chartDataColorPercentage {
  category: string
  color: string
  percentage: number
}

export const getGraphicsText = ({ registerExpenses }:getGraphicsTextProps) => {
  const chartDataColorsPercentages: chartDataColorPercentage[] = []

  EXPENSE_CATEGORIES.forEach(exp => {
    let categoryColorPercentage: chartDataColorPercentage | null = null

    registerExpenses?.forEach(item => {
      if (item.category === exp.value) {
        categoryColorPercentage = {
          category: exp.value,
          color: exp.color,
          percentage: item.percentage,
        }
      }
    })
    if (categoryColorPercentage) {
      chartDataColorsPercentages.push(categoryColorPercentage)
    }
  })

  chartDataColorsPercentages.sort((a, b) => b.percentage - a.percentage)

  let cum = 0
  const chartDataAccumPercentage = chartDataColorsPercentages.map(item => {
    cum += item.percentage
    if (cum > 100) {
      cum = 100
    }
    return {
      ...item,
      acumPercentage: cum,
    }
  })

  let currentPercentage = 0
  let graphicsText = ''
  chartDataAccumPercentage.forEach(item => {
    graphicsText += `${item.color} ${currentPercentage}%,${item.color} ${item.acumPercentage}%,`
    currentPercentage = item.acumPercentage
  })

  graphicsText = graphicsText.slice(0, -1)
  return graphicsText
}

