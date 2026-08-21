import { useForm, type SubmitHandler } from "react-hook-form";
import { cn } from "../../../shared/utils/cn";
import { CheckCircle2, ChevronDown, CloudUpload, FileText, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MovementsSchema, type MovementsData } from "../schemas/movementsSchema";
import React, { useEffect, useState } from "react";
import { useCreateMovement } from "../hooks/useCreateMovement";

interface MovementsRegisterFormProps {
  isIncome: boolean
}

function MovementsRegisterForm({ isIncome }: MovementsRegisterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm<MovementsData>({
    resolver: zodResolver(MovementsSchema),
    defaultValues: {
      movementType: isIncome ? 'income' : 'expense'
    }
  })

  const receiptFileList = watch('receiptUpload') as unknown as FileList | undefined
  const selectedFile = receiptFileList && receiptFileList.length > 0 ? receiptFileList[0] : null
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      setPreviewUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    setValue('movementType', isIncome ? 'income' : 'expense')
  }, [isIncome, setValue])

  const { mutate, isPending, error: mutationError } = useCreateMovement()

  const onSubmit: SubmitHandler<MovementsData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset()
        setPreviewUrl(null)
      }
    })
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault()
    setValue('receiptUpload', undefined as unknown as FileList)
    setPreviewUrl(null)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6')}
    >
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="amount">Monto</label>
        <input
          type="number"
          id="amount"
          placeholder="100.00"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount &&
          <span className={cn('text-sm text-red-500')}>{errors.amount.message}</span>
        }
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="movementDate">Fecha</label>
        <input
          type="date"
          id="movementDate"
          className={cn('px-5 py-3 border-2 border-secondary-light/70 rounded-md dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('movementDate')}
        />
        {errors.movementDate &&
          <span className={cn('text-sm text-red-500')}>{errors.movementDate.message}</span>
        }
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="category">Categoría</label>
        <div className={cn('relative')}>
          <select
            id="category"
            className={cn('w-full pl-5 pr-10 py-3 border-2 border-secondary-light/70 rounded-md appearance-none dark:border-neutral-light/70 dark:text-neutral-dark')}
            {...register('category')}
          >
            <option
              value=""
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Escoge una categoría
            </option>
            {isIncome ? (
              INCOME_CATEGORIES.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  className={cn('bg-white dark:bg-tertiary-dark')}
                >
                  {category.label}
                </option>
              ))
            ) : (
              EXPENSE_CATEGORIES.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  className={cn('bg-white dark:bg-tertiary-dark')}
                >
                  {category.label}
                </option>
              ))
            )}
          </select>
          <ChevronDown
            size={20}
            className={cn('absolute top-1/2 right-2.5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2')}
          />
        </div>
        {errors.category &&
          <span className={cn('text-sm text-red-500')}>{errors.category.message}</span>
        }
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="getMoneyMethod">Método de Pago</label>
        <div className={cn('relative')}>
          <select
            id="getMoneyMethod"
            className={cn('w-full pl-5 pr-10 py-3 border-2 border-secondary-light/70 rounded-md appearance-none dark:border-neutral-light/70 dark:text-neutral-dark')}
            {...register('getMoneyMethod')}
          >
            <option
              value=""
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Escoje un método
            </option>
            <option
              value="cash"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Efectivo
            </option>
            <option
              value="transfer"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Transferencia
            </option>
            <option
              value="deposit"
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Deposito
            </option>
          </select>
          <ChevronDown
            size={20}
            className={cn('absolute top-1/2 right-2.5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2')}
          />
        </div>
        {errors.getMoneyMethod &&
          <span className={cn('text-sm text-red-500')}>{errors.getMoneyMethod.message}</span>
        }
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          className={cn('h-30 px-5 py-3 border-2 border-secondary-light/70 rounded-md resize-none dark:border-neutral-light/70 dark:text-neutral-dark')}
          {...register('description')}
        ></textarea>
      </div>
      <div className={cn('flex flex-col gap-1')}>
        <span>Comprobante/Adjunto (Opcional)</span>

        {/* Input Oculto */}
        <input
          type="file"
          id="receiptUpload"
          className={cn('hidden')}
          accept=".pdf, .png, .jpg, .jpeg"
          {...register('receiptUpload')}
        />

        {selectedFile ? (
          /* VISTA 1: Cuando YA hay un archivo seleccionado */
          <div className={cn('relative p-3 border-2 border-emerald-500/70 rounded-md bg-emerald-500/10 flex flex-col items-center justify-center gap-2 min-h-30')}>
            <button
              type="button"
              onClick={handleRemoveFile}
              className={cn('absolute top-2 right-2 p-1 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/40 transition-colors')}
              title="Quitar archivo"
            >
              <X size={16} />
            </button>

            {previewUrl ? (
              /* Previsualización de Imagen */
              <div className={cn('flex flex-col items-center gap-2 w-full')}>
                <div className={cn('relative w-full h-20 rounded overflow-hidden border border-emerald-500/30')}>
                  <img
                    src={previewUrl}
                    alt="Previsualización del comprobante"
                    className={cn('w-full h-full object-cover')}
                  />
                </div>
                <span className={cn('text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-50')}>
                  {selectedFile.name}
                </span>
              </div>
            ) : (
              /* Previsualización de Documento (ej. PDF) */
              <div className={cn('flex items-center gap-3 w-full px-2')}>
                <div className={cn('p-2 rounded-lg bg-emerald-500/20 text-emerald-500')}>
                  <FileText size={24} />
                </div>
                <div className={cn('flex flex-col overflow-hidden text-left')}>
                  <span className={cn('text-sm font-medium text-emerald-600 dark:text-emerald-400 truncate')}>
                    {selectedFile.name}
                  </span>
                  <span className={cn('text-xs text-gray-500 dark:text-neutral-dark/60')}>
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <CheckCircle2 size={18} className={cn('ml-auto text-emerald-500 shrink-0')} />
              </div>
            )}
          </div>
        ) : (
          /* VISTA 2: Estado inicial cuando no se ha subido ningún archivo */
          <label
            htmlFor="receiptUpload"
            className={cn('cursor-pointer w-full h-30 flex flex-col justify-center items-center gap-0.5 border-2 border-dashed rounded-md bg-neutral-light/30 dark:bg-primary-dark/50 hover:border-primary transition-colors')}
          >
            <span className={cn('p-2 rounded-full bg-white dark:bg-tertiary-dark')}>
              <CloudUpload strokeWidth={3} className={cn('text-neutral-light/70')} />
            </span>
            <span>Haz clic para subir o arrastra un archivo</span>
            <span className={cn('text-sm text-gray-text/80 dark:text-neutral-dark/50')}>
              PDF, PNG O JPG (Máx. 10MB)
            </span>
          </label>
        )}

        {errors.receiptUpload && (
          <span className={cn('text-sm text-red-500')}>{errors.receiptUpload.message}</span>
        )}
      </div>
      {/* <div className={cn('flex flex-col gap-1')}>
        <span>Comprobante/Adjunto (Opcional)</span>
        <label
          htmlFor="receiptUpload"
          className={cn('cursor-pointer w-full h-30 flex flex-col justify-center items-center gap-0.5 border-2 border-dashed rounded-md bg-neutral-light/30 dark:bg-primary-dark/50')}
        >
          <span className={cn('p-2 rounded-full bg-white dark:bg-tertiary-dark')}>
            <CloudUpload strokeWidth={3} className={cn('text-neutral-light/70')} />
          </span>
          <span>Haz clic para subir o arrastra un archivo</span>
          <span className={cn('text-sm text-gray-text/80 dark:text-neutral-dark/50')}>PDF, PNG O JPG (Máx. 10MB)</span>
        </label>
        <input
          type="file"
          id="receiptUpload"
          className={cn('hidden')}
          accept=".pdf, .png, .jpg, .jpeg"
          {...register('receiptUpload')}
        />
        {errors.receiptUpload &&
          <span className={cn('text-sm text-red-500')}>{errors.receiptUpload.message}</span>
        }
      </div> */}
      <button
        type="submit"
        disabled={isPending}
        className={cn('cursor-pointer p-2 flex justify-center items-center gap-2 rounded-md bg-primary text-white font-semibold text-lg transition-all duration-200 hover:bg-primary/80 md:py-4 md:col-span-2')}
      >
        {isPending ? 'Guardando movimiento...' : 'Confirmar Movimiento'}
      </button>
      {mutationError && (
        <p className={cn('text-red-500')}>Ocurrio un error: {mutationError.message}</p>
      )}
    </form>
  )
}

export default MovementsRegisterForm