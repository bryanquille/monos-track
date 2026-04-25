import { Link } from "@tanstack/react-router"
import { cn } from "../../../utils/cn"

interface LoginButtonProps {
  handleClick?: () => void
  isBorderIncluded?: boolean 
}

function LoginButton({ handleClick, isBorderIncluded }: LoginButtonProps) {
  return (
    <Link
      to="/login"
      className={cn(
        '[&.active]:font-semibold',
        {
          'border-2 border-primary rounded-md': isBorderIncluded
        }
      )}
      onClick={handleClick}
    >
      Iniciar Sesión
    </Link>
  )
}

export default LoginButton