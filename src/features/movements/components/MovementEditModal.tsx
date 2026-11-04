import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";

interface MovementEditModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  movement: FinancialDataListTypes | null
}

export interface EditFormValues {
  amount: string
  category: string
  movement_date: string
  payment_method: string
  description: string
  receiptUpload: FileList | null
}

function MovementEditModal({ isOpen, onClose, movement }: MovementEditModalPropsTypes) {
  return (
    <div>MovementEditModal</div>
  )
}

export default MovementEditModal