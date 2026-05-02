import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: window.matchMedia('(prefers-color-schema: dark)').matches,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme'
    }
  )
)
