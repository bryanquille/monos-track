import { useWatch, type Control } from "react-hook-form";
import type { RegisterData } from "../schemas/registerSchema";
import { cn } from "../../../utils/cn";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  control: Control<RegisterData>
}

const PASSWORD_REQUIREMENTS = [
  { label: 'Mínimo 8 caracteres', test: (pwd: string) => pwd.length >= 8 },
  { label: 'Al menos una mayúscula (A-Z)', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: 'Al menos un número (0-9)', test: (pwd: string) => /\d/.test(pwd) },
  { label: 'Al menos un carácter especial (@$!%*?&)', test: (pwd: string) => /[@$!%*?&]/.test(pwd) },
];

const passwordStates = [
  { score: 1, label: 'Muy Débil 😡', color: 'bg-red-500' },
  { score: 2, label: 'Débil 😟', color: 'bg-orange-500' },
  { score: 3, label: 'Moderada 😐', color: 'bg-yellow-500' },
  { score: 4, label: 'Fuerte 💪', color: 'bg-emerald-500' },
]

function PasswordStrength({ control }: PasswordStrengthProps) {
  const retrievedPassword = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  })

  const passwordChecks = PASSWORD_REQUIREMENTS.map((req) => ({
    ...req,
    met: req.test(retrievedPassword)
  }))

  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Vacía', color: 'bg-zinc-300 dark:bg-zinc-700' }

    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[@$!%*?&]/.test(pass)) score++

    return passwordStates[score - 1] || passwordStates[0]
  }

  const { score, label, color } = calculateStrength(retrievedPassword)

  return (
    <article className={cn('absolute bottom-full p-3 rounded-xl shadow-xs shadow-secondary-light bg-neutral-dark')}>
      <h3 className={cn('mb-2 text-xs font-semibold')}>Requisitos y seguridad de la contraseña:</h3>
      <ul className={cn('flex flex-col justify-center gap-1')}>
        {passwordChecks.map((req, index) => (
          <li
            key={index}
            className={cn(
              'flex items-start gap-1 text-xs',
              req.met ? 'text-green-600' : 'text-gray-text',
            )}
          >
            {req.met ? (
              <Check size={14} className={cn('shrink-0')} />
            ) : (
              <X size={14} className={cn('shrink-0')} />
            )}
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1 mt-2 col-span-2">
        <div className="flex justify-between text-xs font-medium">
          <span>{label}</span>
        </div>
        {/* Contenedor de las barras */}
        <div className="flex gap-1 h-2 w-full mt-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${index < score ? color : 'bg-zinc-300 dark:bg-zinc-800'
                }`}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

export default PasswordStrength