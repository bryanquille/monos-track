import { BanknoteArrowDown, BanknoteArrowUp, Calendar, Clock, CreditCard, MessageSquareText, RefreshCcw, ShieldCheck, X } from "lucide-react"
import { cn } from "../../../shared/utils/cn"
import { useState } from "react"
import MovementsRegisterForm from "../components/MovementsRegisterForm"
import UserName from "../../../shared/components/UserName"
import { MovementList } from "../components/MovementsList"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../../../shared/lib/supabase"
import { EXPENSE_CATEGORIES, GET_MONEY_METHOD_CATEGORIES, INCOME_CATEGORIES } from "../../../shared/constants/constants";

export interface FinancialDataListTypes {
  amount: number
  category: string
  created_at: string
  description: string
  id: string
  movement_date: string
  movement_type: string
  payment_method: string
  receipt_path: string
  user_id: string
}

function MovementsRegisterPage() {
  const [isIncome, setIsIncome] = useState(true)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedMovement, setSelectedMovement] = useState<FinancialDataListTypes | null>(null)

  // Get data for movements
  const {
    data: movements,
  } = useQuery<FinancialDataListTypes[]>({
    queryKey: ['financial-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .order('movement_date', { ascending: false })

      if (error) throw new Error(error.message)
      return data as FinancialDataListTypes[] ?? []
    }
  })

  const handleViewDetails = (movement: FinancialDataListTypes) => {
    setSelectedMovement(movement)
    setIsDetailsModalOpen(true)
  }

  return (
    <>
      <section className={cn('w-[95%] max-w-7xl mx-auto mb-6 overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
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
      <section className={cn('w-[95%] max-w-7xl mx-auto overflow-hidden border border-neutral-light/50 rounded-xl bg-white dark:shadow-[unset] dark:bg-tertiary-dark dark:text-neutral-dark')}>
        <header className={cn('pt-6 px- flex justify-center items-center bg-neutral-light/50 dark:bg-secondary-light md:p-8')}>
          <h2 className={cn('text-4xl')}>Lista de registros</h2>
        </header>
        <main className={cn('p-4 md:p-8')}>
          {/* <RegisteredMovementsList /> */}
          <MovementList
            movements={movements}
            onViewDetails={handleViewDetails}
          />
        </main>
      </section>
      {/* Render the movement details */}
      {selectedMovement &&
        <section
          className={cn(
            'fixed top-1/2 left-1/2 -translate-1/2 z-50',
            'w-full h-full max-w-96 p-4 bg-white',
            isDetailsModalOpen ? 'block' : 'hidden',
            'md:rounded-2xl'
          )}
        >
          <header className={cn('pb-1 mb-4 flex flex-col gap-4 border-b border-neutral-light')}>
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
                {selectedMovement?.movement_type === 'income'
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
                      'w-fit px-3 py-1.5 rounded-xl font-semibold',
                      selectedMovement.movement_type === 'income'
                        ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                    )}
                  >
                    {selectedMovement?.movement_type === 'income'
                      ? 'Ingreso' : 'Gasto'
                    }</p>
                  <p
                    className={cn('font-semibold text-nowrap')}
                  >
                    {selectedMovement?.movement_type === 'income'
                      ? INCOME_CATEGORIES.filter(item => item.value === selectedMovement?.category)[0].label
                      : EXPENSE_CATEGORIES.filter(item => item.value === selectedMovement?.category)[0].label
                    }
                  </p>
                </div>
              </div>
              <p className={cn('font-Geist-Mono font-bold text-3xl')}>
                ${selectedMovement.amount.toFixed(2)}
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
                    {selectedMovement.movement_date}
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
                    {GET_MONEY_METHOD_CATEGORIES.filter(method => method.value === selectedMovement.payment_method)[0].label}
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
                  {selectedMovement?.description}
                </p>
              </div>
            </div>
            <img
              src={selectedMovement.receipt_path}
              alt={`Imagen del comprobante de ${selectedMovement.movement_type === 'income' ? 'ingresos' : 'gastos'}`}
            />
          </main>
          <footer className={cn('p-4 mt-4 border-t border-neutral-light dark:border-neutral-dark/50')}>
            <div className={cn('flex items-center gap-2 mt-4')}>
              <Clock />
              <p>Registrado el {new Date(selectedMovement.created_at).toLocaleDateString()}</p>
            </div>
          </footer>
        </section>
      }
    </>
  )
}

export default MovementsRegisterPage