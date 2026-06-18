import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";
import UserName from "../../ui/UserName";
import { monthNames } from "../../../utils/constants";

function DashboardHeader() {
  const [currentDate, setCurrentDate] = useState<string>('')
  useEffect(() => {
    const getDate = () => {
      const todayDate = new Date()
      const year = todayDate.getFullYear()
      const month = todayDate.getMonth()
      setCurrentDate(`${monthNames[month]}, ${year}`)
    }
    getDate()
  }, [])

  return (
    <header className={cn('p-4 flex flex-col justify-center gap-8 bg-neutral-light/50 dark:bg-secondary-light md:p-8')}>
      <UserName />
      <div className={cn('flex flex-col justify-evenly items-start md:flex-row')}>
        <div>
          <h1 className={cn('font-semibold text-xl')}>Panel principal</h1>
          <p className={cn('opacity-60')}>Resumen de Finanzas</p>
        </div>
        {currentDate &&
          (<time
            className={cn('opacity-60')}
            dateTime={String(currentDate)}
          >
            {String(currentDate)}
          </time>)
        }
      </div>
    </header>
  )
}

export default DashboardHeader