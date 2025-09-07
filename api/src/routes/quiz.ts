import express, { Request, Response } from 'express'
import QuizAttempt from '../models/QuizAttempt.js'
import Deck from '../models/Deck.js'
import Applicant from '../models/Applicant.js'
import {
  ApiResponse,
  StartAttemptRequest,
  FinishAttemptRequest,
  IQuizAttempt,
  QuizAttemptResponse,
} from '../types'

const router = express.Router()

// Start quiz attempt
router.post(
  '/start',
  async (
    req: Request<{}, ApiResponse<QuizAttemptResponse>, StartAttemptRequest>,
    res: Response<ApiResponse<QuizAttemptResponse>>
  ) => {
    try {
      const { applicantId, deckId } = req.body

      if (!applicantId || !deckId) {
        return res.status(400).json({
          message: 'Applicant ID and Deck ID are required',
          status: 400,
        })
      }

      // Get applicant and deck info
      const applicant = await Applicant.findById(applicantId)
      const deck = await Deck.findById(deckId)

      if (!applicant) {
        return res.status(404).json({
          message: 'Applicant not found',
          status: 404,
        })
      }

      if (!deck) {
        return res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
      }

      // Select random 10 questions
      const shuffledQuestions = deck.questions.sort(() => Math.random() - 0.5).slice(0, 10)

      // Create new attempt
      const attempt = new QuizAttempt({
        applicantId,
        email: applicant.email,
        deckId,
        deckTitle: deck.title,
        score: 0,
        totalQuestions: shuffledQuestions.length,
        answers: [],
        questions: shuffledQuestions, // Store the selected questions for scoring
      })

      await attempt.save()

      res.status(201).json({
        data: {
          id: attempt._id.toString(),
          applicantId: attempt.applicantId,
          email: attempt.email,
          deckId: attempt.deckId.toString(),
          deckTitle: attempt.deckTitle,
          score: attempt.score,
          totalQuestions: attempt.totalQuestions,
          answers: attempt.answers,
          questions: attempt.questions,
          startedAt: attempt.startedAt,
          finishedAt: attempt.finishedAt,
          timeSpent: attempt.timeSpent,
        } as QuizAttemptResponse,
        success: true,
      })
    } catch (error) {
      console.error('Error starting quiz attempt:', error)
      res.status(500).json({
        message: 'Failed to start quiz attempt',
        status: 500,
      })
    }
  }
)

// Finish quiz attempt
router.post(
  '/finish',
  async (
    req: Request<{}, ApiResponse<QuizAttemptResponse>, FinishAttemptRequest>,
    res: Response<ApiResponse<QuizAttemptResponse>>
  ) => {
    try {
      const { attemptId, answers } = req.body

      if (!attemptId || !answers) {
        return res.status(400).json({
          message: 'Attempt ID and answers are required',
          status: 400,
        })
      }

      const attempt = await QuizAttempt.findById(attemptId)

      if (!attempt) {
        return res.status(404).json({
          message: 'Quiz attempt not found',
          status: 404,
        })
      }

      // Calculate score using the stored questions from the attempt
      let score = 0
      answers.forEach((answer: number, index: number) => {
        if (attempt.questions[index] && answer === attempt.questions[index].correctAnswer) {
          score++
        }
      })

      // Update attempt
      attempt.answers = answers
      attempt.score = score
      attempt.finishedAt = new Date()
      attempt.timeSpent = Math.floor(
        (attempt.finishedAt.getTime() - attempt.startedAt.getTime()) / 1000
      )

      await attempt.save()

      res.json({
        data: {
          id: attempt._id.toString(),
          applicantId: attempt.applicantId,
          email: attempt.email,
          deckId: attempt.deckId.toString(),
          deckTitle: attempt.deckTitle,
          score: attempt.score,
          totalQuestions: attempt.totalQuestions,
          answers: attempt.answers,
          questions: attempt.questions,
          startedAt: attempt.startedAt,
          finishedAt: attempt.finishedAt,
          timeSpent: attempt.timeSpent,
        } as QuizAttemptResponse,
        success: true,
      })
    } catch (error) {
      console.error('Error finishing quiz attempt:', error)
      res.status(500).json({
        message: 'Failed to finish quiz attempt',
        status: 500,
      })
    }
  }
)

export default router
