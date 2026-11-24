import { Edit, User } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { useAuthStore } from "../../auth/store/authStore";
import { useForm } from "react-hook-form";

function ProfileSection() {
  const user = useAuthStore((state) => state.user)

  const userFirstName = user?.user_metadata.first_name
  const userLastName = user?.user_metadata.last_name
  const userEmail = `${user?.email}`

  const {
    register
  } = useForm({
    defaultValues: {
      first_name: userFirstName,
      last_name: userLastName,
      email: userEmail
    }
  })

  return (
    <section className={cn(
      'w-[95%] max-w-7xl mx-auto p-4 overflow-hidden',
      'flex flex-col justify-center gap-6',
      'border border-neutral-light/50 rounded-xl',
      'bg-neutral-light/50 dark:shadow-[unset]',
      'dark:bg-tertiary-dark dark:text-neutral-dark'
    )}>
      <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
        <h2 className={cn('text-xl font-medium')}>Información personal</h2>
        <User size={30} />
      </div>
      <div className={cn(
        'w-full flex flex-col items-center gap-4',
        'md:flex-row md:items-start md:gap-10',
        'lg:justify-center',
        'xl:items-center'
      )}>
        <div className={cn('relative z-10')}>
          <div className={cn(
            'w-36 h-36 flex justify-center items-center',
            'rounded-full overflow-hidden bg-neutral-200',
            'md:w-46 md:h-46',
            'lg:w-50 lg:h-50',
            'xl:w-60 xl:h-60'
          )}>
            <img
              src="https://plus.unsplash.com/premium_vector-1728553012443-3cf619e7579d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DI"
              alt="Avatar de usuario"
              className={cn('w-4/5')}
            />
          </div>
          <button
            type="button"
            className={cn(
              'absolute top-4/5 left-3/4 cursor-pointer',
              'p-1.5 rounded-lg bg-primary'
            )}
          >
            <Edit className={cn('text-neutral-dark')} />
          </button>
        </div>
        <form className={cn(
          'w-full flex flex-col items-center gap-4',
          'lg:w-1/2'
        )}>
          <div className={cn('w-full flex flex-col justify-center gap-1')}>
            <label
              htmlFor="first_name"
              className={cn('text-secondary-light/60 dark:text-neutral-dark/60')}
            >
              Nombre
            </label>
            <input
              type="text"
              id="first_name"
              className={cn(
                'w-full px-5 py-3',
                'border-2 border-secondary-light/70 rounded-md',
                'dark:border-neutral-light/70 dark:text-neutral-dark'
              )}
              {...register('first_name')}
            />
          </div>
          <div className={cn('w-full flex flex-col justify-center gap-1')}>
            <label
              htmlFor="last_name"
              className={cn('text-secondary-light/60 dark:text-neutral-dark/60')}
            >
              Apellido
            </label>
            <input
              type="text"
              id="last_name"
              className={cn(
                'w-full px-5 py-3',
                'border-2 border-secondary-light/70 rounded-md',
                'dark:border-neutral-light/70 dark:text-neutral-dark'
              )}
              {...register('last_name')}
            />
          </div>
          <div className={cn('w-full flex flex-col justify-center gap-1')}>
            <label
              htmlFor="email"
              className={cn('text-secondary-light/60 dark:text-neutral-dark/60')}
            >
              Correo electrónico
            </label>
            <input
              type="text"
              id="email"
              className={cn(
                'w-full px-5 py-3',
                'border-2 border-secondary-light/70 rounded-md',
                'dark:border-neutral-light/70 dark:text-neutral-dark'
              )}
              {...register('email')}
            />
          </div>
          <button
            type="submit"
            className={cn(
              'cursor-pointer px-4 py-2.5 rounded-lg',
              'bg-primary text-neutral-dark',
              'md:ml-auto'
            )}
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </section>
  )
}

export default ProfileSection