import { useState } from "react";

export const useCarryOverBalance = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [previousBalance, setPreviousBalance] = useState(0)

  

  return {
    showPrompt,
    previousBalance,
    setShowPrompt
  }
}
