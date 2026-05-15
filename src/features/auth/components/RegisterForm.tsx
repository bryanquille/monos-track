import { useForm, type SubmitHandler } from "react-hook-form";
import { RegisterSchema, type RegisterData } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../utils/cn";
import { supabase } from "../../../lib/supabase";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  })

  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          }
        }
      })
      if (signUpError) throw signUpError
    },
    onSuccess: () => {
      alert('¡Registro exitoso! Revisa tu correo para revisar tu cuenta.')
      navigate({ to: '/login' })
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })
  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    console.log(data)
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'w-full p-6 grid grid-cols-2 gap-3 inset-shadow-sm inset-shadow-neutral-light rounded-xl dark:inset-shadow-[unset] dark:bg-secondary-light dark:shadow-sm dark:shadow-neutral-light/50 md:max-w-120',
      )}
    >
      <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 md:col-span-1')}>
        <label
          htmlFor="firstName"
          className='dark:text-neutral-dark'
        >
          Nombre(s)
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Alejandro"
          className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('firstName')}
        />
        {errors.firstName && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 md:col-span-1')}>
        <label
          htmlFor="lastName"
          className='dark:text-neutral-dark'
        >
          Apellido(s)
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Martínez"
          className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('lastName')}
        />
        {errors.lastName && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.lastName.message}
          </p>
        )}
      </div>
      <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2')}>
        <label
          htmlFor="email"
          className='dark:text-neutral-dark'
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="alejandro_martinez@email.com"
          className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('email')}
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.email.message}
          </p>
        )}
      </div>
      <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 xl:col-span-1')}>
        <label
          htmlFor="password"
          className='dark:text-neutral-dark'
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          placeholder="**********"
          className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('password')}
        />
        {errors.password && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.password.message}
          </p>
        )}
      </div>
      <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 xl:col-span-1')}>
        <label
          htmlFor="confirmPassword"
          className='dark:text-neutral-dark'
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="**********"
          className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
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
            className={cn('cursor-pointer transform scale-150 align-middle')}
            {...register('termsAndConditions')}
          />
          <label
            htmlFor="termsAndConditions"
            className='dark:text-neutral-dark'
          >
            Acepto los Términos de Servicio y la Política de Privacidad de Monos Track.
          </label>
        </div>
        {errors.termsAndConditions && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.termsAndConditions.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          'cursor-pointer p-2.5 flex flex-col justify-center items-center col-span-2 rounded-lg font-semibold text-lg bg-primary text-neutral-dark hover:bg-primary/70 dark:text-primary-dark',
          isPending ? 'cursor-not-allowed bg-primary/50' : ''
        )}
      >
        {isPending ? 'Creando cuenta...' : 'Registrarse'}
      </button>
    </form>
  )
}

export default RegisterForm