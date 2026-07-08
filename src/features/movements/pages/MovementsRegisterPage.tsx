import { RefreshCcw, ShieldCheck } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { useState } from "react";
import MovementsRegisterForm from "../components/MovementsRegisterForm";
import UserName from "../../../shared/components/UserName";
import { Toaster } from "sileo";

function MovementsRegisterPage() {
  const [isIncome, setIsIncome] = useState(true)

  return (
    <>
      <Toaster position="top-center"/>
      <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
        <header className={cn('p-4 flex flex-col justify-center gap-8 bg-neutral-light/50 dark:bg-secondary-light md:p-8')}>
          <UserName />
          <div className={cn('flex flex-col justify-center items-center gap-3 md:flex-row md:justify-evenly')}>
            <div>
              <h1 className={cn('font-semibold text-xl')}>Registrar Movimiento</h1>
              <p className={cn('text-gray-text dark:text-neutral-dark/70')}>Ingresa los detalles de tu nueva operación financiera.</p>
            </div>
            <button
              type="button"
              className={cn('relative cursor-pointer py-2 px-4 overflow-hidden grid grid-cols-2 gap-2 rounded-xl bg-neutral-light dark:bg-primary-dark dark:border dark:border-neutral-dark')}
              onClick={() => setIsIncome(!isIncome)}
            >
              <span
                className={cn(
                  'absolute w-1/2 h-full bg-primary transform transition-all duration-200',
                  isIncome ? 'translate-x-full' : '',
                )}
              ></span>
              <span>Ingreso</span>
              <span>Gasto</span>
            </button>
          </div>
        </header>
        <main className={cn('p-4 md:p-8')}>
          <MovementsRegisterForm
            isIncome={isIncome}
          />
        </main>
        <footer className={cn('p-4 grid grid-cols-1 grid-rows-2 gap-4 md:p-8 md:grid-cols-2 md:grid-rows-1')}>
          <article className={cn('w-full p-4 flex flex-row-reverse justify-end items-center gap-4 rounded-xl bg-neutral-light/50 dark:bg-primary-dark')}>
            <div>
              <h3 className={cn('font-semibold')}>Seguridad</h3>
              <p className={cn('text-gray-text dark:text-neutral-dark/70')}>Transacción encriptada de extremo a extremo</p>
            </div>
            <div className={cn('p-2 rounded-full bg-neutral-light dark:bg-primary/25')}>
              <ShieldCheck size={26} className={cn('text-green-600 dark:text-green-500')} />
            </div>
          </article>
          <article className={cn('w-full p-4 flex flex-row-reverse justify-end items-center gap-4 rounded-xl bg-neutral-light/50 dark:bg-primary-dark')}>
            <div>
              <h3 className={cn('font-semibold')}>Sincronización</h3>
              <p className={cn('text-gray-text dark:text-neutral-dark/70')}>Actualización en tiempo real</p>
            </div>
            <div className={cn('p-2 rounded-full bg-neutral-light dark:bg-primary/25')}>
              <RefreshCcw size={26} className={cn('text-primary dark:text-secondary-dark')} />
            </div>
          </article>
        </footer>
      </section>
    </>
  )
}

export default MovementsRegisterPage