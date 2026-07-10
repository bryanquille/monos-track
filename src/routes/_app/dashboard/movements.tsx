import { createFileRoute, redirect } from '@tanstack/react-router'
import MovementsRegisterPage from '../../../features/movements/pages/MovementsRegisterPage';
import { useAuthStore } from '../../../features/auth/store/authStore';
import { supabase } from '../../../shared/lib/supabase';

export const Route = createFileRoute('/_app/dashboard/movements')({
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
          redirect: '/dashboard/movements'
        }
      })
    }
  },
  component: () => <MovementsRegisterPage />,
})