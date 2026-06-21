import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitMovementToSupabase } from "../api/movements.api";

export const useCreateMovement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitMovementToSupabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movements'] })
      queryClient.invalidateQueries({ queryKey: ['financial-summary'] })
      // TODO: Use a toast notification or a popup to show success message.
      console.log('Movimiento registrado con exito')
    },
    onError: (error) => {
      // TODO: Personalize error message
      console.log(error.message)
    }
  })
}
