import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { cn } from '../../../shared/utils/cn'
import { useTheme } from '../../../shared/stores/themeStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

interface BarsChartPropsTypes {
  labels: string[]
  incomesValues: number[]
  expensesValues: number[]
}

function BarsChart({ labels, incomesValues, expensesValues }: BarsChartPropsTypes) {
  const { isDark } = useTheme()

  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: incomesValues,
        backgroundColor: 'rgb(53, 162, 235)'
      },
      {
        label: 'Gastos',
        data: expensesValues,
        backgroundColor: 'rgb(255, 99, 132)'
      }
    ]
  }

  const themeColors = {
    title: isDark ? '#f5f5f5' : '#0f172a',
    legend: isDark ? '#f5f5f5' : '#0f172a',
    ticks: isDark ? '#f5f5f5' : '#0f172a',
    grid: isDark ? '#81878faa' : '#565b6166'
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Ingresos vs. Gastos',
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
            size: 14
          }
        },
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        grid: {
          color: themeColors.grid,
          drawBorder: false,
        },
        ticks: {
          color: themeColors.ticks,
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: themeColors.grid,
          drawBorder: false,
        },
        ticks: {
          color: themeColors.ticks,
          font: {
            size: 12
          }
        }
      }
    },
  }

  return (
    <div className={cn('w-full h-80 p-4 flex justify-center items-center rounded-2xl bg-neutral-light/20 md:h-96 lg:h-114')}>
      <Bar
        options={options}
        data={data}
      />
    </div>
  )
}

export default BarsChart