import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/lib/supabase";

interface FinancialDataListTypes {
  movement_type: string;
  amount: number;
  category: string;
  payment_method: string;
  movement_date: string;
  created_at: string;
  receipt_path: string;
}

function RegisteredMovementsList() {
  const {
    data: financialDataList,
  } = useQuery<FinancialDataListTypes[]>({
    queryKey: ['financial-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('movement_type, amount, category, payment_method, movement_date, created_at, receipt_path')

      if (error) throw new Error(error.message)
      return data as FinancialDataListTypes[]
    }
  })

  console.log(financialDataList)
  return (
    <div>RegisteredMovementsList</div>
  )
}

export default RegisteredMovementsList