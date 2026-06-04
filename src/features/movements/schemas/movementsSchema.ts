import { z } from 'zod'

const incomeCategoryOptions = ['salary', 'freelance', 'sales', 'investments', 'gifts', 'refunds', 'other'] as const
const getMoneyMethodOptions = ['cash', 'transfer', 'deposit'] as const

const ACCEPTED_FILE_TYPES = ['image/jpeg', "image/jpg", 'image/png', 'application/pdf']
const MAX_FILE_SIZE = 5 * 1024 * 1024

export const MovementsSchema = z.object({
  amount: z
    .coerce.number<number>({ message: 'La cantidad en dolares es requerida.' })
    .positive('El valor ingresado debe ser mayor a cero.'),

  movementDate: z
    .iso.date('La fecha es requerida.'),

  category: z
    .enum(incomeCategoryOptions, { message: 'Debes escoger una categoria.' }),

  getMoneyMethod: z
    .enum(getMoneyMethodOptions, { message: 'Debes escoger un método de pago.' }),

  description: z
    .string()
    .optional(),

  receiptUpload: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      'El archivo no debe pesar más de 5MB.'
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0].type),
      'Solo se aceptan formatos .png .jpg, .pdf'
    )
})

export type MovementsData = z.infer<typeof MovementsSchema>