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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        color: 'rgba(217, 216, 215, 0.2)'
      },
      ticks: {
        color: 'rgba(217, 216, 215, 1)'
      }
    },
    y: {
      grid: {
        color: 'rgba(217, 216, 215, 0.2)'
      },
      ticks: {
        color: 'rgba(217, 216, 215, 1)'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Ingresos vs. Gastos',
    },
  },
}

interface BarsChartPropsTypes {
  labels: string[]
  incomesValues: number[]
  expensesValues: number[]
}

function BarsChart({ labels, incomesValues, expensesValues }: BarsChartPropsTypes) {
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

  return (
    <div className={cn('w-full p-4 flex justify-center items-center rounded-2xl bg-neutral-light/20')}>
      <Bar
        options={options}
        data={data}
      />
    </div>
  )
}

export default BarsChart