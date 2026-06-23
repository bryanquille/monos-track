import { cn } from "../../../utils/cn";

interface ExpensePercentageInfoProps {
  category: string
  percentageValue: number
}

function ExpensePercentageInfo({ category, percentageValue }: ExpensePercentageInfoProps) {
  return (
    <div className={cn('flex justify-between items-center')}>
      <div className={cn('flex items-center gap-1.5')}>
        <div className={cn('w-3 h-3 rounded-4xl bg-blue-500')}></div>
        <p>{category}</p>
      </div>
      <p>{percentageValue}%</p>
    </div>
  )
}

export default ExpensePercentageInfo