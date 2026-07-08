import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../../shared/stores/authStore'
import { supabase } from '../../shared/lib/supabase'
import HomePage from '../../features/home/pages/HomePage'

export const Route = createFileRoute('/_app/')({
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
  component: HomePage,
})