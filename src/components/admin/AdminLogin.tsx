import React, { useState } from 'react'
import BaseCard from '@/components/ui/BaseCard'
import BaseInput from '@/components/ui/BaseInput'
import BaseButton from '@/components/ui/BaseButton'

interface AdminLoginProps {
  loading?: boolean
  error?: string
  onLogin: (token: string) => void
}

const AdminLogin: React.FC<AdminLoginProps> = ({ loading = false, error = '', onLogin }) => {
  const [token, setToken] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.trim()) {
      onLogin(token.trim())
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <BaseCard size="lg">
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

        <form onSubmit={handleSubmit} className="space-y-7">
          <BaseInput
            value={token}
            onChange={(e) => setToken(e.target.value)}
            type="password"
            label="Administrative Token"
            placeholder="Enter your admin token"
            required
            size="lg"
            error={error}
          />

          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
            loadingText="Authenticating..."
          >
            Access Dashboard
          </BaseButton>
        </form>
      </BaseCard>
    </div>
  )
}

export default AdminLogin
