import { RefreshCcw, ShieldCheck } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useState } from "react";

function MovementsRegisterPage() {
  const [isIncome, setIsIncome] = useState(true)

  return (
    <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
      <header className={cn('p-4 flex flex-col justify-center items-center gap-3 bg-neutral-light/50 dark:bg-secondary-light md:p-8 md:flex-row md:justify-evenly')}>
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
      </header>
      <main className={cn('p-4 md:p-8')}>
        <form className={cn('grid grid-cols-1 gap-4 md:grid-cols-2')}>
          <div className={cn('flex flex-col gap-1')}>
            <label htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              placeholder="100.00"
              className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
            />
          </div>
          <div className={cn('flex flex-col gap-1')}>
            <label htmlFor="movementDate">Fecha</label>
            <input
              type="date"
              id="movementDate"
              className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
            />
          </div>
          <div className={cn('flex flex-col gap-1')}>
            <label htmlFor="cathegory">Categoría</label>
            <select
              id="cathegory"
              className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
            >
              <option value="salary">Salario</option>
              <option value="gift">Regalo</option>
            </select>
          </div>
          <div className={cn('flex flex-col gap-1')}>
            <label htmlFor="method">Método de Pago</label>
            <select
              id="method"
              className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
            >
              <option value="cash">Efectivo</option>
              <option value="transfer">Transferencia</option>
              <option value="deposit">Deposito</option>
            </select>
          </div>
          {/* TODO: Make description and file atachment size the same */}
          <div className={cn('flex flex-col gap-1')}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              className='px-5 py-3 border-2 border-secondary-light/70 rounded-md resize-none dark:border-neutral-light/70 dark:text-neutral-dark'
            ></textarea>
          </div>
          <div className={cn('flex flex-col gap-1')}>
            <label htmlFor="voucher">Comprobante/Adjunto</label>
            <input
              type="file"
              id="voucher"
              className='px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark'
            />
          </div>
          <button
            type="submit"
            className={cn('cursor-pointer p-2 flex justify-center items-center gap-2 rounded-md bg-primary text-white font-semibold text-lg transition-all duration-200 hover:bg-primary/80 md:py-4 md:col-span-2')}
          >
            Confirmar Movimiento
          </button>
        </form>
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
  )
}

export default MovementsRegisterPage