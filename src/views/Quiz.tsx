import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUserStore } from '@/stores/user'
import { useQuiz } from '@/composables/useQuiz'
import type { QuizAttempt, Question } from '@/types'
import Footer from '@/components/layout/Footer'

const Quiz: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const userStore = useUserStore()

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>([])
  const [currentAttemptId, setCurrentAttemptId] = useState<string>('')
  const [quizResult, setQuizResult] = useState<QuizAttempt | null>(null)
  const [showReview, setShowReview] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Composables
  const { useQuizQuestions, useStartAttempt, useFinishAttempt } = useQuiz()
  const questionsQuery = useQuizQuestions(deckId || '', 10)
  const startAttemptMutation = useStartAttempt()
  const finishAttemptMutation = useFinishAttempt()

  // Use questions from the quiz attempt when available, otherwise from the initial fetch
  const questions = React.useMemo(() => {
    // If quiz has started and we have a result with questions, use those
    if (quizResult?.questions) {
      return quizResult.questions
    }
    // If quiz has started but no result yet, use the questions from the attempt
    if (quizStarted && currentQuizQuestions.length > 0) {
      return currentQuizQuestions
    }
    // Otherwise use the initial fetch for preview
    return questionsQuery.data || []
  }, [quizResult?.questions, quizStarted, currentQuizQuestions, questionsQuery.data])

  // Computed
  const scorePercentage = React.useMemo(() => {
    if (!quizResult) return 0
    return Math.round((quizResult.score / quizResult.totalQuestions) * 100)
  }, [quizResult])

  // Methods
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!userStore.isAuthenticated()) {
      navigate('/')
    }

    if (deckId) {
      questionsQuery.refetch()
    }
  }, [userStore, navigate, deckId, questionsQuery])

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const startQuiz = async () => {
    if (!userStore.user || !deckId) return

    try {
      const attempt = await startAttemptMutation.mutateAsync({
        applicantId: userStore.user.applicantId,
        deckId: deckId,
      })

      // Store the questions from the attempt to ensure consistency
      setCurrentQuizQuestions(attempt.questions || [])
      setCurrentAttemptId(attempt.id)
      setQuizStarted(true)
      setSelectedAnswers(new Array(attempt.questions?.length || 0).fill(undefined))
      setElapsedTime(0)
      startTimer()

      // Debug log to verify questions consistency
      console.log('Quiz started with questions:', attempt.questions?.length, 'questions')
      console.log('First question:', attempt.questions?.[0]?.question)
    } catch (error) {
      console.log('Failed to start quiz:', error)
    }
  }

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestionIndex] = answerIndex
      return newAnswers
    })
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const finishQuiz = async () => {
    if (!currentAttemptId) return

    try {
      stopTimer()
      const result = await finishAttemptMutation.mutateAsync({
        attemptId: currentAttemptId,
        answers: selectedAnswers as number[],
      })
      setQuizResult(result)
      setQuizFinished(true)

      // Debug log to verify questions consistency in results
      console.log('Quiz finished with questions:', result.questions?.length, 'questions')
      console.log('First question in results:', result.questions?.[0]?.question)
      console.log(
        'Questions match:',
        currentQuizQuestions[0]?.question === result.questions?.[0]?.question
      )
    } catch (error) {
      console.log('Failed to finish quiz:', error)
    }
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      stopTimer()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Quiz Challenge
                </h1>
                <p className="text-xs text-gray-500">Test your knowledge</p>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {questionsQuery.isLoading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 rounded-lg"></div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {questionsQuery.isError && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200/50 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Quiz</h3>
            <p className="text-gray-600 mb-6">
              {questionsQuery.error?.message || 'Failed to load quiz questions'}
            </p>
            <button
              onClick={() => questionsQuery.refetch()}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Quiz Content */}
        {!questionsQuery.isLoading &&
          !questionsQuery.isError &&
          questions &&
          questions.length > 0 && (
            <>
              {/* Quiz Not Started */}
              {!quizStarted && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Start Your Quiz?
                  </h2>
                  <p className="text-gray-600 mb-2">
                    This quiz contains
                    <span className="font-semibold text-indigo-600">
                      {' '}
                      {questions.length} questions
                    </span>
                  </p>
                  <p className="text-gray-600 mb-8">
                    Choose the best answer for each question. Good luck!
                  </p>
                  <button
                    onClick={startQuiz}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5V14a1.5 1.5 0 01-1.5 1.5H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Start Quiz
                  </button>
                </div>
              )}

              {/* Quiz in Progress */}
              {quizStarted && !quizFinished && (
                <div className="space-y-6">
                  {/* Progress Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">
                          Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                          Complete
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 inline mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formatTime(elapsedTime)}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
                    <div className="mb-8">
                      <div className="flex items-start space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {currentQuestionIndex + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                          {questions[currentQuestionIndex]?.question}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {questions[currentQuestionIndex]?.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => selectAnswer(index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group hover:shadow-md ${
                              selectedAnswers[currentQuestionIndex] === index
                                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  selectedAnswers[currentQuestionIndex] === index
                                    ? 'border-indigo-500 bg-indigo-500'
                                    : 'border-gray-300 group-hover:border-gray-400'
                                }`}
                              >
                                <span
                                  className={`font-bold text-sm ${
                                    selectedAnswers[currentQuestionIndex] === index
                                      ? 'text-white'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </span>
                              </div>
                              <span className="text-gray-800 font-medium">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                      <button
                        onClick={previousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Previous
                      </button>

                      {currentQuestionIndex < questions.length - 1 ? (
                        <button
                          onClick={nextQuestion}
                          disabled={selectedAnswers[currentQuestionIndex] === undefined}
                          className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                        >
                          Next
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={finishQuiz}
                          disabled={
                            selectedAnswers[currentQuestionIndex] === undefined ||
                            finishAttemptMutation.isPending
                          }
                          className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {finishAttemptMutation.isPending ? 'Submitting...' : 'Finish Quiz'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz Results */}
              {quizFinished && (
                <div className="space-y-6">
                  {/* Score Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                    <div className="mb-6">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          scorePercentage >= 70
                            ? 'bg-green-100'
                            : scorePercentage >= 50
                              ? 'bg-yellow-100'
                              : 'bg-red-100'
                        }`}
                      >
                        <svg
                          className={`w-10 h-10 ${
                            scorePercentage >= 70
                              ? 'text-green-600'
                              : scorePercentage >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {scorePercentage >= 70 ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          ) : scorePercentage >= 50 ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          )}
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                      <p className="text-xl text-gray-600 mb-4">
                        You scored
                        <span className="font-bold text-indigo-600">
                          {' '}
                          {quizResult?.score || 0}
                        </span>{' '}
                        out of
                        <span className="font-bold">
                          {' '}
                          {quizResult?.totalQuestions || questions.length}
                        </span>
                      </p>
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${
                          scorePercentage >= 70
                            ? 'bg-green-100 text-green-800'
                            : scorePercentage >= 50
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {scorePercentage}%
                        {scorePercentage >= 70 && <span className="ml-2">🎉</span>}
                        {scorePercentage >= 50 && scorePercentage < 70 && (
                          <span className="ml-2">👍</span>
                        )}
                        {scorePercentage < 50 && <span className="ml-2">💪</span>}
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 mb-8">
                      <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Back to Home
                      </Link>
                      <Link
                        to="/leaderboard"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        View Leaderboard
                      </Link>
                    </div>
                  </div>

                  {/* Answer Review */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Review Your Answers</h3>
                      <button
                        onClick={() => setShowReview(!showReview)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {showReview ? 'Hide' : 'Show'} Review
                      </button>
                    </div>

                    {showReview && (
                      <div className="space-y-6">
                        {(quizResult?.questions || []).map((question, index) => (
                          <div key={index} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3 mb-4">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  quizResult?.answers[index] === question.correctAnswer
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                                }`}
                              >
                                {quizResult?.answers[index] === question.correctAnswer ? (
                                  <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-5 h-5 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-3">
                                  {index + 1}. {question.question}
                                </h4>
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div
                                      key={optionIndex}
                                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                        optionIndex === question.correctAnswer
                                          ? 'border-green-500 bg-green-50'
                                          : optionIndex === quizResult?.answers[index] &&
                                              optionIndex !== question.correctAnswer
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200 bg-gray-50'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                          <span
                                            className={`font-bold text-sm ${
                                              optionIndex === question.correctAnswer
                                                ? 'text-green-700'
                                                : optionIndex === quizResult?.answers[index] &&
                                                    optionIndex !== question.correctAnswer
                                                  ? 'text-red-700'
                                                  : 'text-gray-600'
                                            }`}
                                          >
                                            {String.fromCharCode(65 + optionIndex)}.
                                          </span>
                                          <span className="text-gray-800">{option}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          {optionIndex === question.correctAnswer && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <svg
                                                className="w-3 h-3 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                              Correct
                                            </span>
                                          )}
                                          {optionIndex === quizResult?.answers[index] &&
                                            optionIndex !== question.correctAnswer && (
                                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Your Answer
                                              </span>
                                            )}
                                          {optionIndex === quizResult?.answers[index] &&
                                            optionIndex === question.correctAnswer && (
                                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <svg
                                                  className="w-3 h-3 mr-1"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                  />
                                                </svg>
                                                Your Correct Answer
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

        {/* No Questions */}
        {!questionsQuery.isLoading &&
          !questionsQuery.isError &&
          (!questions || questions.length === 0) && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.881-6.172-2.328C5.828 12.672 5.828 11.328 5.828 10c0-1.657.672-3.157 1.757-4.243C8.672 4.672 10.172 4 11.828 4h.344A7.962 7.962 0 0118 9.291z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Questions Available</h3>
              <p className="text-gray-600 mb-6">This quiz doesn't have any questions yet.</p>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Quiz
