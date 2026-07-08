import { cn } from "../../../shared/utils/cn";

interface IncomeExpenseBarsProps {
  label: string;
  incomeHeight: string;
  expenseHeight: string;
}

function IncomeExpenseBars({ label, incomeHeight, expenseHeight }: IncomeExpenseBarsProps) {
  return (
    <div>
      <div className={cn('mb-1 flex items-end gap-0.5')}>
        <div
          style={{ height: incomeHeight }} 
          className={cn(
          'w-4 bg-blue-500',
        )}></div>
        <div
          style={{ height: expenseHeight }}
          className={cn(
            'w-4 bg-red-400',
          )}></div>
      </div>
      <p className={cn('-ml-5 pt-7 pb-5 text-sm transform -rotate-60')}>{label}</p>
    </div>
  )
}

export default IncomeExpenseBars