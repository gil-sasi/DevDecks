import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { Deck, ApiResponse } from '@/types'

export const useAdmin = () => {
  const queryClient = useQueryClient()

  // Set admin token for requests
  const setAdminToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Get deck details with questions
  const getDeckDetails = async (deckId: string): Promise<Deck> => {
    const response = await api.get<ApiResponse<Deck>>(`/admin/decks/${deckId}`)
    return response.data.data
  }

  // Create new deck
  const useCreateDeck = () => {
    const createDeck = async (deckData: { title: string; description: string }): Promise<Deck> => {
      const response = await api.post<ApiResponse<Deck>>('/admin/decks', deckData)
      return response.data.data
    }

    return useMutation({
      mutationFn: createDeck,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['decks'] })
      },
    })
  }

  // Add question to deck
  const useAddQuestion = () => {
    const addQuestion = async (data: {
      deckId: string
      question: string
      options: string[]
      correctAnswer: number
    }): Promise<Deck> => {
      const response = await api.post<ApiResponse<Deck>>(`/admin/decks/${data.deckId}/questions`, {
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
      })
      return response.data.data
    }

    return useMutation({
      mutationFn: addQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['decks'] })
      },
    })
  }

  // Update deck
  const useUpdateDeck = () => {
    const updateDeck = async (data: {
      id: string
      title?: string
      description?: string
    }): Promise<Deck> => {
      const response = await api.put<ApiResponse<Deck>>(`/admin/decks/${data.id}`, {
        title: data.title,
        description: data.description,
      })
      return response.data.data
    }

    return useMutation({
      mutationFn: updateDeck,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['decks'] })
      },
    })
  }

  // Delete deck
  const useDeleteDeck = () => {
    const deleteDeck = async (deckId: string): Promise<void> => {
      await api.delete(`/admin/decks/${deckId}`)
    }

    return useMutation({
      mutationFn: deleteDeck,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['decks'] })
      },
    })
  }

  // Update question in deck
  const useUpdateQuestion = () => {
    const updateQuestion = async (data: {
      deckId: string
      questionIndex: number
      question: string
      options: string[]
      correctAnswer: number
    }): Promise<Deck> => {
      const response = await api.put<ApiResponse<Deck>>(
        `/admin/decks/${data.deckId}/questions/${data.questionIndex}`,
        {
          question: data.question,
          options: data.options,
          correctAnswer: data.correctAnswer,
        }
      )
      return response.data.data
    }

    return useMutation({
      mutationFn: updateQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['decks'] })
      },
    })
  }

  // Remove question from deck
  const useRemoveQuestion = () => {
    const removeQuestion = async (data: {
      deckId: string
      questionIndex: number
    }): Promise<Deck> => {
      const response = await api.delete<ApiResponse<Deck>>(
        `/admin/decks/${data.deckId}/questions/${data.questionIndex}`
      )
      return response.data.data
    }

    return useMutation({
      mutationFn: removeQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['decks'] })
      },
    })
  }

  return {
    setAdminToken,
    useCreateDeck,
    useAddQuestion,
    useUpdateDeck,
    useUpdateQuestion,
    useDeleteDeck,
    useRemoveQuestion,
    getDeckDetails,
  }
}
