import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovementFromSupabase, type deleteMovementFromSupabasePropsTypes } from "../api/movements.api";
import { sileo } from "sileo";

export const useDeleteMovement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, receiptPath }: deleteMovementFromSupabasePropsTypes) => {
      return await deleteMovementFromSupabase({ id, receiptPath })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-data'] })
      sileo.success({ title: '¡Movimiento eliminado con exito!' })
      console.log('Movimiento eliminado con exito')
    },
    onError: (error) => {
      sileo.error({ title: 'Error al eliminar el movimiento', description: error.message })
      console.log('Error al eliminar el movimiento:', error.message)
    }
  })
}
