import { z } from 'zod'

const incomeCategoryOptions = ['salary', 'freelance', 'sales', 'investments', 'gifts', 'refunds', 'other'] as const

const getMoneyMethodOptions = ['cash', 'transfer', 'deposit'] as const

export const MovementsSchema = z.object({
  amount: z
    .coerce.number({ message: 'La cantidad en dolares es requerida.' })
    .positive('El valor ingresado debe ser mayor a cero.'),
  
  movementDate: z
    .date('La fecha es requerida.'),
  
  category: z
    .enum(incomeCategoryOptions, { message: 'Debes escoger una categoria.' }),
  
  getMonetMethod: z
    .enum(getMoneyMethodOptions, { message: 'Debes escoger un método de pago.' }),

  description: z
    .string()
    .optional(),
  
  receiptUpload: z
    .file()
    .optional()
})

export type MovementsData = z.infer<typeof MovementsSchema>