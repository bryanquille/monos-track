import { AlertCircleIcon, ThumbsUp, TriangleAlert } from "lucide-react";
import { cn } from "../../../shared/utils/cn"
import type { top5DataTypes } from "../hooks/useHigherExpenses";
import { EXPENSE_CATEGORIES } from "../../../shared/constants/constants";

interface HigherExpensesPropsTypes {
  top5Data: top5DataTypes[]
  selectedMonth: string
  selectedYear: string
}

export const HigherExpenses = ({ top5Data, selectedMonth, selectedYear }: HigherExpensesPropsTypes) => {
  if (selectedYear === 'noYearSelected') {
    return (
      <article className={cn('p-4 flex flex-col items-center gap-4 rounded-2xl bg-neutral-light/20')}>
        <h2 className={cn('pb-0.5 font-semibold text-xl')}>Top 5 - Mayores Gastos</h2>
        <AlertCircleIcon size={40} />
        <p className={cn('text-lg text-center')}>Selecciona un año para ver los mayores gastos.</p>
      </article>
    )
  }

  return (
    <article className={cn('p-4 flex flex-col items-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <h2 className={cn('pb-0.5 font-semibold text-xl')}>Top 5 - Mayores Gastos</h2>
      <div className={cn('flex flex-col gap-4 md:gap-6')}>
        {
          top5Data.map(item => {
            return (
              <div
                key={item.value}
                className={cn(
                  'p-4 flex flex-col gap-2.5 rounded-lg',
                  ' shadow-md shadow-neutral-light dark:shadow-neutral-dark/40'
                )}
              >
                <div className={cn('flex justify-between items-center gap-4 md:gap-6 lg:gap-8')}>
                  <div className={cn('flex justify-center items-center gap-1')}>
                    <span className={cn('text-4xl')}>
                      {EXPENSE_CATEGORIES.filter(emojiItem => emojiItem.value === item.value)[0].emoji}
                    </span>
                    <p className={cn('font-medium')}>
                      {EXPENSE_CATEGORIES.filter(emojiItem => emojiItem.value === item.value)[0].label}
                    </p>
                  </div>
                  <p className={cn('text-lg font-semibold')}>
                    $<span className={cn('font-Geist-Mono')}>{item.currentAmount.toFixed(2)}</span>
                  </p>
                </div>
                <div
                  className={cn('flex justify-end gap-3 text-sm')}
                >
                  <span>
                    {(100 - ((item.previousAmount * 100) / (item.currentAmount))) > 0
                      ? <TriangleAlert size={30} className={cn('text-yellow-600 dark:text-yellow-400')} />
                      : <ThumbsUp size={30} className={cn('text-green-600 dark:text-green-400')} />
                    }
                  </span>
                  <div
                    className={cn(
                      'text-right',
                      `${(100 - ((item.previousAmount * 100) / (item.currentAmount))) >= 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                      }`
                    )}
                  >
                    <p>
                      Gasto&nbsp;
                      <span>
                        {
                          selectedMonth === 'nomonthselected'
                            ? 'año'
                            : 'mes'
                        }
                      </span>&nbsp;
                      anterior:&nbsp;
                      <span className={cn('font-Geist-Mono')}>
                        ${item.previousAmount.toFixed(2)}
                      </span>
                    </p>
                    {item.previousAmount === 0
                      ? <p>Nuevo gasto</p>
                      : (
                        <p>
                          El gasto&nbsp;
                          <span>
                            {((item.currentAmount - item.previousAmount) / item.previousAmount) > 0 ? 'aumento' : 'disminuyo'}:
                          </span>&nbsp;
                          <span className={cn('font-Geist-Mono')}>
                            {Math.abs((((item.currentAmount - item.previousAmount) / item.previousAmount) * 100)).toFixed(2)}%
                          </span>&nbsp;
                        </p>
                      )
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </article>
  )
}