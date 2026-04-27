import { Link } from "@tanstack/react-router"
import { cn } from "../../../utils/cn"

interface RegisterButtonProps {
  handleClick?: () => void
  text?: string
  bgColor?: string
  textColor?: string
  padding?: [number?, number?]
  fontSize?: number
}

function RegisterButton({
  handleClick,
  text = "Registrarse",
  bgColor,
  textColor,
  padding,
  fontSize
}: RegisterButtonProps) {
  return (
    <Link
      to="/register"
      style={{
        '--bg-color': `${bgColor}`,
        '--padding-x': `${padding && padding[0]}px`,
        '--padding-y': `${padding && padding[1]}px`,
        '--font-size': `${fontSize}px`,
        color: (textColor ? textColor : 'white')
      } as React.CSSProperties}
      className={cn(
        'rounded-lg [&.active]:font-semibold',
        bgColor ? 'bg-(--bg-color) hover:bg-(--bg-color)/80' : 'bg-primary hover:bg-primary/80',
        padding ? 'px-(--padding-x) py-(--padding-y)' : 'px-4 py-2',
        fontSize ? 'text-(--font-size)' : 'text-base'
      )}
      onClick={handleClick}
    >
      {text}
    </Link>
  )
}

export default RegisterButton