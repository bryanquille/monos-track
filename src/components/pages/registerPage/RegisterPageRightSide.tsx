import RegisterForm from "../../../features/auth/components/RegisterForm";
import { cn } from "../../../utils/cn";
import RegisterPageFooter from "./RegisterPageFooter";
import RegisterPageHeader from "./RegisterPageHeader";

function RegisterPageRightSide() {
  return (
    <section className={cn('w-full h-full min-h-screen p-8 flex flex-col justify-center items-center gap-4 dark:bg-primary-dark dark:shadow-xl/50 dark:shadow-neutral-light lg:w-1/2')}>
      <RegisterPageHeader />
      <RegisterForm />
      <hr className={cn('w-full border border-gray-text/50 dark:border-neutral-light md:max-w-120')} />
      <RegisterPageFooter />
    </section>
  )
}

export default RegisterPageRightSide