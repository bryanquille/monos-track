
import { ChartNoAxesCombined, ShieldCheck } from 'lucide-react';
import logo from '../../../assets/images/monos-track-logo-circle.png'
import { cn } from '../../../utils/cn';
import LoginButton from '../../../features/auth/components/LoginButton';

function RegisterPage() {
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
        <form className={cn(
          'w-full grid grid-cols-2 gap-3',
        )}>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="firstName">Nombre(s)</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Alejandro"
              className={cn('w-full px-4 py-2.5 border-2 border-primary-dark rounded-lg')}
            />
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="lastName">Apellido(s)</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Martínez"
              className={cn('w-full px-4 py-2.5 border-2 border-primary-dark rounded-lg')}
            />
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="alejandro_martinez@email.com"
              className={cn('w-full px-4 py-2.5 border-2 border-primary-dark rounded-lg')}
            />
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              className={cn('w-full px-4 py-2.5 border-2 border-primary-dark rounded-lg')}
            />
          </div>
          <div className={cn('flex flex-col justify-center items-start col-span-2')}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="**********"
              className={cn('w-full px-4 py-2.5 border-2 border-primary-dark rounded-lg')}
            />
          </div>
          <div className={cn('flex justify-center items-center gap-2 col-span-2')}>
            <input
              type="checkbox"
              name="termsAndConditions"
              id="termsAndConditions"
              className={cn('transform scale-150 align-middle')}
            />
            <label htmlFor="termsAndConditions">Acepto los Términos de Servicio y la Política de Privacidad de Monos Track.</label>
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