import logo from '../../../assets/images/monos-track-logo-circle.png'
import { cn } from '../../../utils/cn';
import DarkThemeButton from '../../../shared/components/DarkThemeButton';
import LoginButton from '../components/LoginButton';
import RegisterForm from '../components/RegisterForm';
import { ChartNoAxesCombined, ShieldCheck } from 'lucide-react';

function RegisterPage() {
  return (
    <div className={cn('relative w-full flex flex-row-reverse')}>
      <DarkThemeButton className='absolute top-4 right-6' />
      <section className={cn('w-full h-full min-h-screen p-8 flex flex-col justify-center items-center gap-4 dark:bg-primary-dark dark:shadow-xl/50 dark:shadow-neutral-light lg:w-1/2')}>
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
        <RegisterForm />
        <hr className={cn('w-full border border-gray-text/50 dark:border-neutral-light md:max-w-120')} />
        <footer className={cn('flex justify-center items-center gap-1.5 md:max-w-120')}>
          <p className={cn('text-gray-text dark:text-neutral-light')}>¿Ya tienes una cuenta? </p>
          <LoginButton
            className='text-primary font-semibold hover:text-primary/80 transition-all duration-200'
            text='Inicia Sesión'
          />
        </footer>
      </section>
      <div className={cn('hidden lg:w-1/2 lg:p-12 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4 lg:bg-linear-180 lg:from-primary/70 lg:to-primary/20 dark:bg-linear-120 dark:from-tertiary-dark dark:to-primary-dark')}>
        <div className={cn('flex flex-col justify-center items-center gap-2')}>
          <img
            src={logo}
            alt="Monos Track Logo"
            className='w-14'
          />
          <strong className='font-bold text-2xl text-primary-dark dark:text-neutral-dark md:text-4xl'>Monos Track</strong>
        </div>
        <strong className={cn('dark:text-neutral-dark/80')}>Gestión finaciera de alto nivel.</strong>
        <p className={cn('text-center text-pretty dark:text-neutral-dark/65')}>Únete a la plataforma preferida por analístas para el seguimiento preciso de flujos de capital y activos digitales.</p>
        <div className={cn('flex justify-center items-center gap-3')}>
          <article className={cn('p-6 bg-neutral-light/40 rounded-xl dark:bg-primary-dark/60 dark:shadow-2xs dark:shadow-neutral-dark/50')}>
            <div className={cn('flex flex-col-reverse justify-center items-start gap-2')}>
              <h3 className={cn('text-lg font-semibold dark:text-neutral-dark/90')}>Seguridad bancaria</h3>
              <ShieldCheck size={30} className={cn('dark:text-neutral-light')} />
            </div>
            <p className={cn('dark:text-neutral-dark/75')}>Tus datos están encriptados con los más altos estándares.</p>
          </article>
          <article className={cn('p-6 bg-neutral-light/40 rounded-xl dark:bg-primary-dark/60 dark:shadow-2xs dark:shadow-neutral-dark/50')}>
            <div className={cn('flex flex-col-reverse justify-center items-start gap-2')}>
              <h3 className={cn('text-lg font-semibold dark:text-neutral-dark/90')}>Análisis inteligente</h3>
              <ChartNoAxesCombined size={30} className={cn('dark:text-neutral-light')} />
            </div>
            <p className={cn('dark:text-neutral-dark/75')}>Información en tiempo real sobre tus hábitos de gasto.</p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage