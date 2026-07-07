import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';
import SettingsPage from '../../../features/settings/pages/SettingsPage';

export const Route = createFileRoute('/_app/dashboard/settings')({
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
          redirect: 'dashboard/settings'
        }
      })
    }
  },
  component: SettingsPage,
})