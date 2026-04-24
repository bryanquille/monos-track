import { Link } from "@tanstack/react-router"
import { cn } from "../../../utils/cn"

interface NavbarProps {
  isHambMenuOpen: boolean
  handleClick: () => void
}

function Navbar({ isHambMenuOpen, handleClick }: NavbarProps) {
  return (
    <nav className={cn(
      "fixed top-[12%] right-[calc(10%/4)] w-1/2 p-4 flex flex-col justify-center items-center gap-2 rounded-xl bg-mist-50 transform transition-transform duration-300",
      {
        "translate-x-0": isHambMenuOpen,
        "translate-x-[300%]": isHambMenuOpen === false,
      }
    )}>
      <Link
        to="/"
        className="[&.active]:font-bold"
        onClick={handleClick}
      >
        Home
      </Link>{' '}
      <Link
        to="/register"
        className="[&.active]:font-bold"
        onClick={handleClick}
      >
        Register
      </Link>
    </nav>
  )
}

export default Navbar