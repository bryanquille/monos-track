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
    <>
      <section className={cn('w-full p-8 flex flex-col justify-center items-center gap-6')}>
        <div className={cn('flex flex-col-reverse justify-center items-center gap-4')}>
          <div>
            <h1 className={cn('sr-only')}>Registro</h1>
            <strong className={cn('font-medium')}>Comienza ahora</strong>
            <p className={cn('text-gray-text')}>Registrate para gestionar tus movimientos con precisión técnica.</p>
          </div>
          <div className={cn('flex justify-center items-center gap-1')}>
            <img
              src={logo}
              alt="Monos Track Logo"
              className='w-14'
            />
            <strong className='font-bold text-2xl text-primary-dark dark:text-neutral-dark md:text-4xl'>Monos Track</strong>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            'w-full p-6 grid grid-cols-2 gap-3 inset-shadow-sm inset-shadow-neutral-light rounded-xl',
          )}
        >
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="firstName">Nombre(s)</label>
            <input
              type="text"
              id="firstName"
              placeholder="Alejandro"
              className={cn('w-full px-4 py-2.5 border-2 border-secondary-light/70 rounded-lg')}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="lastName">Apellido(s)</label>
            <input
              type="text"
              id="lastName"
              placeholder="Martínez"
              className={cn('w-full px-4 py-2.5 border-2 border-secondary-light/70 rounded-lg')}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="alejandro_martinez@email.com"
              className={cn('w-full px-4 py-2.5 border-2 border-secondary-light/70 rounded-lg')}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              className={cn('w-full px-4 py-2.5 border-2 border-secondary-light/70 rounded-lg')}
              {...register('password')}
            />
            {errors.password && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="**********"
              className={cn('w-full px-4 py-2.5 border-2 border-secondary-light/70 rounded-lg')}
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
                className={cn('transform scale-150 align-middle')}
                {...register('termsAndConditions')}
              />
              <label htmlFor="termsAndConditions">Acepto los Términos de Servicio y la Política de Privacidad de Monos Track.</label>
            </div>
            {errors.termsAndConditions && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.termsAndConditions.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={cn('p-2.5 flex flex-col justify-center items-center col-span-2 rounded-lg font-semibold text-lg bg-primary text-neutral-dark hover:bg-primary/70')}
          >
            Crear cuenta
          </button>
        </form>
        <hr className={cn('w-full border border-gray-text')} />
        <p>
          <span className={cn('text-gray-text')}>¿Ya tienes una cuenta? </span>
          <LoginButton />
        </p>
      </section>
      <section className={cn('hidden')}>
        <div>
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
    </>
  )
}

export default RegisterPage