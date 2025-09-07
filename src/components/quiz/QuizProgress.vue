<template>
  <BaseCard size="md">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-3">
        <span class="text-sm font-medium text-gray-700">
          Question {{ currentQuestion }} of {{ totalQuestions }}
        </span>
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          {{ progressPercentage }}% Complete
        </span>
      </div>
      <div v-if="showTimer" class="text-sm text-gray-500 flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ formattedTime }}
      </div>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        class="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
        :style="{ width: `${progressPercentage}%` }"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  currentQuestion: number
  totalQuestions: number
  elapsedTime?: number
  showTimer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  elapsedTime: 0,
  showTimer: true,
})

const progressPercentage = computed(() => {
  return Math.round((props.currentQuestion / props.totalQuestions) * 100)
})

const formattedTime = computed(() => {
  const mins = Math.floor(props.elapsedTime / 60)
  const secs = props.elapsedTime % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})
</script>
