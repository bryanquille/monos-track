import { useForm } from "react-hook-form";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";
import { useUpdateMovement } from "../hooks/useUpdateMovement";
import { useEffect } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MONEY_METHOD_CATEGORIES } from "../../../shared/constants/constants";
import { Upload, X } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { MovementsSchema, type MovementInput, type MovementOutput } from "../schemas/movementsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface MovementEditModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  movement: FinancialDataListTypes | null
}

function MovementEditModal({ isOpen, onClose, movement }: MovementEditModalPropsTypes) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MovementInput, unknown, MovementOutput>({
    resolver: zodResolver(MovementsSchema)
  })

  const { mutate: updateMovement, isPending } = useUpdateMovement()

  useEffect(() => {
    if (movement) {
      reset({
        amount: movement.amount,
        category: movement.category,
        movementType: movement.movement_type,
        movementDate: movement.movement_date,
        paymentMethod: movement.payment_method,
        description: movement.description || '',
        receiptUpload: undefined
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

  const onSubmit = (data: MovementOutput) => {
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
            <div>
              <label htmlFor="amount">Monto</label>
              <input
                type="number"
                id="amount"
                step='0.01'
                aria-invalid={!!errors.amount}
                aria-describedby={errors.amount ? 'amount-error' : undefined}
                {...register('amount', { required: true })}
              />
            </div>
            {errors.amount &&
              <span
                className={cn('text-sm text-red-500')}
                id="amount-error"
                role="alert"
              >
                {errors.amount.message}
              </span>
            }
          </div>

          {/* Movement Type */}
          <div>
            <div>
              <label htmlFor="movementType">Tipo de movimiento</label>
              <input
                type="radio"
                id="movementType"
                aria-invalid={!!errors.movementType}
                aria-describedby={errors.movementType ? 'movementType-error' : undefined}
                {...register('movementType')}
              />
            </div>
            {errors.movementType &&
              <span
                className={cn('text-sm text-red-500')}
                id="movementType-error"
                role="alert"
              >
                {errors.movementType.message}
              </span>
            }
          </div>

          {/* Category */}
          <div>
            <div>
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                aria-invalid={!!errors.category}
                aria-describedby={errors.category ? 'category-error' : undefined}
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
            {errors.category &&
              <span
                className={cn('text-sm text-red-500')}
                id="category-error"
                role="alert"
              >
                {errors.category.message}
              </span>
            }
          </div>

          {/* Movement Date */}
          <div>
            <div>
              <label htmlFor="movementDate">Fecha de movimiento</label>
              <input
                type="date"
                id="movementDate"
                aria-invalid={!!errors.movementDate}
                aria-describedby={errors.movementDate ? 'movementDate-error' : undefined}
                {...register('movementDate', { required: true })}
              />
            </div>
            {errors.movementDate &&
              <span
                className={cn('text-sm text-red-500')}
                id="movementDate-error"
                role="alert"
              >
                {errors.movementDate.message}
              </span>
            }
          </div>

          {/* Payment Method */}
          <div>
            <div>
              <label htmlFor="paymentMethod">Método de pago</label>
              <select
                id="paymentMethod"
                aria-invalid={!!errors.paymentMethod}
                aria-describedby={errors.paymentMethod ? 'paymentMethod-error' : undefined}
                {...register('paymentMethod', { required: true })}
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
            {errors.paymentMethod &&
              <span
                className={cn('text-sm text-red-500')}
                id="paymentMethod-error"
                role="alert"
              >
                {errors.paymentMethod.message}
              </span>
            }
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
                  aria-invalid={!!errors.receiptUpload}
                  aria-describedby={errors.receiptUpload ? 'receiptUpload-error' : undefined}
                  {...register('receiptUpload')}
                />
              </div>
            </div>
            {errors.receiptUpload &&
              <span
                className={cn('text-sm text-red-500')}
                id="receiptUpload-error"
                role="alert"
              >
                {errors.receiptUpload.message}
              </span>
            }
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