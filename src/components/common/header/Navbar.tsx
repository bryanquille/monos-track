import { cn } from "../../../utils/cn"
import { useHambMenu } from "../../../store/hambMenuStore"
import LoginButton from "../../../features/auth/components/LoginButton"
import RegisterButton from "../../../features/auth/components/RegisterButton"

function Navbar() {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)

  return (
    <nav className={cn(
      "fixed top-[12%] right-[calc(10%/4)] w-1/2 p-4 flex flex-col justify-center items-center gap-3 rounded-xl bg-white transform transition-transform duration-300 md:relative md:inset-0 md:w-[unset] md:p-0 md:flex-row md:gap-6 md:translate-0 md:bg-[unset]",
      {
        "translate-x-0": isHambMenuOpen,
        "translate-x-[300%]": isHambMenuOpen === false,
      }
    )}>
      <LoginButton
        handleClick={closeHambMenu}
      />
      <RegisterButton
        handleClick={closeHambMenu}
      />
    </nav>
  )
}

export default Navbar