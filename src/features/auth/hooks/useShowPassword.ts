import { useState } from "react";

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return {
    showPassword,
    toggleShowPassword,
  }
}
