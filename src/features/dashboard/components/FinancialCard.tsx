import { cn } from "../../../shared/utils/cn"
import { BanknoteArrowDown, BanknoteArrowUp, CircleEqual, Info, TrendingDown, TrendingUp } from "lucide-react"
import { useTimeAgo } from "../hooks/useTimeAgo"

interface FinancialCardPropsTypes {
  cardType: string
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

  // Define if it is a year or a month selected in the filters
  const monthOrYear = (() => {
    if (selectedYear === 'noYearSelected') return null
    else if (selectedYear !== 'noYearSelected' && selectedMonth === 'nomonthselected') return 'año'
    else return 'mes'
  })()

  // Get the last updated time in text
  const updatedDateMessage = useTimeAgo(lastUpdatedDate ?? 0)

  const startValueAndMessage = (() => {
    if (lastTotalIncomes === 0 || lastTotalExpenses === 0) {
      return { startValue: 0, message: `% desde el ${monthOrYear} pasado` }
    }

    if (cardType === 'incomes' && currentTotalIncomes !== undefined && lastTotalIncomes !== undefined) {
      const percentageOfDifference = ((currentTotalIncomes - lastTotalIncomes) * 100) / lastTotalIncomes
      return { startValue: percentageOfDifference, message: `% desde el ${monthOrYear} pasado` }
    }

    if (cardType === 'expenses' && currentTotalExpenses !== undefined && lastTotalExpenses !== undefined) {
      const percentageOfDifference = ((currentTotalExpenses - lastTotalExpenses) * 100) / lastTotalExpenses
      return { startValue: percentageOfDifference, message: `% desde el ${monthOrYear} pasado` }
    }

    if (cardType === 'balance') {
      return { startValue: null, message: updatedDateMessage }
    }
  })()

  return (
    <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/60 dark:bg-neutral-light/20')}>
      <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
        <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>
          {cardType === 'incomes'
            ? 'Ingresos'
            : cardType === 'expenses'
              ? 'Gastos'
              : 'Balance'
          }
        </h3>
        <div className={cn(
          'p-1 rounded-md grid place-items-center',
          cardType === 'incomes' && 'bg-cyan-100',
          cardType === 'expenses' && 'bg-red-100',
          cardType === 'balance' && 'bg-sky-100'
        )}>
          {cardType === 'incomes'
            ? <BanknoteArrowUp className={cn('text-primary')} />
            : cardType === 'expenses'
              ? <BanknoteArrowDown className={cn('text-red-500')} />
              : <Info className={cn('text-sky-500')} />
          }
        </div>
      </div>
      <p className={cn('font-Geist-Mono font-semibold text-2xl')}>
        ${cardType === 'incomes'
          ? currentTotalIncomes !== undefined ? currentTotalIncomes?.toFixed(2) : '--,--'
          : cardType === 'expenses'
            ? currentTotalExpenses !== undefined ? currentTotalExpenses?.toFixed(2) : '--,--'
            : currentTotalBalance !== undefined ? currentTotalBalance?.toFixed(2) : '--,--'
        }
      </p>
      <p className={cn('text-sm')}>
        {selectedYear === 'noYearSelected'
          ? <span className={cn('flex flex-row gap-2 text-sm text-indigo-500')}>
            <Info size={18} /> Selecciona un año para ver la información
          </span>
          : (cardType === 'balance' || startValueAndMessage?.startValue === null) && startValueAndMessage
            ? <span className={cn('flex flex-row gap-2 text-sm text-indigo-500')}>
              <Info size={18} /> Última actualización {startValueAndMessage.message}
            </span>
            : cardType === 'incomes'
              ? startValueAndMessage && startValueAndMessage?.startValue > 0
                ? <span className={cn('flex flex-row gap-2 text-green-500')}>
                  <TrendingUp size={18} /> +{Math.abs(startValueAndMessage.startValue).toFixed(2) + startValueAndMessage.message}
                </span>
                : startValueAndMessage && startValueAndMessage?.startValue < 0
                  ? <span className={cn('flex flex-row gap-2 text-red-500')}>
                    <TrendingDown size={18} /> -{Math.abs(startValueAndMessage.startValue).toFixed(2) + startValueAndMessage.message}
                  </span>
                  : startValueAndMessage && startValueAndMessage?.startValue === 0
                  && <span className={cn('flex flex-row gap-2 text-indigo-500')}>
                    <CircleEqual size={18} /> {Math.abs(startValueAndMessage.startValue).toFixed(2) + startValueAndMessage.message}
                  </span>
              : cardType === 'expenses'
                && startValueAndMessage && startValueAndMessage?.startValue > 0
                ? <span className={cn('flex flex-row gap-2 text-red-500')}>
                  <TrendingUp size={18} /> +{Math.abs(startValueAndMessage.startValue).toFixed(2) + startValueAndMessage.message}
                </span>
                : startValueAndMessage && startValueAndMessage?.startValue < 0
                  ? <span className={cn('flex flex-row gap-2 text-green-500')}>
                    <TrendingDown size={18} /> -{Math.abs(startValueAndMessage.startValue).toFixed(2) + startValueAndMessage.message}
                  </span>
                  : startValueAndMessage && startValueAndMessage?.startValue === 0
                  && <span className={cn('flex flex-row gap-2 text-indigo-500')}>
                    <CircleEqual size={18} /> {Math.abs(startValueAndMessage.startValue).toFixed(2) + startValueAndMessage.message}
                  </span>
        }
      </p>
      {/* {cashValue
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
      } */}
    </article>
  )
}

export default FinancialCard