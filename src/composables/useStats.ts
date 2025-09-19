import { useQuery } from '@tanstack/react-query'
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

  return {
    stats: data,
    isLoading,
    isError,
    error,
    refetch,
  }
}
