import { cn } from "../../../utils/cn"
import { useHambMenu } from "../../../store/hambMenuStore"
import LoginButton from "../../../features/auth/components/LoginButton"
import RegisterButton from "../../../features/auth/components/RegisterButton"

interface NavbarProps {
  headerHeight: number
  headerWidth: number
}

function Navbar({ headerHeight, headerWidth }: NavbarProps) {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)

  return (
    <nav
      style={{ 
        '--header-offset-top': `${headerHeight + 20}px`,
        '--header-offset-left': `${headerWidth}px`
      } as React.CSSProperties}
      className={cn(
        "fixed top-(--header-offset-top) left-(--header-offset-left) w-1/2 p-4 flex flex-col justify-center items-center gap-3 rounded-xl bg-white transform transition-transform duration-300 md:relative md:inset-0 md:w-[unset] md:ml-auto md:p-0 md:flex-row md:gap-6 md:translate-0 md:bg-[unset] lg:gap-8 dark:bg-tertiary-dark dark:text-neutral-dark md:dark:bg-[unset]",
        {
          "-translate-x-full": isHambMenuOpen,
          "translate-x-[300%]": isHambMenuOpen === false,
        }
      )}
    >
      <LoginButton
        handleClick={closeHambMenu}
        className={cn('border-b-4 border-b-transparent [&.active]:font-semibold hover:border-b-primary transition-colors duration-200')}
      />
      <RegisterButton
        handleClick={closeHambMenu}
        className="cursor-pointer px-4 py-2.5 rounded-md bg-primary text-neutral-dark hover:bg-primary/80 transition-all duration-200"
      />
    </nav>
  )
}

export default Navbar