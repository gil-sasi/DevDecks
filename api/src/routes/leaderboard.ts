import express, { Request, Response } from 'express'
import QuizAttempt from '../models/QuizAttempt.js'
import { ApiResponse, LeaderboardEntry } from '../types'

const router = express.Router()

// Get leaderboard
router.get(
  '/',
  async (
    req: Request<{}, ApiResponse<LeaderboardEntry[]>, {}, { limit?: string }>,
    res: Response<ApiResponse<LeaderboardEntry[]>>
  ) => {
    try {
      const { limit = '50' } = req.query

      const leaderboard = await QuizAttempt.find({
        finishedAt: { $exists: true },
      })
        .sort({ score: -1, finishedAt: 1 }) // Sort by score desc, then by time asc
        .limit(parseInt(limit))
        .select('applicantId email score deckTitle finishedAt')

      const leaderboardData: LeaderboardEntry[] = leaderboard.map((attempt) => ({
        applicantId: attempt.applicantId,
        email: attempt.email,
        score: attempt.score,
        deckTitle: attempt.deckTitle,
        finishedAt: attempt.finishedAt!.toISOString(),
      }))

      res.json({
        data: leaderboardData,
        success: true,
      })
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      res.status(500).json({
        message: 'Failed to fetch leaderboard',
        status: 500,
      })
    }
  }
)

// Get leaderboard for specific deck
router.get(
  '/deck/:deckId',
  async (
    req: Request<{ deckId: string }, ApiResponse<LeaderboardEntry[]>, {}, { limit?: string }>,
    res: Response<ApiResponse<LeaderboardEntry[]>>
  ) => {
    try {
      const { deckId } = req.params
      const { limit = '50' } = req.query

      const leaderboard = await QuizAttempt.find({
        deckId,
        finishedAt: { $exists: true },
      })
        .sort({ score: -1, finishedAt: 1 })
        .limit(parseInt(limit))
        .select('applicantId email score deckTitle finishedAt')

      const leaderboardData: LeaderboardEntry[] = leaderboard.map((attempt) => ({
        applicantId: attempt.applicantId,
        email: attempt.email,
        score: attempt.score,
        deckTitle: attempt.deckTitle,
        finishedAt: attempt.finishedAt!.toISOString(),
      }))

      res.json({
        data: leaderboardData,
        success: true,
      })
    } catch (error) {
      console.error('Error fetching deck leaderboard:', error)
      res.status(500).json({
        message: 'Failed to fetch deck leaderboard',
        status: 500,
      })
    }
  }
)

export default router
