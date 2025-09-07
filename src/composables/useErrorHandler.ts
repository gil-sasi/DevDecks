import { ref, computed } from 'vue'
import type { ApiError } from '@/types'

interface ErrorState {
  message: string
  code?: string | number
  timestamp: Date
}

export function useErrorHandler() {
  const errors = ref<ErrorState[]>([])
  const currentError = ref<ErrorState | null>(null)

  const hasErrors = computed(() => errors.value.length > 0)
  const latestError = computed(() => errors.value[errors.value.length - 1] || null)

  const handleError = (error: unknown, context?: string) => {
    let errorState: ErrorState

    if (error instanceof Error) {
      errorState = {
        message: error.message,
        code: 'JS_ERROR',
        timestamp: new Date(),
      }
    } else if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError
      errorState = {
        message: apiError.message || 'An unknown error occurred',
        code: apiError.status,
        timestamp: new Date(),
      }
    } else if (typeof error === 'string') {
      errorState = {
        message: error,
        timestamp: new Date(),
      }
    } else {
      errorState = {
        message: 'An unexpected error occurred',
        timestamp: new Date(),
      }
    }

    if (context) {
      errorState.message = `${context}: ${errorState.message}`
    }

    errors.value.push(errorState)
    currentError.value = errorState

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error handled:', errorState, error)
    }

    return errorState
  }

  const clearError = (index?: number) => {
    if (index !== undefined) {
      errors.value.splice(index, 1)
    } else {
      currentError.value = null
    }
  }

  const clearAllErrors = () => {
    errors.value = []
    currentError.value = null
  }

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError
      return apiError.message || 'An unknown error occurred'
    } else if (typeof error === 'string') {
      return error
    } else {
      return 'An unexpected error occurred'
    }
  }

  const isNetworkError = (error: unknown): boolean => {
    if (error instanceof Error) {
      return error.message.toLowerCase().includes('network') || 
             error.message.toLowerCase().includes('fetch')
    }
    if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError
      return apiError.status >= 500 || apiError.status === 0
    }
    return false
  }

  const isValidationError = (error: unknown): boolean => {
    if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError
      return apiError.status === 400 || apiError.status === 422
    }
    return false
  }

  const isAuthError = (error: unknown): boolean => {
    if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError
      return apiError.status === 401 || apiError.status === 403
    }
    return false
  }

  return {
    errors: computed(() => errors.value),
    currentError: computed(() => currentError.value),
    hasErrors,
    latestError,
    handleError,
    clearError,
    clearAllErrors,
    getErrorMessage,
    isNetworkError,
    isValidationError,
    isAuthError,
  }
}
