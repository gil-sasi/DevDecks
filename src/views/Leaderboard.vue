<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
    <PageHeader
      title="Leaderboard"
      subtitle="Top performers across all quizzes"
      icon-path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />

    <div class="flex-1 max-w-6xl mx-auto px-6 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <BaseCard v-for="i in 5" :key="i" size="md" class="animate-pulse">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div class="flex-1">
              <div class="h-5 bg-gray-200 rounded-lg mb-3"></div>
              <div class="h-4 bg-gray-200 rounded-lg w-3/4"></div>
            </div>
            <div class="h-8 bg-gray-200 rounded-lg w-20"></div>
          </div>
        </BaseCard>
      </div>

      <!-- Error State -->
      <ErrorState
        v-else-if="isError"
        title="Unable to Load Leaderboard"
        :message="error?.message || 'Failed to load leaderboard'"
        @retry="refetch"
      />

      <!-- Leaderboard Content -->
      <div v-else-if="leaderboard && leaderboard.length > 0" class="space-y-12">
        <!-- Overall Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">{{ totalParticipants }}</div>
            <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Total Participants
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">{{ averageScore }}%</div>
            <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Average Score
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.27L5.82 21L7 14L2 9L10.91 8.26L12 2Z"
                />
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">{{ topScore }}%</div>
            <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Highest Score
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div class="text-3xl font-bold text-gray-900 mb-1">{{ totalQuizzes }}</div>
            <div class="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Total Quizzes
            </div>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div
          v-if="leaderboardsByQuiz.length > 1"
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Jump to Quiz</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="(quizData, index) in leaderboardsByQuiz"
              :key="quizData.deckTitle"
              @click="scrollToQuiz(index)"
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <span class="mr-2">#{{ index + 1 }}</span>
              <span class="truncate max-w-40">{{ quizData.deckTitle }}</span>
            </button>
          </div>
        </div>

        <!-- Quiz-Specific Leaderboards -->
        <div
          v-for="(quizData, index) in leaderboardsByQuiz"
          :key="quizData.deckTitle"
          :id="`quiz-${index}`"
          class="space-y-8"
        >
          <!-- Quiz Header -->
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white font-bold text-2xl mb-4 shadow-lg"
            >
              #{{ index + 1 }}
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ quizData.deckTitle }}</h2>
            <div class="flex justify-center items-center space-x-6 text-sm text-gray-600">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {{ quizData.entries.length }} participants
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                {{
                  Math.round(
                    quizData.entries.reduce((sum, entry) => sum + entry.score, 0) /
                      quizData.entries.length
                  )
                }}% avg
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.27L5.82 21L7 14L2 9L10.91 8.26L12 2Z"
                  />
                </svg>
                {{ Math.max(...quizData.entries.map((entry) => entry.score)) }}% top
              </span>
            </div>
          </div>

          <!-- Podium for this quiz (if enough participants) -->
          <LeaderboardPodium
            v-if="quizData.entries.length >= 3"
            :top-three="quizData.entries.slice(0, 3)"
          />

          <!-- Table for this quiz -->
          <LeaderboardTable :entries="quizData.entries" />

          <!-- Divider (except for last quiz) -->
          <div
            v-if="index < leaderboardsByQuiz.length - 1"
            class="border-t-2 border-gray-200 pt-8"
          ></div>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        title="No Quiz Results Yet"
        description="Be the first to complete a quiz and claim your spot on the leaderboard! Challenge yourself and see how you compare to others."
        size="lg"
      >
        <template #icon>
          <svg
            class="w-10 h-10 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </template>
        <template #action>
          <router-link
            to="/"
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Take Your First Quiz
          </router-link>
        </template>
      </EmptyState>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLeaderboard } from '@/composables/useLeaderboard'

// Components
import PageHeader from '@/components/layout/PageHeader.vue'
import Footer from '@/components/layout/Footer.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import LeaderboardPodium from '@/components/leaderboard/LeaderboardPodium.vue'
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable.vue'

const { leaderboard, isLoading, isError, error, refetch } = useLeaderboard()

// Group leaderboard entries by quiz/deck
const leaderboardsByQuiz = computed(() => {
  if (!leaderboard.value || leaderboard.value.length === 0) return []

  // Group entries by deckTitle
  const grouped = leaderboard.value.reduce(
    (acc, entry) => {
      const deckTitle = entry.deckTitle
      if (!acc[deckTitle]) {
        acc[deckTitle] = []
      }
      acc[deckTitle].push(entry)
      return acc
    },
    {} as Record<string, typeof leaderboard.value>
  )

  // Convert to array and sort each group by score (descending)
  return Object.entries(grouped)
    .map(([deckTitle, entries]) => ({
      deckTitle,
      entries: entries.sort((a, b) => b.score - a.score),
    }))
    .sort((a, b) => a.deckTitle.localeCompare(b.deckTitle)) // Sort quiz names alphabetically
})

// Overall statistics computed properties
const totalParticipants = computed(() => {
  if (!leaderboard.value || leaderboard.value.length === 0) return 0
  return leaderboard.value.length
})

const averageScore = computed(() => {
  if (!leaderboard.value || leaderboard.value.length === 0) return 0
  const sum = leaderboard.value.reduce((acc, entry) => acc + entry.score, 0)
  return Math.round(sum / leaderboard.value.length)
})

const topScore = computed(() => {
  if (!leaderboard.value || leaderboard.value.length === 0) return 0
  return Math.max(...leaderboard.value.map((entry) => entry.score))
})

const totalQuizzes = computed(() => {
  return leaderboardsByQuiz.value.length
})

// Navigation function
const scrollToQuiz = (index: number) => {
  const element = document.getElementById(`quiz-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
