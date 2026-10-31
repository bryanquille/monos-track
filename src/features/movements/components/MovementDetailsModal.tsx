import { BanknoteArrowDown, BanknoteArrowUp, Calendar, Clock, CreditCard, MessageSquareText, X } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { EXPENSE_CATEGORIES, GET_MONEY_METHOD_CATEGORIES, INCOME_CATEGORIES } from "../../../shared/constants/constants";
import { useEffect, useState } from "react";
import { supabase } from "../../../shared/lib/supabase";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";

interface MovementDetailsModalPropsTypes {
  movement: FinancialDataListTypes
  isOpen: boolean
  setIsDetailsModalOpen: (open: boolean) => void
}

function MovementDetailsModal({ movement, isOpen, setIsDetailsModalOpen }: MovementDetailsModalPropsTypes) {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null)
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

  // Fetch receipt image url 
  useEffect(() => {
    let isMounted = true

    const fetchSignedUrl = async () => {
      if (!movement?.receipt_path) {
        if (isMounted) setReceiptUrl(null)
        return
      }

      setIsLoadingImage(true)

      try {
        const { data, error } = await supabase.storage
          .from('receipts')
          .createSignedUrl(movement.receipt_path, 120)

        if (error) throw error

        if (isMounted) {
          setReceiptUrl(data?.signedUrl ?? null)
        }
      } catch (error) {
        console.log('Error al generar la URL firmada:', error)
        if (isMounted) setReceiptUrl(null)
      } finally {
        if (isMounted) setIsLoadingImage(false)
      }
    }

    if (isOpen) {
      fetchSignedUrl()
    }

    return () => {
      isMounted = false
    }
  }, [movement, isOpen])

  // if (!isDetailsModalOpen || !selectedMovement) return null

  return (
    <section
      className={cn(
        'fixed top-1/2 left-1/2 -translate-1/2 z-50',
        'w-full h-full max-w-96 p-4 bg-white overflow-y-scroll',
        isOpen ? 'block' : 'hidden',
        'md:rounded-2xl'
      )}
    >
      <header className={cn('pb-4 mb-8 flex flex-col gap-6 border-b border-neutral-light')}>
        <div className={cn('relative')}>
          <h2 className={cn('font-semibold text-center text-xl')}>
            Detalle del movimiento
          </h2>
          <button
            type="button"
            className={cn('cursor-pointer absolute top-0 right-0 p-1 bg-tertiary-light/25 rounded-full')}
            onClick={() => setIsDetailsModalOpen(false)}
          >
            <X size={18} className={cn('text-tertiary-light')} />
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
                {movement?.movement_type === 'income'
                  ? 'Ingreso' : 'Gasto'
                }
              </p>
              <p
                className={cn('font-semibold text-nowrap')}
              >
                {movement?.movement_type === 'income'
                  ? INCOME_CATEGORIES.filter(item => item.value === movement?.category)[0].label
                  : EXPENSE_CATEGORIES.filter(item => item.value === movement?.category)[0].label
                }
              </p>
            </div>
          </div>
          <p className={cn('font-Geist-Mono font-bold text-3xl')}>
            ${movement.amount.toFixed(2)}
          </p>
        </div>
      </header>
      <main className={cn('flex flex-col gap-4')}>
        <div className={cn('flex justify-between items-start gap-4')}>
          <div className={cn('flex items-start gap-2')}>
            <div className={cn('p-2 rounded-lg bg-secondary-dark/30')}>
              <Calendar className={cn('text-primary')} />
            </div>
            <div>
              <h4 className={cn('uppercase font-semibold text-xs text-secondary-light/60')}>
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
              <h4 className={cn('uppercase font-semibold text-xs text-secondary-light/60')}>
                Método de pago:
              </h4>
              <p className={cn('font-medium')}>
                {GET_MONEY_METHOD_CATEGORIES.filter(method => method.value === movement.payment_method)[0].label}
              </p>
            </div>
          </div>
        </div>
        <div className={cn('flex items-start gap-2')}>
          <div className={cn('p-2 rounded-lg bg-secondary-dark/30')}>
            <MessageSquareText className={cn('text-primary')} />
          </div>
          <div>
            <h4 className={cn('uppercase font-semibold text-xs text-secondary-light/60')}>
              Descripción:
            </h4>
            <p className={cn('font-medium')}>
              {movement?.description}
            </p>
          </div>
        </div>
        {movement.receipt_path
          ? (
            <div className={cn('w-full rounded-xl overflow-hidden border border-neutral-light/30 bg-neutral-light/10 flex items-center justify-center')}>
              {isLoadingImage ? (
                <p className={cn('text-sm text-gray-500 animate-pulse')}>Cargando archivo...</p>
              ) : receiptUrl ? (
                <img
                  src={receiptUrl}
                  alt="Recibo bancario seguro"
                  className={cn('w-full h-full object-contain')}
                />
              ) : (
                <p className={cn('text-sm text-red-500')}>No se pudo cargar el recibo.</p>
              )}
            </div>
          )
          : (
            <p className={cn('text-sm text-gray-500 italic')}>No hay recibo adjunto para este movimiento.</p>
          )
        }
      </main>
      <footer className={cn('p-4 mt-4 border-t border-neutral-light dark:border-neutral-dark/50')}>
        <div className={cn('flex items-center gap-2 mt-4')}>
          <Clock />
          <p>Registrado el {new Date(movement.created_at).toLocaleDateString()}</p>
        </div>
      </footer>
    </section>
  )
}

export default MovementDetailsModal