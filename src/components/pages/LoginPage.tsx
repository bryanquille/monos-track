import { ArrowRight } from 'lucide-react'
import logo from '../../assets/images/monos-track-logo-circle.png'
import RegisterButton from '../../features/auth/components/RegisterButton'

function LoginPage() {
  return (
    <>
      <div className='w-[95%] mt-10 flex flex-col justify-center items-center'>
        <img
          src={logo}
          alt="Monos Track Logo"
          className='w-14'
        />
        <strong className='text-xl'>Monos Track</strong>
      </div>
      <div className='w-[95%] mt-6 text-center'>
        <h1 className='text-2xl font-bold'>Bienvenido de nuevo</h1>
        <p>Ingresa a tu cuenta para continuar</p>
      </div>
      <form className='w-[85%] mt-6 flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className='p-2 border-2 border-secondary-light/70 rounded-sm'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className='p-2 border-2 border-secondary-light/70 rounded-sm'
          />
        </div>
        <button
          type="submit"
          className='p-2 flex justify-center items-center gap-2 rounded-sm bg-primary text-white font-bold text-2xl'
        >
          <span>Iniciar sesión</span>
          <ArrowRight className='stroke-3' />
        </button>
      </form>
      <div className='w-[95%] mt-8 text-center'>
        <p>
          <span>¿No tienes una cuenta? </span>
          <RegisterButton
            text='Registrate aquí'
            className='text-primary font-semibold'
          />
        </p>
      </div>
    </>
  )
}

export default LoginPage