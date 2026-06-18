import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

interface FinancialSummary {
  totalIncome: string
  totalExpenses: string
  balance: string
}

export const useFinancialSummary = () => {
  return useQuery<FinancialSummary>({
    queryKey: ['financial-summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('amount, movement_type')

      if (error) throw new Error(error.message)

      if (!data) return {
        totalIncome: '00.00',
        totalExpenses: '00.00',
        balance: '00.00'
      }

      const income = data
        .filter((item) => item.movement_type === 'income')
        .reduce((sum, item) => sum + Number(item.amount), 0)

      const expenses = data
        .filter((item) => item.movement_type === 'expense')
        .reduce((sum, item) => sum + Number(item.amount), 0)

      return {
        totalIncome: income.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        totalExpenses: expenses.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        balance: (income - expenses).toLocaleString('en-US', { minimumFractionDigits: 2 })
      }
    }
  })
}
