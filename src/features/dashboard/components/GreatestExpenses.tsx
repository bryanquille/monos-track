import { cn } from "../../../shared/utils/cn"

export const GreatestExpenses = () => {
  const EXPENSE_CATEGORIES = [
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

  // Mock data
  const MOCK_MONTHLY_EXPENSES = [
    { value: 'housing', currentAmount: 1200, previousAmount: 1200 },
    { value: 'food', currentAmount: 650, previousAmount: 580 },
    { value: 'debt', currentAmount: 450, previousAmount: 500 },
    { value: 'transport', currentAmount: 320, previousAmount: 280 },
    { value: 'entertainment', currentAmount: 250, previousAmount: 180 },
    { value: 'utilities', currentAmount: 190, previousAmount: 210 },
    { value: 'shopping', currentAmount: 150, previousAmount: 300 },
  ]

  // const MOCK_YEARLY_EXPENSES = [
  //   { value: 'housing', currentAmount: 14400, previousAmount: 13800 },
  //   { value: 'food', currentAmount: 7800, previousAmount: 7200 },
  //   { value: 'debt', currentAmount: 5400, previousAmount: 6000 },
  //   { value: 'education', currentAmount: 3200, previousAmount: 0 }, // Sin datos del año anterior
  //   { value: 'shopping', currentAmount: 2900, previousAmount: 2100 },
  //   { value: 'transport', currentAmount: 2800, previousAmount: 2500 },
  //   { value: 'health', currentAmount: 1200, previousAmount: 0 }, // Sin datos del año anterior
  // ]

  return (
    <article className={cn('p-4 flex flex-col justify-center items-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <h2 className={cn('font-semibold text-2xl')}>Mayores Gastos</h2>
      <div>
        {
          MOCK_MONTHLY_EXPENSES.map(item => {
            return (
              <div
                key={item.value}
                className={cn('mb-1.5 flex justify-between items-center gap-10')}
              >
                <span className={cn('text-3xl')}>{EXPENSE_CATEGORIES.filter(expenseItem => expenseItem.value === item.value)[0].emoji}</span>
                <span>{EXPENSE_CATEGORIES.filter(expenseItem => expenseItem.value === item.value)[0].label}</span>
                <span className={cn('text-right font-Geist-Mono')}>${item.currentAmount}</span>     
              </div>
            )
          })
        }
      </div>
    </article>
  )
}