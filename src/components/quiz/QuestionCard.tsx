import React from 'react'
import BaseCard from '@/components/ui/BaseCard'
import BaseButton from '@/components/ui/BaseButton'

interface Props {
  questionNumber: number
  question: string
  options: string[]
  selectedAnswer?: number
  isLastQuestion: boolean
  showPrevious?: boolean
  canGoPrevious?: boolean
  isSubmitting?: boolean
  onSelectAnswer: (index: number) => void
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
}

const QuestionCard: React.FC<Props> = ({
  questionNumber,
  question,
  options,
  selectedAnswer,
  isLastQuestion,
  showPrevious = true,
  canGoPrevious = true,
  isSubmitting = false,
  onSelectAnswer,
  onNext,
  onPrevious,
  onFinish,
}) => {
  const handleSelectAnswer = (index: number) => {
    onSelectAnswer(index)
  }

  return (
    <BaseCard size="lg">
      <div className="mb-8">
        <div className="flex items-start space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">{questionNumber}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">{question}</h3>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group hover:shadow-md ${
                selectedAnswer === index
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}
                >
                  <span
                    className={`font-bold text-sm ${
                      selectedAnswer === index ? 'text-white' : 'text-gray-600'
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
        {showPrevious ? (
          <BaseButton
            variant="secondary"
            disabled={!canGoPrevious}
            onClick={onPrevious}
            icon={
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
          >
            Previous
          </BaseButton>
        ) : (
          <div />
        )}

        {isLastQuestion ? (
          <BaseButton
            variant="success"
            disabled={selectedAnswer === undefined || isSubmitting}
            loading={isSubmitting}
            loadingText="Submitting..."
            onClick={onFinish}
            icon={
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          >
            Finish Quiz
          </BaseButton>
        ) : (
          <BaseButton
            variant="primary"
            disabled={selectedAnswer === undefined}
            onClick={onNext}
            icon={
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          >
            Next
          </BaseButton>
        )}
      </div>
    </BaseCard>
  )
}

export default QuestionCard
