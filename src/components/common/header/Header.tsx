import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"
import { useElementHeight } from "../../../hooks/useElementWidthHeight"
import DarkThemeButton from "../../ui/DarkThemeButton"

function Header() {
  const { elementHeight, elementWidth, elementRef } = useElementHeight()

  return (
    <>
      <BackScreen />
      <header
        ref={elementRef}
        className="relative z-40 w-[95%] max-w-7xl mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-white lg:px-8 dark:bg-secondary-light dark:text-neutral-dark"
      >
        <BrandLogo />
        <div>
          <div className="flex justify-center items-center gap-4">
            <DarkThemeButton />
            <HamburguerMenuButton />
          </div>
          <Navbar
            headerHeight={elementHeight}
            headerWidth={elementWidth}
          />
        </div>
      </header>
    </>
  )
}

export default Header