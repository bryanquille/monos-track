import { useEffect } from "react";
import { useDeleteMovement } from "../hooks/useDeleteMovement";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";
import { cn } from "../../../shared/utils/cn";
import { AlertTriangle, X } from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MONTH_NAMES } from "../../../shared/constants/constants";

interface MovementDeleteModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  movement: FinancialDataListTypes | undefined
}

function MovementDeleteModal({ isOpen, onClose, movement }: MovementDeleteModalPropsTypes) {
  const { mutate: deleteMovement, isPending } = useDeleteMovement()

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

  if (!isOpen || !movement) return null

  const handleDelete = () => {
    deleteMovement(
      { id: movement.id, receiptPath: movement.receipt_path },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  const categoryLabel = movement.movement_type === 'income'
    ? INCOME_CATEGORIES.find(item => item.value === movement.category)?.label || movement.category
    : EXPENSE_CATEGORIES.find(item => item.value === movement.category)?.label || movement.category

  // Format movement date
  const createdDate = new Date(movement.movement_date)
  const formattedDay = String(createdDate.getDate() + 1).padStart(2, '0')
  const formattedMonth = MONTH_NAMES[createdDate.getMonth()].slice(0, 3)
  const formattedYear = createdDate.getFullYear()
  const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`

  return (
    <section
      className={cn(
        'fixed top-1/2 left-1/2 -translate-1/2 z-50',
        'w-4/5 max-w-80 p-4 bg-white overflow-y-auto rounded-2xl',
        'dark:bg-primary-dark dark:text-neutral-dark',
        'shadow-lg shadow-tertiary-light/40 dark:shadow-secondary-dark/40',
        isOpen ? 'block' : 'hidden',
      )}
    >
      <header className={cn('relative mb-3')}>
        <div
          className={cn('flex flex-col-reverse justify-center items-center gap-1')}
        >
          <h2
            className={cn('text-lg text-center font-medium')}
          >Eliminar movimiento</h2>
          <AlertTriangle size={38} className={cn('text-red-500')} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'cursor-pointer absolute top-2 right-2 p-1 rounded-full',
            'bg-tertiary-light/25 dark:bg-tertiary-light'
          )}
        >
          <X
            size={18}
            strokeWidth={4}
            className={cn('text-tertiary-light dark:text-neutral-dark')}
          />
        </button>
      </header>
      <main
        className={cn('flex flex-col justify-center items-center gap-2 mb-3')}
      >
        <p
          className={cn('text-center text-xl font-semibold text-pretty')}
        >
          ¿Estás seguro de que deseas eliminar este registro?
        </p>
        <div
          className={cn(
            'flex flex-col justify-center items-center gap-0.5 p-3',
            'rounded-xl bg-neutral-light/75 dark:bg-tertiary-dark text-sm',
            'shadow-sm shadow-secondary-light/70 dark:shadow-neutral-dark/70'
          )}
        >
          <span
            className={cn('font-bold font-Geist-Mono text-lg')}
          >
            ${movement.amount.toFixed(2)}
          </span>
          <span>Categoría: {categoryLabel}</span>
          <span>Fecha: {formattedDate}</span>
        </div>
        <p
          className={cn(
            'mt-1 text-sm text-red-500 text-center',
            'dark:text-red-400'
          )}
        >
          Esta acción no se puede deshacer y borrará cualquier comprobante asociado.
        </p>
      </main>
      <footer
        className={cn('py-2 flex justify-evenly items-center gap-2')}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className={cn(
            'cursor-pointer p-2',
            'font-medium text-lg',
            'border-2 border-secondary-light rounded-xl',
            'dark:border-neutral-dark'
          )}
        >
          Cancelar
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className={cn(
            'cursor-pointer p-2',
            'font-semibold text-lg',
            'border-2 border-red-500 rounded-xl',
            'bg-red-300 dark:text-primary-dark'
          )}
        >
          {isPending ? 'Eliminando...' : 'Si, eliminar'}
        </button>
      </footer>
    </section>
  )
}

export default MovementDeleteModal