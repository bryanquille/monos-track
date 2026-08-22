import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/lib/supabase";
import { cn } from "../../../shared/utils/cn";
import { Edit, Eye, Trash2 } from "lucide-react";

interface FinancialDataListTypes {
  amount: number
  category: string
  created_at: string
  description: string
  id: string
  movement_date: string
  movement_type: string
  payment_method: string
  receipt_path: string
  user_id: string
}

function RegisteredMovementsList() {
  const {
    data: financialDataList,
  } = useQuery<FinancialDataListTypes[]>({
    queryKey: ['financial-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .order('movement_date', { ascending: false })

      if (error) throw new Error(error.message)
      return data as FinancialDataListTypes[] ?? []
    }
  })

  // console.log(financialDataList)
  return (
    <ul>
      {financialDataList?.map(item => (
        <li key={item.id}>
          <div className={cn('pb-3 grid grid-cols-5 items-center gap-1 border-b-2 border-b-gray-600')}>
            <span>{`
              ${(new Date(item.created_at).getDate()).toString().padStart(2, '0')}
              /${(new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')}
              /${new Date(item.created_at).getFullYear()}
            `}</span>
            <span>{item.category}</span>
            <span>{item.amount}</span>
            <p>{item.description}</p>
            <div className={cn('flex justify-center items-center gap-1.5')}>
              <button type="button">
                <Edit />
              </button>
              <button type="button">
                <Trash2 />
              </button>
              <button type="button">
                <Eye />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RegisteredMovementsList