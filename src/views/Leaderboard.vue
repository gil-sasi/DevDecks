<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <PageHeader
      title="Leaderboard"
      subtitle="Top performers across all quizzes"
      icon-path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />

    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <BaseCard
          v-for="i in 5"
          :key="i"
          size="md"
          class="animate-pulse"
        >
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
      <div v-else-if="leaderboard && leaderboard.length > 0" class="space-y-4">
        <LeaderboardPodium :top-three="leaderboard.slice(0, 3)" />
        <LeaderboardTable :entries="leaderboard" />
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
  </div>
</template>

<script setup lang="ts">
import { useLeaderboard } from '@/composables/useLeaderboard'

// Components
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import LeaderboardPodium from '@/components/leaderboard/LeaderboardPodium.vue'
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable.vue'

const { leaderboard, isLoading, isError, error, refetch } = useLeaderboard()
</script>
