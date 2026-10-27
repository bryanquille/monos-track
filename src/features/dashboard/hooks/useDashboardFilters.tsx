import { useForm, useWatch } from "react-hook-form"
import { MONTH_NAMES } from "../../../shared/constants/constants"
import { useMemo } from "react";
import type { FinancialDataTypes } from "../types/dashboardTypes";

export interface FilterFormValues {
  year: string
  month: string
}

interface UseDashboardFiltersTypes {
  financialData: FinancialDataTypes[]
}

export const useDashboardFilters = ({ financialData }: UseDashboardFiltersTypes) => {
  // Getting current date
  const currentMonth = new Date().getMonth() + 1 // Get current month index
  const currentYear = String(new Date().getFullYear())  // Get current year

  // React Hook Form for managing the select inputs for year and month
  const { register, control } = useForm<FilterFormValues>({
    defaultValues: {
      'year': currentYear,
      'month': MONTH_NAMES[currentMonth - 1].toLowerCase()
    }
  })

  // Getting the selected year and month from the filters form
  const selectedYear = useWatch({
    control,
    name: 'year'
  })

  const selectedMonth = useWatch({
    control,
    name: 'month'
  })

  // Getting a list of available years in data for the select input
  const availableYears = useMemo(() => {
    const uniqueYears = Array.from(
      new Set([...financialData.map(item => item.movement_date.slice(0, 4)), currentYear])
    )
    return ['noYearSelected', ...uniqueYears]
  }, [financialData, currentYear])

  // Getting a list of available months in data for the select input
  const availableMonths = useMemo(() => {
    const currentMonthIndex = new Date().getMonth()
    const filteredMonths = selectedYear === currentYear
      ? MONTH_NAMES.filter((_, index) => index <= currentMonthIndex)
      : MONTH_NAMES
    return ['noMonthSelected', ...filteredMonths]
  }, [currentYear, selectedYear])

  return {
    currentYear,
    currentMonth,
    register,
    selectedYear,
    selectedMonth,
    availableYears,
    availableMonths
  }
}
