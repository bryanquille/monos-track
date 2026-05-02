import { ArrowRight, Eye } from "lucide-react"

function LoginForm() {
  return (
    <form className='w-[85%] max-w-100 mt-4 p-6 flex flex-col gap-4 rounded-xl dark:bg-secondary-light dark:shadow-sm dark:shadow-neutral-light/50'>
      <div className='flex flex-col gap-1.5'>
        <label
          htmlFor="email"
          className='dark:text-neutral-dark'
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder='john_doe@email.com'
          autoComplete='email'
          className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
        />
      </div>
      <div className='relative flex flex-col gap-1.5'>
        <label
          htmlFor="password"
          className='dark:text-neutral-dark'
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          placeholder='••••••••'
          className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
        />
        <button
          type="button"
          className='absolute right-4 top-1/2 cursor-pointer transform translate-y-1/6 dark:text-neutral-dark'
        >
          <Eye className='dark:text-neutral-dark/70 hover:opacity-70 transition-all duration-200' />
        </button>
      </div>
      <button
        type="submit"
        className='cursor-pointer p-2 flex justify-center items-center gap-2 rounded-md bg-primary text-white font-bold text-2xl transition-all duration-200 hover:bg-primary/80'
      >
        <span>Iniciar sesión</span>
        <ArrowRight className='stroke-3' />
      </button>
    </form>
  )
}

export default LoginForm