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

// TODO: Replace the options with the actual options from the backend
const options = {
  responsive: true,
  scales: {
    x: {
      grid:  {
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

// TODO: Replace the data with the actual data from the backend
const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

// TODO: Replace the data with the actual data from the backend
const data = {
  labels,
  datasets: [
    {
      label: 'Ingresos',
      data: [1, 2, 3, 4, 5],
      backgroundColor: 'rgb(53, 162, 235)'
    },
    {
      label: 'Gastos',
      data: [0.5, 1, 3, 3.7, 6],
      backgroundColor: 'rgb(255, 99, 132)'
    }
  ]
}

function BarsChart() {
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