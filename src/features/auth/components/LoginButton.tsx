import { Link } from "@tanstack/react-router"
import type { ComponentPropsWithoutRef } from "react";

interface LoginButtonProps extends ComponentPropsWithoutRef<'a'> {
  handleClick?: () => void
  text?: string
}

function LoginButton({ handleClick, text = 'Iniciar Sesión', ...props }: LoginButtonProps) {
  return (
    <Link
      to="/login"
      onClick={handleClick}
      {...props}
    >
      {text}
    </Link>
  )
}

export default LoginButton