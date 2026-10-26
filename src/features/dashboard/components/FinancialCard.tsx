import { cn } from "../../../shared/utils/cn"
import { BanknoteArrowDown, BanknoteArrowUp, CircleEqual, Info, TrendingDown, TrendingUp } from "lucide-react"
import { useTimeAgo } from "../hooks/useTimeAgo"
import type { FinancialCardData } from "../hooks/useFinancialCardsData"

interface FinancialCardProps extends FinancialCardData {
  selectedYear: string
}

function FinancialCard({
  cardType,
  title,
  amount,
  iconBg,
  iconColor,
  diffText,
  trend,
  lastUpdatedDate,
  selectedYear
}: FinancialCardProps) {

  const updatedDateMessage = useTimeAgo(lastUpdatedDate ?? 0)
  const Icon = cardType === 'incomes' ? BanknoteArrowUp : cardType === 'expenses' ? BanknoteArrowDown : Info

  const renderFooter = () => {
    if (selectedYear === 'noYearSelected') {
      return (
        <span className="flex items-center gap-2 text-indigo-500">
          <Info size={18} /> Selecciona un año para ver la información
        </span>
      )
    }

    if (cardType === 'balance') {
      return (
        <span className="flex items-center gap-2 text-indigo-500">
          <Info size={18} /> Última actualización {updatedDateMessage}
        </span>
      )
    }

    if (cardType === 'incomes') {
      if (trend === 'positive') {
        return (
          <span className="flex items-center gap-2 text-green-500 font-medium">
            <TrendingUp size={18} /> {diffText}
          </span>
        )
      }

      if (trend === 'negative') {
        return (
          <span className="flex items-center gap-2 text-red-500 font-medium">
            <TrendingDown size={18} /> {diffText}
          </span>
        )
      }
    }

    if (cardType === 'expenses') {
      if (trend === 'negative') {
        return (
          <span className="flex items-center gap-2 text-red-500 font-medium">
            <TrendingUp size={18} /> {diffText}
          </span>
        )
      }

      if (trend === 'positive') {
        return (
          <span className="flex items-center gap-2 text-green-500 font-medium">
            <TrendingDown size={18} /> {diffText}
          </span>
        )
      }
    }

    return (
      <span className="flex items-center gap-2 text-indigo-500 font-medium">
        <CircleEqual size={18} /> {diffText}
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
        {renderFooter()}
      </div>
    </article>
  )
}

export default FinancialCard