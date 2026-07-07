import logo from '../../../assets/images/monos-track-logo-circle.png'
import DarkThemeButton from '../../../shared/components/DarkThemeButton';
import LoginForm from '../components/LoginForm';
import RegisterButton from '../components/RegisterButton';

function LoginPage() {
  return (
    <>
      <div className='relative w-full flex flex-row-reverse justify-center items-center'>
        <DarkThemeButton className='absolute top-4 right-6' />
        <section className='w-full h-screen flex flex-col justify-center items-center md:w-[50%] dark:bg-primary-dark dark:shadow-xl/50 dark:shadow-neutral-light'>
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
          <LoginForm />
          <footer className='w-[95%] mt-8 text-center'>
            <p>
              <span className='dark:text-neutral-light'>¿No tienes una cuenta? </span>
              <RegisterButton
                text='Registrate aquí'
                className='text-primary font-semibold hover:text-primary/80 transition-all duration-200'
              />
            </p>
          </footer>
        </section>
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
      </div>
    </>
  )
}

export default LoginPage