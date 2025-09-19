import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type {
  Question,
  QuizAttempt,
  StartAttemptRequest,
  StartAttemptResponse,
  FinishAttemptRequest,
  ApiResponse,
} from '@/types'

export const useQuiz = () => {
  const queryClient = useQueryClient()

  // Fetch questions for a deck (this is now handled by the quiz start endpoint)
  const useQuizQuestions = (deckId: string, limit: number = 10) => {
    const fetchQuestions = async (): Promise<Question[]> => {
      const response = await api.get<ApiResponse<Question[]>>(
        `/decks/${deckId}/questions?limit=${limit}`
      )
      return response.data.data
    }

    return useQuery({
      queryKey: ['quiz-questions', deckId, limit],
      queryFn: fetchQuestions,
      enabled: !!deckId,
      staleTime: 0, // Always fetch fresh questions
    })
  }

  // Start quiz attempt
  const useStartAttempt = () => {
    const startAttempt = async (request: StartAttemptRequest): Promise<StartAttemptResponse> => {
      const response = await api.post<ApiResponse<StartAttemptResponse>>('/quiz/start', request)
      return response.data.data
    }

    return useMutation({
      mutationFn: startAttempt,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attempts'] })
      },
    })
  }

  // Finish quiz attempt
  const useFinishAttempt = () => {
    const finishAttempt = async (request: FinishAttemptRequest): Promise<QuizAttempt> => {
      const response = await api.post<ApiResponse<QuizAttempt>>('/quiz/finish', request)
      return response.data.data
    }

    return useMutation({
      mutationFn: finishAttempt,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attempts'] })
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
      },
    })
  }

  return {
    useQuizQuestions,
    useStartAttempt,
    useFinishAttempt,
  }
}
