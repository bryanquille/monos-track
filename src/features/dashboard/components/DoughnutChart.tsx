import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { cn } from '../../../shared/utils/cn';
import { useTheme } from '../../../shared/stores/themeStore';

ChartJS.register(ArcElement, Title, Tooltip, Legend)

interface DoughnutChartPropsTypes {
  labels: string[]
  values: number[]
  colors: string[]
  border: string[]
}

export const DoughnutChart = ({ labels, values, colors, border }: DoughnutChartPropsTypes) => {
  const { isDark } = useTheme()

  const themeColors = {
    title: isDark ? '#f5f5f5' : '#0f172a',
    legend: isDark ? '#f5f5f5' : '#0f172a',
    ticks: isDark ? '#f5f5f5' : '#0f172a',
    grid: isDark ? '#81878faa' : '#565b6166'
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
        labels: {
          color: themeColors.legend,
          font: {
            size: 16
          }
        },
        position: 'left' as const,
      },
    }
  }
  return (
    <div className={cn('p-4 flex flex-col justify-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  )
}
