import logo from '../../assets/images/monos-track-logo-circle.png'
import RegisterButton from '../../features/auth/components/RegisterButton'

function LoginPage() {
  return (
    <>
      <div>
        <img
          src={logo}
          alt="Monos Track Logo"
          className='w-14'
        />
        <strong>Monos Track</strong>
      </div>
      <div>
        <h1 className='text-2xl font-bold'>Bienvenido de nuevo</h1>
        <p>Ingresa a tu cuenta para continuar</p>
      </div>
      <form>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" />
        <button type="submit">Iniciar sesión</button>
      </form>
      <div>
        <p>
          <span>¿No tienes una cuenta? </span>
          <RegisterButton
            text='Registrate aquí'
          />
        </p>
      </div>
    </>
  )
}

export default LoginPage