import logo from '../../../assets/images/monos-track-logo-circle.png'

function LoginPageLeftSide() {
  return (
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
  )
}

export default LoginPageLeftSide