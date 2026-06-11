import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { RegisterData } from "../schemas/registerSchema";
import { supabase } from "../../../lib/supabase";

export const useRegisterForm = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          }
        }
      })
      if (signUpError) throw signUpError
    },
    onSuccess: () => {
      alert('¡Registro exitoso! Revisa tu correo para revisar tu cuenta.')
      navigate({ to: '/login' })
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })

  return {
    mutate,
    isPending
  }
}
