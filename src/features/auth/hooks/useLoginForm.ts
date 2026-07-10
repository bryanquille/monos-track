import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../schemas/loginSchema";
import { supabase } from "../../../shared/lib/supabase";
import { sileo } from "sileo";

export const useLoginForm = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginData) => {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (signInError) throw signInError
    },
    onSuccess: () => {
      navigate({ to: '/dashboard' })
    },
    onError: (error: Error) => {
      sileo.error({
        title: "Error al iniciar sesión.",
        description: error.message,
      });
    }
  })

  return {
    mutate,
    isPending
  }
}
