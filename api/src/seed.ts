import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Deck from './models/Deck.js'
import { IQuestion } from './types'

dotenv.config()

const seedData = [
  {
    title: 'JavaScript Basics',
    description: 'Fundamental JavaScript concepts and syntax',
    questions: [
      {
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: [
          'var name = "John"',
          'variable name = "John"',
          'v name = "John"',
          'declare name = "John"',
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'add()', 'append()', 'insert()'],
        correctAnswer: 0,
      },
      {
        question: 'What does the === operator do?',
        options: [
          'Assigns a value',
          'Compares values and types',
          'Compares only values',
          'Checks if both are true',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which keyword is used to declare a function?',
        options: ['function', 'func', 'def', 'method'],
        correctAnswer: 0,
      },
      {
        question: 'What is the result of typeof null?',
        options: ['"null"', '"object"', '"undefined"', 'null'],
        correctAnswer: 1,
      },
    ] as IQuestion[],
  },
  {
    title: 'Vue.js Fundamentals',
    description: 'Core Vue.js concepts and best practices',
    questions: [
      {
        question: 'What is the main purpose of Vue.js?',
        options: [
          'Database management',
          'Building user interfaces',
          'Server-side rendering only',
          'Mobile app development',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which directive is used for conditional rendering?',
        options: ['v-if', 'v-show', 'v-for', 'v-bind'],
        correctAnswer: 0,
      },
      {
        question: 'What is a Vue component?',
        options: [
          'A JavaScript function',
          'A reusable UI element',
          'A CSS class',
          'A database table',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which lifecycle hook runs after the component is mounted?',
        options: ['created', 'mounted', 'updated', 'destroyed'],
        correctAnswer: 1,
      },
    ] as IQuestion[],
  },
  {
    title: 'TypeScript Essentials',
    description: 'TypeScript features and type system',
    questions: [
      {
        question: 'What is TypeScript?',
        options: [
          'A JavaScript framework',
          'A superset of JavaScript with types',
          'A database language',
          'A CSS preprocessor',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which keyword is used to define an interface?',
        options: ['interface', 'type', 'class', 'struct'],
        correctAnswer: 0,
      },
      {
        question: 'What does the ? operator do in TypeScript?',
        options: [
          'Makes a property optional',
          'Creates a union type',
          'Defines a generic',
          'Imports a module',
        ],
        correctAnswer: 0,
      },
    ] as IQuestion[],
  },
]

async function seedDatabase(): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devdecks')
    console.log('✅ Connected to MongoDB')

    // Clear existing decks
    await Deck.deleteMany({})
    console.log('🗑️  Cleared existing decks')

    // Insert seed data
    const decks = await Deck.insertMany(seedData)
    console.log(`📚 Inserted ${decks.length} decks`)

    console.log('🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
