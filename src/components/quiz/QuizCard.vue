<template>
  <BaseCard hoverable size="lg" class="group">
    <div class="flex items-center justify-between mb-6">
      <div
        class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {{ questionCount }} questions
      </span>
    </div>

    <h3
      class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200"
    >
      {{ title }}
    </h3>
    <p class="text-gray-600 mb-6 leading-relaxed">
      {{ description }}
    </p>

    <BaseButton
      variant="primary"
      size="lg"
      class="w-full group-hover:scale-105"
      @click="$emit('start-quiz')"
    >
      <template #icon>
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </template>
      Start Quiz
    </BaseButton>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  title: string
  description: string
  questionCount: number
}

defineProps<Props>()

defineEmits<{
  'start-quiz': []
}>()
</script>
