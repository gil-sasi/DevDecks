// --- ESM-safe dotenv load (must be first) ---
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Force-load api/.env regardless of where you start the process (only in dev)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '.env') })
}
// -----------------------------------------------------------

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

// Import routes
import applicantRoutes from './dist/routes/applicants.js'
import deckRoutes from './dist/routes/decks.js'
import quizRoutes from './dist/routes/quiz.js'
import leaderboardRoutes from './dist/routes/leaderboard.js'
import adminRoutes from './dist/routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

// Resolve and validate Mongo URI
const MONGO_URI = process.env.MONGODB_URI
if (!MONGO_URI) {
  console.error('❌ MONGODB_URI is missing. Check environment variables')
  process.exit(1)
}

// (Optional) log which host we're connecting to (sanity check)
try {
  console.log('🔌 Mongo host:', new URL(MONGO_URI).host)
} catch {}

// Connect first, then mount routes
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')

    // Routes
    app.use('/api/applicants', applicantRoutes)
    app.use('/api/decks', deckRoutes)
    app.use('/api/quiz', quizRoutes)
    app.use('/api/leaderboard', leaderboardRoutes)
    app.use('/api/admin', adminRoutes)

    // Health check
    app.get('/api/health', (req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      })
    })

    // Error handling
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('❌ Error:', err.stack)
      res.status(500).json({ message: 'Something went wrong!', status: 500 })
    })

    // 404 handler
    app.use('*', (req: Request, res: Response) => {
      res.status(404).json({ message: 'Route not found', status: 404 })
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })

export default app
