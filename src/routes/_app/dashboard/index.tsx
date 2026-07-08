import { createFileRoute, redirect } from '@tanstack/react-router'
import DashboardPage from '../../../features/dashboard/pages/DashboardPage';
import { useAuthStore } from '../../../shared/stores/authStore';
import { supabase } from '../../../shared/lib/supabase';

export const Route = createFileRoute('/_app/dashboard/')({
  beforeLoad: async () => {
    const state = useAuthStore.getState()
    let user = state.user
    const { isLoading } = state

    if (isLoading) {
      const { data: { session } } = await supabase.auth.getSession()
      user = session?.user ?? null
    }

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: '/dashboard'
        }
      })
    }
  },
  component: DashboardPage,
})