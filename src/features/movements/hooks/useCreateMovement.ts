import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitMovementToSupabase } from "../api/movements.api";
import { sileo } from "sileo";

export const useCreateMovement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitMovementToSupabase,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['movements'] })
      queryClient.invalidateQueries({ queryKey: ['financial-summary'] })
      sileo.success({ title: '¡Movimiento registrado con exito!' })
      console.log('Movimiento registrado con exito')
    },
    onError: (error) => {
      sileo.error({ title: 'Error al registrar el movimiento', description: error.message })
      console.log(error.message)
    }
  })
}
