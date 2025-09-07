// Core entities
export interface User {
  applicantId: string
  email: string
}

export interface Deck {
  id: string
  _id?: string // MongoDB ID fallback
  title: string
  description: string
  questionCount: number
  questions?: Question[]
  createdAt?: string
  updatedAt?: string
}

export interface Question {
  id?: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizAttempt {
  id: string
  applicantId: string
  email: string
  deckId: string
  deckTitle: string
  score: number
  totalQuestions: number
  answers: number[]
  questions: Question[]
  startedAt: string
  finishedAt?: string
  timeSpent?: number
}

export interface LeaderboardEntry {
  applicantId: string
  email: string
  score: number
  deckTitle: string
  finishedAt: string
}

// API types
export interface ApiError {
  message: string
  status: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Request/Response types
export interface StartAttemptRequest {
  applicantId: string
  deckId: string
}

export interface StartAttemptResponse {
  id: string
  applicantId: string
  email: string
  deckId: string
  deckTitle: string
  score: number
  totalQuestions: number
  answers: number[]
  questions: Question[]
  startedAt: string
  finishedAt?: string
  timeSpent: number
}

export interface FinishAttemptRequest {
  attemptId: string
  answers: number[]
}

export interface CreateApplicantRequest {
  email: string
}

export interface CreateDeckRequest {
  title: string
  description: string
}

export interface UpdateDeckRequest extends CreateDeckRequest {
  id: string
}

export interface AddQuestionRequest {
  deckId: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface UpdateQuestionRequest extends AddQuestionRequest {
  questionIndex: number
}

export interface RemoveQuestionRequest {
  deckId: string
  questionIndex: number
}

// Admin types
export interface AdminAuthRequest {
  token: string
}

export interface Stats {
  totalCategories: number
  totalQuestions: number
  totalAttempts?: number
}

// UI Component Props
export interface BaseComponentProps {
  className?: string
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// Utility types
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type InputSize = 'sm' | 'md' | 'lg'
export type CardSize = 'sm' | 'md' | 'lg'

// Quiz state types
export interface QuizState {
  started: boolean
  finished: boolean
  currentQuestionIndex: number
  selectedAnswers: (number | undefined)[]
  attemptId: string | null
  elapsedTime: number
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: Record<keyof T, string>
  isValid: boolean
  isDirty: boolean
}
