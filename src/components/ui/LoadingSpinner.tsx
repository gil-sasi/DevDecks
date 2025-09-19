import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  center?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = '',
  center = false,
}) => {
  const containerClasses = center ? 'min-h-[200px]' : ''

  const spinnerClasses = {
    sm: 'h-4 w-4 border-2 border-gray-300 border-t-blue-600',
    md: 'h-6 w-6 border-2 border-gray-300 border-t-blue-600',
    lg: 'h-8 w-8 border-3 border-gray-300 border-t-blue-600',
    xl: 'h-12 w-12 border-4 border-gray-300 border-t-blue-600',
  }

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className={`animate-spin rounded-full border-solid ${spinnerClasses[size]}`}>
        <div className="sr-only">Loading...</div>
      </div>
      {text && <span className={`ml-3 text-gray-600 ${textClasses[size]}`}>{text}</span>}
    </div>
  )
}

export default LoadingSpinner
