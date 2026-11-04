import { useState } from "react";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";

export const useEditMovement = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedMovementToEdit, setSelectedMovementToEdit] = useState<FinancialDataListTypes | null>(null)

  const handleOpenEdit = (movement: FinancialDataListTypes) => {
    setIsEditModalOpen(true)
    setSelectedMovementToEdit(movement)
  }

  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
    setSelectedMovementToEdit(null)
  }

  return {
    isEditModalOpen,
    selectedMovementToEdit,
    handleOpenEdit,
    handleCloseEdit
  }
}
