import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Deck from './models/Deck.js'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from the api directory (parent of src)
dotenv.config({ path: path.join(__dirname, '..', '.env') })

async function checkDatabase(): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devdecks')
    console.log('✅ Connected to MongoDB')

    // Get all decks with their questions
    const decks = await Deck.find({}).lean()

    console.log(`\n📊 Database Status:`)
    console.log(`Total decks: ${decks.length}`)

    let totalQuestions = 0
    decks.forEach((deck, index) => {
      console.log(`\n${index + 1}. ${deck.title}`)
      console.log(`   Description: ${deck.description}`)
      console.log(`   Questions: ${deck.questions.length}`)
      totalQuestions += deck.questions.length

      // Show first few questions as examples
      if (deck.questions.length > 0) {
        console.log(`   Sample questions:`)
        deck.questions.slice(0, 2).forEach((q, qIndex) => {
          console.log(`     ${qIndex + 1}. ${q.question}`)
        })
        if (deck.questions.length > 2) {
          console.log(`     ... and ${deck.questions.length - 2} more`)
        }
      }
    })

    console.log(`\n📈 Total questions across all decks: ${totalQuestions}`)

    // Check if this looks like seed data
    const isSeedData =
      decks.length === 3 &&
      decks.some((d) => d.title === 'JavaScript Basics') &&
      decks.some((d) => d.title === 'Vue.js Fundamentals') &&
      decks.some((d) => d.title === 'TypeScript Essentials')

    if (isSeedData) {
      console.log(`\n⚠️  This appears to be the default seed data.`)
      console.log(
        `   If you had custom questions, they may have been lost when the seed script ran.`
      )
    } else {
      console.log(`\n✅ This appears to be custom data, not the default seed.`)
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error checking database:', error)
    process.exit(1)
  }
}

checkDatabase()
