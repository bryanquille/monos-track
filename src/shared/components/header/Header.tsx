import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"
import { useElementHeight } from "../../../hooks/useElementWidthHeight"
import DarkThemeButton from "../../../shared/components/DarkThemeButton"
import { useAuthStore } from "../../../store/authStore";
import { LogOut, UserCircle } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { useHambMenu } from "../../../store/hambMenuStore";

function Header() {
  const { elementHeight, elementWidth, elementLeftPosition, elementRef } = useElementHeight()
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
    <>
      <BackScreen />
      <header
        ref={elementRef}
        className={cn('relative z-40 w-[95%] max-w-7xl mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-white lg:px-8 dark:bg-tertiary-dark dark:text-neutral-dark')}
      >
        <BrandLogo />
        <div className="grow flex flex-row-reverse justify-evenly items-center">
          <div className="ml-auto flex justify-center items-center gap-4">
            {user ? (
              <>
                <DarkThemeButton className={cn('hidden md:flex')} />
                {/* TODO: Change for profile image */}
                <UserCircle size={28} className={cn('shrink-0')} />
                <button
                  type="button"
                  onClick={handleLogout}
                  className={cn('hidden w-full cursor-pointer justify-end items-center gap-1 md:flex')}
                >
                  <LogOut />
                </button>
              </>
            ) : (
              <DarkThemeButton />
            )}
            <HamburguerMenuButton />
          </div>
          <Navbar
            headerHeight={elementHeight}
            headerWidth={elementWidth}
            headerLeftPosition={elementLeftPosition}
          />
        </div>
      </header>
    </>
  )
}

export default Header