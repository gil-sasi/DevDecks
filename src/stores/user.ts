import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (userData: User) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const isAuthenticated = () => {
    return user.value !== null
  }

  return {
    user: readonly(user),
    setUser,
    clearUser,
    isAuthenticated,
  }
})
