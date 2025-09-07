import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { api } from '@/lib/axios'

export interface StatsData {
  totalQuestions: number
  totalCategories: number
}

export const useStats = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<StatsData> => {
      const response = await api.get('/decks/stats')
      return response.data.data
    },
  })

  const stats = computed(() => data.value)

  return {
    stats,
    isLoading,
    isError,
    error,
    refetch,
  }
}
