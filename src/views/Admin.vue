<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
    <!-- Professional Admin Header -->
    <div
      class="bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200/50 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </div>
            <div>
              <h1
                class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Admin Dashboard
              </h1>
              <p class="text-sm text-gray-600 font-medium">Quiz Management & Content Control</p>
            </div>
          </div>
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to App
          </router-link>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Professional Admin Login -->
      <div v-if="!isAuthenticated" class="max-w-lg mx-auto">
        <div
          class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-10"
        >
          <div class="text-center mb-8">
            <div
              class="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Secure Access</h2>
            <p class="text-gray-600 text-lg">
              Enter your administrative credentials to access the quiz management dashboard
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-7">
            <div>
              <label for="token" class="block text-base font-semibold text-gray-800 mb-3">
                Administrative Token
              </label>
              <input
                id="token"
                v-model="adminToken"
                type="password"
                required
                class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                placeholder="Enter your admin token"
              />
            </div>
            <button
              type="submit"
              :disabled="isLoggingIn"
              class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl text-lg"
            >
              {{ isLoggingIn ? 'Authenticating...' : 'Access Dashboard' }}
            </button>
          </form>

          <div v-if="loginError" class="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
            <div class="flex items-center">
              <svg
                class="w-6 h-6 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-red-800 font-medium">{{ loginError }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Dashboard -->
      <div v-else class="space-y-8">
        <!-- Enhanced Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold text-gray-600 mb-2">Total Quiz Decks</p>
                <p class="text-4xl font-bold text-gray-900">{{ decks?.length || 0 }}</p>
                <p class="text-sm text-gray-500 mt-1">Active collections</p>
              </div>
              <div
                class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold text-gray-600 mb-2">Total Questions</p>
                <p class="text-4xl font-bold text-gray-900">{{ totalQuestions }}</p>
                <p class="text-sm text-gray-500 mt-1">Available content</p>
              </div>
              <div
                class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold text-gray-600 mb-2">Quiz Attempts</p>
                <p class="text-4xl font-bold text-gray-900">{{ leaderboard?.length || 0 }}</p>
                <p class="text-sm text-gray-500 mt-1">User submissions</p>
              </div>
              <div
                class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
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
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Tabs -->
        <div
          class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
        >
          <div class="border-b border-gray-200/50">
            <nav class="flex space-x-0">
              <button
                @click="activeTab = 'decks'"
                :class="
                  activeTab === 'decks'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                "
                class="flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 border-b-4 border-transparent"
              >
                <svg
                  class="w-5 h-5 inline mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Deck Management
              </button>
              <button
                @click="activeTab = 'questions'"
                :class="
                  activeTab === 'questions'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                "
                class="flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 border-b-4 border-transparent"
              >
                <svg
                  class="w-5 h-5 inline mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Question Builder
              </button>
            </nav>
          </div>

          <!-- Enhanced Deck Management Tab -->
          <div v-if="activeTab === 'decks'" class="p-8">
            <div class="flex justify-between items-center mb-8">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Quiz Deck Collection</h3>
                <p class="text-gray-600">Manage your quiz decks and organize questions</p>
              </div>
              <button
                @click="showCreateDeck = true"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Deck
              </button>
            </div>

            <div v-if="isLoadingDecks" class="space-y-6">
              <div
                v-for="i in 3"
                :key="i"
                class="animate-pulse bg-gray-200/50 rounded-2xl h-32"
              ></div>
            </div>

            <div
              v-else-if="decks && decks.length > 0"
              class="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div
                v-for="deck in decks"
                :key="deck.id"
                class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 hover:shadow-xl transition-all duration-300 border border-gray-200/50 transform hover:scale-[1.02]"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <h4 class="text-xl font-bold text-gray-900 mb-2">{{ deck.title }}</h4>
                    <p class="text-gray-600 mb-4 leading-relaxed">{{ deck.description }}</p>
                    <div class="flex items-center space-x-4">
                      <span
                        class="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-medium px-4 py-2 rounded-xl"
                      >
                        <svg
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {{ deck.questionCount }} questions
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200/50">
                  <button
                    @click="viewDeckQuestions(deck)"
                    class="inline-flex items-center px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 font-medium"
                    title="View Questions"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </button>
                  <button
                    @click="editDeck(deck)"
                    class="inline-flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-200 font-medium"
                    title="Edit Deck"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="deleteDeck(deck.id)"
                    class="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                    title="Delete Deck"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-16">
              <div
                class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-12 h-12 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">No Quiz Decks Yet</h3>
              <p class="text-gray-600 mb-6 max-w-md mx-auto">
                Create your first quiz deck to start building engaging content for your users.
              </p>
              <button
                @click="showCreateDeck = true"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Your First Deck
              </button>
            </div>
          </div>

          <!-- Enhanced Question Management Tab -->
          <div v-if="activeTab === 'questions'" class="p-8">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Question Builder</h3>
              <p class="text-gray-600">Create engaging quiz questions for your decks</p>
            </div>

            <form @submit.prevent="handleAddQuestion" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Deck</label>
                <select
                  v-model="newQuestion.deckId"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Choose a deck...</option>
                  <option
                    v-for="deck in decks"
                    :key="(deck as any)._id || deck.id"
                    :value="(deck as any)._id || deck.id"
                  >
                    {{ deck.title }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  v-model="newQuestion.question"
                  required
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Enter your question here..."
                ></textarea>
              </div>

              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Answer Options</label>
                <div
                  v-for="(_, index) in newQuestion.options"
                  :key="index"
                  class="flex items-center space-x-3"
                >
                  <div class="flex-1">
                    <input
                      v-model="newQuestion.options[index]"
                      :placeholder="`Option ${index + 1}`"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div class="flex items-center">
                    <input
                      v-model="newQuestion.correctAnswer"
                      :value="index"
                      type="radio"
                      :name="`correct-${Date.now()}`"
                      class="w-4 h-4 text-red-600 focus:ring-red-500"
                      required
                    />
                    <label class="ml-2 text-sm text-gray-600">Correct</label>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Deck Modal -->
    <div
      v-if="showCreateDeck"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showCreateDeck = false"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Create New Deck</h3>
          <button
            @click="showCreateDeck = false"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleCreateDeck" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="newDeck.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter deck title..."
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="newDeck.description"
              required
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Enter deck description..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="showCreateDeck = false"
              class="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="createDeckMutation.isPending.value"
              class="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ createDeckMutation.isPending.value ? 'Creating...' : 'Create Deck' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Deck Modal -->
    <div
      v-if="showEditDeck"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showEditDeck = false"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Edit Deck</h3>
          <button
            @click="showEditDeck = false"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleUpdateDeck" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="editDeckForm.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter deck title..."
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="editDeckForm.description"
              required
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Enter deck description..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="showEditDeck = false"
              class="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="updateDeckMutation.isPending.value"
              class="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ updateDeckMutation.isPending.value ? 'Updating...' : 'Update Deck' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Questions Management Modal -->
    <div
      v-if="editingQuestions"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="editingQuestions = false"
    >
      <div
        class="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Manage Questions</h3>
            <p class="text-sm text-gray-600">{{ selectedDeckForQuestions?.title }}</p>
          </div>
          <button
            @click="editingQuestions = false"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div v-if="selectedDeckForQuestions?.questions?.length > 0" class="space-y-4">
          <div
            v-for="(question, index) in selectedDeckForQuestions.questions"
            :key="index"
            class="bg-gray-50 rounded-xl p-4 border border-gray-200"
          >
            <!-- Edit Mode -->
            <div v-if="editingQuestionIndex === index" class="space-y-4">
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-medium text-gray-900">Edit Question {{ index + 1 }}</h4>
                <div class="flex space-x-2">
                  <button
                    @click="handleUpdateQuestion"
                    :disabled="updateQuestionMutation.isPending.value"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200 disabled:opacity-50"
                  >
                    {{ updateQuestionMutation.isPending.value ? 'Saving...' : 'Save' }}
                  </button>
                  <button
                    @click="cancelEditQuestion"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  v-model="editQuestionForm.question"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter question..."
                ></textarea>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Answer Options</label>
                <div
                  v-for="(_, optionIndex) in editQuestionForm.options"
                  :key="optionIndex"
                  class="flex items-center space-x-3"
                >
                  <div class="flex-1">
                    <input
                      v-model="editQuestionForm.options[optionIndex]"
                      :placeholder="`Option ${String.fromCharCode(65 + optionIndex)}`"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div class="flex items-center">
                    <input
                      v-model="editQuestionForm.correctAnswer"
                      :value="optionIndex"
                      type="radio"
                      :name="`correct-edit-${index}`"
                      class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label class="ml-2 text-sm text-gray-600">Correct</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- View Mode -->
            <div v-else>
              <div class="flex justify-between items-start mb-3">
                <h4 class="font-medium text-gray-900 flex-1">
                  {{ index + 1 }}. {{ question.question }}
                </h4>
                <div class="flex space-x-1">
                  <button
                    @click="editQuestion(question, index)"
                    class="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    title="Edit Question"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="removeQuestion(index)"
                    class="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    title="Remove Question"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  v-for="(option, optionIndex) in question.options"
                  :key="optionIndex"
                  :class="[
                    'p-2 rounded-lg text-sm',
                    question.correctAnswer === optionIndex
                      ? 'bg-green-100 border border-green-300 text-green-800 font-medium'
                      : 'bg-white border border-gray-200 text-gray-700',
                  ]"
                >
                  {{ String.fromCharCode(65 + optionIndex) }}. {{ option }}
                  <span v-if="question.correctAnswer === optionIndex" class="ml-2 text-green-600"
                    >✓</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <div
            class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No questions yet</h3>
          <p class="text-gray-600 mb-4">
            Add questions to this deck using the "Add Questions" tab.
          </p>
        </div>

        <div class="flex justify-end pt-4">
          <button
            @click="editingQuestions = false"
            class="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDecks } from '@/composables/useDecks'
import { useLeaderboard } from '@/composables/useLeaderboard'
import { useAdmin } from '@/composables/useAdmin'
import { api } from '@/lib/axios'

// Admin authentication
const isAuthenticated = ref(false)
const adminToken = ref('')
const loginError = ref('')
const isLoggingIn = ref(false)

// UI state
const activeTab = ref<'decks' | 'questions'>('decks')
const showCreateDeck = ref(false)
const showEditDeck = ref(false)
const editingDeck = ref<any>(null)
const editingQuestions = ref(false)
const selectedDeckForQuestions = ref<any>(null)
const editingQuestion = ref<any>(null)
const editingQuestionIndex = ref(-1)

// Data
const { decks, isLoading: isLoadingDecks, refetch: refetchDecks } = useDecks()
const { leaderboard } = useLeaderboard()

// Admin composables
const {
  setAdminToken,
  useAddQuestion,
  useDeleteDeck,
  useCreateDeck,
  useUpdateDeck,
  useUpdateQuestion,
  useRemoveQuestion,
  getDeckDetails,
} = useAdmin()

const addQuestionMutation = useAddQuestion()
const deleteDeckMutation = useDeleteDeck()
const createDeckMutation = useCreateDeck()
const updateDeckMutation = useUpdateDeck()
const updateQuestionMutation = useUpdateQuestion()
const removeQuestionMutation = useRemoveQuestion()

// New question form
const newQuestion = ref({
  deckId: '',
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
})

// New deck form
const newDeck = ref({
  title: '',
  description: '',
})

// Edit deck form
const editDeckForm = ref({
  title: '',
  description: '',
})

// Edit question form
const editQuestionForm = ref({
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
})

// Computed
const totalQuestions = computed(() => {
  return decks.value?.reduce((total, deck) => total + deck.questionCount, 0) || 0
})

// Methods
const handleLogin = async () => {
  if (!adminToken.value.trim()) {
    loginError.value = 'Please enter an admin token'
    return
  }

  isLoggingIn.value = true
  loginError.value = ''

  try {
    // Set the admin token for API calls
    setAdminToken(adminToken.value)

    // Test the token by making an authenticated request
    await api.get('/admin/auth')

    // If we get here, the token is valid
    isAuthenticated.value = true
    console.log('Admin login successful')
  } catch (error: any) {
    console.error('Admin login failed:', error)
    isAuthenticated.value = false

    if (error.response?.status === 401) {
      loginError.value = 'Invalid admin token'
    } else {
      loginError.value = 'Login failed. Please try again.'
    }
  } finally {
    isLoggingIn.value = false
  }
}

const resetForm = () => {
  newQuestion.value = {
    deckId: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  }
}

const resetDeckForm = () => {
  newDeck.value = {
    title: '',
    description: '',
  }
}

const handleCreateDeck = async () => {
  if (!newDeck.value.title.trim() || !newDeck.value.description.trim()) {
    alert('Please fill in both title and description.')
    return
  }

  try {
    await createDeckMutation.mutateAsync({
      title: newDeck.value.title,
      description: newDeck.value.description,
    })

    resetDeckForm()
    showCreateDeck.value = false
    alert('Deck created successfully!')
    refetchDecks()
  } catch (error: any) {
    console.error('Failed to create deck:', error)
    alert(
      `Failed to create deck: ${error.response?.data?.message || error.message || 'Unknown error'}`
    )
  }
}

const handleAddQuestion = async () => {
  if (
    !newQuestion.value.deckId ||
    !newQuestion.value.question.trim() ||
    newQuestion.value.options.some((opt) => !opt.trim()) ||
    newQuestion.value.correctAnswer === undefined
  ) {
    alert('Please fill in all fields before submitting.')
    return
  }

  try {
    await addQuestionMutation.mutateAsync({
      deckId: newQuestion.value.deckId,
      question: newQuestion.value.question,
      options: newQuestion.value.options,
      correctAnswer: newQuestion.value.correctAnswer,
    })

    resetForm()
    alert('Question added successfully!')
    refetchDecks()
  } catch (error: any) {
    console.error('Failed to add question:', error)
    alert(
      `Failed to add question: ${error.response?.data?.message || error.message || 'Unknown error'}`
    )
  }
}

const editDeck = (deck: any) => {
  editingDeck.value = deck
  editDeckForm.value = {
    title: deck.title,
    description: deck.description,
  }
  showEditDeck.value = true
}

const handleUpdateDeck = async () => {
  if (!editDeckForm.value.title.trim() || !editDeckForm.value.description.trim()) {
    alert('Please fill in both title and description.')
    return
  }

  try {
    await updateDeckMutation.mutateAsync({
      id: editingDeck.value.id || editingDeck.value._id,
      title: editDeckForm.value.title,
      description: editDeckForm.value.description,
    })

    showEditDeck.value = false
    editingDeck.value = null
    alert('Deck updated successfully!')
    refetchDecks()
  } catch (error: any) {
    console.error('Failed to update deck:', error)
    alert(
      `Failed to update deck: ${error.response?.data?.message || error.message || 'Unknown error'}`
    )
  }
}

const viewDeckQuestions = async (deck: any) => {
  try {
    // Get fresh deck data with questions
    const detailedDeck = await getDeckDetails(deck.id || deck._id)

    selectedDeckForQuestions.value = detailedDeck
    editingQuestions.value = true
  } catch (error: any) {
    console.error('Failed to load deck questions:', error)
    alert(
      `Failed to load deck questions: ${error.response?.data?.message || error.message || 'Unknown error'}`
    )
  }
}

const editQuestion = (question: any, index: number) => {
  editingQuestion.value = question
  editingQuestionIndex.value = index
  editQuestionForm.value = {
    question: question.question,
    options: [...question.options],
    correctAnswer: question.correctAnswer,
  }
}

const handleUpdateQuestion = async () => {
  if (
    !editQuestionForm.value.question.trim() ||
    editQuestionForm.value.options.some((opt) => !opt.trim()) ||
    editQuestionForm.value.correctAnswer === undefined
  ) {
    alert('Please fill in all fields before updating.')
    return
  }

  try {
    await updateQuestionMutation.mutateAsync({
      deckId: selectedDeckForQuestions.value.id || selectedDeckForQuestions.value._id,
      questionIndex: editingQuestionIndex.value,
      question: editQuestionForm.value.question,
      options: editQuestionForm.value.options,
      correctAnswer: editQuestionForm.value.correctAnswer,
    })

    // Refresh the selected deck data
    const updatedDeck = await getDeckDetails(
      selectedDeckForQuestions.value.id || selectedDeckForQuestions.value._id
    )
    selectedDeckForQuestions.value = updatedDeck

    // Reset edit state
    editingQuestion.value = null
    editingQuestionIndex.value = -1

    alert('Question updated successfully!')
    refetchDecks()
  } catch (error: any) {
    console.error('Failed to update question:', error)
    alert(
      `Failed to update question: ${error.response?.data?.message || error.message || 'Unknown error'}`
    )
  }
}

const cancelEditQuestion = () => {
  editingQuestion.value = null
  editingQuestionIndex.value = -1
  editQuestionForm.value = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  }
}

const removeQuestion = async (questionIndex: number) => {
  if (confirm('Are you sure you want to remove this question?')) {
    try {
      await removeQuestionMutation.mutateAsync({
        deckId: selectedDeckForQuestions.value.id || selectedDeckForQuestions.value._id,
        questionIndex,
      })

      // Refresh the selected deck data
      const updatedDeck = await getDeckDetails(
        selectedDeckForQuestions.value.id || selectedDeckForQuestions.value._id
      )
      selectedDeckForQuestions.value = updatedDeck

      alert('Question removed successfully!')
      refetchDecks()
    } catch (error: any) {
      console.error('Failed to remove question:', error)
      alert(
        `Failed to remove question: ${error.response?.data?.message || error.message || 'Unknown error'}`
      )
    }
  }
}

const deleteDeck = async (deckId: string) => {
  if (confirm('Are you sure you want to delete this deck? This action cannot be undone.')) {
    try {
      await deleteDeckMutation.mutateAsync(deckId)
      // Show success message (you can add a toast notification here)
    } catch (error) {
      console.error('Failed to delete deck:', error)
      // Show error message (you can add a toast notification here)
    }
  }
}

onMounted(() => {
  // Auto-login for development (remove in production)
  if (process.env.NODE_ENV === 'development') {
    // isAuthenticated.value = true
  }
})
</script>
