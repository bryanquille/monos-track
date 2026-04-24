import { useState } from "react"
import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"

function Header() {
  const [isHambMenuOpen, setIsHambMenuOpen] = useState(false)

  const toggleHambMenu = () => {
    setIsHambMenuOpen(!isHambMenuOpen)
  }

  const closeHambMenu = () => {
    setIsHambMenuOpen(false)
  }

  return (
    <>
      <BackScreen isHambMenuOpen={isHambMenuOpen} />
      <header className="relative w-[95%] mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-mist-50">
        <BrandLogo />
        <HamburguerMenuButton
          isHambMenuOpen={isHambMenuOpen}
          handleClick={toggleHambMenu}
        />
        <Navbar
          isHambMenuOpen={isHambMenuOpen}
          handleClick={closeHambMenu}
        />
      </header>
    </>
  )
}

export default Header