import { useState } from "react";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";

export const useReadMovement = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedMovement, setSelectedMovement] = useState<FinancialDataListTypes | null>(null)

  const handleViewDetails = (movement: FinancialDataListTypes) => {
    setSelectedMovement(movement)
    setIsDetailsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMovement(null);
  };

  return {
    isDetailsModalOpen,
    selectedMovement,
    handleViewDetails,
    handleCloseModal
  }
}
