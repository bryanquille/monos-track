import { useForm } from "react-hook-form";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";
import { useUpdateMovement } from "../hooks/useUpdateMovement";
import { useEffect } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MONEY_METHOD_CATEGORIES } from "../../../shared/constants/constants";
import { Upload, X } from "lucide-react";
import { cn } from "../../../shared/utils/cn";

interface MovementEditModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  movement: FinancialDataListTypes | null
}

export interface EditFormValues {
  amount: number
  category: string
  movement_date: string
  payment_method: string
  description: string
  receiptUpload: FileList | null
}

function MovementEditModal({ isOpen, onClose, movement }: MovementEditModalPropsTypes) {
  const { register, handleSubmit, reset } = useForm<EditFormValues>()
  const { mutate: updateMovement, isPending } = useUpdateMovement()

  useEffect(() => {
    if (movement) {
      reset({
        amount: movement.amount,
        category: movement.category,
        movement_date: movement.movement_date,
        payment_method: movement.payment_method,
        description: movement.description || '',
        receiptUpload: null
      })
    }
  }, [movement, reset])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const onSubmit = (data: EditFormValues) => {
    updateMovement(
      {
        id: movement?.id,
        data,
        oldReceiptPath: movement?.receipt_path
      },
      {
        onSuccess: () => { onClose() }
      }
    )
  }

  const categories = movement?.movement_type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  return (
    <section
      className={cn(
        'fixed top-1/2 left-1/2 -translate-1/2 z-50',
        'w-full h-full max-w-140 p-4 bg-white overflow-y-auto',
        'dark:bg-primary-dark dark:text-neutral-dark',
        'shadow-lg shadow-tertiary-light/40 dark:shadow-secondary-dark/40',
        isOpen ? 'block' : 'hidden',
        'md:h-[unset] md:max-h-11/12 md:rounded-2xl'
      )}
    >
      <header>
        <h3>Editar Movimiento</h3>
        <button
          type="button"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Amount */}
          <div>
            <label htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              step='0.01'
              {...register('amount', { required: true })}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              {...register('category', { required: true })}
            >
              {categories.map(cat => (
                <option
                  key={cat.value}
                  value={cat.value}
                >
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Movement Date */}
          <div>
            <label htmlFor="movement_date">Fecha de movimiento</label>
            <input
              type="date"
              id="movement_date"
              {...register('movement_date', { required: true })}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="payment_method">Método de pago</label>
            <select
              id="payment_method"
              {...register('payment_method', { required: true })}
            >
              {MONEY_METHOD_CATEGORIES.map(method => (
                <option
                  key={method.value}
                  value={method.value}
                >
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              {...register('description')}
            >
            </textarea>
          </div>

          {/* New field to change or upload a receipt */}
          <div>
            <label htmlFor="receiptUpload">Comprobante / Recibo</label>
            <div>
              <Upload size={24} />
              <p>
                {movement?.receipt_path
                  ? 'Este movimiento ya tiene un recibo. Si subes uno nuevo se reemplazará al anterior.'
                  : 'Sube un comprobante en formato .png, .jpg o .webp'}
              </p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                id="receiptUpload"
                {...register('receiptUpload')}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <button
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Actualizando' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default MovementEditModal