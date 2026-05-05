
import { ChartNoAxesCombined, ShieldCheck } from 'lucide-react';
import logo from '../../../assets/images/monos-track-logo-circle.png'

function RegisterPage() {
  return (
    <>
      <section>
        <div>
          <h1>Registro</h1>
          <strong>Comienza ahora</strong>
          <p>Registrate para gestionar tus movimientos con precisión técnica.</p>
        </div>
        <form>
          <label htmlFor="fistName">Nombre(s)</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
          />
          <label htmlFor="lastName">Apellido(s)</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
          />
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
          />
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <div>
            <input
              type="checkbox"
              name="termsAndConditions"
              id="termsAndConditions"
            />
            <label htmlFor="termsAndConditions">Acepto los Términos de Servicio y la Política de Privacidad de Monos Track.</label>
          </div>
          <button type="submit">Crear cuenta</button>
        </form>
        <hr />
        <p>¿Ya tienes una cuenta? Inicia Sesión</p>
      </section>
      <section>
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