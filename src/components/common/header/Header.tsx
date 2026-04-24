import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"

function Header() {
  return (
    <>
      <BackScreen />
      <header className="relative w-[95%] mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-mist-50">
        <BrandLogo />
        <HamburguerMenuButton />
        <Navbar />
      </header>
    </>
  )
}

export default Header