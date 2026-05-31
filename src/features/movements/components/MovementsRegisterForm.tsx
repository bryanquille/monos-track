import { useForm } from "react-hook-form";
import { cn } from "../../../utils/cn";
import { ChevronDown, CloudUpload } from "lucide-react";

function MovementsRegisterForm() {
  const { register } = useForm()

  return (
    <form className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6')}>
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
        <label htmlFor="category">Categoría</label>
        <div className={cn('relative')}>
          <select
            id="category"
            className={cn('w-full pl-5 pr-10 py-3 border-2 border-secondary-light/70 rounded-md appearance-none dark:border-neutral-light/70 dark:text-neutral-dark')}
            {...register('category')}
          >
            <option
              value="salary"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Salario
            </option>
            <option
              value="gift"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Regalo
            </option>
          </select>
          <ChevronDown
            size={20}
            className={cn('absolute top-1/2 right-2.5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2')}
          />
        </div>
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="method">Método de Pago</label>
        <div className={cn('relative')}>
          <select
            id="method"
            className={cn('w-full pl-5 pr-10 py-3 border-2 border-secondary-light/70 rounded-md appearance-none dark:border-neutral-light/70 dark:text-neutral-dark')}
            {...register('method')}
          >
            <option
              value="cash"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Efectivo
            </option>
            <option
              value="transfer"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Transferencia
            </option>
            <option
              value="deposit"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Deposito
            </option>
          </select>
          <ChevronDown
            size={20}
            className={cn('absolute top-1/2 right-2.5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2')}
          />
        </div>
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          className={cn('h-30 px-5 py-3 border-2 border-secondary-light/70 rounded-md resize-none dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('description')}
        ></textarea>
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <span>Comprobante/Adjunto (Opcional)</span>
        <label
          htmlFor="receipt-upload"
          className={cn('w-full h-30 flex flex-col justify-center items-center gap-0.5 border-2 border-dashed rounded-md bg-neutral-light/30 dark:bg-primary-dark/50')}
        >
          <span className={cn('p-2 rounded-full bg-white dark:bg-tertiary-dark')}>
            <CloudUpload strokeWidth={3} className={cn('text-neutral-light/70')} />
          </span>
          <span>Haz clic para subir o arrastra un archivo</span>
          <span className={cn('text-sm text-gray-text/80 dark:text-neutral-dark/50')}>PDF, PNG O JPG (Máx. 10MB)</span>
        </label>
        <input
          type="file"
          id="receipt-upload"
          className={cn('hidden')}
          accept=".pdf, .png, .jpg, .jpeg"
          {...register('receipt-upload')}
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