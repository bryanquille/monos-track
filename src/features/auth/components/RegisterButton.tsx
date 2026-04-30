import { Link } from "@tanstack/react-router"
import type { ComponentPropsWithoutRef } from "react"

interface RegisterButtonProps extends ComponentPropsWithoutRef<'a'> {
  handleClick?: () => void
  text?: string
}

function RegisterButton({
  handleClick,
  text = "Registrarse",
  ...props
}: RegisterButtonProps) {
  return (
    <Link
      to="/register"
      onClick={handleClick}
      {...props}
    >
      {text}
    </Link>
  )
}

export default RegisterButton