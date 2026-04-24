import { Link } from "@tanstack/react-router"
import { cn } from "../../../utils/cn"
import { useHambMenu } from "../../../store/hambMenuStore"

function Navbar() {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)

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
        onClick={closeHambMenu}
      >
        Home
      </Link>{' '}
      <Link
        to="/register"
        className="[&.active]:font-bold"
        onClick={closeHambMenu}
      >
        Register
      </Link>
    </nav>
  )
}

export default Navbar