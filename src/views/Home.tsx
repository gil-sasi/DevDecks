import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/user'
import { useDecks } from '@/composables/useDecks'
import { useApplicant } from '@/composables/useApplicant'
import { useStats } from '@/composables/useStats'

// Components
import BaseCard from '@/components/ui/BaseCard'
import BaseInput from '@/components/ui/BaseInput'
import BaseButton from '@/components/ui/BaseButton'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import QuizCard from '@/components/quiz/QuizCard'
import Footer from '@/components/layout/Footer'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const [email, setEmail] = useState('')

  // Fetch decks
  const { decks, isLoading, isError, error, refetch } = useDecks()

  // Fetch stats
  const { stats, isLoading: statsLoading, isError: statsError } = useStats()

  // Create applicant mutation
  const { useCreateApplicant } = useApplicant()
  const createApplicantMutation = useCreateApplicant()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await createApplicantMutation.mutateAsync({ email })
      userStore.setUser(user)
      setEmail('')
    } catch (error) {
      console.log('Failed to create applicant:', error)
    }
  }

  const handleStartQuiz = (deckId: string) => {
    navigate(`/quiz/${deckId}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 space-y-12">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Master Your Skills with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}DevDecks
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Challenge yourself with curated coding quizzes, track your progress, and compete with
              developers worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                {statsLoading ? (
                  <div className="text-3xl font-bold text-blue-600 mb-2 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-12 mx-auto"></div>
                  </div>
                ) : statsError ? (
                  <div className="text-3xl font-bold text-red-600 mb-2">--</div>
                ) : (
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats?.totalCategories || 0}+
                  </div>
                )}
                <div className="text-gray-600">Quiz Categories</div>
              </div>
              <div className="text-center">
                {statsLoading ? (
                  <div className="text-3xl font-bold text-purple-600 mb-2 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-12 mx-auto"></div>
                  </div>
                ) : statsError ? (
                  <div className="text-3xl font-bold text-red-600 mb-2">--</div>
                ) : (
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stats?.totalQuestions || 0}+
                  </div>
                )}
                <div className="text-gray-600">Questions Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
                <div className="text-gray-600">Learning Potential</div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Input Section */}
        {!userStore.isAuthenticated() && (
          <div className="max-w-md mx-auto">
            <BaseCard size="lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
                <p className="text-gray-600">Enter your email to begin your coding journey</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <BaseInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email Address"
                  placeholder="your.email@company.com"
                  required
                  disabled={createApplicantMutation.isPending}
                  error={
                    createApplicantMutation.isError
                      ? createApplicantMutation.error?.message || 'Failed to create account'
                      : ''
                  }
                />

                <BaseButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={createApplicantMutation.isPending}
                  loadingText="Setting up your account..."
                  disabled={!email.trim()}
                >
                  Start Learning Now
                </BaseButton>
              </form>
            </BaseCard>
          </div>
        )}

        {/* Welcome Back Section */}
        {userStore.isAuthenticated() && (
          <div className="max-w-2xl mx-auto">
            <BaseCard size="lg" className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
              <p className="text-gray-600">
                Ready to continue your learning journey,{' '}
                <span className="font-semibold text-blue-600">{userStore.user?.email}</span>?
              </p>
            </BaseCard>
          </div>
        )}

        {/* Deck List Section */}
        {userStore.isAuthenticated() && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Challenge</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a quiz deck that matches your skill level and interests. Each deck contains
                carefully crafted questions to test your knowledge.
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <BaseCard key={i} size="lg" className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </BaseCard>
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <ErrorState
                title="Oops! Something went wrong"
                message={error?.message || 'Failed to load quiz decks'}
                onRetry={refetch}
              />
            )}

            {/* Deck List */}
            {!isLoading && !isError && decks && decks.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {decks.map((deck) => (
                  <QuizCard
                    key={(deck as any)._id || deck.id}
                    title={deck.title}
                    description={deck.description}
                    questionCount={deck.questionCount}
                    onStartQuiz={() => handleStartQuiz((deck as any)._id || deck.id)}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && (!decks || decks.length === 0) && (
              <EmptyState
                title="No quizzes available"
                description="Check back later for new quiz content."
                action={
                  <BaseButton variant="secondary" onClick={() => refetch()}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh
                  </BaseButton>
                }
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
