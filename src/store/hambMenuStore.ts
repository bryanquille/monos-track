import { create } from 'zustand'

interface HambMenuState {
  isHambMenuOpen: boolean
  toggleHambMenu: () => void
  closeHambMenu: () => void
}

export const useHambMenu = create<HambMenuState>((set) => ({
  isHambMenuOpen: false,
  toggleHambMenu: () => set((state) => ({ isHambMenuOpen: !state.isHambMenuOpen })),
  closeHambMenu: () => set({ isHambMenuOpen: false }),
}))