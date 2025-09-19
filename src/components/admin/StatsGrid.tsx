import React from 'react'
import BaseCard from '@/components/ui/BaseCard'

interface Stat {
  label: string
  value: string | number
  description: string
  iconBg: string
  iconPath: string
}

interface StatsGridProps {
  totalDecks: number
  totalQuestions: number
  totalAttempts: number
}

const StatsGrid: React.FC<StatsGridProps> = ({ totalDecks, totalQuestions, totalAttempts }) => {
  const stats: Stat[] = [
    {
      label: 'Total Quiz Decks',
      value: totalDecks || 0,
      description: 'Active collections',
      iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      iconPath:
        'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
      label: 'Total Questions',
      value: totalQuestions || 0,
      description: 'Available content',
      iconBg: 'bg-gradient-to-r from-green-500 to-green-600',
      iconPath:
        'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Quiz Attempts',
      value: totalAttempts || 0,
      description: 'User submissions',
      iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      iconPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <BaseCard key={stat.label} hoverable size="lg" className="transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </div>
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${stat.iconBg}`}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={stat.iconPath}
                />
              </svg>
            </div>
          </div>
        </BaseCard>
      ))}
    </div>
  )
}

export default StatsGrid
