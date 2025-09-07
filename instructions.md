# DevDecks Project Guide

## Tech Stack

- Vue 3 + Vite + TypeScript
- Vue Router for pages
- Pinia for client/UI state
- @tanstack/vue-query for server state
- Axios for HTTP calls
- TailwindCSS for styling
- MongoDB Atlas via Vercel serverless functions
- Zod for validation (preferred)

## Architecture

- **Server state** (API data) → Vue Query (queries, mutations, caching, retries)
- **Client/UI state** → Pinia (email, applicantId, UI flags)
- **Components** are presentational; data fetching & side effects go in composables (`src/composables`)
- **API routes** live in `/api/*` for Vercel functions
- **DB helper** connects to MongoDB once and caches client
- **Schema validation**: all API responses validated with Zod
- **Error format**: `{ message, status }`

## Features

1. Capture applicant email → store in MongoDB (`/api/applicants`)
2. List decks (`/api/decks`)
3. Quiz flow:
   - Fetch random questions (`/api/decks/:id/questions?limit=10`)
   - Start attempt (`/api/attempts/start`)
   - Finish attempt (server grades → `/api/attempts/finish`)
4. Leaderboard (`/api/leaderboard`) → show top scores + emails
5. Seed data once via `/api/seed` with `ADMIN_TOKEN`

## Conventions

- Strict TypeScript, no `any`
- Validate environment variables in `src/lib/env.ts`
- Do not fetch directly in components, always via composables
- Normalize errors into `{ message, status }`
- One source of truth per state
- Keep secrets only in serverless functions

## UX

- Skeleton loaders for lists/details
- Empty states with call-to-action
- Toasts for async success/error
- Accessible inputs, visible keyboard focus

## Quality Gates

- Lint + format on commit
- Type-check must pass before merge
- Unit tests for composables and stores
- Playwright test for critical flow:
  - Enter email → pick deck → answer quiz → finish → see score → leaderboard
