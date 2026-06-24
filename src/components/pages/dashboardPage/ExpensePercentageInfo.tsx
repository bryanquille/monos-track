import { cn } from "../../../utils/cn";

interface ExpensePercentageInfoProps {
  category: string
  percentageValue: number
  color: string
}

function ExpensePercentageInfo({ category, percentageValue, color }: ExpensePercentageInfoProps) {
  return (
    <div className={cn('flex justify-between items-center')}>
      <div className={cn('flex items-center gap-1.5')}>
        <div
          className={cn(`w-3 h-3 rounded-4xl`)}
          style={{ backgroundColor: color }}
        ></div>
        <p>{category}</p>
      </div>
      <p>{percentageValue}%</p>
    </div>
  )
}

export default ExpensePercentageInfo