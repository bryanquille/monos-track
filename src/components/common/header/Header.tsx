import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"
import { useElementHeight } from "../../../hooks/useElementWidthHeight"
import DarkThemeButton from "../../ui/DarkThemeButton"
import { useAuthStore } from "../../../store/authStore";
import { LogOut, UserCircle } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useNavigate } from "@tanstack/react-router";
import SignedInNavbar from "./SignedInNavbar";

function Header() {
  const { elementHeight, elementWidth, elementRef } = useElementHeight()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate({ to: '/' })
  }

  return (
    <>
      <BackScreen />
      <header
        ref={elementRef}
        className="relative z-40 w-[95%] max-w-7xl mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-white lg:px-8 dark:bg-tertiary-dark dark:text-neutral-dark"
      >
        <BrandLogo />
        <div className="grow flex flex-row-reverse justify-evenly items-center">
          {user ? (
            <>
              <SignedInNavbar 
                headerHeight={elementHeight}
                headerWidth={elementWidth}
              />
              <div className={cn('ml-auto flex justify-center items-center gap-2')}>
                <DarkThemeButton />
                <p>{user?.user_metadata.first_name} {user?.user_metadata.last_name}</p>
                <button
                  type="button"
                  className={cn('cursor-pointer')}
                >
                  <UserCircle />
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={cn('cursor-pointer')}
                >
                  <LogOut />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="ml-auto flex justify-center items-center gap-4">
                <DarkThemeButton />
                <HamburguerMenuButton />
              </div>
              <Navbar
                headerHeight={elementHeight}
                headerWidth={elementWidth}
              />
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default Header