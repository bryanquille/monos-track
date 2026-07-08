import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/lib/supabase";

interface CategoryData {
  category: string
  value: number
  percentage: number
}

export const useExpensesByCategory = () => {
  return useQuery<CategoryData[]>({
    queryKey: ['expenses-by-category'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('amount, category')
        .eq('movement_type', 'expense')

      if (error) throw new Error(error.message)
      if (!data || data.length === 0) return []

      const totalsMap: Record<string, number> = {}
      let totalExpensesSum = 0

      data.forEach((item) => {
        const amount = Number(item.amount) || 0
        const category = item.category || 'Otros'
        totalsMap[category] = (totalsMap[category] || 0) + amount
        totalExpensesSum += amount
      })

      const chartData = Object.entries(totalsMap).map(([category, value]) => ({
        category,
        value,
        percentage: totalExpensesSum > 0 ? Math.round((value / totalExpensesSum) * 100) : 0
      }))

      return chartData.sort((a, b) => b.value - a.value)
    },
  })
}
