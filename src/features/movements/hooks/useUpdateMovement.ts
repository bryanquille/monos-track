import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { updateMovementInSupabase, type UpdateMovementPayload } from "../api/movements.api";

interface UpdateParametersType {
  id: string
  data: UpdateMovementPayload
  oldReceiptPath: string | null
}

export const useUpdateMovement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
      oldReceiptPath
    }: UpdateParametersType) => {
      return await updateMovementInSupabase({ id, data, oldReceiptPath })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-data'] })
      sileo.success({ title: '¡Movimiento actualizado con exito!' })
      console.log('Movimiento actualizado con exito')
    },
    onError: (error) => {
      sileo.error({ title: 'Error al actualizar el movimiento', description: error.message })
      console.log('Error al actualizar el movimiento:', error.message)
    }
  })
}