<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 space-y-12">
      <!-- Hero Section -->
      <div class="text-center py-12">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Master Your Skills with
            <span
              class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              DevDecks
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Challenge yourself with curated coding quizzes, track your progress, and compete with
            developers worldwide.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div v-if="statsLoading" class="text-3xl font-bold text-blue-600 mb-2 animate-pulse">
                <div class="h-8 bg-gray-200 rounded w-12 mx-auto"></div>
              </div>
              <div v-else-if="statsError" class="text-3xl font-bold text-red-600 mb-2">--</div>
              <div v-else class="text-3xl font-bold text-blue-600 mb-2">
                {{ stats?.totalCategories || 0 }}+
              </div>
              <div class="text-gray-600">Quiz Categories</div>
            </div>
            <div class="text-center">
              <div
                v-if="statsLoading"
                class="text-3xl font-bold text-purple-600 mb-2 animate-pulse"
              >
                <div class="h-8 bg-gray-200 rounded w-12 mx-auto"></div>
              </div>
              <div v-else-if="statsError" class="text-3xl font-bold text-red-600 mb-2">--</div>
              <div v-else class="text-3xl font-bold text-purple-600 mb-2">
                {{ stats?.totalQuestions || 0 }}+
              </div>
              <div class="text-gray-600">Questions Available</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">∞</div>
              <div class="text-gray-600">Learning Potential</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Input Section -->
      <div v-if="!userStore.isAuthenticated()" class="max-w-md mx-auto">
        <BaseCard size="lg">
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
            <p class="text-gray-600">Enter your email to begin your coding journey</p>
          </div>

          <form @submit.prevent="handleEmailSubmit" class="space-y-6">
            <BaseInput
              v-model="email"
              type="email"
              label="Email Address"
              placeholder="your.email@company.com"
              required
              :disabled="createApplicantMutation.isPending.value"
              :error="
                createApplicantMutation.isError.value
                  ? createApplicantMutation.error.value?.message || 'Failed to create account'
                  : ''
              "
            />

            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              class="w-full"
              :loading="createApplicantMutation.isPending.value"
              loading-text="Setting up your account..."
              :disabled="!email.trim()"
            >
              Start Learning Now
            </BaseButton>
          </form>
        </BaseCard>
      </div>

      <!-- Welcome Back Section -->
      <div v-else class="max-w-2xl mx-auto">
        <BaseCard size="lg" class="text-center">
          <div
            class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p class="text-gray-600">
            Ready to continue your learning journey,
            <span class="font-semibold text-blue-600">{{ userStore.user?.email }}</span
            >?
          </p>
        </BaseCard>
      </div>

      <!-- Deck List Section -->
      <div v-if="userStore.isAuthenticated()" class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Choose Your Challenge</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Select a quiz deck that matches your skill level and interests. Each deck contains
            carefully crafted questions to test your knowledge.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BaseCard v-for="i in 3" :key="i" size="lg" class="animate-pulse">
            <div class="h-6 bg-gray-200 rounded mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div class="h-10 bg-gray-200 rounded"></div>
          </BaseCard>
        </div>

        <!-- Error State -->
        <ErrorState
          v-else-if="isError"
          title="Oops! Something went wrong"
          :message="error?.message || 'Failed to load quiz decks'"
          @retry="refetch"
        />

        <!-- Deck List -->
        <div v-else-if="decks && decks.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <QuizCard
            v-for="deck in decks"
            :key="(deck as any)._id || deck.id"
            :title="deck.title"
            :description="deck.description"
            :question-count="deck.questionCount"
            @start-quiz="handleStartQuiz((deck as any)._id || deck.id)"
          />
        </div>

        <!-- Empty State -->
        <EmptyState
          v-else
          title="No quizzes available"
          description="Check back later for new quiz content."
        >
          <template #action>
            <BaseButton variant="secondary" @click="() => refetch()">
              <template #icon>
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </template>
              Refresh
            </BaseButton>
          </template>
        </EmptyState>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useDecks } from '@/composables/useDecks'
import { useApplicant } from '@/composables/useApplicant'
import { useStats } from '@/composables/useStats'

// Components
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import QuizCard from '@/components/quiz/QuizCard.vue'
import Footer from '@/components/layout/Footer.vue'

const router = useRouter()
const userStore = useUserStore()
const email = ref('')

// Fetch decks
const { decks, isLoading, isError, error, refetch } = useDecks()

// Fetch stats
const { stats, isLoading: statsLoading, isError: statsError } = useStats()

// Create applicant mutation
const { useCreateApplicant } = useApplicant()
const createApplicantMutation = useCreateApplicant()

const handleEmailSubmit = async () => {
  try {
    const user = await createApplicantMutation.mutateAsync({ email: email.value })
    userStore.setUser(user)
    email.value = ''
  } catch (error) {
    console.log('Failed to create applicant:', error)
  }
}

const handleStartQuiz = (deckId: string) => {
  router.push(`/quiz/${deckId}`)
}
</script>
