import { Link } from "@tanstack/react-router"
import { useHambMenu } from "../../../store/hambMenuStore"

function BrandLogo() {
  const closeHambMenu = useHambMenu((state) => state.closeHambMenu)

  return (
    <Link
      to='/'
      className='flex items-center gap-1.5'
      onClick={closeHambMenu}
    >
      <img
        src="/src/assets/images/monos-track-logo-circle.png"
        alt="Logotipo de Monos Track"
        className='w-9'
      />
      <strong className="font-Plus-Jakarta-Sans text-gray-text text-lg">Monos Track</strong>
    </Link>
  )
}

export default BrandLogo