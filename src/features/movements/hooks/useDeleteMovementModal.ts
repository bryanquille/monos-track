import { useState } from "react";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";

export const useDeleteMovementModal = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedMovementToDelete, setSelectedMovementToDelete] = useState<FinancialDataListTypes | null>(null)

  const handleOpenDelete = (movement: FinancialDataListTypes) => {
    setIsDeleteModalOpen(true)
    setSelectedMovementToDelete(movement)
  }

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false)
    setSelectedMovementToDelete(null)
  }

  return {
    isDeleteModalOpen,
    selectedMovementToDelete,
    handleOpenDelete,
    handleCloseDelete
  }
}