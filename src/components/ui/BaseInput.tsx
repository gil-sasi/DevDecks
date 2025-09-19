import React from 'react'

interface BaseInputProps {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  id?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  suffix?: React.ReactNode
}

const BaseInput: React.FC<BaseInputProps> = ({
  value,
  onChange,
  type = 'text',
  label = '',
  placeholder = '',
  id = '',
  disabled = false,
  required = false,
  error = '',
  hint = '',
  size = 'md',
  onBlur,
  onFocus,
  suffix,
}) => {
  const getInputClasses = () => {
    const base =
      'w-full border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200'

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

      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && hint && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  )
}

export default BaseInput
