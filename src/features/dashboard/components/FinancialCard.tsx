import { cn } from "../../../shared/utils/cn";
import type { LucideIcon } from "lucide-react";

interface FinancialCardProps {
  title: string
  mainIcon: LucideIcon
  mainIconBg: string
  mainIconColor: string
  cashValue: string
  recapIcon: LucideIcon
  recapText: string
  recapTextColor: string
}

function FinancialCard({
  title,
  mainIcon: MainIcon,
  mainIconBg,
  mainIconColor,
  cashValue,
  recapIcon: RecapIcon,
  recapText,
  recapTextColor,
}: FinancialCardProps) {
  return (
    <article className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <div className={cn('flex flex-row-reverse justify-end items-center gap-2')}>
        <h3 className={cn('font-Plus-Jakarta-Sans font-medium text-[18px] opacity-65')}>{title}</h3>
        <div className={cn(
          `p-1 rounded-md grid place-items-center ${mainIconBg}`,
        )}>
          <MainIcon className={cn(`${mainIconColor}`)} />
        </div>
      </div>
      <p className={cn('font-Geist-Mono font-semibold text-2xl')}>
        ${cashValue}
      </p>
      <p className={cn(
        `flex flex-row gap-2 text-sm ${recapTextColor}`
      )}>
        <RecapIcon size={18} />
        <span>{recapText}</span>
      </p>
    </article>
  )
}

export default FinancialCard