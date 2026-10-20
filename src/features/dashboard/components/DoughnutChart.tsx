import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { cn } from '../../../shared/utils/cn';
import { useTheme } from '../../../shared/stores/themeStore';
import { AlertCircleIcon } from 'lucide-react';

ChartJS.register(ArcElement, Title, Tooltip, Legend)

interface DoughnutChartPropsTypes {
  labels: string[]
  values: number[]
  colors: string[]
  border: string[]
  selectedYear: string
}

export const DoughnutChart = ({ labels, values, colors, border, selectedYear }: DoughnutChartPropsTypes) => {
  const { isDark } = useTheme()

  const themeColors = {
    title: isDark ? '#f5f5f5' : '#0f172a',
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Valor',
        data: values,
        backgroundColor: colors,
        borderColor: border,
        borderWidth: 2,
      }
    ]
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Gastos por categoría',
        color: themeColors.title,
        font: {
          size: 20,
          weight: 'bold' as const,
        }
      },
      legend: {
        display: false,
      },
    }
  }

  const totalValue = values.reduce((acc, curr) => acc + curr, 0)

  const legendsInformation = labels.map((item, index) => {
    return {
      label: item,
      value: values[index],
      percentage: totalValue > 0 ? ((values[index] / totalValue) * 100).toFixed(2) : '0.00',
      color: colors[index],
      border: border[index],
    }
  })

  if (selectedYear === 'noYearSelected') {
    return (
      <div className={cn('p-4 flex flex-col justify-center items-center gap-4 rounded-2xl bg-neutral-light/20')}>
        <h2 className={cn('text-xl font-semibold')}>Gastos por categoría</h2>
        <AlertCircleIcon size={40} />
        <p className={cn('text-lg text-center')}>Selecciona un año para ver los gastos por categoría</p>
      </div>
    )
  }

  return (
    <div className={cn('p-4 flex flex-col justify-center items-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <div className={cn('h-fit mb-6')}>
        <Doughnut
          data={data}
          options={options}
        />
      </div>
      <ul className={cn('w-full flex flex-col gap-6')}>
        {legendsInformation.map(item => (
          <li
            className={cn(
              'w-full p-2 pb-0.5 flex flex-col justify-between gap-1 rounded-md',
              'lg:grid lg:grid-cols-2 lg:gap-4 lg:px-4',
              'shadow-sm shadow-neutral-light dark:shadow-neutral-dark/40'
            )}
            key={item.label}
          >
            <div className={cn('flex items-center gap-2')}>
              <div
                className={cn('w-10 h-4 border-2')}
                style={{
                  backgroundColor: item.color,
                  borderColor: item.border,
                }}
              ></div>
              <p className={cn('')}>{item.label}</p>
            </div>
            <div className={cn(
              'flex justify-between items-center gap-4',
              'lg:justify-evenly'
            )}>
              <span className={cn('font-Geist-Mono text-center')}>${item.value.toFixed(2)}</span>
              <span className={cn('font-Geist-Mono')}>{item.percentage}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
