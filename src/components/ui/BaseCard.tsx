import React from 'react'

interface BaseCardProps {
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const BaseCard: React.FC<BaseCardProps> = ({
  hoverable = false,
  size = 'md',
  className = '',
  children,
}) => {
  const getSizeClasses = () => {
    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }
    return sizes[size]
  }

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 transition-all duration-300 ${
        hoverable ? 'hover:shadow-2xl hover:scale-[1.02]' : ''
      } ${getSizeClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

export default BaseCard
