import { z } from 'zod'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MONEY_METHOD_CATEGORIES } from '../../../shared/constants/constants';

const INCOME_VALUES = INCOME_CATEGORIES.map(c => c.value) as [string, ...string[]]
const EXPENSE_VALUES = EXPENSE_CATEGORIES.map(c => c.value) as [string, ...string[]]
const MONEY_METHOD_VALUES = MONEY_METHOD_CATEGORIES.map(c => c.value) as [string, ...string[]]

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024

export const MovementsSchema = z.object({
  movementType: z
    .enum(['income', 'expense'], {
      error: 'Selecciona un tipo de movimiento'
    }),

  amount: z.coerce
    .number({ error: 'La cantidad en dolares es requerida.' })
    .positive('El valor ingresado debe ser mayor a cero.'),

  movementDate: z
    .iso.date('La fecha es requerida.'),

  category: z
    .string().min(1, 'Debes escoger una categoría.'),

  paymentMethod: z
    .enum(MONEY_METHOD_VALUES, { error: 'Debes escoger un método de pago.' }),

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
      'Solo se aceptan formatos .png, .jpg o .webp'
    )
})
  .superRefine((data, ctx) => {
    if (data.movementType !== 'income' && data.movementType !== 'expense') return

    const allowedCategories = data.movementType === 'income' ? INCOME_VALUES : EXPENSE_VALUES

    if (!allowedCategories.includes(data.category)) {
      ctx.addIssue({
        code: 'custom',
        path: ['category'],
        message:
          data.movementType === 'income'
            ? 'Selecciona una categoría de ingreso válida.'
            : 'Selecciona una categoría de gasto válida.'
      })
    }
  })

export type MovementsData = z.infer<typeof MovementsSchema>
export type MovementInput = z.input<typeof MovementsSchema>
export type MovementOutput = z.output<typeof MovementsSchema>