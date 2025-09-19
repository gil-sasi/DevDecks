import express, { Request, Response } from 'express'
import Deck from '../models/Deck.js'
import { ApiResponse, IDeck, IQuestion } from '../types'

const router = express.Router()

// Get all decks
router.get('/', async (req: Request, res: Response<ApiResponse<IDeck[]>>) => {
  try {
    const decks = await Deck.find()

    res.json({
      data: decks,
      success: true,
    })
  } catch (error) {
    console.error('Error fetching decks:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch decks',
      status: 500,
    })
  }
})

// Get questions for a specific deck
router.get(
  '/:id/questions',
  async (
    req: Request<{ id: string }, ApiResponse<IQuestion[]>, {}, { limit?: string }>,
    res: Response<ApiResponse<IQuestion[]>>
  ) => {
    try {
      const { id } = req.params
      const { limit = '10' } = req.query

      // Validate ObjectId format
      if (!id || id === 'undefined' || id === 'null' || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({
          message: 'Invalid deck ID format',
          status: 400,
        })
      }

      const deck = await Deck.findById(id)

      if (!deck) {
        return res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
      }

      // Shuffle questions and limit
      const shuffledQuestions = deck.questions
        .sort(() => Math.random() - 0.5)
        .slice(0, parseInt(limit))

      res.json({
        data: shuffledQuestions,
        success: true,
      })
    } catch (error) {
      console.error('Error fetching questions:', error)
      res.status(500).json({
        message: 'Failed to fetch questions',
        status: 500,
      })
    }
  }
)

// Get statistics
router.get(
  '/stats',
  async (
    req: Request,
    res: Response<ApiResponse<{ totalQuestions: number; totalCategories: number }>>
  ) => {
    try {
      const decks = await Deck.find()

      const totalQuestions = decks.reduce((sum, deck) => sum + deck.questions.length, 0)
      const totalCategories = decks.length

      res.json({
        data: {
          totalQuestions,
          totalCategories,
        },
        success: true,
      })
    } catch (error) {
      console.error('Error fetching statistics:', error)
      res.status(500).json({
        message: 'Failed to fetch statistics',
        status: 500,
      })
    }
  }
)

export default router
