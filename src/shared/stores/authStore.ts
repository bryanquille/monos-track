import { create } from 'zustand'
import { type User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isLoading: boolean
  setSession: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setSession: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    const { supabase } = await import('../lib/supabase')
    await supabase.auth.signOut()
    set({ user: null, isLoading: false })
  }
}))