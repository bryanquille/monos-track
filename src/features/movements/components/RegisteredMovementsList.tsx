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

const formatDate = (dateString: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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
    },
    refetchOnMount: true
  })

  return (
    <ul>
      <li className={cn('pb-3 grid grid-cols-5 items-center gap-1 border-b-2 border-b-gray-600 text-2xl font-medium')}>
        <p>Fecha de registro</p>
        <p>Categoría</p>
        <p>Monto</p>
        <p>Descripción</p>
        <p>Acciones</p>
      </li>
      {financialDataList?.map(item => (
        <li key={item.id}>
          <div className={cn('pb-3 grid grid-cols-5 items-center gap-1 border-b-2 border-b-gray-600')}>
            <span>{formatDate(item.movement_date)}</span>
            <span>{item.category}</span>
            <span>{item.amount}</span>
            <p>{item.description}</p>
            <div className={cn('flex justify-center items-center gap-1.5')}>
              <button
                type="button"
                className={cn('cursor-pointer flex justify-center items-center gap-1.5')}
              >
                <Edit className={cn('hover:text-blue-500')} />
              </button>
              <button
                type="button"
                className={cn('cursor-pointer flex justify-center items-center gap-1.5')}
              >
                <Trash2 className={cn('hover:text-red-500')} />
              </button>
              <button
                type="button"
                className={cn('cursor-pointer flex justify-center items-center gap-1.5')}
              >
                <Eye className={cn('hover:text-green-500')} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RegisteredMovementsList