<template>
  <BaseCard v-if="topThree.length >= 3" size="lg" class="mb-8">
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-8">Top Performers</h2>
    <div class="flex justify-center items-end space-x-8">
      <!-- 2nd Place -->
      <div class="text-center">
        <div
          class="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
        >
          <span class="text-2xl font-bold text-white">2</span>
        </div>
        <div class="bg-gray-100 rounded-xl p-4 min-h-[120px] w-48">
          <div class="text-lg font-bold text-gray-900 truncate">{{ topThree[1].email }}</div>
          <div class="text-sm text-gray-600 truncate mb-2">{{ topThree[1].deckTitle }}</div>
          <div class="text-2xl font-bold text-gray-700">{{ topThree[1].score }}</div>
          <div class="text-xs text-gray-500">{{ formatDate(topThree[1].finishedAt) }}</div>
        </div>
      </div>

      <!-- 1st Place -->
      <div class="text-center -mt-8">
        <div
          class="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-xl"
        >
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 min-h-[140px] w-52">
          <div class="text-xl font-bold text-gray-900 truncate">{{ topThree[0].email }}</div>
          <div class="text-sm text-gray-600 truncate mb-2">{{ topThree[0].deckTitle }}</div>
          <div class="text-3xl font-bold text-yellow-600">{{ topThree[0].score }}</div>
          <div class="text-xs text-gray-500">{{ formatDate(topThree[0].finishedAt) }}</div>
        </div>
      </div>

      <!-- 3rd Place -->
      <div class="text-center">
        <div
          class="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
        >
          <span class="text-2xl font-bold text-white">3</span>
        </div>
        <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 min-h-[120px] w-48">
          <div class="text-lg font-bold text-gray-900 truncate">{{ topThree[2].email }}</div>
          <div class="text-sm text-gray-600 truncate mb-2">{{ topThree[2].deckTitle }}</div>
          <div class="text-2xl font-bold text-orange-600">{{ topThree[2].score }}</div>
          <div class="text-xs text-gray-500">{{ formatDate(topThree[2].finishedAt) }}</div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

interface LeaderboardEntry {
  email: string
  deckTitle: string
  score: number
  finishedAt: string
}

interface Props {
  topThree: LeaderboardEntry[]
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
