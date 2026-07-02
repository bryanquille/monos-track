import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

interface DbMovement {
  amount: number | string;
  movement_type: "income" | "expense";
  movement_date: string;
}

interface SupabaseQueryError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

interface GroupedMonth {
  income: number;
  expense: number;
  date: Date;
  year: number;
}

interface ProcessedMonth {
  label: string;
  income: number;
  expense: number;
  incomeHeight: string;
  expenseHeight: string;
}

export const useIncomesVsExpenses = () => {
  return useQuery<ProcessedMonth[]>({
    queryKey: ['movements', 'incomes-vs-expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('amount, movement_type, movement_date') as { 
          data: DbMovement[] | null; 
          error: SupabaseQueryError | null; 
        };

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return [];

      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 5);
      sixMonthsAgo.setDate(1);
      sixMonthsAgo.setHours(0, 0, 0, 0);

      const groupedData = data.reduce<Record<string, GroupedMonth>>((acc, item) => {
        const movementDate = new Date(item.movement_date);

        if (movementDate < sixMonthsAgo || movementDate > now) return acc;

        const year = movementDate.getFullYear();
        const monthIdx = movementDate.getMonth();
        const groupKey = `${year}-${monthIdx}`;

        if (!acc[groupKey]) {
          acc[groupKey] = {
            income: 0,
            expense: 0,
            date: movementDate,
            year
          };
        }

        const amount = Number(item.amount) || 0;
        if (item.movement_type === 'income') {
          acc[groupKey].income += amount;
        } else {
          acc[groupKey].expense += amount;
        }

        return acc;
      }, {});

      const monthlyArray = Object.values(groupedData);

      if (monthlyArray.length === 0) return [];

      monthlyArray.sort((a: GroupedMonth, b: GroupedMonth) => a.date.getTime() - b.date.getTime());

      let maxVal = 0;
      monthlyArray.forEach((m: GroupedMonth) => {
        if (m.income > maxVal) maxVal = m.income;
        if (m.expense > maxVal) maxVal = m.expense;
      });

      return monthlyArray.map((m: GroupedMonth): ProcessedMonth => {
        const rawIncomeHeight = maxVal > 0 ? Math.round((m.income / maxVal) * 200) : 0;
        const rawExpenseHeight = maxVal > 0 ? Math.round((m.expense / maxVal) * 200) : 0;

        const incomeHeight = m.income === 0 || rawIncomeHeight === 0 ? 1 : rawIncomeHeight;
        const expenseHeight = m.expense === 0 || rawExpenseHeight === 0 ? 1 : rawExpenseHeight;

        const monthLabel = m.date
          .toLocaleString('es-ES', { month: 'short' })
          .toLowerCase()
          .replace('.', '');

        return {
          label: `${monthLabel} ${m.year}`,
          income: m.income,
          expense: m.expense,
          incomeHeight: `${incomeHeight}px`,
          expenseHeight: `${expenseHeight}px`
        };
      });
    }
  });
};