import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import RegisterPage from '../components/pages/registerPage/RegisterPage'

export const Route = createFileRoute('/register')({
  beforeLoad: async () => {
    const state = useAuthStore.getState()
    let user = state.user
    const isLoading = state.isLoading

    if (isLoading) {
      const { data: { session } } = await supabase.auth.getSession()
      user = session?.user ?? null
    }

    if (user) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RegisterPage,
})