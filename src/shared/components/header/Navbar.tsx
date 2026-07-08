import { cn } from "../../utils/cn"
import { useHambMenu } from "../../stores/hambMenuStore"
import LoginButton from "../../../features/auth/components/LoginButton"
import RegisterButton from "../../../features/auth/components/RegisterButton"
import { useAuthStore } from "../../stores/authStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import DarkThemeButton from "../../../shared/components/DarkThemeButton";

interface NavbarProps {
  headerHeight: number
  headerWidth: number
  headerLeftPosition: number
}

function Navbar({ headerHeight, headerWidth, headerLeftPosition }: NavbarProps) {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    closeHambMenu()
    await logout()
    navigate({ to: '/' })
  }

  return (
    <nav
      style={{
        '--header-offset-top': `${headerHeight + 28}px`,
        '--header-offset-left': `${headerWidth + headerLeftPosition}px`
      } as React.CSSProperties}
      className={cn(
        "fixed top-(--header-offset-top) left-(--header-offset-left) w-3/5 p-4 flex flex-col justify-center items-center gap-3 rounded-xl bg-white transform transition-transform duration-300 md:relative md:inset-0 md:w-[unset] md:ml-auto md:p-0 md:translate-0 md:bg-[unset] lg:gap-8 dark:bg-tertiary-dark dark:text-neutral-dark md:dark:bg-[unset]",
        {
          "-translate-x-full": isHambMenuOpen,
          "translate-x-[300%]": isHambMenuOpen === false,
        }
      )}
    >
      {user ? (
        <>
          <DarkThemeButton className={cn('ml-auto md:hidden')} />
          <ul className={cn('w-full h-full flex flex-col justify-center items-end gap-3 text-right md:flex-row lg:gap-6')}>
            <li>
              <Link
                to="/dashboard"
                onClick={closeHambMenu}
              >
                Panel principal
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/movements"
                onClick={closeHambMenu}
              >
                Registrar Movimientos
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                onClick={closeHambMenu}
              >
                Perfil
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={handleLogout}
            className={cn('w-full cursor-pointer flex justify-end items-center gap-1 md:hidden')}
          >
            <span>Cerrar sesión</span> <LogOut />
          </button>
        </>
      ) : (
        <ul className={cn('w-full h-full flex flex-col justify-center items-center gap-4 md:flex-row md:gap-6')}>
          <li>
            <LoginButton
              handleClick={closeHambMenu}
              className={cn('border-b-4 border-b-transparent [&.active]:font-semibold hover:border-b-primary transition-colors duration-200')}
            />
          </li>
          <li>
            <RegisterButton
              handleClick={closeHambMenu}
              className="cursor-pointer px-4 py-2.5 rounded-md bg-primary text-neutral-dark hover:bg-primary/80 transition-all duration-200"
            />
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar