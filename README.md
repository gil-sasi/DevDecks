# DevDecks - Quiz Management System

A professional Vue.js quiz application built with TypeScript, featuring a clean component architecture and reusable design patterns.

## ✨ Features

- 🔐 User authentication with email
- 📚 Quiz deck selection and completion
- 🏆 Real-time leaderboard with podium display
- 📱 Responsive design with modern UI components
- 🎯 Type-safe API calls with composables
- 🛠️ Admin dashboard for content management
- ⚡ Optimized performance with Vue Query caching

## 🚀 Tech Stack

- **Frontend**: Vue 3 + Vite + TypeScript
- **Routing**: Vue Router 4
- **State Management**: Pinia for client state, Vue Query for server state
- **HTTP Client**: Axios with interceptors
- **Styling**: TailwindCSS with custom design system
- **Backend**: TypeScript API with MongoDB
- **Deployment**: Vercel-ready serverless functions

## 📁 Professional Project Structure

```
src/
├── components/              # Reusable component library
│   ├── ui/                 # Base UI components (Button, Input, Modal, etc.)
│   ├── quiz/               # Quiz-specific components
│   ├── admin/              # Admin dashboard components
│   ├── leaderboard/        # Leaderboard components
│   ├── layout/             # Layout components
│   └── index.ts            # Component exports
├── composables/            # Business logic & API layer
│   ├── useDecks.ts         # Deck management
│   ├── useQuiz.ts          # Quiz functionality
│   ├── useForm.ts          # Form validation & state
│   ├── useTimer.ts         # Timer utilities
│   ├── useErrorHandler.ts  # Error handling
│   └── index.ts            # Composable exports
├── types/                  # TypeScript definitions
│   └── index.ts            # Comprehensive type system
├── stores/                 # Pinia stores
│   └── user.ts             # User state management
├── views/                  # Page components (clean & focused)
│   ├── Home.vue
│   ├── Quiz.vue
│   ├── Leaderboard.vue
│   └── Admin.vue
├── router/                 # Navigation setup
├── lib/                    # Utilities & configurations
└── main.ts                 # Application bootstrap
```

## 🏗️ Architecture Principles

### **Clean Component Architecture**

- **Base UI Components**: Reusable, prop-driven components (`BaseButton`, `BaseCard`, etc.)
- **Feature Components**: Business-specific components (`QuizCard`, `LeaderboardTable`)
- **Page Components**: Minimal, composition-focused views

### **Composable-First Design**

- **API Layer**: All server interactions through composables
- **Business Logic**: Extracted into reusable composables
- **Utility Functions**: Common patterns like forms, timers, error handling

### **Type Safety**

- **Comprehensive Types**: Detailed interfaces for all data structures
- **API Contracts**: Typed request/response interfaces
- **Component Props**: Fully typed component interfaces

### **State Management**

- **Server State**: Vue Query for caching, background updates, and optimistic updates
- **Client State**: Pinia for user data and UI state
- **Form State**: Dedicated form composables with validation

## 🛠️ Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   cd api && npm install && cd ..
   ```

2. **Environment setup:**

   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and admin token
   ```

3. **Start development:**

   ```bash
   npm run dev:full  # Starts both frontend and API
   ```

4. **Seed database:**
   ```bash
   npm run api:seed
   ```

## 📦 Component Library

### Base UI Components

```typescript
// Clean, reusable components with consistent API
<BaseButton variant="primary" size="lg" :loading="isLoading">
  Submit Quiz
</BaseButton>

<BaseCard hoverable size="md">
  <QuizContent />
</BaseCard>

<BaseModal v-model="showModal" title="Create Deck">
  <DeckForm @submit="handleSubmit" />
</BaseModal>
```

### Feature Components

```typescript
// Business-logic components
<QuizCard
  :title="deck.title"
  :description="deck.description"
  :question-count="deck.questionCount"
  @start-quiz="handleStartQuiz"
/>

<QuizResults
  :score="result.score"
  :total-questions="result.totalQuestions"
  :questions="result.questions"
  :user-answers="result.answers"
/>
```

## 🔧 Composables Usage

### Form Management

```typescript
const { data, errors, validate, updateField } = useForm(
  { title: '', description: '' },
  {
    title: [{ required: true, minLength: 3 }],
    description: [{ required: true, maxLength: 500 }],
  }
)
```

### Error Handling

```typescript
const { handleError, currentError, clearError } = useErrorHandler()

try {
  await createDeck(deckData)
} catch (error) {
  handleError(error, 'Failed to create deck')
}
```

### Timer Utilities

```typescript
const { time, formattedTime, start, stop, reset } = useTimer()
// Automatically formats as MM:SS
```

## 🎨 Design System

- **Consistent Colors**: Gradient-based primary colors with semantic variants
- **Typography**: Hierarchical text scales with proper contrast
- **Spacing**: Systematic spacing using Tailwind's scale
- **Components**: Unified component API with size and variant props
- **Animations**: Smooth transitions and hover effects

## 🔒 Type Safety Features

- **API Contracts**: Full typing for all API requests/responses
- **Component Props**: Strict prop validation with TypeScript
- **Form Validation**: Type-safe form handling with validation rules
- **State Management**: Typed stores and composables
- **Error Handling**: Structured error types and handling

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Component Lazy Loading**: Dynamic imports for large components
- **Vue Query Caching**: Intelligent server state caching
- **Optimistic Updates**: Immediate UI feedback
- **Bundle Optimization**: Tree-shaking and minification

## 📱 Responsive Design

- **Mobile-First**: Designed for mobile with progressive enhancement
- **Breakpoint System**: Consistent responsive breakpoints
- **Touch-Friendly**: Proper touch targets and interactions
- **Accessibility**: ARIA labels, keyboard navigation, proper contrast

## 🧪 Code Quality

- **ESLint + Prettier**: Consistent code formatting
- **TypeScript Strict Mode**: Maximum type safety
- **Component Architecture**: Single responsibility principle
- **Composable Pattern**: Reusable business logic
- **Error Boundaries**: Graceful error handling

This architecture provides a solid foundation for scaling the application while maintaining code quality and developer experience.
