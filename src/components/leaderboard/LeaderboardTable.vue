<template>
  <BaseCard>
    <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-2xl">
      <h3 class="text-lg font-semibold text-gray-900">Complete Rankings</h3>
    </div>
    <div class="divide-y divide-gray-200">
      <div
        v-for="(entry, index) in entries"
        :key="`${entry.applicantId}-${entry.deckTitle}`"
        class="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
        :class="{
          'bg-yellow-50': index === 0,
          'bg-gray-50': index === 1,
          'bg-orange-50': index === 2,
        }"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Rank Badge -->
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                :class="getRankBadgeClasses(index)"
              >
                {{ index + 1 }}
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1 min-w-0">
              <p class="text-base font-semibold text-gray-900 truncate">{{ entry.email }}</p>
              <p class="text-sm text-gray-600 truncate">{{ entry.deckTitle }}</p>
            </div>
          </div>

          <!-- Score and Date -->
          <div class="flex-shrink-0 text-right">
            <p class="text-xl font-bold text-gray-900">{{ entry.score }}</p>
            <p class="text-xs text-gray-500 font-medium">{{ formatDate(entry.finishedAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

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

const getRankBadgeClasses = (index: number) => {
  if (index === 0) {
    return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
  } else if (index === 1) {
    return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
  } else if (index === 2) {
    return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
  } else {
    return 'bg-gray-200 text-gray-700'
  }
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
</script>
