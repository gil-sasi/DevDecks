import React from 'react'
import BaseCard from './BaseCard'

interface EmptyStateProps {
  title: string
  description: string
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  size = 'md',
  icon,
  action,
}) => {
  const getIconContainerClasses = () => {
    const sizes = {
      sm: 'w-12 h-12 bg-gray-100',
      md: 'w-16 h-16 bg-gray-100',
      lg: 'w-20 h-20 bg-gradient-to-r from-gray-100 to-blue-100',
    }
    return sizes[size]
  }

  const getIconClasses = () => {
    const sizes = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
    }
    return sizes[size]
  }

  const getTitleClasses = () => {
    const sizes = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    }
    return sizes[size]
  }

  const getDescriptionClasses = () => {
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }
    return sizes[size]
  }

  return (
    <BaseCard className="text-center" size={size}>
      <div className="py-8">
        <div className={`rounded-full flex items-center justify-center mx-auto mb-6 ${getIconContainerClasses()}`}>
          {icon || (
            <svg
              className={`text-gray-400 ${getIconClasses()}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-3 ${getTitleClasses()}`}>
          {title}
        </h3>
        
        <p className={`text-gray-600 mb-6 max-w-md mx-auto ${getDescriptionClasses()}`}>
          {description}
        </p>
        
        {action}
      </div>
    </BaseCard>
  )
}

export default EmptyState
