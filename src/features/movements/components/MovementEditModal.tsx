import { useForm } from "react-hook-form";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";
import { useUpdateMovement } from "../hooks/useUpdateMovement";
import { useEffect } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../../shared/constants/constants";

interface MovementEditModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  movement: FinancialDataListTypes | null
}

export interface EditFormValues {
  amount: number
  category: string
  movement_date: string
  payment_method: string
  description: string
  receiptUpload: FileList | null
}

function MovementEditModal({ isOpen, onClose, movement }: MovementEditModalPropsTypes) {
  const { register, handleSubmit, reset } = useForm<EditFormValues>()
  const { mutate: updateMovement, isPending } = useUpdateMovement()

  useEffect(() => {
    if (movement) {
      reset({
        amount: movement.amount,
        category: movement.category,
        movement_date: movement.movement_date,
        payment_method: movement.payment_method,
        description: movement.description || '',
        receiptUpload: null
      })
    }
  }, [movement, reset])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const onSubmit = (data: EditFormValues) => {
    updateMovement(
      {
        id: movement?.id,
        data,
        oldReceiptPath: movement?.receipt_path
      },
      {
        onSuccess: () => { onClose() }
      }
    )
  }

  const categories = movement?.movement_type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  return (
    <div></div>
  )
}

export default MovementEditModal