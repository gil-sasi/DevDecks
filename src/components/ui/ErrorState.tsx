import React from 'react'
import BaseCard from './BaseCard'
import BaseButton from './BaseButton'

interface ErrorStateProps {
  title?: string
  message: string
  showRetry?: boolean
  size?: 'sm' | 'md' | 'lg'
  onRetry?: () => void
  action?: React.ReactNode
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  showRetry = true,
  size = 'md',
  onRetry,
  action,
}) => {
  return (
    <BaseCard className="text-center" size={size}>
      <div className="py-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-red-700 mb-6">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <BaseButton
            variant="danger"
            onClick={onRetry}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            }
          >
            Try Again
          </BaseButton>
        )}
        
        {action}
      </div>
    </BaseCard>
  )
}

export default ErrorState
