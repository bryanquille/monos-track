import { cn } from "../../../shared/utils/cn"
import { BanknoteArrowDown, BanknoteArrowUp, CircleEqual, Info, TrendingDown, TrendingUp } from "lucide-react"
import { useTimeAgo } from "../hooks/useTimeAgo"
import type { CardType } from "../hooks/useFinancialCardsData"

interface FinancialCardPropsTypes {
  cardType: CardType
  selectedYear: string
  selectedMonth: string
  currentTotalIncomes?: number
  lastTotalIncomes?: number
  currentTotalExpenses?: number
  lastTotalExpenses?: number
  currentTotalBalance?: number
  lastUpdatedDate?: number
}

function FinancialCard({
  cardType,
  selectedYear,
  selectedMonth,
  currentTotalIncomes,
  lastTotalIncomes,
  currentTotalExpenses,
  lastTotalExpenses,
  currentTotalBalance,
  lastUpdatedDate
}: FinancialCardPropsTypes) {

  const periodLabel = selectedYear === 'noYearSelected'
    ? null
    : selectedMonth === 'nomonthselected'
      ? 'año'
      : 'mes'

  const updatedDateMessage = useTimeAgo(lastUpdatedDate ?? 0)

  const getCardConfiguration = () => {
    if (cardType === 'incomes') {
      const current = currentTotalIncomes ?? 0
      const last = lastTotalIncomes ?? 0
      const diff = last > 0 ? ((current - last) * 100) / last : 0
      return {
        title: 'Ingresos',
        amount: currentTotalIncomes,
        diffPercentage: diff,
        iconBg: 'bg-cyan-100',
        Icon: BanknoteArrowUp,
        iconColor: 'text-primary',
      }
    }

    if (cardType === 'expenses') {
      const current = currentTotalExpenses ?? 0
      const last = lastTotalExpenses ?? 0
      const diff = last > 0 ? ((current - last) * 100) / last : 0
      return {
        title: 'Gastos',
        amount: currentTotalExpenses,
        diffPercentage: diff,
        iconBg: 'bg-red-100',
        Icon: BanknoteArrowDown,
        iconColor: 'text-red-500',
      }
    }

    return {
      title: 'Balance',
      amount: currentTotalBalance,
      diffPercentage: null,
      iconBg: 'bg-sky-100',
      Icon: Info,
      iconColor: 'text-sky-500',
    }
  }

  const { title, amount, diffPercentage, iconBg, Icon, iconColor } = getCardConfiguration()

  const renderCardFooter = () => {
    if (selectedYear === 'noYearSelected') {
      return (
        <span className="flex items-center gap-2 text-indigo-500">
          <Info size={18} /> Selecciona un año para ver la información
        </span>
      )
    }

    if (cardType === 'balance' || diffPercentage === null) {
      return (
        <span className="flex items-center gap-2 text-indigo-500">
          <Info size={18} /> Última actualización {updatedDateMessage}
        </span>
      )
    }

    const absPercentage = Math.abs(diffPercentage).toFixed(2)
    const suffix = `% desde el ${periodLabel} pasado`

    // If the card is for incomes
    if (cardType === 'incomes') {
      if (diffPercentage > 0) {
        // Incomes increase
        return (
          <span className="flex items-center gap-2 text-green-500 font-medium">
            <TrendingUp size={18} /> +{absPercentage}{suffix}
          </span>
        )
      }
      if (diffPercentage < 0) {
        // Incomes decrease
        return (
          <span className="flex items-center gap-2 text-red-500 font-medium">
            <TrendingDown size={18} /> -{absPercentage}{suffix}
          </span>
        )
      }
    }

    // If the card is for expenses
    if (cardType === 'expenses') {
      if (diffPercentage > 0) {
        // Expenses increase
        return (
          <span className="flex items-center gap-2 text-red-500 font-medium">
            <TrendingUp size={18} /> +{absPercentage}{suffix}
          </span>
        )
      }
      if (diffPercentage < 0) {
        // Expenses decrease
        return (
          <span className="flex items-center gap-2 text-green-500 font-medium">
            <TrendingDown size={18} /> -{absPercentage}{suffix}
          </span>
        )
      }
    }

    // If there is no difference (0%)
    return (
      <span className="flex items-center gap-2 text-indigo-500 font-medium">
        <CircleEqual size={18} /> 0.00{suffix}
      </span>
    )
  }

  return (
    <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/60 dark:bg-neutral-light/20')}>
      <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
        <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>
          {title}
        </h3>
        <div className={cn('p-1 rounded-md grid place-items-center', iconBg)}>
          <Icon className={cn(iconColor)} />
        </div>
      </div>

      <p className={cn('font-Geist-Mono font-semibold text-2xl')}>
        ${amount !== undefined ? amount.toFixed(2) : '--,--'}
      </p>

      <div className={cn('text-sm')}>
        {renderCardFooter()}
      </div>
    </article>
  )
}

export default FinancialCard