# DevDecks MongoDB Setup

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB Atlas** account (free tier works) or local MongoDB installation

## Setup Steps

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install API dependencies (TypeScript backend)
cd api
npm install
cd ..
```

### 2. Configure MongoDB

1. **Option A: MongoDB Atlas (Recommended)**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string
   - Copy `.env.example` to `.env` and update `MONGODB_URI`

2. **Option B: Local MongoDB**
   - Install MongoDB locally
   - Use `mongodb://localhost:27017/devdecks` as your URI

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devdecks
```

### 4. Seed the Database

```bash
# Seed with TypeScript
npm run api:seed
```

### 5. Start the Application

```bash
# Start both frontend and TypeScript API
npm run dev:full

# Or start separately:
# Terminal 1: npm run dev (frontend)
# Terminal 2: npm run api:dev (TypeScript API)
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/applicants` - Create applicant
- `GET /api/decks` - Get all decks
- `GET /api/decks/:id/questions` - Get deck questions
- `POST /api/quiz/start` - Start quiz attempt
- `POST /api/quiz/finish` - Finish quiz attempt
- `GET /api/leaderboard` - Get leaderboard

## Database Schema

### Applicants

- `email` (unique)
- `createdAt`

### Decks

- `title`
- `description`
- `questions[]` (with options and correctAnswer)
- `createdAt`

### QuizAttempts

- `applicantId`
- `email`
- `deckId`
- `deckTitle`
- `score`
- `totalQuestions`
- `answers[]`
- `startedAt`
- `finishedAt`
- `timeSpent`

## Features

✅ **Real MongoDB Integration**
✅ **Persistent Leaderboard**
✅ **User Authentication**
✅ **Quiz Attempts Tracking**
✅ **Score Calculation**
✅ **Professional UI**

The leaderboard now stores real data in MongoDB and persists across sessions!
