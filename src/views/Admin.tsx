import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDecks } from '@/composables/useDecks'
import { useLeaderboard } from '@/composables/useLeaderboard'
import { useAdmin } from '@/composables/useAdmin'
import { api } from '@/lib/axios'
import Footer from '@/components/layout/Footer'

const Admin: React.FC = () => {
  // Admin authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminToken, setAdminToken] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // UI state
  const [activeTab, setActiveTab] = useState<'decks' | 'questions'>('decks')
  const [showCreateDeck, setShowCreateDeck] = useState(false)
  const [showEditDeck, setShowEditDeck] = useState(false)
  const [editingDeck, setEditingDeck] = useState<any>(null)

  // Data
  const { decks, isLoading: isLoadingDecks, refetch: refetchDecks } = useDecks()
  const { leaderboard } = useLeaderboard()

  // Admin composables
  const {
    setAdminToken: setAdminTokenFn,
    useAddQuestion,
    useDeleteDeck,
    useCreateDeck,
    useUpdateDeck,
  } = useAdmin()

  const addQuestionMutation = useAddQuestion()
  const deleteDeckMutation = useDeleteDeck()
  const createDeckMutation = useCreateDeck()
  const updateDeckMutation = useUpdateDeck()

  // Forms
  const [newDeck, setNewDeck] = useState({ title: '', description: '' })
  const [editDeckForm, setEditDeckForm] = useState({ title: '', description: '' })
  const [newQuestion, setNewQuestion] = useState({
    deckId: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  })

  // Computed
  const totalQuestions = useMemo(() => {
    return decks?.reduce((total, deck) => total + deck.questionCount, 0) || 0
  }, [decks])

  // Methods
  const handleLogin = async () => {
    if (!adminToken.trim()) {
      setLoginError('Please enter an admin token')
      return
    }

    setIsLoggingIn(true)
    setLoginError('')

    try {
      setAdminTokenFn(adminToken)
      await api.get('/admin/auth')
      setIsAuthenticated(true)
    } catch (error: any) {
      setIsAuthenticated(false)
      if (error.response?.status === 401) {
        setLoginError('Invalid admin token')
      } else {
        setLoginError('Login failed. Please try again.')
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleCreateDeck = async () => {
    if (!newDeck.title.trim() || !newDeck.description.trim()) {
      alert('Please fill in both title and description.')
      return
    }

    try {
      await createDeckMutation.mutateAsync(newDeck)
      setNewDeck({ title: '', description: '' })
      setShowCreateDeck(false)
      alert('Deck created successfully!')
      refetchDecks()
    } catch (error: any) {
      alert(`Failed to create deck: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleAddQuestion = async () => {
    if (
      !newQuestion.deckId ||
      !newQuestion.question.trim() ||
      newQuestion.options.some((opt) => !opt.trim()) ||
      newQuestion.correctAnswer === undefined
    ) {
      alert('Please fill in all fields before submitting.')
      return
    }

    try {
      await addQuestionMutation.mutateAsync(newQuestion)
      setNewQuestion({
        deckId: '',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      })
      alert('Question added successfully!')
      refetchDecks()
    } catch (error: any) {
      alert(`Failed to add question: ${error.response?.data?.message || error.message}`)
    }
  }

  const editDeck = (deck: any) => {
    setEditingDeck(deck)
    setEditDeckForm({
      title: deck.title,
      description: deck.description,
    })
    setShowEditDeck(true)
  }

  const handleUpdateDeck = async () => {
    if (!editDeckForm.title.trim() || !editDeckForm.description.trim()) {
      alert('Please fill in both title and description.')
      return
    }

    try {
      await updateDeckMutation.mutateAsync({
        id: editingDeck.id || editingDeck._id,
        ...editDeckForm,
      })
      setShowEditDeck(false)
      setEditingDeck(null)
      alert('Deck updated successfully!')
      refetchDecks()
    } catch (error: any) {
      alert(`Failed to update deck: ${error.response?.data?.message || error.message}`)
    }
  }

  const deleteDeck = async (deckId: string) => {
    if (confirm('Are you sure you want to delete this deck?')) {
      try {
        await deleteDeckMutation.mutateAsync(deckId)
        alert('Deck deleted successfully!')
        refetchDecks()
      } catch (error: any) {
        alert(`Failed to delete deck: ${error.response?.data?.message || error.message}`)
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    Quiz Management & Content Control
                  </p>
                </div>
              </div>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to App
              </Link>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex-1 max-w-lg mx-auto px-4 py-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Secure Access</h2>
              <p className="text-gray-600 text-lg">
                Enter your administrative credentials to access the quiz management dashboard
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
              }}
              className="space-y-7"
            >
              <div>
                <label htmlFor="token" className="block text-base font-semibold text-gray-800 mb-3">
                  Administrative Token
                </label>
                <input
                  id="token"
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                  placeholder="Enter your admin token"
                />
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl text-lg"
              >
                {isLoggingIn ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>

            {loginError && (
              <div className="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-red-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-800 font-medium">{loginError}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Quiz Management & Content Control
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to App
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">Total Quiz Decks</p>
                <p className="text-4xl font-bold text-gray-900">{decks?.length || 0}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">Total Questions</p>
                <p className="text-4xl font-bold text-gray-900">{totalQuestions}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">Quiz Attempts</p>
                <p className="text-4xl font-bold text-gray-900">{leaderboard?.length || 0}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          <div className="border-b border-gray-200/50">
            <nav className="flex space-x-0">
              <button
                onClick={() => setActiveTab('decks')}
                className={`flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 border-b-4 border-transparent ${
                  activeTab === 'decks'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <svg
                  className="w-5 h-5 inline mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Deck Management
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 border-b-4 border-transparent ${
                  activeTab === 'questions'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <svg
                  className="w-5 h-5 inline mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Question Builder
              </button>
            </nav>
          </div>

          {/* Deck Management Tab */}
          {activeTab === 'decks' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Deck Collection</h3>
                  <p className="text-gray-600">Manage your quiz decks and organize questions</p>
                </div>
                <button
                  onClick={() => setShowCreateDeck(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create New Deck
                </button>
              </div>

              {isLoadingDecks ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-200/50 rounded-2xl h-32"></div>
                  ))}
                </div>
              ) : decks && decks.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {decks.map((deck) => (
                    <div
                      key={deck.id}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 hover:shadow-xl transition-all duration-300 border border-gray-200/50 transform hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{deck.title}</h4>
                          <p className="text-gray-600 mb-4 leading-relaxed">{deck.description}</p>
                          <div className="flex items-center space-x-4">
                            <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-medium px-4 py-2 rounded-xl">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {deck.questionCount} questions
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200/50">
                        <button
                          onClick={() => editDeck(deck)}
                          className="inline-flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-200 font-medium"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDeck(deck.id)}
                          className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No Quiz Decks Yet</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Create your first quiz deck to start building engaging content for your users.
                  </p>
                  <button
                    onClick={() => setShowCreateDeck(true)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Your First Deck
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Question Builder Tab */}
          {activeTab === 'questions' && (
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Question Builder</h3>
                <p className="text-gray-600">Create engaging quiz questions for your decks</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddQuestion()
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Deck
                  </label>
                  <select
                    value={newQuestion.deckId}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, deckId: e.target.value }))
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose a deck...</option>
                    {decks?.map((deck) => (
                      <option key={deck.id} value={deck.id}>
                        {deck.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <textarea
                    value={newQuestion.question}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, question: e.target.value }))
                    }
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Enter your question here..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Answer Options</label>
                  {newQuestion.options.map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-1">
                        <input
                          value={newQuestion.options[index]}
                          onChange={(e) => {
                            const newOptions = [...newQuestion.options]
                            newOptions[index] = e.target.value
                            setNewQuestion((prev) => ({ ...prev, options: newOptions }))
                          }}
                          placeholder={`Option ${index + 1}`}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={newQuestion.correctAnswer === index}
                          onChange={() =>
                            setNewQuestion((prev) => ({ ...prev, correctAnswer: index }))
                          }
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                          required
                        />
                        <label className="ml-2 text-sm text-gray-600">Correct</label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      setNewQuestion({
                        deckId: '',
                        question: '',
                        options: ['', '', '', ''],
                        correctAnswer: 0,
                      })
                    }
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Add Question
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Create Deck Modal */}
      {showCreateDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create New Deck</h3>
              <button
                onClick={() => setShowCreateDeck(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateDeck()
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newDeck.title}
                  onChange={(e) => setNewDeck((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter deck title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newDeck.description}
                  onChange={(e) => setNewDeck((prev) => ({ ...prev, description: e.target.value }))}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Enter deck description..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateDeck(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createDeckMutation.isPending}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createDeckMutation.isPending ? 'Creating...' : 'Create Deck'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Deck Modal */}
      {showEditDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Deck</h3>
              <button
                onClick={() => setShowEditDeck(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdateDeck()
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editDeckForm.title}
                  onChange={(e) => setEditDeckForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter deck title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editDeckForm.description}
                  onChange={(e) =>
                    setEditDeckForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Enter deck description..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditDeck(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateDeckMutation.isPending}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateDeckMutation.isPending ? 'Updating...' : 'Update Deck'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Admin
