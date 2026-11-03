import { EXPENSE_CATEGORIES, GET_MONEY_METHOD_CATEGORIES, INCOME_CATEGORIES, MONTH_NAMES } from "../../../shared/constants/constants";
import { BanknoteArrowDown, BanknoteArrowUp, Calendar, Clock, CreditCard, MessageSquareText, X } from "lucide-react";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";
import { useSignedReceiptUrl } from "../hooks/useSignedReceiptUrl";
import { cn } from "../../../shared/utils/cn";
import { useEffect } from "react";

interface MovementDetailsModalPropsTypes {
  movement: FinancialDataListTypes
  isOpen: boolean
  handleCloseModal: () => void
}

function MovementDetailsModal({ movement, isOpen, handleCloseModal }: MovementDetailsModalPropsTypes) {
  const receiptPath = movement.receipt_path
  const { receiptUrl, isLoadingImage } = useSignedReceiptUrl({
    receiptPath,
    isOpen
  })

  // Block the body to scroll when open the modal
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

  // Search the category
  const categoryLabel = movement.movement_type === 'income'
    ? INCOME_CATEGORIES.find(item => item.value === movement.category)?.label || movement.category
    : EXPENSE_CATEGORIES.find(item => item.value === movement.category)?.label || movement.category

  const paymentMethodLabel = GET_MONEY_METHOD_CATEGORIES.find(
    method => method.value === movement.payment_method
  )?.label || movement.payment_method

  // Format creating date
  const createdDate = new Date(movement.created_at)
  const formattedDay = String(createdDate.getDate()).padStart(2, '0')
  const formattedMonth = MONTH_NAMES[createdDate.getMonth()]
  const formattedYear = createdDate.getFullYear()

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
      <header className={cn('pb-4 mb-8 flex flex-col gap-6 border-b border-neutral-light')}>
        <div className={cn('relative')}>
          <h2 className={cn('font-semibold text-center text-xl')}>
            Detalle del movimiento
          </h2>
          <button
            type="button"
            className={cn(
              'cursor-pointer absolute top-0 right-0 p-1 bg-tertiary-light/25 rounded-full',
              'dark:bg-tertiary-light'
            )}
            onClick={handleCloseModal}
          >
            <X
              size={18}
              strokeWidth={4}
              className={cn('text-tertiary-light dark:text-neutral-dark')} />
          </button>
        </div>
        <div className={cn('flex justify-between')}>
          <div className="flex items-start gap-2.5">
            {movement?.movement_type === 'income'
              ? <div className={cn('p-2 rounded-full shrink-0 grid place-items-center bg-green-100',)}>
                <BanknoteArrowUp size={36} className={cn('text-green-600')} />
              </div>
              : <div className={cn('p-2 rounded-full grid place-items-center bg-red-100',)}>
                <BanknoteArrowDown size={36} className={cn('text-red-500')} />
              </div>
            }
            <div>
              <p
                className={cn(
                  'w-fit mb-1 px-3 py-1.5 rounded-xl font-semibold',
                  movement.movement_type === 'income'
                    ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                )}
              >
                {movement?.movement_type === 'income' ? 'Ingreso' : 'Gasto'}
              </p>
              <p className={cn('font-semibold text-nowrap')}>
                {categoryLabel}
              </p>
            </div>
          </div>
          <p className={cn('font-Geist-Mono font-bold text-3xl')}>
            ${movement.amount.toFixed(2)}
          </p>
        </div>
      </header>
      <main className={cn(
        'flex flex-col gap-4',
        'md:flex-row md:justify-between'
      )}>
        <div>
          <div className={cn('mb-4 flex justify-between items-start gap-4 md:flex-col')}>
            <div className={cn('flex items-start gap-2')}>
              <div className={cn('p-2 rounded-lg bg-secondary-dark/30')}>
                <Calendar className={cn('text-primary')} />
              </div>
              <div>
                <h4 className={cn(
                  'uppercase font-semibold text-xs text-secondary-light/60',
                  'dark:text-neutral-dark/60'
                )}>
                  Fecha del movimiento:
                </h4>
                <p className={cn('font-medium')}>
                  {movement.movement_date}
                </p>
              </div>
            </div>
            <div className={cn('flex items-start gap-2')}>
              <div className={cn('p-2 rounded-lg bg-secondary-dark/30')}>
                <CreditCard className={cn('text-primary')} />
              </div>
              <div>
                <h4 className={cn(
                  'uppercase font-semibold text-xs text-secondary-light/60',
                  'dark:text-neutral-dark/60'
                )}>
                  Método de pago:
                </h4>
                <p className={cn('font-medium')}>
                  {paymentMethodLabel}
                </p>
              </div>
            </div>
          </div>
          <div className={cn('flex items-start gap-2')}>
            <div className={cn('p-2 rounded-lg bg-secondary-dark/30')}>
              <MessageSquareText className={cn('text-primary')} />
            </div>
            <div>
              <h4 className={cn(
                'uppercase font-semibold text-xs text-secondary-light/60',
                'dark:text-neutral-dark/60'
              )}>
                Descripción:
              </h4>
              <p className={cn('font-medium')}>
                {movement?.description}
              </p>
            </div>
          </div>
        </div>
        {movement.receipt_path
          ? (
            <div className={cn('w-full rounded-xl overflow-hidden border border-neutral-light/30 bg-neutral-light/10 flex items-center justify-center md:max-w-70')}>
              {isLoadingImage ? (
                <p className={cn(
                  'text-sm text-neutral-light animate-pulse',
                  'dark:text-neutral-dark/50'
                )}>
                  Cargando archivo...
                </p>
              ) : receiptUrl ? (
                <img
                  src={receiptUrl}
                  alt="Recibo bancario seguro"
                  className={cn('w-full h-full object-contain')}
                />
              ) : (
                <p className={cn('p-4 text-sm text-center text-red-500')}>
                  No se pudo cargar el recibo.
                </p>
              )}
            </div>
          )
          : (
            <p className={cn(
              'p-4 rounded-2xl bg-tertiary-light/40',
              'text-sm text-center text-secondary-light italic',
              'dark:text-neutral-dark/60 dark:bg-tertiary-dark'
            )}>
              No hay recibo adjunto para este movimiento.
            </p>
          )
        }
      </main>
      <footer className={cn('p-2 mt-4 border-t border-neutral-light')}>
        <div className={cn('flex items-center gap-2')}>
          <Clock />
          <p>
            Registrado el <span>{formattedDay}</span> de <span>{formattedMonth}</span> del <span>{formattedYear}</span>
          </p>
        </div>
      </footer>
    </section>
  )
}

export default MovementDetailsModal