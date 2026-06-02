import { createFileRoute, redirect } from '@tanstack/react-router'
import MovementsRegisterPage from '../../../components/pages/movementsRegisterPage/MovementsRegisterPage';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';

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