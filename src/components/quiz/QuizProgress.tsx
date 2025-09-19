import React from 'react'
import BaseCard from '@/components/ui/BaseCard'

interface Props {
  currentQuestion: number
  totalQuestions: number
  elapsedTime?: number
  showTimer?: boolean
}

const QuizProgress: React.FC<Props> = ({
  currentQuestion,
  totalQuestions,
  elapsedTime = 0,
  showTimer = true,
}) => {
  const progressPercentage = Math.round((currentQuestion / totalQuestions) * 100)

  const formattedTime = () => {
    const mins = Math.floor(elapsedTime / 60)
    const secs = elapsedTime % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <BaseCard size="md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {progressPercentage}% Complete
          </span>
        </div>
        {showTimer && (
          <div className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formattedTime()}
          </div>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </BaseCard>
  )
}

export default QuizProgress
