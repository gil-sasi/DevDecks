import mongoose, { Schema, Document } from 'mongoose'
import { IQuizAttempt, IQuestion } from '../types'

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
})

const quizAttemptSchema = new Schema<IQuizAttempt>({
  applicantId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  deckId: {
    type: Schema.Types.ObjectId,
    ref: 'Deck',
    required: true,
  },
  deckTitle: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1,
  },
  answers: [
    {
      type: Number,
      min: 0,
      max: 3,
    },
  ],
  questions: [questionSchema],
  startedAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0,
  },
})

export default mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema)
