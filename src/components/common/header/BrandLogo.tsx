import { Link } from "@tanstack/react-router"

function BrandLogo() {
  return (
    <Link to='/' className='flex items-center gap-1.5'>
      <img
        src="/src/assets/images/monos-track-logo-circle.png"
        alt="Logotipo de Monos Track"
        className='w-9'
      />
      <strong className="text-lg">Monos Track</strong>
    </Link>
  )
}

export default BrandLogo