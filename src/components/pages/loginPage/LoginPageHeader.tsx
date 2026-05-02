import logo from '../../../assets/images/monos-track-logo-circle.png'

function LoginPageHeader() {
  return (
    <header className='w-full flex flex-col-reverse justify-center items-center'>
      <div className='w-[95%] mt-6 text-center'>
        <h1 className='text-2xl font-bold dark:text-neutral-dark'>Bienvenido de nuevo</h1>
        <p className='dark:text-neutral-light'>Ingresa a tu cuenta para continuar</p>
      </div>
      <div className='w-[95%] flex flex-col justify-center items-center gap-1 md:hidden'>
        <img
          src={logo}
          alt="Monos Track Logo"
          className='w-14'
        />
        <strong className='font-bold text-2xl dark:text-neutral-dark'>Monos Track</strong>
      </div>
    </header>
  )
}

export default LoginPageHeader