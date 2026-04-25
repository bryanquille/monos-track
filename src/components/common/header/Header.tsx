import Navbar from "./Navbar"
import HamburguerMenuButton from "./HamburguerMenuButton"
import BrandLogo from "./BrandLogo"
import BackScreen from "./BackScreen"

function Header() {
  return (
    <>
      <BackScreen />
      <header className="relative z-40 w-[95%] mt-2.5 px-4 py-2 flex justify-between items-center gap-2 rounded-xl bg-white">
        <BrandLogo />
        <HamburguerMenuButton />
        <Navbar />
      </header>
    </>
  )
}

export default Header