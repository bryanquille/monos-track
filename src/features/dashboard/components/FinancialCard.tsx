import { cn } from "../../../shared/utils/cn";
import { BanknoteArrowDown, BanknoteArrowUp, CircleEqual, Info, TrendingDown, TrendingUp } from "lucide-react";

interface FinancialCardProps {
  title: string
  cashValue: number | null
  lastMonthTotalIncome: number | null
  lastMonthTotalExpense: number | null
}

function FinancialCard({
  title,
  cashValue,
  lastMonthTotalIncome,
  lastMonthTotalExpense,
}: FinancialCardProps) {

  let message = ''
  let percentageOfDifference = 0

  if (title === 'totalIncome' && cashValue && lastMonthTotalIncome) {
    percentageOfDifference = ((cashValue - lastMonthTotalIncome) * 100) / lastMonthTotalIncome
    message = percentageOfDifference === 0
      ? '0% desde el mes pasado'
      : `${Math.abs(percentageOfDifference).toFixed(2)}% desde el mes pasado`
  }

  if (title === 'totalExpense' && cashValue && lastMonthTotalExpense) {
    percentageOfDifference = ((cashValue - lastMonthTotalExpense) * 100) / lastMonthTotalExpense
    message = percentageOfDifference === 0
      ? '0% desde el mes pasado'
      : `${Math.abs(percentageOfDifference).toFixed(2)}% desde el mes pasado`
  }

  if (title === 'totalBalance' && cashValue) {
    message = 'Actualizado hace 3 min'
  }

  return (
    <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
        <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>
          {title === 'totalIncome'
            ? 'Ingresos'
            : title === 'totalExpense'
              ? 'Gastos'
              : title === 'totalBalance'
              && 'Balance'
          }
        </h3>
        <div className={cn(
          'p-1 rounded-md grid place-items-center',
          title === 'totalIncome' && 'bg-cyan-100',
          title === 'totalExpense' && 'bg-red-100',
          title === 'totalBalance' && 'bg-sky-100'
        )}>
          {title === 'totalIncome'
            ? <BanknoteArrowUp className={cn('text-primary')} />
            : title === 'totalExpense'
              ? <BanknoteArrowDown className={cn('text-red-500')} />
              : title === 'totalBalance'
              && <Info className={cn('text-sky-500')} />
          }
        </div>
      </div>
      <p className={cn('font-Geist-Mono font-semibold text-2xl')}>
        ${cashValue ? cashValue : '--,--'}
      </p>
      {cashValue
        ? <p className={cn('text-sm')}>
          {title === 'totalIncome'
            ? percentageOfDifference > 0
              ? <span className={cn('flex flex-row gap-2 text-green-500')}>
                <TrendingUp size={18} /> +{message}
              </span>
              : percentageOfDifference < 0
                ? <span className={cn('flex flex-row gap-2 text-red-500')}>
                  <TrendingDown size={18} /> -{message}
                </span>
                : percentageOfDifference === 0
                && <span className={cn('flex flex-row gap-2 text-indigo-500')}>
                  <CircleEqual size={18} /> {message}
                </span>
            : title === 'totalExpense'
              ? percentageOfDifference > 0
                ? <span className={cn('flex flex-row gap-2 text-red-500')}>
                  <TrendingUp size={18} /> +{message}
                </span>
                : percentageOfDifference < 0
                  ? <span className={cn('flex flex-row gap-2 text-green-500')}>
                    <TrendingDown size={18} /> -{message}
                  </span>
                  : percentageOfDifference === 0
                  && <span className={cn('flex flex-row gap-2 text-indigo-500')}>
                    <CircleEqual size={18} /> {message}
                  </span>
              : title === 'totalBalance'
              && <span className={cn('flex flex-row gap-2 text-indigo-500')}>
                <Info size={18} /> {message}
              </span>
          }
        </p>
        : <p className={cn('flex flex-row gap-2 text-sm text-indigo-500')}>
          <Info size={18} /> Sin datos para mostrar
        </p>
      }
    </article>
  )
}

export default FinancialCard