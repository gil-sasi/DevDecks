<template>
  <BaseCard size="lg">
    <div class="mb-8">
      <div class="flex items-start space-x-3 mb-6">
        <div
          class="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <span class="text-white font-bold text-sm">{{ questionNumber }}</span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 leading-relaxed">
          {{ question }}
        </h3>
      </div>

      <div class="space-y-3">
        <button
          v-for="(option, index) in options"
          :key="index"
          @click="handleSelectAnswer(index)"
          class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group hover:shadow-md"
          :class="{
            'border-indigo-500 bg-indigo-50 shadow-md': selectedAnswer === index,
            'border-gray-200 hover:border-gray-300 hover:bg-gray-50': selectedAnswer !== index,
          }"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200"
              :class="{
                'border-indigo-500 bg-indigo-500': selectedAnswer === index,
                'border-gray-300 group-hover:border-gray-400': selectedAnswer !== index,
              }"
            >
              <span
                class="font-bold text-sm"
                :class="{
                  'text-white': selectedAnswer === index,
                  'text-gray-600': selectedAnswer !== index,
                }"
              >
                {{ String.fromCharCode(65 + index) }}
              </span>
            </div>
            <span class="text-gray-800 font-medium">{{ option }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <BaseButton
        v-if="showPrevious"
        variant="secondary"
        :disabled="!canGoPrevious"
        @click="$emit('previous')"
      >
        <template #icon>
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </template>
        Previous
      </BaseButton>

      <div v-else />

      <BaseButton
        v-if="isLastQuestion"
        variant="success"
        :disabled="selectedAnswer === undefined || isSubmitting"
        :loading="isSubmitting"
        loading-text="Submitting..."
        @click="$emit('finish')"
      >
        <template #icon>
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </template>
        Finish Quiz
      </BaseButton>

      <BaseButton
        v-else
        variant="primary"
        :disabled="selectedAnswer === undefined"
        @click="$emit('next')"
      >
        Next
        <template #icon>
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </template>
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  questionNumber: number
  question: string
  options: string[]
  selectedAnswer?: number
  isLastQuestion: boolean
  showPrevious?: boolean
  canGoPrevious?: boolean
  isSubmitting?: boolean
}

withDefaults(defineProps<Props>(), {
  selectedAnswer: undefined,
  showPrevious: true,
  canGoPrevious: true,
  isSubmitting: false,
})

const emit = defineEmits<{
  'select-answer': [index: number]
  next: []
  previous: []
  finish: []
}>()

const handleSelectAnswer = (index: number) => {
  emit('select-answer', index)
}
</script>
