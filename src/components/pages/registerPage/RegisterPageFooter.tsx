import LoginButton from "../../../features/auth/components/LoginButton";
import { cn } from "../../../utils/cn";

function RegisterPageFooter() {
  return (
    <footer className={cn('flex justify-center items-center gap-1.5 md:max-w-120')}>
      <p className={cn('text-gray-text dark:text-neutral-light')}>¿Ya tienes una cuenta? </p>
      <LoginButton
        className='text-primary font-semibold hover:text-primary/80 transition-all duration-200'
        text='Inicia Sesión'
      />
    </footer>
  )
}

export default RegisterPageFooter