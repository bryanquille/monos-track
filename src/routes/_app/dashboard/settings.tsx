import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';

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
  component: () => <div className='text-center dark:text-neutral-dark'>Settings</div>,
})