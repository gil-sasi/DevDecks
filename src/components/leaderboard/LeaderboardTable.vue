<template>
  <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-2xl font-bold text-white">Complete Rankings</h3>
          <p class="text-slate-300 mt-1">All participants ranked by performance</p>
        </div>
        <div class="text-slate-300">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Table Header -->
    <div class="bg-gray-50 px-8 py-4 border-b border-gray-200">
      <div
        class="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 uppercase tracking-wide"
      >
        <div class="col-span-1">Rank</div>
        <div class="col-span-6">Participant</div>
        <div class="col-span-3">Quiz</div>
        <div class="col-span-1 text-center">Score</div>
        <div class="col-span-1 text-right">Date</div>
      </div>
    </div>

    <!-- Table Body -->
    <div class="divide-y divide-gray-100">
      <div
        v-for="(entry, index) in entries"
        :key="`${entry.applicantId}-${entry.deckTitle}`"
        class="px-8 py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 group"
        :class="getRowClasses(index)"
      >
        <div class="grid grid-cols-12 gap-4 items-center">
          <!-- Rank -->
          <div class="col-span-1">
            <div class="flex items-center">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-transform duration-300 group-hover:scale-110"
                :class="getRankBadgeClasses(index)"
              >
                {{ index + 1 }}
              </div>
              <div v-if="index < 3" class="ml-2">
                <svg
                  class="w-5 h-5"
                  :class="getMedalColor(index)"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.27L5.82 21L7 14L2 9L10.91 8.26L12 2Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Participant Info -->
          <div class="col-span-6">
            <div class="flex items-center space-x-4">
              <!-- Avatar -->
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span class="text-white font-bold text-lg">{{ getInitials(entry.email) }}</span>
              </div>

              <!-- Name and Email -->
              <div class="min-w-0 flex-1">
                <p class="text-lg font-bold text-gray-900 truncate">
                  {{ getDisplayName(entry.email) }}
                </p>
                <p class="text-sm text-gray-500 truncate">{{ entry.email }}</p>
              </div>
            </div>
          </div>

          <!-- Quiz -->
          <div class="col-span-3">
            <div class="bg-gray-100 rounded-lg px-3 py-2">
              <p class="text-sm font-medium text-gray-900 truncate">{{ entry.deckTitle }}</p>
            </div>
          </div>

          <!-- Score -->
          <div class="col-span-1 text-center">
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg"
            >
              <span class="text-xl font-black text-white">{{ entry.score }}</span>
            </div>
          </div>

          <!-- Date -->
          <div class="col-span-1 text-right">
            <div class="text-sm text-gray-600 font-medium">
              {{ formatDate(entry.finishedAt) }}
            </div>
            <div class="text-xs text-gray-400 mt-1">
              {{ formatTime(entry.finishedAt) }}
            </div>
          </div>
        </div>

        <!-- Performance Indicator -->
        <div class="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="getPerformanceBarClass(entry.score)"
            :style="{ width: `${Math.min((entry.score / 100) * 100, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-gray-50 px-8 py-4 text-center">
      <p class="text-sm text-gray-500">
        Showing {{ entries.length }} participant{{ entries.length === 1 ? '' : 's' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LeaderboardEntry {
  applicantId: string
  email: string
  deckTitle: string
  score: number
  finishedAt: string
}

interface Props {
  entries: LeaderboardEntry[]
}

defineProps<Props>()

const getDisplayName = (email: string) => {
  // Extract name from email (everything before @)
  const name = email.split('@')[0]
  // Capitalize first letter and replace dots/underscores with spaces
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, ' ')
}

const getInitials = (email: string) => {
  const name = email.split('@')[0]
  const parts = name.split(/[._]/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const getRankBadgeClasses = (index: number) => {
  if (index === 0) {
    return 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-2 border-yellow-300'
  } else if (index === 1) {
    return 'bg-gradient-to-br from-gray-400 to-gray-500 text-white border-2 border-gray-300'
  } else if (index === 2) {
    return 'bg-gradient-to-br from-amber-600 to-amber-700 text-white border-2 border-amber-500'
  } else {
    return 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 border-2 border-slate-200'
  }
}

const getRowClasses = (index: number) => {
  if (index === 0) {
    return 'bg-gradient-to-r from-yellow-50/50 to-yellow-100/50 border-l-4 border-yellow-400'
  } else if (index === 1) {
    return 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-l-4 border-gray-400'
  } else if (index === 2) {
    return 'bg-gradient-to-r from-amber-50/50 to-amber-100/50 border-l-4 border-amber-600'
  }
  return ''
}

const getMedalColor = (index: number) => {
  if (index === 0) return 'text-yellow-500'
  if (index === 1) return 'text-gray-400'
  if (index === 2) return 'text-amber-600'
  return 'text-gray-300'
}

const getPerformanceBarClass = (score: number) => {
  if (score >= 90) return 'bg-gradient-to-r from-green-400 to-green-500'
  if (score >= 80) return 'bg-gradient-to-r from-blue-400 to-blue-500'
  if (score >= 70) return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  if (score >= 60) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-red-400 to-red-500'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
