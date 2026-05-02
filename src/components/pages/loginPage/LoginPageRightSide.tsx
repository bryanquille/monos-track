import LoginForm from "../../../features/auth/components/LoginForm"
import LoginPageFooter from "./LoginPageFooter"
import LoginPageHeader from "./LoginPageHeader"

function LoginPageRightSide() {
  return (
    <section className='w-full h-screen flex flex-col justify-center items-center md:w-[50%] dark:bg-primary-dark dark:shadow-xl/50 dark:shadow-neutral-light'>
      <LoginPageHeader />
      <LoginForm />
      <LoginPageFooter />
    </section>
  )
}

export default LoginPageRightSide