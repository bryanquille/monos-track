import { monthNames } from "../../../shared/constants/constants.ts";
import { dataByYear } from "../utils/dataByYear.ts";

interface mockDataComprehensiveTypes {
  movement_type: string;
  amount: number;
  movement_date: string;
}

const mockDataComprehensive = [
  // --- Noviembre 2025 ---
  { movement_type: 'income', amount: 1200, movement_date: '2025-11-02' },
  { movement_type: 'expense', amount: 45, movement_date: '2025-11-05' },
  { movement_type: 'expense', amount: 150, movement_date: '2025-11-15' },
  { movement_type: 'expense', amount: 300, movement_date: '2025-11-20' },
  { movement_type: 'income', amount: 200, movement_date: '2025-11-28' },

  // --- Diciembre 2025 (Transición de año - Inicio) ---
  { movement_type: 'income', amount: 1500, movement_date: '2025-12-01' },
  { movement_type: 'expense', amount: 80, movement_date: '2025-12-03' },
  { movement_type: 'expense', amount: 200, movement_date: '2025-12-10' },
  { movement_type: 'income', amount: 500, movement_date: '2025-12-15' }, // Aguinaldo/Bono
  { movement_type: 'expense', amount: 400, movement_date: '2025-12-20' },
  { movement_type: 'expense', amount: 120, movement_date: '2025-12-24' },
  { movement_type: 'expense', amount: 90, movement_date: '2025-12-31' },

  // --- Enero 2026 (Transición de año - Fin) ---
  { movement_type: 'income', amount: 1200, movement_date: '2026-01-02' },
  { movement_type: 'expense', amount: 300, movement_date: '2026-01-05' },
  { movement_type: 'expense', amount: 60, movement_date: '2026-01-12' },
  { movement_type: 'income', amount: 100, movement_date: '2026-01-18' },
  { movement_type: 'expense', amount: 150, movement_date: '2026-01-25' },

  // --- Febrero 2026 (Múltiples transacciones en los mismos días) ---
  { movement_type: 'income', amount: 1200, movement_date: '2026-02-01' },
  { movement_type: 'expense', amount: 50, movement_date: '2026-02-08' },
  // Colisión Día 14
  { movement_type: 'expense', amount: 120, movement_date: '2026-02-14' },
  { movement_type: 'expense', amount: 45, movement_date: '2026-02-14' },
  { movement_type: 'expense', amount: 15, movement_date: '2026-02-14' },
  { movement_type: 'income', amount: 50, movement_date: '2026-02-14' },
  // Colisión Día 15
  { movement_type: 'expense', amount: 200, movement_date: '2026-02-15' },
  { movement_type: 'expense', amount: 10, movement_date: '2026-02-15' },
  { movement_type: 'expense', amount: 8, movement_date: '2026-02-15' },

  { movement_type: 'expense', amount: 75, movement_date: '2026-02-28' },

  // --- Marzo 2026 (Mes previo al "hueco") ---
  { movement_type: 'income', amount: 1300, movement_date: '2026-03-05' },
  { movement_type: 'expense', amount: 400, movement_date: '2026-03-10' },
  { movement_type: 'expense', amount: 150, movement_date: '2026-03-18' },
  { movement_type: 'expense', amount: 60, movement_date: '2026-03-25' },

  // --- Abril 2026: SIN ACTIVIDAD (El "Hueco") ---
  // No hay registros en abril. Tu app debería leer $0 en ingresos y gastos para este mes.

  // --- Mayo 2026 (Retorno de actividad - Prueba de división por cero) ---
  // Al comparar mayo contra abril, el crecimiento de ingresos/gastos será infinito si no lo manejas.
  { movement_type: 'income', amount: 1400, movement_date: '2026-05-02' },
  { movement_type: 'expense', amount: 250, movement_date: '2026-05-04' },
  { movement_type: 'expense', amount: 80, movement_date: '2026-05-12' },
  { movement_type: 'income', amount: 300, movement_date: '2026-05-15' },
  { movement_type: 'expense', amount: 190, movement_date: '2026-05-22' },
  { movement_type: 'expense', amount: 35, movement_date: '2026-05-29' },

  // --- Junio 2026 (Volumen alto de datos aleatorios) ---
  { movement_type: 'income', amount: 1200, movement_date: '2026-06-01' },
  { movement_type: 'expense', amount: 15, movement_date: '2026-06-02' },
  { movement_type: 'expense', amount: 22, movement_date: '2026-06-02' },
  { movement_type: 'expense', amount: 45, movement_date: '2026-06-05' },
  { movement_type: 'income', amount: 100, movement_date: '2026-06-10' },
  { movement_type: 'expense', amount: 180, movement_date: '2026-06-12' },
  { movement_type: 'expense', amount: 300, movement_date: '2026-06-15' },
  { movement_type: 'income', amount: 150, movement_date: '2026-06-18' },
  { movement_type: 'expense', amount: 60, movement_date: '2026-06-20' },
  { movement_type: 'expense', amount: 12, movement_date: '2026-06-25' },
  { movement_type: 'expense', amount: 90, movement_date: '2026-06-28' },
  { movement_type: 'expense', amount: 35, movement_date: '2026-06-30' },

  // --- Julio 2026 (Mes actual, datos parciales hasta la fecha) ---
  { movement_type: 'income', amount: 1250, movement_date: '2026-07-01' },
  { movement_type: 'expense', amount: 40, movement_date: '2026-07-03' },
  { movement_type: 'expense', amount: 110, movement_date: '2026-07-08' },
  { movement_type: 'expense', amount: 25, movement_date: '2026-07-12' },
  { movement_type: 'income', amount: 80, movement_date: '2026-07-14' }
]

// Getting current date
const currentMonth = new Date().getMonth() // Get current month
const currentYear = String(new Date().getFullYear())  // Get current year

// Get the array of data filtered by year
const dataByYears = dataByYear({ data: mockDataComprehensive, year: currentYear })

// Create a list of months
const monthNamesList = monthNames.map(month => month.toLowerCase())


// Create an object with the months as a key with an empty array as value
const dataByMonths: Record<string, mockDataComprehensiveTypes[]> = {
  enero: [],
  febrero: [],
  marzo: [],
  abril: [],
  mayo: [],
  junio: [],
  julio: [],
  agosto: [],
  septiembre: [],
  octubre: [],
  noviembre: [],
  diciembre: []
}

// Fill the array of each month with data according to each month for the current year
dataByYears.forEach(item => {
  const month = monthNamesList[Number(item.movement_date.slice(5, 7)) - 1]
  dataByMonths[month].push(item)
})

// Calculating the total incomes and expenses of the current month
const totalIncomeValue = dataByMonths[monthNamesList[currentMonth]]
  .filter(item => item.movement_type === 'income')
  .reduce((acc, item) => acc + item.amount, 0)

const totalExpenseValue = dataByMonths[monthNamesList[currentMonth]]
  .filter(item => item.movement_type === 'expense')
  .reduce((acc, item) => acc + item.amount, 0)

console.log(totalIncomeValue)
console.log(totalExpenseValue)