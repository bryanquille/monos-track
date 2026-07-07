import { useForm, type SubmitHandler } from "react-hook-form";
import { RegisterSchema, type RegisterData } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../utils/cn";
import { useShowPassword } from "../../../hooks/useShowPassword";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrength from "./PasswordStrength";
import { useState } from "react";
import Loader from "../../../shared/components/Loader";
import { useRegisterForm } from "../hooks/useRegisterForm";

function RegisterForm() {
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange'
  })
  const { showPassword, toggleShowPassword } = useShowPassword()
  const { showPassword: showConfirmPassword, toggleShowPassword: toggleShowConfirmPassword } = useShowPassword()
  const [showPasswordReq, setShowPasswordReq] = useState(false)

  const { mutate, isPending } = useRegisterForm()

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    mutate(data)
    reset()
  }

  if (isPending) return <Loader className="my-10" text="Creando cuenta" />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'w-full p-6 grid grid-cols-2 gap-3 inset-shadow-sm inset-shadow-neutral-light rounded-xl xl:items-start dark:inset-shadow-[unset] dark:bg-secondary-light dark:shadow-sm dark:shadow-neutral-light/50 md:max-w-120',
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
      <div className="relative col-span-2 xl:col-span-1">
        <div className={cn('flex flex-col justify-center items-start gap-0.5')}>
          <label
            htmlFor="password"
            className='dark:text-neutral-dark'
          >
            Contraseña
          </label>
          <div className={cn('relative w-full')}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••••"
              onFocus={() => setShowPasswordReq(true)}
              className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              {...register('password', {
                onBlur: () => {
                  setShowPasswordReq(false)
                }
              })}
            />
            <button
              type="button"
              className={cn('absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 dark:text-neutral-dark')}
              onClick={toggleShowPassword}
              onMouseDown={(e) => e.preventDefault()}
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
        {
          showPasswordReq && <PasswordStrength control={control} />
        }
      </div>
      <div className={cn('flex flex-col justify-center items-start gap-0.5 col-span-2 xl:col-span-1')}>
        <label
          htmlFor="confirmPassword"
          className='dark:text-neutral-dark'
        >
          Confirmar contraseña
        </label>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="••••••••••"
            className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            className={cn('absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 dark:text-neutral-dark')}
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? (
              <EyeOff className='dark:text-neutral-dark/70 hover:opacity-70 transition-all duration-200' />
            ) : (
              <Eye className='dark:text-neutral-dark/70 hover:opacity-70 transition-all duration-200' />
            )}
          </button>
        </div>
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