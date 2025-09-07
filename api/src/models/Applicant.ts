import mongoose, { Schema, Document } from 'mongoose'
import { IApplicant } from '../types'

const applicantSchema = new Schema<IApplicant>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<IApplicant>('Applicant', applicantSchema)
