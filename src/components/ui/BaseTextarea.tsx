import React from 'react'

interface BaseTextareaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label?: string
  placeholder?: string
  id?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  rows?: number
  size?: 'sm' | 'md' | 'lg'
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const BaseTextarea: React.FC<BaseTextareaProps> = ({
  value,
  onChange,
  label = '',
  placeholder = '',
  id = '',
  disabled = false,
  required = false,
  error = '',
  hint = '',
  rows = 4,
  size = 'md',
  onBlur,
  onFocus,
}) => {
  const getTextareaClasses = () => {
    const base =
      'w-full border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-vertical'

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    const states = error
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'

    const disabledClass = disabled
      ? 'bg-gray-50 cursor-not-allowed opacity-60'
      : 'bg-white hover:border-gray-400'

    return `${base} ${sizes[size]} ${states} ${disabledClass}`
  }

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={getTextareaClasses()}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && hint && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  )
}

export default BaseTextarea
