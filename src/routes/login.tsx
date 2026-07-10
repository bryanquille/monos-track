import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../features/auth/store/authStore'
import { supabase } from '../shared/lib/supabase'
import LoginPage from '../features/auth/pages/LoginPage';

export const Route = createFileRoute('/login')({
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
  component: LoginPage,
})