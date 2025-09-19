import React from 'react'

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  className?: string
  children: React.ReactNode
  icon?: React.ReactNode
  title?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  loadingText = '',
  className = '',
  children,
  icon,
  title,
  onClick,
}) => {
  const buttonClasses = () => {
    const variants = {
      primary:
        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 focus:ring-blue-500',
      secondary:
        'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 shadow-sm hover:shadow-md focus:ring-gray-500',
      success:
        'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105 focus:ring-green-500',
      danger:
        'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg transform hover:scale-105 focus:ring-red-500',
      warning:
        'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg transform hover:scale-105 focus:ring-yellow-500',
      ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    }
    return variants[variant]
  }

  const sizeClasses = () => {
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    }
    return sizes[size]
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      title={title}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${buttonClasses()} ${sizeClasses()} ${className}`}
      onClick={onClick}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      <span>{loading && loadingText ? loadingText : children}</span>
    </button>
  )
}

export default BaseButton
