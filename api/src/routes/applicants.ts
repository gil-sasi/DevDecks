import express, { Request, Response } from 'express'
import Applicant from '../models/Applicant.js'
import { ApiResponse, CreateApplicantRequest } from '../types'

const router = express.Router()

// Create applicant
router.post(
  '/',
  async (
    req: Request<{}, ApiResponse<{ applicantId: string; email: string }>, CreateApplicantRequest>,
    res: Response<ApiResponse<{ applicantId: string; email: string }>>
  ) => {
    try {
      const { email } = req.body

      if (!email) {
        return res.status(400).json({
          message: 'Email is required',
          status: 400,
        })
      }

      // Check if applicant already exists
      let applicant = await Applicant.findOne({ email })

      if (applicant) {
        return res.json({
          data: {
            applicantId: applicant._id.toString(),
            email: applicant.email,
          },
          success: true,
        })
      }

      // Create new applicant
      applicant = new Applicant({ email })
      await applicant.save()

      res.status(201).json({
        data: {
          applicantId: applicant._id.toString(),
          email: applicant.email,
        },
        success: true,
      })
    } catch (error) {
      console.error('Error creating applicant:', error)
      res.status(500).json({
        message: 'Failed to create applicant',
        status: 500,
      })
    }
  }
)

export default router
