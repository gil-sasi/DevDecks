import React from 'react'
import type { LeaderboardEntry } from '@/types'

interface Props {
  topThree: LeaderboardEntry[]
}

const LeaderboardPodium: React.FC<Props> = ({ topThree }) => {
  if (topThree.length < 3) return null

  const getDisplayName = (email: string) => {
    // Extract name from email (everything before @)
    const name = email.split('@')[0]
    // Capitalize first letter and replace dots/underscores with spaces
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, ' ')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="mb-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Champions Podium
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Celebrating our top performers who have demonstrated exceptional knowledge and skill
        </p>
      </div>

      {/* Podium Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-50"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl"></div>

        {/* Podium Content */}
        <div className="relative px-8 py-12">
          <div className="flex justify-center items-end space-x-12">
            {/* 2nd Place */}
            <div className="text-center group transform transition-all duration-300 hover:scale-105">
              {/* Medal */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.27L5.82 21L7 14L2 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
              </div>

              {/* Podium Block */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 shadow-xl border border-slate-200 min-h-[140px] w-56 transform perspective-1000 rotateX-2">
                <div className="text-xl font-bold text-slate-800 mb-1 truncate">
                  {getDisplayName(topThree[1].email)}
                </div>
                <div className="text-sm text-slate-600 mb-3 truncate">{topThree[1].deckTitle}</div>
                <div className="text-3xl font-black text-slate-700 mb-2">{topThree[1].score}</div>
                <div className="text-xs text-slate-500 font-medium">
                  {formatDate(topThree[1].finishedAt)}
                </div>
              </div>

              {/* Base */}
              <div className="w-56 h-16 bg-gradient-to-br from-slate-300 to-slate-400 rounded-b-2xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SILVER</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center group transform transition-all duration-300 hover:scale-105 -mt-8">
              {/* Crown */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 14L5.5 9L8 14L12 4L16 14L18.5 9L21 14L19 16H5Z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
                {/* Crown decoration */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.27L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>

              {/* Podium Block */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-2xl p-6 shadow-2xl min-h-[160px] w-60 transform perspective-1000 rotateX-2">
                <div className="text-2xl font-bold text-yellow-800 mb-1 truncate">
                  {getDisplayName(topThree[0].email)}
                </div>
                <div className="text-sm text-yellow-700 mb-3 truncate">{topThree[0].deckTitle}</div>
                <div className="text-4xl font-black text-yellow-600 mb-2">{topThree[0].score}</div>
                <div className="text-xs text-yellow-600 font-medium">
                  {formatDate(topThree[0].finishedAt)}
                </div>
              </div>

              {/* Base */}
              <div className="w-60 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-b-2xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CHAMPION</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center group transform transition-all duration-300 hover:scale-105">
              {/* Medal */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.27L5.82 21L7 14L2 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
              </div>

              {/* Podium Block */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 shadow-xl border border-amber-200 min-h-[140px] w-56 transform perspective-1000 rotateX-2">
                <div className="text-xl font-bold text-amber-800 mb-1 truncate">
                  {getDisplayName(topThree[2].email)}
                </div>
                <div className="text-sm text-amber-700 mb-3 truncate">{topThree[2].deckTitle}</div>
                <div className="text-3xl font-black text-amber-700 mb-2">{topThree[2].score}</div>
                <div className="text-xs text-amber-600 font-medium">
                  {formatDate(topThree[2].finishedAt)}
                </div>
              </div>

              {/* Base */}
              <div className="w-56 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-b-2xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BRONZE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPodium
