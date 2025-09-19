import React, { useState, useMemo } from 'react'
import BaseCard from '@/components/ui/BaseCard'
import BaseButton from '@/components/ui/BaseButton'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizResultsProps {
  score: number
  totalQuestions: number
  questions?: Question[]
  userAnswers?: number[]
  showReview?: boolean
  children?: React.ReactNode
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  questions = [],
  userAnswers = [],
  showReview = true,
  children,
}) => {
  const [reviewExpanded, setReviewExpanded] = useState(false)

  const scorePercentage = useMemo(() => {
    return Math.round((score / totalQuestions) * 100)
  }, [score, totalQuestions])

  const scoreColorClasses = useMemo(() => {
    if (scorePercentage >= 70) {
      return {
        container: 'bg-green-100',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800',
      }
    } else if (scorePercentage >= 50) {
      return {
        container: 'bg-yellow-100',
        icon: 'text-yellow-600',
        badge: 'bg-yellow-100 text-yellow-800',
      }
    } else {
      return {
        container: 'bg-red-100',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-800',
      }
    }
  }, [scorePercentage])

  const scoreEmoji = useMemo(() => {
    if (scorePercentage >= 70) return '🎉'
    if (scorePercentage >= 50) return '👍'
    return '💪'
  }, [scorePercentage])

  const toggleReview = () => {
    setReviewExpanded(!reviewExpanded)
  }

  const getOptionClasses = (optionIndex: number, correctAnswer: number, userAnswer: number) => {
    if (optionIndex === correctAnswer) {
      return 'border-green-500 bg-green-50'
    } else if (optionIndex === userAnswer && optionIndex !== correctAnswer) {
      return 'border-red-500 bg-red-50'
    } else {
      return 'border-gray-200 bg-gray-50'
    }
  }

  const getOptionTextColor = (optionIndex: number, correctAnswer: number, userAnswer: number) => {
    if (optionIndex === correctAnswer) {
      return 'text-green-700'
    } else if (optionIndex === userAnswer && optionIndex !== correctAnswer) {
      return 'text-red-700'
    } else {
      return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <BaseCard size="lg" className="text-center">
        <div className="py-4">
          <div className="mb-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${scoreColorClasses.container}`}
            >
              <svg
                className={`w-10 h-10 ${scoreColorClasses.icon}`}
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
              You scored <span className="font-bold text-indigo-600">{score}</span> out of
              <span className="font-bold">{totalQuestions}</span>
            </p>

            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${scoreColorClasses.badge}`}
            >
              {scorePercentage}%<span className="ml-2">{scoreEmoji}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">{children}</div>
        </div>
      </BaseCard>

      {/* Answer Review */}
      {showReview && (
        <BaseCard size="md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Review Your Answers</h3>
            <BaseButton variant="ghost" onClick={toggleReview}>
              {reviewExpanded ? 'Hide' : 'Show'} Review
            </BaseButton>
          </div>

          {reviewExpanded && (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        userAnswers[index] === question.correctAnswer
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {userAnswers[index] === question.correctAnswer ? (
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
                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${getOptionClasses(
                              optionIndex,
                              question.correctAnswer,
                              userAnswers[index]
                            )}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span
                                  className={`font-bold text-sm ${getOptionTextColor(
                                    optionIndex,
                                    question.correctAnswer,
                                    userAnswers[index]
                                  )}`}
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
                                {optionIndex === userAnswers[index] &&
                                  optionIndex !== question.correctAnswer && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Your Answer
                                    </span>
                                  )}
                                {optionIndex === userAnswers[index] &&
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
        </BaseCard>
      )}
    </div>
  )
}

export default QuizResults
