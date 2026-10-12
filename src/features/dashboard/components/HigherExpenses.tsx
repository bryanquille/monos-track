import { cn } from "../../../shared/utils/cn"
import type { top5DataTypes } from "../hooks/useHigherExpenses";

interface HigherExpensesPropsTypes {
  top5Data: top5DataTypes[]
}

export const HigherExpenses = ({ top5Data }: HigherExpensesPropsTypes) => { // Replace 'any' with the correct type
  const EXPENSE_CATEGORIES_EMOJIS = [
    { value: 'food', label: 'Alimentación', color: '#EF4444', emoji: '🍔' },
    { value: 'housing', label: 'Vivienda', color: '#0EA5E9', emoji: '🏠' },
    { value: 'transport', label: 'Transporte', color: '#FF6B6B', emoji: '🚗' },
    { value: 'utilities', label: 'Servicios', color: '#F97316', emoji: '💡' },
    { value: 'health', label: 'Salud y Cuidado', color: '#2563EB', emoji: '🩺' },
    { value: 'entertainment', label: 'Entretenimiento y Ocio', color: '#EC4899', emoji: '🎬' },
    { value: 'shopping', label: 'Compras Personales', color: '#10B981', emoji: '🛍️' },
    { value: 'education', label: 'Educación', color: '#14B8A6', emoji: '📚' },
    { value: 'debt', label: 'Pago de Deudas', color: '#D946EF', emoji: '💳' },
    { value: 'other_expense', label: 'Otros Gastos', color: '#EAB308', emoji: '📦' },
  ]

  return (
    <article className={cn('p-4 flex flex-col justify-center items-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <h2 className={cn('pb-0.5 border-b-4 border-b-secondary-light font-semibold text-2xl dark:border-b-neutral-dark')}>Mayores Gastos</h2>
      <div>
        {
          top5Data.map(item => {
            return (
              <div
                key={item.value}
                className={cn('mb-1.5 flex justify-between items-center gap-10')}
              >
                <span className={cn('text-4xl')}>
                  {EXPENSE_CATEGORIES_EMOJIS.filter(emojiItem => emojiItem.value === item.value)[0].emoji}
                </span>
                <span className={cn('text-xl')}>
                  {EXPENSE_CATEGORIES_EMOJIS.filter(emojiItem => emojiItem.value === item.value)[0].label}
                </span>
                <span className={cn('text-right text-xl font-Geist-Mono')}>
                  ${item.currentAmount.toFixed(2)}
                </span>
              </div>
            )
          })
        }
      </div>
    </article>
  )
}