import express, { Request, Response } from 'express'
import Deck from '../models/Deck.js'
import { ApiResponse, IDeck, IQuestion } from '../types'

const router = express.Router()

// Middleware to check admin token
const requireAdmin = (req: Request, res: Response, next: any): void => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token || token !== process.env.ADMIN_TOKEN) {
    res.status(401).json({
      message: 'Unauthorized - Invalid admin token',
      status: 401,
    })
    return
  }

  next()
}

// Test admin authentication
router.get('/auth', requireAdmin, (req: Request, res: Response): void => {
  res.json({
    message: 'Admin authentication successful',
    success: true,
  })
})

// Get deck details with questions
router.get(
  '/decks/:id',
  requireAdmin,
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      const deck = await Deck.findById(id)
      if (!deck) {
        res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
        return
      }

      res.json({
        data: deck,
        success: true,
      })
    } catch (error) {
      console.error('Error fetching deck:', error)
      res.status(500).json({
        message: 'Failed to fetch deck',
        status: 500,
      })
      return
    }
  }
)

// Create new deck
router.post(
  '/decks',
  requireAdmin,
  async (req: Request<{}, any, { title: string; description: string }>, res: Response<any>) => {
    try {
      const { title, description } = req.body

      if (!title || !description) {
        res.status(400).json({
          message: 'Title and description are required',
          status: 400,
        })
        return
      }

      const deck = new Deck({
        title,
        description,
        questions: [],
      })

      await deck.save()

      res.status(201).json({
        data: deck,
        success: true,
      })
    } catch (error) {
      console.error('Error creating deck:', error)
      res.status(500).json({
        message: 'Failed to create deck',
        status: 500,
      })
      return
    }
  }
)

// Add question to deck
router.post(
  '/decks/:id/questions',
  requireAdmin,
  async (req: Request<{ id: string }, any, IQuestion>, res: Response<any>) => {
    try {
      const { id } = req.params
      const { question, options, correctAnswer } = req.body

      console.log('Add question request:', { id, question, options, correctAnswer })

      if (!question || !options || options.length !== 4 || correctAnswer === undefined) {
        console.log('Validation failed:', {
          question: !!question,
          options: options?.length,
          correctAnswer,
        })
        res.status(400).json({
          message: 'Question, 4 options, and correct answer are required',
          status: 400,
        })
        return
      }

      const deck = await Deck.findById(id)
      if (!deck) {
        console.log('Deck not found:', id)
        res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
        return
      }

      console.log('Found deck:', deck.title, 'Current questions:', deck.questions.length)

      deck.questions.push({
        question,
        options,
        correctAnswer,
      })

      console.log('Added question, new count:', deck.questions.length)

      const savedDeck = await deck.save()
      console.log('Deck saved successfully, final question count:', savedDeck.questions.length)

      res.json({
        data: savedDeck,
        success: true,
      })
    } catch (error) {
      console.error('Error adding question:', error)
      res.status(500).json({
        message: 'Failed to add question',
        status: 500,
      })
      return
    }
  }
)

// Update deck
router.put(
  '/decks/:id',
  requireAdmin,
  async (
    req: Request<{ id: string }, any, { title?: string; description?: string }>,
    res: Response<any>
  ) => {
    try {
      const { id } = req.params
      const { title, description } = req.body

      const deck = await Deck.findById(id)
      if (!deck) {
        res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
        return
      }

      if (title) deck.title = title
      if (description) deck.description = description

      await deck.save()

      res.json({
        data: deck,
        success: true,
      })
    } catch (error) {
      console.error('Error updating deck:', error)
      res.status(500).json({
        message: 'Failed to update deck',
        status: 500,
      })
      return
    }
  }
)

// Delete deck
router.delete(
  '/decks/:id',
  requireAdmin,
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      const deck = await Deck.findById(id)
      if (!deck) {
        res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
        return
      }

      await Deck.findByIdAndDelete(id)

      res.json({
        message: 'Deck deleted successfully',
        success: true,
      })
    } catch (error) {
      console.error('Error deleting deck:', error)
      res.status(500).json({
        message: 'Failed to delete deck',
        status: 500,
      })
      return
    }
  }
)

// Update question in deck
router.put(
  '/decks/:deckId/questions/:questionIndex',
  requireAdmin,
  async (
    req: Request<{ deckId: string; questionIndex: string }, any, IQuestion>,
    res: Response
  ): Promise<void> => {
    try {
      const { deckId, questionIndex } = req.params
      const { question, options, correctAnswer } = req.body
      const index = parseInt(questionIndex)

      console.log('Update question request:', { deckId, index, question, options, correctAnswer })

      if (!question || !options || options.length !== 4 || correctAnswer === undefined) {
        res.status(400).json({
          message: 'Question, 4 options, and correct answer are required',
          status: 400,
        })
        return
      }

      const deck = await Deck.findById(deckId)
      if (!deck) {
        res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
        return
      }

      if (index < 0 || index >= deck.questions.length) {
        res.status(400).json({
          message: 'Invalid question index',
          status: 400,
        })
        return
      }

      // Update the question
      deck.questions[index] = {
        question,
        options,
        correctAnswer,
      }

      await deck.save()

      res.json({
        data: deck,
        success: true,
      })
    } catch (error) {
      console.error('Error updating question:', error)
      res.status(500).json({
        message: 'Failed to update question',
        status: 500,
      })
      return
    }
  }
)

// Remove question from deck
router.delete(
  '/decks/:deckId/questions/:questionIndex',
  requireAdmin,
  async (req: Request<{ deckId: string; questionIndex: string }>, res: Response): Promise<void> => {
    try {
      const { deckId, questionIndex } = req.params
      const index = parseInt(questionIndex)

      const deck = await Deck.findById(deckId)
      if (!deck) {
        res.status(404).json({
          message: 'Deck not found',
          status: 404,
        })
        return
      }

      if (index < 0 || index >= deck.questions.length) {
        res.status(400).json({
          message: 'Invalid question index',
          status: 400,
        })
        return
      }

      deck.questions.splice(index, 1)
      await deck.save()

      res.json({
        data: deck,
        success: true,
      })
    } catch (error) {
      console.error('Error removing question:', error)
      res.status(500).json({
        message: 'Failed to remove question',
        status: 500,
      })
      return
    }
  }
)

export default router
