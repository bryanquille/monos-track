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
    // legend: isDark ? '#f5f5f5' : '#0f172a',
    // ticks: isDark ? '#f5f5f5' : '#0f172a',
    // grid: isDark ? '#81878faa' : '#565b6166'
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

  return (
    <div className={cn('p-4 flex flex-col justify-center items-center gap-4 rounded-2xl bg-neutral-light/20')}>
      <div className={cn('h-fit mb-4')}>
        <Doughnut
          data={data}
          options={options}
        />
      </div>
      <ul className={cn('flex flex-col gap-5')}>
        {legendsInformation.map(item => (
          <li
            className={cn('pb-0.5 grid grid-cols-4 items-center gap-1 border-b-2 overflow-hidden border-b-neutral-light dark:border-b-neutral-dark')}
            key={item.label}
          >
            <span
              className={cn('w-10 h-4 border-2')}
              style={{
                backgroundColor: item.color,
                borderColor: item.border,
              }}
            ></span>
            <span className={cn('-ml-6')}>{item.label}</span>
            <span className={cn('font-Geist-Mono text-center')}>${item.value}</span>
            <span className={cn('font-Geist-Mono')}>{item.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
