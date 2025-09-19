import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Deck, ApiResponse } from '@/types'

export const useDecks = () => {
  const fetchDecks = async (): Promise<Deck[]> => {
    const response = await api.get<ApiResponse<Deck[]>>('/decks')
    return response.data.data
  }

  const {
    data: decks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['decks'],
    queryFn: fetchDecks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    decks,
    isLoading,
    isError,
    error,
    refetch,
  }
}
