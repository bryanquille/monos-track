import { ChartNoAxesCombined, ShieldCheck } from 'lucide-react';
import logo from '../../../assets/images/monos-track-logo-circle.png'
import { cn } from '../../../utils/cn';
import LoginButton from '../../../features/auth/components/LoginButton';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { RegisterSchema, type RegisterData } from '../../../features/auth/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  })
  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    console.log(data)
  }

  return (
    <div className={cn('w-full flex flex-row-reverse justify-center items-center')}>
      <section className={cn('w-full min-h-screen p-8 flex flex-col justify-center items-center gap-4 dark:bg-primary-dark dark:shadow-xl/50 dark:shadow-neutral-light lg:w-1/2')}>
        <header className={cn('flex flex-col-reverse justify-center items-center gap-4 md:max-w-120')}>
          <div>
            <h1 className={cn('sr-only')}>Registro</h1>
            <strong className={cn('font-semibold dark:text-neutral-dark md:block md:text-center md:text-xl')}>Comienza ahora</strong>
            <p className={cn('text-gray-text dark:text-neutral-light md:text-center md:mt-4')}>Registrate para gestionar tus movimientos con precisión técnica.</p>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            'w-full p-6 grid grid-cols-2 gap-3 inset-shadow-sm inset-shadow-neutral-light rounded-xl dark:inset-shadow-[unset] dark:bg-secondary-light dark:shadow-sm dark:shadow-neutral-light/50 md:max-w-120',
          )}
        >
          <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 md:col-span-1')}>
            <label
              htmlFor="firstName"
              className='dark:text-neutral-dark'
            >
              Nombre(s)
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Alejandro"
              className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 md:col-span-1')}>
            <label
              htmlFor="lastName"
              className='dark:text-neutral-dark'
            >
              Apellido(s)
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Martínez"
              className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2')}>
            <label
              htmlFor="email"
              className='dark:text-neutral-dark'
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="alejandro_martinez@email.com"
              className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2')}>
            <label
              htmlFor="password"
              className='dark:text-neutral-dark'
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              {...register('password')}
            />
            {errors.password && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2')}>
            <label
              htmlFor="confirmPassword"
              className='dark:text-neutral-dark'
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="**********"
              className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className={cn('w-full flex flex-col justify-center items-start col-span-2')}>
            <div className={cn('flex justify-center items-center gap-4')}>
              <input
                type="checkbox"
                id="termsAndConditions"
                className={cn('cursor-pointer transform scale-150 align-middle')}
                {...register('termsAndConditions')}
              />
              <label
                htmlFor="termsAndConditions"
                className='dark:text-neutral-dark'
              >
                Acepto los Términos de Servicio y la Política de Privacidad de Monos Track.
              </label>
            </div>
            {errors.termsAndConditions && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.termsAndConditions.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={cn('cursor-pointer p-2.5 flex flex-col justify-center items-center col-span-2 rounded-lg font-semibold text-lg bg-primary text-neutral-dark hover:bg-primary/70 dark:text-primary-dark')}
          >
            Crear cuenta
          </button>
        </form>
        <hr className={cn('w-full border border-gray-text/50 dark:border-neutral-light md:max-w-120')} />
        <footer className={cn('flex justify-center items-center gap-1.5 md:max-w-120')}>
          <p className={cn('text-gray-text dark:text-neutral-light')}>¿Ya tienes una cuenta? </p>
          <LoginButton
            className='text-primary font-semibold hover:text-primary/80 transition-all duration-200'
            text='Inicia Sesión'
          />
        </footer>
      </section>
      <section className={cn('hidden lg:w-1/2 lg:min-h-screen lg:p-12 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4 lg:bg-linear-180 lg:from-primary/70 lg:to-primary/20')}>
        <div className={cn('flex flex-col justify-center items-center gap-2')}>
          <img
            src={logo}
            alt="Monos Track Logo"
            className='w-14'
          />
          <strong className='font-bold text-2xl text-primary-dark dark:text-neutral-dark md:text-4xl'>Monos Track</strong>
        </div>
        <strong>Gestión finaciera de alto nivel.</strong>
        <p>Únete a la plataforma preferida por analístas para el seguimiento preciso de flujos de capital y activos digitales.</p>
        <div>
          <article>
            <div>
              <h3>Seguridad bancaria</h3>
              <ShieldCheck />
            </div>
            <p>Tus datos están encriptados con los más altos estándares.</p>
          </article>
          <article>
            <div>
              <h3>Análisis inteligente</h3>
              <ChartNoAxesCombined />
            </div>
            <p>Información en tiempo real sobre tus hábitos de gasto.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage