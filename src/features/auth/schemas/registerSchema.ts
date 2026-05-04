import { z } from 'zod';

// Regular expression for: 1 uppercase letter, 1 number and 1 special character
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|`~]).*$/;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio" })
    .email({ message: "Formato de correo inválido" }),

  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(passwordRegex, {
      message: "La contraseña debe incluir al menos una mayúscula, un número y un carácter especial",
    }),

  confirmPassword: z
    .string()
    .min(1, { message: "Debes confirmar tu contraseña" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // The error will be associated with the confirmPassword field
  });

export type RegisterInput = z.infer<typeof registerSchema>;