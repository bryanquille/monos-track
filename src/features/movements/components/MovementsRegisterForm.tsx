import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MONEY_METHOD_CATEGORIES } from "../../../shared/constants/constants";
import { CheckCircle2, ChevronDown, CloudUpload, FileText, X } from "lucide-react";
import { MovementsSchema, type MovementInput, type MovementOutput } from "../schemas/movementsSchema";
import { useForm, useWatch } from "react-hook-form";
import { useCreateMovement } from "../hooks/useCreateMovement";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "../../../shared/utils/cn";

interface MovementsRegisterFormProps {
  isIncome: boolean
}

function MovementsRegisterForm({ isIncome }: MovementsRegisterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm<MovementInput, unknown, MovementOutput>({
    resolver: zodResolver(MovementsSchema),
    defaultValues: {
      amount: undefined,
      movementType: isIncome ? 'income' : 'expense',
      category: '',
      paymentMethod: '',
      description: '',
      movementDate: '',
    }
  })

  const { ref: rhfFileRef, ...fileRegisterRest } = register('receiptUpload');

  const receiptFileList = useWatch({
    control,
    name: 'receiptUpload'
  })

  const selectedFile = receiptFileList && receiptFileList.length > 0
    ? receiptFileList[0] : null
  const previewUrl = useMemo(() => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) return null
    return URL.createObjectURL(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  useEffect(() => {
    setValue('movementType', isIncome ? 'income' : 'expense')
  }, [isIncome, setValue])

  // Reset category value when the movement type is changed
  useEffect(() => {
    setValue('category', '')
  }, [isIncome, setValue])

  const { mutate, isPending, error: mutationError } = useCreateMovement()

  const [fileInputKey, setFileInputKey] = useState(0)
  const onSubmit = (data: MovementOutput) => {
    mutate(data, {
      onSuccess: () => {
        reset({
          movementType: isIncome ? 'income' : 'expense',
          amount: undefined,
          movementDate: undefined,
          category: '',
          paymentMethod: undefined,
          description: '',
          receiptUpload: undefined
        })
        setFileInputKey((key) => key + 1)
      }
    })
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault()
    setValue('receiptUpload', undefined)
    setFileInputKey((key) => key + 1)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6')}
    >
      {/* Amount field */}
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="amount">Monto</label>
        <input
          type="number"
          id="amount"
          step="0.01"
          placeholder="100.00"
          aria-invalid={!!errors.amount}
          aria-describedby={errors.amount ? 'amount-error' : undefined}
          className={cn(
            'px-5 py-3 border-2 border-secondary-light/70 rounded-md',
            'dark:border-neutral-light/70 dark:text-neutral-dark'
          )}
          {...register('amount')}
        />
        {errors.amount &&
          <span
            className={cn('text-sm text-red-500')}
            id="amount-error"
            role="alert"
          >
            {errors.amount.message}
          </span>
        }
      </div>
      {/* Date field */}
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="movementDate">Fecha</label>
        <input
          type="date"
          id="movementDate"
          aria-invalid={!!errors.movementDate}
          aria-describedby={errors.movementDate ? 'movementDate-error' : undefined}
          className={cn(
            'px-5 py-3 border-2 border-secondary-light/70 rounded-md',
            'dark:border-neutral-light/70 dark:text-neutral-dark',
            'dark:scheme-dark'
          )}
          {...register('movementDate')}
        />
        {errors.movementDate &&
          <span
            className={cn('text-sm text-red-500')}
            id="movementDate-error"
            role="alert"
          >
            {errors.movementDate.message}
          </span>
        }
      </div>
      {/* Category field */}
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="category">Categoría</label>
        <div className={cn('relative')}>
          <select
            id="category"
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? 'category-error' : undefined}
            className={cn(
              'w-full pl-5 pr-10 py-3 appearance-none',
              'border-2 border-secondary-light/70 rounded-md',
              'dark:border-neutral-light/70 dark:text-neutral-dark'
            )}
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
            className={cn(
              'absolute top-1/2 right-2.5 pointer-events-none',
              'transform -translate-x-1/2 -translate-y-1/2'
            )}
          />
        </div>
        {errors.category &&
          <span
            className={cn('text-sm text-red-500')}
            id="category-error"
            role="alert"
          >
            {errors.category.message}
          </span>
        }
      </div>
      {/* Payment method field */}
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="paymentMethod">Método de Pago</label>
        <div className={cn('relative')}>
          <select
            id="paymentMethod"
            aria-invalid={!!errors.paymentMethod}
            aria-describedby={errors.paymentMethod ? 'paymentMethod-error' : undefined}
            className={cn(
              'w-full pl-5 pr-10 py-3 appearance-none',
              'border-2 border-secondary-light/70 rounded-md',
              'dark:border-neutral-light/70 dark:text-neutral-dark'
            )}
            {...register('paymentMethod')}
          >
            <option
              value=""
              className={cn('bg-white dark:bg-tertiary-dark')}
            >
              Escoge un método
            </option>
            {MONEY_METHOD_CATEGORIES.map(category => {
              return (
                <option
                  key={category.value}
                  value={category.value}
                  className={cn('bg-white dark:bg-tertiary-dark')}
                >
                  {category.label}
                </option>
              )
            })}
          </select>
          <ChevronDown
            size={20}
            className={cn(
              'absolute top-1/2 right-2.5 pointer-events-none',
              'transform -translate-x-1/2 -translate-y-1/2'
            )}
          />
        </div>
        {errors.paymentMethod &&
          <span
            className={cn('text-sm text-red-500')}
            id="paymentMethod-error"
            role="alert"
          >
            {errors.paymentMethod.message}
          </span>
        }
      </div>
      {/* Description field */}
      <div className={cn('flex flex-col gap-1')}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          className={cn(
            'h-30 px-5 py-3 resize-none',
            'border-2 border-secondary-light/70 rounded-md',
            'dark:border-neutral-light/70 dark:text-neutral-dark'
          )}
          {...register('description')}
        ></textarea>
      </div>
      {/* File field */}
      <div className={cn('flex flex-col gap-1')}>
        <span>Comprobante/Adjunto (Opcional)</span>

        {/* Input Oculto */}
        <input
          key={fileInputKey}
          type="file"
          id="receiptUpload"
          aria-invalid={!!errors.receiptUpload}
          aria-describedby={errors.receiptUpload ? 'receiptUpload-error' : undefined}
          className={cn('hidden')}
          accept="image/jpeg,image/png,image/webp"
          {...fileRegisterRest}
          ref={rhfFileRef}
        />

        {selectedFile ? (
          /* View 1: The file is selected */
          <div className={cn(
            'relative p-3 min-h-30',
            'flex flex-col items-center justify-center gap-2',
            'border-2 border-emerald-500/70 rounded-md',
            'bg-emerald-500/10',
          )}>
            <button
              type="button"
              onClick={handleRemoveFile}
              disabled={isPending}
              className={cn(
                'absolute top-2 right-2 p-1 rounded-full',
                'bg-red-500/20 text-red-500',
                'hover:bg-red-500/40 transition-colors'
              )}
              title="Quitar archivo"
            >
              <X size={16} />
            </button>

            {previewUrl ? (
              /* Image preview */
              <div className={cn('flex flex-col items-center gap-2 w-full')}>
                <div className={cn('relative w-4/5 h-20 rounded overflow-hidden border border-emerald-500/30')}>
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
              /* Doc preview (PDF) */
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
          /* View 2: Initial state when no file has been uploaded */
          <label
            htmlFor="receiptUpload"
            className={cn('cursor-pointer w-full h-30 flex flex-col justify-center items-center gap-0.5 border-2 border-dashed rounded-md bg-neutral-light/30 dark:bg-primary-dark/50 hover:border-primary transition-colors')}
          >
            <span className={cn('p-2 rounded-full bg-white dark:bg-tertiary-dark')}>
              <CloudUpload strokeWidth={3} className={cn('text-neutral-light/70')} />
            </span>
            <span>Haz clic para subir o arrastra un archivo</span>
            <span className={cn('text-sm text-gray-text/80 dark:text-neutral-dark/50')}>
              PNG, JPG O WEBP (Máx. 5MB)
            </span>
          </label>
        )}

        {errors.receiptUpload && (
          <span
            className={cn('text-sm text-red-500')}
            id="receiptUpload-error"
            role="alert"
          >
            {errors.receiptUpload.message}
          </span>
        )}
      </div>
      {/* Submit button */}
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