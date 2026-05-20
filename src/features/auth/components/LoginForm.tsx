import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { LoginSchema, type LoginData } from "../schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { cn } from "../../../utils/cn";
import { useShowPassword } from "../../../hooks/useShowPassword";
import Loader from "../../../components/ui/Loader";

function LoginForm() {
  const { showPassword, toggleShowPassword } = useShowPassword()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginData) => {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (signInError) throw signInError
    },
    onSuccess: () => {
      navigate({ to: '/dashboard' })
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    mutate(data)
    reset()
  }

  if (isPending) return <Loader className="mt-10" text="Iniciando sesión" />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-[85%] max-w-100 mt-4 p-6 flex flex-col gap-4 rounded-xl dark:bg-secondary-light dark:shadow-sm dark:shadow-neutral-light/50'
    >
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
          {...register('email')}
          className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.email.message}
          </p>
        )}
      </div>
      <div className='relative flex flex-col gap-1.5'>
        <label
          htmlFor="password"
          className='dark:text-neutral-dark'
        >
          Contraseña
        </label>
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder='••••••••'
            {...register('password')}
            className='w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
          />
          <button
            type="button"
            className='absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 dark:text-neutral-dark'
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeOff className='dark:text-neutral-dark/70 hover:opacity-70 transition-all duration-200' />
            ) : (
              <Eye className='dark:text-neutral-dark/70 hover:opacity-70 transition-all duration-200' />
            )}
          </button>
        </div>
        {errors.password && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          'cursor-pointer p-2 flex justify-center items-center gap-2 rounded-md bg-primary text-white font-bold text-2xl transition-all duration-200 hover:bg-primary/80',
          isPending ? 'bg-primary/50 cursor-not-allowed' : '',
        )}
      >
        <span>Iniciar sesión</span>
        <ArrowRight className='stroke-3' />
      </button>
    </form>
  )
}

export default LoginForm