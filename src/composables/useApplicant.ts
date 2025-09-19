import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { User, CreateApplicantRequest, ApiResponse } from '@/types'

export const useApplicant = () => {
  const queryClient = useQueryClient()

  const useCreateApplicant = () => {
    const createApplicant = async (request: CreateApplicantRequest): Promise<User> => {
      const response = await api.post<ApiResponse<User>>('/applicants', request)
      return response.data.data
    }

    return useMutation({
      mutationFn: createApplicant,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['applicants'] })
      },
    })
  }

  return {
    useCreateApplicant,
  }
}
