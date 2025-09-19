import { Document } from 'mongoose'

export interface IApplicant extends Document {
  _id: string
  email: string
  createdAt: Date
}

export interface IQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

export interface IDeck extends Document {
  _id: string
  title: string
  description: string
  questions: IQuestion[]
  createdAt: Date
  questionCount: number
}

export interface IQuizAttempt extends Document {
  _id: string
  applicantId: string
  email: string
  deckId: string
  deckTitle: string
  score: number
  totalQuestions: number
  answers: number[]
  questions: IQuestion[] // Store the selected questions for scoring
  startedAt: Date
  finishedAt?: Date
  timeSpent: number
}

// API response version with id instead of _id
export interface QuizAttemptResponse {
  id: string
  applicantId: string
  email: string
  deckId: string
  deckTitle: string
  score: number
  totalQuestions: number
  answers: number[]
  questions: IQuestion[] // Store the selected questions for scoring
  startedAt: Date
  finishedAt?: Date
  timeSpent: number
}

export interface ApiResponse<T> {
  data?: T
  success?: boolean
  message?: string
  status?: number
}

export interface ApiError {
  message: string
  status: number
}

export interface CreateApplicantRequest {
  email: string
}

export interface StartAttemptRequest {
  applicantId: string
  deckId: string
}

export interface FinishAttemptRequest {
  attemptId: string
  answers: number[]
}

export interface LeaderboardEntry {
  applicantId: string
  email: string
  score: number
  deckTitle: string
  finishedAt: string
}
