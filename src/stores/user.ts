import { create } from 'zustand'
import type { User } from '@/types'

interface UserState {
  user: User | null
  setUser: (userData: User) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (userData: User) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  isAuthenticated: () => get().user !== null,
}))
