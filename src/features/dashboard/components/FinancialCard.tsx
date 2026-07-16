import { cn } from "../../../shared/utils/cn";
import { BanknoteArrowDown, BanknoteArrowUp, Info } from "lucide-react";

interface FinancialCardProps {
  title: string
  cashValue: number | null
  lastMonthTotalIncome: number | null
  lastMonthTotalExpense: number | null,
  lastMonthTotalBalance: number | null
}

function FinancialCard({
  title,
  cashValue,
  lastMonthTotalIncome,
  lastMonthTotalExpense,
  lastMonthTotalBalance
}: FinancialCardProps) {
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
      <p className={cn(
        `flex flex-row gap-2 text-sm ${cashValue ? 'text-green-500' : 'text-indigo-500'}`
      )}>
        {cashValue
          ? title === 'totalIncome'
          : <Info size={18} />
        }
        <span>
          {cashValue
            ? 'Mostrar mensaje de si aumento, bajo o permanecio igual'
            : 'Sin datos para mostrar'
          }
        </span>
      </p>
    </article>
  )
}

export default FinancialCard