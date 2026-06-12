import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movementSchema, type MovementFormValues } from '../schemas/movementsSchema';
import { supabase } from '../../../lib/supabase';
// Asegúrate de importar tu cliente de supabase configurado

// Tipado para simular las opciones de los selects de forma segura
interface SelectOption {
  value: string;
  label: string;
}

const CATEGORIES: SelectOption[] = [
  { value: 'food', label: 'Alimentación' },
  { value: 'transport', label: 'Transporte' },
  { value: 'utilities', label: 'Servicios Básicos' },
  { value: 'entertainment', label: 'Entretenimiento' },
];

const PAYMENT_METHODS: SelectOption[] = [
  { value: 'cash', label: 'Efectivo' },
  { value: 'credit_card', label: 'Tarjeta de Crédito' },
  { value: 'debit_card', label: 'Tarjeta de Débito' },
  { value: 'transfer', label: 'Transferencia Bancaria' },
];

export const MovementsRegisterForm: React.FC = () => {
  const queryClient = useQueryClient();

  // Inicialización de React Hook Form usando Zod 4
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      movementType: 'expense',
      amount: 0,
      movementDate: new Date(),
      category: '',
      getMoneyMethod: '',
      description: '',
      receiptUpload: null,
    },
  });

  // Mutación de TanStack Query para manejar el flujo secuencial
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: MovementFormValues) => {
      // 1. Insertar primero los datos del movimiento en la tabla
      const { data: insertedMovement, error: dbError } = await supabase
        .from('movements')
        .insert([
          {
            movement_type: data.movementType,
            amount: data.amount,
            movement_date: data.movementDate.toISOString(),
            category: data.category,
            payment_method: data.getMoneyMethod,
            description: data.description || null,
          },
        ])
        .select()
        .single();

      if (dbError) {
        throw new Error(`Database Error: ${dbError.message}`);
      }

      if (!insertedMovement) {
        throw new Error('No se pudo recuperar el registro creado.');
      }

      // 2. Solo si el registro fue exitoso Y hay un archivo, procedemos a subirlo
      if (data.receiptUpload instanceof File) {
        const file = data.receiptUpload;
        const fileExt = file.name.split('.').pop();
        // Usamos el ID del movimiento recién creado para nombrar el archivo de forma única
        const filePath = `${insertedMovement.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('receipts')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Storage Error: ${uploadError.message}`);
        }

        // 3. Opcional: Actualizar el registro del movimiento con el path del recibo
        const { error: updateError } = await supabase
          .from('movements')
          .update({ receipt_url: filePath })
          .eq('id', insertedMovement.id);

        if (updateError) {
          throw new Error(`Update URL Error: ${updateError.message}`);
        }
      }

      return insertedMovement;
    },
    onSuccess: () => {
      // Condición cumplida: Se limpia el formulario inmediatamente tras el éxito
      reset();
      // Invalidar queries de TanStack Query para refrescar listados de movimientos si los tienes
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      alert('¡Movimiento registrado con éxito!');
    },
    onError: (error: Error) => {
      alert(`Hubo un problema al guardar el registro: ${error.message}`);
    },
  });

  const onSubmit = (values: MovementFormValues): void => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Registrar Movimiento</h2>

      {/* Tipo de Movimiento */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
        <select
          {...register('movementType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
        {errors.movementType && <p className="text-red-500 text-xs mt-1">{errors.movementType.message}</p>}
      </div>

      {/* Monto */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Monto</label>
        <input
          type="number"
          step="0.01"
          {...register('amount')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha del movimiento</label>
        <input
          type="date"
          {...register('movementDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.movementDate && <p className="text-red-500 text-xs mt-1">{errors.movementDate.message}</p>}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Seleccione una categoría</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      {/* Método de Pago */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
        <select
          {...register('getMoneyMethod')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Seleccione un método</option>
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>{method.label}</option>
          ))}
        </select>
        {errors.getMoneyMethod && <p className="text-red-500 text-xs mt-1">{errors.getMoneyMethod.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      {/* Cargar Archivo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Cargar archivo del recibo</label>
        <input
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          {...register('receiptUpload')}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {errors.receiptUpload && <p className="text-red-500 text-xs mt-1">{errors.receiptUpload.message}</p>}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {isPending ? 'Guardando...' : 'Registrar Movimiento'}
      </button>
    </form>
  );
};