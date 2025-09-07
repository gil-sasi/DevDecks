<template>
  <div class="space-y-6">
    <!-- Score Card -->
    <BaseCard size="lg" class="text-center">
      <div class="py-4">
        <div class="mb-6">
          <div
            class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            :class="scoreColorClasses.container"
          >
            <svg
              class="w-10 h-10"
              :class="scoreColorClasses.icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="scorePercentage >= 70"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
              <path
                v-else-if="scorePercentage >= 50"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p class="text-xl text-gray-600 mb-4">
            You scored <span class="font-bold text-indigo-600">{{ score }}</span> out of
            <span class="font-bold">{{ totalQuestions }}</span>
          </p>
          
          <div
            class="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold"
            :class="scoreColorClasses.badge"
          >
            {{ scorePercentage }}%
            <span class="ml-2">{{ scoreEmoji }}</span>
          </div>
        </div>

        <div class="flex justify-center space-x-4 mb-8">
          <slot name="actions" />
        </div>
      </div>
    </BaseCard>

    <!-- Answer Review -->
    <BaseCard v-if="showReview" size="md">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900">Review Your Answers</h3>
        <BaseButton variant="ghost" @click="toggleReview">
          {{ reviewExpanded ? 'Hide' : 'Show' }} Review
        </BaseButton>
      </div>

      <div v-if="reviewExpanded" class="space-y-6">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="border border-gray-200 rounded-xl p-4"
        >
          <div class="flex items-start space-x-3 mb-4">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              :class="{
                'bg-green-100': userAnswers[index] === question.correctAnswer,
                'bg-red-100': userAnswers[index] !== question.correctAnswer,
              }"
            >
              <svg
                v-if="userAnswers[index] === question.correctAnswer"
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gray-900 mb-3">
                {{ index + 1 }}. {{ question.question }}
              </h4>
              <div class="space-y-2">
                <div
                  v-for="(option, optionIndex) in question.options"
                  :key="optionIndex"
                  class="p-3 rounded-lg border-2 transition-all duration-200"
                  :class="getOptionClasses(optionIndex, question.correctAnswer, userAnswers[index])"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <span
                        class="font-bold text-sm"
                        :class="getOptionTextColor(optionIndex, question.correctAnswer, userAnswers[index])"
                      >
                        {{ String.fromCharCode(65 + optionIndex) }}.
                      </span>
                      <span class="text-gray-800">{{ option }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span
                        v-if="optionIndex === question.correctAnswer"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Correct
                      </span>
                      <span
                        v-if="optionIndex === userAnswers[index] && optionIndex !== question.correctAnswer"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        Your Answer
                      </span>
                      <span
                        v-if="optionIndex === userAnswers[index] && optionIndex === question.correctAnswer"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Your Correct Answer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface Props {
  score: number
  totalQuestions: number
  questions?: Question[]
  userAnswers?: number[]
  showReview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  questions: () => [],
  userAnswers: () => [],
  showReview: true,
})

const reviewExpanded = ref(false)

const scorePercentage = computed(() => {
  return Math.round((props.score / props.totalQuestions) * 100)
})

const scoreColorClasses = computed(() => {
  if (scorePercentage.value >= 70) {
    return {
      container: 'bg-green-100',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-800',
    }
  } else if (scorePercentage.value >= 50) {
    return {
      container: 'bg-yellow-100',
      icon: 'text-yellow-600',
      badge: 'bg-yellow-100 text-yellow-800',
    }
  } else {
    return {
      container: 'bg-red-100',
      icon: 'text-red-600',
      badge: 'bg-red-100 text-red-800',
    }
  }
})

const scoreEmoji = computed(() => {
  if (scorePercentage.value >= 70) return '🎉'
  if (scorePercentage.value >= 50) return '👍'
  return '💪'
})

const toggleReview = () => {
  reviewExpanded.value = !reviewExpanded.value
}

const getOptionClasses = (optionIndex: number, correctAnswer: number, userAnswer: number) => {
  if (optionIndex === correctAnswer) {
    return 'border-green-500 bg-green-50'
  } else if (optionIndex === userAnswer && optionIndex !== correctAnswer) {
    return 'border-red-500 bg-red-50'
  } else {
    return 'border-gray-200 bg-gray-50'
  }
}

const getOptionTextColor = (optionIndex: number, correctAnswer: number, userAnswer: number) => {
  if (optionIndex === correctAnswer) {
    return 'text-green-700'
  } else if (optionIndex === userAnswer && optionIndex !== correctAnswer) {
    return 'text-red-700'
  } else {
    return 'text-gray-600'
  }
}
</script>
