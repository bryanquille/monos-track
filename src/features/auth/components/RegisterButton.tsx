import { Link } from "@tanstack/react-router"
import { cn } from "../../../utils/cn"

interface RegisterButtonProps {
  style?: React.CSSProperties
  handleClick?: () => void
  text?: string
}

function RegisterButton({
  style,
  handleClick,
  text = "Registrarse"
}: RegisterButtonProps) {
  return (
    <Link
      to="/register"
      className={cn(
        'px-4 py-2 rounded-lg [&.active]:font-semibold bg-primary text-white hover:bg-primary/80',
      )}
      onClick={handleClick}
      style={style}
    >
      {text}
    </Link>
  )
}

export default RegisterButton