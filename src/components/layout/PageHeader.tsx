import React from 'react'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  subtitle?: string
  iconPath: string
  iconBg?: string
  titleGradient?: string
  showBackButton?: boolean
  backTo?: string
  backText?: string
  children?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle = '',
  iconPath,
  iconBg = 'bg-gradient-to-r from-blue-600 to-purple-600',
  titleGradient = 'bg-gradient-to-r from-blue-600 to-purple-600',
  showBackButton = true,
  backTo = '/',
  backText = 'Back to Home',
  children,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${iconBg}`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
              </svg>
            </div>
            <div>
              <h1 className={`text-3xl font-bold bg-clip-text text-transparent ${titleGradient}`}>
                {title}
              </h1>
              {subtitle && <p className="text-gray-600 text-sm font-medium">{subtitle}</p>}
            </div>
          </div>

          {children ||
            (showBackButton && (
              <Link
                to={backTo}
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {backText}
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
