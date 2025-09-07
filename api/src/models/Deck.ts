import mongoose, { Schema, Document } from 'mongoose'
import { IDeck, IQuestion } from '../types'

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

const deckSchema = new Schema<IDeck>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

deckSchema.virtual('questionCount').get(function () {
  return this.questions.length
})

// Ensure virtual fields are serialized
deckSchema.set('toJSON', { virtuals: true })
deckSchema.set('toObject', { virtuals: true })

export default mongoose.model<IDeck>('Deck', deckSchema)
