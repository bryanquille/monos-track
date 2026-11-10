import { useForm } from "react-hook-form";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";
import { useUpdateMovement } from "../hooks/useUpdateMovement";
import { useEffect } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MONEY_METHOD_CATEGORIES } from "../../../shared/constants/constants";
import { X } from "lucide-react";
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
    formState: { errors }
  } = useForm<MovementInput, unknown, MovementOutput>({
    resolver: zodResolver(MovementsSchema),
    defaultValues: {
      amount: movement?.amount,
      category: movement?.category,
      movementType: movement?.movement_type,
      movementDate: movement?.movement_date,
      paymentMethod: movement?.payment_method,
      description: movement?.description || '',
      receiptUpload: undefined
    }
  })

  const { mutate: updateMovement, isPending } = useUpdateMovement()

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
        'w-full h-full max-w-140 p-6 bg-white overflow-y-auto',
        'dark:bg-primary-dark dark:text-neutral-dark',
        'shadow-lg shadow-tertiary-light/40 dark:shadow-secondary-dark/40',
        isOpen ? 'block' : 'hidden',
        'md:h-[unset] md:max-h-11/12 md:rounded-2xl'
      )}
    >
      <header
        className={cn('relative p-4')}
      >
        <h3
          className={cn('text-center font-semibold text-xl')}
        >
          Editar Movimiento
        </h3>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 p-1',
            'rounded-full',
            'bg-tertiary-light/25'
          )}
        >
          <X
            size={20}
            strokeWidth={4}
            className="text-tertiary-light"
          />
        </button>
      </header>
      <main>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn('flex flex-col gap-6')}
        >
          {/* Amount */}
          <div
            className={cn('flex flex-col gap-1')}
          >
            <div
              className={cn(
                'flex flex-col gap-0.5',
              )}
            >
              <label
                htmlFor="amount"
                className={cn('font-medium')}
              >
                Monto
              </label>
              <input
                type="number"
                id="amount"
                step='0.01'
                className={cn(
                  'px-4 py-2 appearance-none',
                  'border border-secondary-light rounded-lg'
                )}
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
          <div
            className={cn('flex flex-col gap-1')}
          >
            <div className={cn('flex flex-col gap-0.5')}>
              <label
                htmlFor="movementType"
                className={cn('font-medium')}
              >
                Tipo de movimiento
              </label>
              <select
                id="movementType"
                className={cn(
                  'px-4 py-2 appearance-none',
                  'border border-secondary-light rounded-lg'
                )}
                aria-invalid={!!errors.movementType}
                aria-describedby={errors.movementType ? 'movementType-error' : undefined}
                {...register('movementType')}
              >
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
              </select>
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
          <div
            className={cn('flex flex-col gap-1')}
          >
            <div
              className={cn('flex flex-col gap-0.5')}
            >
              <label
                htmlFor="category"
                className={cn('font-medium')}
              >
                Categoría
              </label>
              <select
                id="category"
                className={cn(
                  'px-4 py-2 appearance-none',
                  'border border-secondary-light rounded-lg'
                )}
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
          <div
            className={cn('flex flex-col gap-1')}
          >
            <div
              className={cn('flex flex-col gap-0.5')}
            >
              <label
                htmlFor="movementDate"
                className={cn('font-medium')}
              >
                Fecha de movimiento
              </label>
              <input
                type="date"
                id="movementDate"
                className={cn(
                  'px-4 py-2 appearance-none',
                  'border border-secondary-light rounded-lg',
                  'dark:scheme-dark'
                )}
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
          <div
            className={cn('flex flex-col gap-1')}
          >
            <div
              className={cn('flex flex-col gap-0.5')}
            >
              <label
                htmlFor="paymentMethod"
                className={cn('font-medium')}
              >
                Método de pago
              </label>
              <select
                id="paymentMethod"
                className={cn(
                  'px-4 py-2 appearance-none',
                  'border border-secondary-light rounded-lg',
                )}
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
          <div
            className={cn('flex flex-col gap-0.5')}
          >
            <label
              htmlFor="description"
              className={cn('font-medium')}
            >
              Descripción
            </label>
            <textarea
              id="description"
              className={cn(
                'h-30 px-4 py-2 appearance-none resize-none',
                'border border-secondary-light rounded-lg',
              )}
              {...register('description')}
            >
            </textarea>
          </div>

          {/* New field to change or upload a receipt */}
          <div
            className={cn('flex flex-col gap-1')}
          >
            <div
              className={cn('flex flex-col gap-0.5')}
            >
              <label
                htmlFor="receiptUpload"
                className={cn('font-medium')}
              >
                Comprobante / Recibo
              </label>
              <div
                className={cn('flex flex-col gap-0.5')}
              >
                <p
                  className={cn(
                    'text-sm',
                    movement?.receipt_path && 'text-tertiary-light'
                  )}
                >
                  {movement?.receipt_path
                    ? 'Este movimiento ya tiene un recibo. Si subes uno nuevo se reemplazará al anterior.'
                    : 'Sube un comprobante en formato .png, .jpg o .webp'}
                </p>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  id="receiptUpload"
                  className={cn(
                    'px-4 py-2 appearance-none',
                    'border border-secondary-light rounded-lg',
                  )}
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
          <div
            className={cn('py-2 flex justify-evenly items-center gap-2')}
          >
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'cursor-pointer p-2',
                'font-semibold text-lg',
                'border-2 border-tertiary-light rounded-xl',
              )}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                'cursor-pointer p-2',
                'font-semibold text-lg text-neutral-dark',
                'border-2 border-primary rounded-xl',
                'bg-primary/70'
              )}
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