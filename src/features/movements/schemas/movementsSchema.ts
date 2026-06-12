import { z } from 'zod'

const INCOME_VALUES = ['salary', 'freelance', 'sales', 'investments', 'gifts', 'refunds', 'other_income'] as const
export const INCOME_CATEGORIES = [
  { value: 'salary', label: 'Salario / Nómina' },
  { value: 'freelance', label: 'Honorarios / Freelance' },
  { value: 'sales', label: 'Ventas' },
  { value: 'investments', label: 'Inversiones y Rendimientos' },
  { value: 'gifts', label: 'Regalos / Donaciones' },
  { value: 'refunds', label: 'Reembolsos' },
  { value: 'other_income', label: 'Otros Ingresos' },
]

const EXPENSE_VALUES = ['food', 'housing', 'transport', 'utilities', 'health', 'entertainment', 'shopping', 'education', 'debt', 'other_expense'] as const
export const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Alimentación' },
  { value: 'housing', label: 'Vivienda' },
  { value: 'transport', label: 'Transporte' },
  { value: 'utilities', label: 'Servicios' },
  { value: 'health', label: 'Salud y Cuidado' },
  { value: 'entertainment', label: 'Entretenimiento y Ocio' },
  { value: 'shopping', label: 'Compras Personales' },
  { value: 'education', label: 'Educación' },
  { value: 'debt', label: 'Pago de Deudas' },
  { value: 'other_expense', label: 'Otros Gastos' },
]

const GET_MONEY_METHOD_VALUES = ['cash', 'transfer', 'deposit'] as const

const ACCEPTED_FILE_TYPES = ['image/jpeg', "image/jpg", 'image/png', 'application/pdf']
const MAX_FILE_SIZE = 10 * 1024 * 1024

export const MovementsSchema = z.object({
  movementType: z
    .enum(['income', 'expense']),

  amount: z
    .coerce.number<number>({ message: 'La cantidad en dolares es requerida.' })
    .positive('El valor ingresado debe ser mayor a cero.'),

  movementDate: z
    .iso.date('La fecha es requerida.'),

  category: z
    .enum(INCOME_VALUES, { message: 'Debes escoger una categoria.' })
    .or(z.enum(EXPENSE_VALUES, { message: 'Debes escoger una categoria.' })),

  getMoneyMethod: z
    .enum(GET_MONEY_METHOD_VALUES, { message: 'Debes escoger un método de pago.' }),

  description: z
    .string()
    .optional(),

  receiptUpload: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      'El archivo no debe pesar más de 10MB.'
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0].type),
      'Solo se aceptan formatos .png .jpg .pdf'
    )
})

export type MovementsData = z.infer<typeof MovementsSchema>