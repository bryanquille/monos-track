import { z } from 'zod';

export const movementSchema = z.object({
  // En Zod 4, las opciones de configuración de error usan el parámetro 'error'
  movementType: z.enum(['income', 'expense'], {
    error: 'Please select a valid movement type',
  }),

  // El método coerce hereda la configuración de 'error' para fallos de tipo primitivo
  amount: z.coerce
    .number({
      error: 'Amount must be a valid number',
    })
    .positive({
      error: 'Amount must be greater than zero',
    }),

  // Para emular required vs invalid_type en Zod 4, pasamos una función al parámetro 'error'
  movementDate: z.coerce.date({
    error: (issue) => {
      if (issue.input === undefined || issue.input === '') {
        return 'Date is required';
      }
      return 'Please enter a valid date';
    },
  }),

  // Selects obligatorios (si el input HTML manda string vacío "", falla el .min)
  category: z.string().min(1, { error: 'Please select a category' }),

  getMoneyMethod: z.string().min(1, { error: 'Please select a payment method' }),

  // Campo opcional que maneja correctamente los strings vacíos que envían los formularios por defecto
  description: z.string()
    .max(500, { error: 'Description cannot exceed 500 characters' })
    .optional()
    .or(z.literal('')),

  // Procesamiento de FileList a File usando la nomenclatura correcta de Zod 4 para .refine
  receiptUpload: z
    .custom<FileList | File>()
    .transform((value) => {
      if (value instanceof FileList) {
        return value.length > 0 ? value.item(0) : null;
      }
      if (value instanceof File) return value;
      return null;
    })
    .refine((file) => {
      if (!file) return true; // Al ser opcional, si no hay archivo pasa la validación
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      return file.size <= maxFileSize;
    }, {
      error: 'File size must be less than 10MB',
    })
    .refine((file) => {
      if (!file) return true;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      return allowedTypes.includes(file.type);
    }, {
      error: 'Only JPG, PNG, and PDF files are allowed',
    })
    .nullable()
    .optional(),
});

export type MovementFormValues = z.infer<typeof movementSchema>;