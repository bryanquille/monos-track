import { Edit, User } from "lucide-react";
import { cn } from "../../../shared/utils/cn";

function SettingsPage() {
  return (
    <section>
      <header className={cn('w-[95%] mx-auto mb-6 p-4 flex flex-col justify-center gap-4 rounded-xl bg-neutral-light/50 dark:bg-secondary-light dark:text-neutral-dark md:p-8')}>
        <h1 className={cn('text-center text-3xl font-bold')}>
          Configuración de Perfil
        </h1>
        <p className={cn('text-center')}>
          Gestiona tu identidad digital, seguridad y preferencias financieras.
        </p>
      </header>
      <main>
        {/* Here show the info from the user and be able to modify */}
        <section className={cn('w-[95%] max-w-7xl mx-auto p-4 overflow-hidden flex flex-col justify-center gap-6 border border-neutral-light/50 rounded-xl bg-neutral-light/50 dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
          <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
            <h2>Información personal</h2>
            <User />
          </div>
          <div className={cn('relative z-0')}>
            <div className={cn('w-30 h-30 flex justify-center items-center rounded-2xl bg-neutral-200')}>
              <img
                src="https://plus.unsplash.com/premium_vector-1728553012443-3cf619e7579d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DI"
                alt="Avatar de usuario"
                className={cn('w-4/5')}
              />
            </div>
            <button
              type="button"
              className={cn('absolute top-4/5 left-24 cursor-pointer p-1.5 rounded-lg bg-primary')}
            >
              <Edit className={cn('text-neutral-dark')} />
            </button>
          </div>
          <form className={cn('flex flex-col items-center gap-4')}>
            <div className={cn('w-full flex flex-col justify-center gap-1')}>
              <label
                htmlFor="fullName"
                className={cn('text-secondary-light/60 dark:text-neutral-dark/60')}
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="fullName"
                value={'John Doe'}
                className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
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
                value={'johndoe@email.com'}
                className={cn('w-full px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
              />
            </div>
            <button
              type="submit"
              className={cn('cursor-pointer px-4 py-2.5 rounded-lg bg-primary text-neutral-dark')}
            >
              Guardar cambios
            </button>
          </form>
        </section>
      </main>
    </section>
  )
}

export default SettingsPage