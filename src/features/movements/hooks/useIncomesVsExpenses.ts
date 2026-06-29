import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export const useIncomesVsExpenses = () => {
  return useQuery({
    queryKey: ['incomes-vs-expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('amount, movement_type, movement_date')

      if (error) throw new Error(error.message)
      if (!data || data.length === 0) return []

      const monthlyData = data.reduce((acc: { [key: string]: { income: number, expense: number } }, item) => {
        const month = new Date(item.movement_date).toLocaleString('default', { month: 'short', year: 'numeric' })
        if (!acc[month]) {
          acc[month] = { income: 0, expense: 0 }
        }
        if (item.movement_type === 'income') {
          acc[month].income += item.amount
        } else {
          acc[month].expense += item.amount
        }
        return acc
      }, {})

      return monthlyData
    }
  })
}
