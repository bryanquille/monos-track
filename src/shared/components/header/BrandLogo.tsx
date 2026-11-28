import { Link } from "@tanstack/react-router"
import { useHambMenu } from "../../stores/hambMenuStore"
import Logo from "../Logo"

function BrandLogo() {
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)

  return (
    <Link
      to='/'
      className='flex items-center gap-1.5'
      onClick={closeHambMenu}
    >
      <Logo className='w-9' />
      <strong className="font-Plus-Jakarta-Sans text-gray-text text-lg lg:text-xl dark:text-neutral-dark">Monos Track</strong>
    </Link>
  )
}

export default BrandLogo