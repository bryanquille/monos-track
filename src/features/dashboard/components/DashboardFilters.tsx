import type { UseFormRegister } from "react-hook-form";
import { cn } from "../../../shared/utils/cn"

export interface FilterFormValues {
  year: string
  month: string
}

interface DashboardFiltersPropsTypes {
  register: UseFormRegister<FilterFormValues>
  availableYears: string[]
  availableMonths: string[]
}

function DashboardFilters({ register, availableYears, availableMonths }: DashboardFiltersPropsTypes) {
  return (
    <div className={cn('w-fit mx-auto px-8 py-4 md:mx-[unset] md:ml-auto')}>
      <h2 className={cn('mb-2 text-center font-semibold')}>Filtrar</h2>
      <form className={cn('flex flex-col items-center gap-4 md:flex-row md:gap-6')}>
        <div className={cn('flex items-center gap-1.5')}>
          <label
            htmlFor="year"
            className={cn('opacity-70')}
          >
            Año
          </label>
          <select
            id="year"
            className={cn('py-1 px-2 border-2 border-gray-500 rounded-md')}
            {...register('year')}
          >
            {
              availableYears.map(item => (
                <option
                  key={item}
                  value={item}
                  className={cn('dark:text-secondary-light')}
                >
                  {item === 'noYearSelected' ? 'Escoger un año' : item}
                </option>
              ))
            }
          </select>
        </div>
        <div className={cn('flex items-center gap-1.5')}>
          <label
            htmlFor="month"
            className={cn('opacity-70')}
          >
            Mes
          </label>
          <select
            id="month"
            className={cn('py-1 px-2 border-2 border-gray-500 rounded-md')}
            {...register('month')}
          >
            {
              availableMonths.map(month => (
                <option
                  key={month.toLowerCase()}
                  value={month.toLowerCase()}
                  className={cn('dark:text-secondary-light')}
                >
                  {month === 'noMonthSelected' ? 'Escoge un mes' : month}
                </option>
              ))
            }
          </select>
        </div>
      </form>
    </div>
  )
}

export default DashboardFilters