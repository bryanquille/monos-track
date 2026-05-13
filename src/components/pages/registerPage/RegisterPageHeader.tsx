import logo from "../../../assets/images/monos-track-logo-circle.png"
import { cn } from "../../../utils/cn"

function RegisterPageHeader() {
  return (
    <header className={cn('flex flex-col-reverse justify-center items-center gap-4 md:max-w-120')}>
      <div>
        <h1 className={cn('sr-only')}>Registro</h1>
        <strong className={cn('font-semibold dark:text-neutral-dark md:block md:text-center md:text-xl')}>Comienza ahora</strong>
        <p className={cn('text-gray-text text-pretty dark:text-neutral-light md:text-center md:mt-4')}>Registrate para gestionar tus movimientos con precisión técnica.</p>
      </div>
      <div className={cn('flex justify-center items-center gap-1 lg:hidden')}>
        <img
          src={logo}
          alt="Monos Track Logo"
          className='w-14'
        />
        <strong className='font-bold text-2xl text-primary-dark dark:text-neutral-dark md:text-4xl'>Monos Track</strong>
      </div>
    </header>
  )
}

export default RegisterPageHeader