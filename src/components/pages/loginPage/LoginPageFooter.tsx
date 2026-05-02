import RegisterButton from "../../../features/auth/components/RegisterButton"

function LoginPageFooter() {
  return (
    <footer className='w-[95%] mt-8 text-center'>
      <p>
        <span className='dark:text-neutral-light'>¿No tienes una cuenta? </span>
        <RegisterButton
          text='Registrate aquí'
          className='text-primary font-semibold hover:text-primary/80 transition-all duration-200'
        />
      </p>
    </footer>
  )
}

export default LoginPageFooter