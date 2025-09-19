import React from 'react'
import BaseCard from '@/components/ui/BaseCard'
import BaseButton from '@/components/ui/BaseButton'

interface Deck {
  id: string
  title: string
  description: string
  questionCount: number
}

interface DeckCardProps {
  deck: Deck
  onViewQuestions: () => void
  onEdit: () => void
  onDelete: () => void
}

const DeckCard: React.FC<DeckCardProps> = ({ deck, onViewQuestions, onEdit, onDelete }) => {
  return (
    <BaseCard hoverable size="md" className="group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{deck.title}</h4>
          <p className="text-gray-600 mb-4 leading-relaxed">{deck.description}</p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-medium px-4 py-2 rounded-xl">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <BaseButton variant="ghost" size="sm" onClick={onViewQuestions} title="View Questions">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </BaseButton>

        <BaseButton variant="ghost" size="sm" onClick={onEdit} title="Edit Deck">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </BaseButton>

        <BaseButton
          variant="ghost"
          size="sm"
          onClick={onDelete}
          title="Delete Deck"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </BaseButton>
      </div>
    </BaseCard>
  )
}

export default DeckCard
