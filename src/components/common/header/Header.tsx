import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"
import { useElementHeight } from "../../../hooks/useElementWidthHeight"

function Header() {
  const { elementHeight, elementWidth, elementRef } = useElementHeight()

  return (
    <>
      <BackScreen />
      <header
        ref={elementRef}
        className="relative z-40 w-[95%] mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-white"
      >
        <BrandLogo />
        <HamburguerMenuButton />
        <Navbar
          headerHeight={elementHeight}
          headerWidth={elementWidth}
        />
      </header>
    </>
  )
}

export default Header