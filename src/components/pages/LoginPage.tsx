import { ArrowRight, Eye } from 'lucide-react'
import logo from '../../assets/images/monos-track-logo-circle.png'
import RegisterButton from '../../features/auth/components/RegisterButton'

function LoginPage() {
  return (
    <>
      <div className='w-full flex justify-center items-center'>
        <div className='hidden w-[50%] h-screen md:flex md:flex-col justify-center items-center gap-2 bg-radial from-secondary-dark from-5% to-primary dark:from-secondary-light dark:from-30% dark:to-primary-dark'>
          <div className='w-[90%] max-w-107.5 mt-10 flex flex-col justify-center items-center gap-1 md:mt-[unset] md:flex-row md:gap-2 lg:w-[85%]'>
            <img
              src={logo}
              alt="Monos Track Logo"
              className='w-14'
            />
            <strong className='font-bold text-2xl text-primary-dark dark:text-neutral-dark md:text-4xl'>Monos Track</strong>
          </div>
          <p className='w-[90%] max-w-107.5 text-center text-lg text-primary-dark/70 lg:w-[85%] dark:text-neutral-dark/70'>El centro de mando para tus activos financieros. Seguro, rápido y diseñado para la precisión.</p>
          <div className="w-[90%] max-w-100 mt-10 bg-surface-container-low rounded-xl p-4 h-48 border border-neutral-dark bg-neutral-dark/90 hidden md:flex md:items-end md:gap-2 lg:w-[85%] dark:bg-primary-dark/80">
            <div className="flex-1 bg-primary/40 rounded-t-lg h-[40%]"></div>
            <div className="flex-1 bg-primary/60 rounded-t-lg h-[60%]"></div>
            <div className="flex-1 bg-primary/50 rounded-t-lg h-[50%]"></div>
            <div className="flex-1 bg-primary rounded-t-lg h-[90%]"></div>
            <div className="flex-1 bg-primary/80 rounded-t-lg h-[75%]"></div>
            <div className="flex-1 bg-primary/40 rounded-t-lg h-[30%]"></div>
          </div>
        </div>
        <div className='w-full h-screen flex flex-col justify-center items-center md:w-[50%] dark:bg-primary-dark dark:shadow-xl/50 dark:shadow-neutral-light'>
          <div className='w-[95%] mt-10 flex flex-col justify-center items-center gap-1 md:hidden'>
            <img
              src={logo}
              alt="Monos Track Logo"
              className='w-14'
            />
            <strong className='font-bold text-2xl dark:text-neutral-dark'>Monos Track</strong>
          </div>
          <div className='w-[95%] mt-6 text-center'>
            <h1 className='text-2xl font-bold dark:text-neutral-dark'>Bienvenido de nuevo</h1>
            <p className='dark:text-neutral-light'>Ingresa a tu cuenta para continuar</p>
          </div>
          <form className='w-[85%] max-w-100 mt-4 p-6 flex flex-col gap-4 rounded-xl dark:bg-secondary-light dark:shadow-sm dark:shadow-neutral-light/50'>
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor="email"
                className='dark:text-neutral-dark'
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder='john_doe@email.com'
                autoComplete='email'
                className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
              />
            </div>
            <div className='relative flex flex-col gap-1.5'>
              <label
                htmlFor="password"
                className='dark:text-neutral-dark'
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder='••••••••'
                className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
              />
              <button
                type="button"
                className='absolute right-4 top-1/2 cursor-pointer transform translate-y-1/6 dark:text-neutral-dark'
              >
                <Eye className='dark:text-neutral-dark/70 hover:opacity-70 transition-all duration-200' />
              </button>
            </div>
            <button
              type="submit"
              className='cursor-pointer p-2 flex justify-center items-center gap-2 rounded-md bg-primary text-white font-bold text-2xl transition-all duration-200 hover:bg-primary/80'
            >
              <span>Iniciar sesión</span>
              <ArrowRight className='stroke-3' />
            </button>
          </form>
          <div className='w-[95%] mt-8 text-center'>
            <p>
              <span className='dark:text-neutral-light'>¿No tienes una cuenta? </span>
              <RegisterButton
                text='Registrate aquí'
                className='text-primary font-semibold hover:text-primary/80 transition-all duration-200'
              />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage