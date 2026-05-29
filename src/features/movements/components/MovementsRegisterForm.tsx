import { useForm } from "react-hook-form";
import { cn } from "../../../utils/cn";

function MovementsRegisterForm() {
  const { register } = useForm()

  return (
    <form className={cn('grid grid-cols-1 gap-4 md:grid-cols-2')}>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="amount">Monto</label>
        <input
          type="number"
          id="amount"
          placeholder="100.00"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('amount')}
        />
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="movementDate">Fecha</label>
        <input
          type="date"
          id="movementDate"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('movementDate')}
        />
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="cathegory">Categoría</label>
        <select
          id="cathegory"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('cathegory')}
        >
          <option value="salary">Salario</option>
          <option value="gift">Regalo</option>
        </select>
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="method">Método de Pago</label>
        <select
          id="method"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('method')}
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
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md resize-none dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('description')}
        ></textarea>
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="voucher">Comprobante/Adjunto</label>
        <input
          type="file"
          id="voucher"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('voucher')}
        />
      </div>
      <button
        type="submit"
        className={cn('cursor-pointer p-2 flex justify-center items-center gap-2 rounded-md bg-primary text-white font-semibold text-lg transition-all duration-200 hover:bg-primary/80 md:py-4 md:col-span-2')}
      >
        Confirmar Movimiento
      </button>
    </form>
  )
}

export default MovementsRegisterForm