import React, { useState, useEffect } from 'react'
import BaseInput from '@/components/ui/BaseInput'
import BaseTextarea from '@/components/ui/BaseTextarea'
import BaseButton from '@/components/ui/BaseButton'

interface DeckData {
  title: string
  description: string
}

interface DeckFormProps {
  initialData?: DeckData
  loading?: boolean
  isEditing?: boolean
  onSubmit: (data: DeckData) => void
  onCancel: () => void
}

const DeckForm: React.FC<DeckFormProps> = ({
  initialData = { title: '', description: '' },
  loading = false,
  isEditing = false,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<DeckData>({
    title: initialData.title,
    description: initialData.description,
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  })

  // Update form data when initialData changes
  useEffect(() => {
    setFormData({
      title: initialData.title,
      description: initialData.description,
    })
  }, [initialData])

  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      description: '',
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return !newErrors.title && !newErrors.description
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BaseInput
        value={formData.title}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        label="Deck Title"
        placeholder="Enter deck title..."
        required
        error={errors.title}
      />

      <BaseTextarea
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        label="Description"
        placeholder="Enter deck description..."
        required
        rows={4}
        error={errors.description}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <BaseButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </BaseButton>

        <BaseButton
          type="submit"
          variant="primary"
          loading={loading}
          loadingText={isEditing ? 'Updating...' : 'Creating...'}
        >
          {isEditing ? 'Update Deck' : 'Create Deck'}
        </BaseButton>
      </div>
    </form>
  )
}

export default DeckForm
