import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { LeaderboardEntry, ApiResponse } from '@/types'

export const useLeaderboard = () => {
  const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    const response = await api.get<ApiResponse<LeaderboardEntry[]>>('/leaderboard')
    return response.data.data
  }

  const {
    data: leaderboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  return {
    leaderboard,
    isLoading,
    isError,
    error,
    refetch,
  }
}
