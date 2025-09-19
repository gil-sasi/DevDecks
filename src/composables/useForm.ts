import { useState, useMemo } from 'react'

type ValidationRule<T> = {
  [K in keyof T]?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: T[K]) => string | null
  }[]
}

export function useForm<T extends Record<string, any>>(
  initialData: T,
  validationRules?: ValidationRule<T>
) {
  const [data, setData] = useState<T>({ ...initialData })
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>)
  const [isValid, setIsValid] = useState(true)
  const [isDirty, setIsDirty] = useState(false)

  const validate = (field?: keyof T): boolean => {
    if (!validationRules) return true

    const fieldsToValidate = field ? [field] : (Object.keys(validationRules) as (keyof T)[])
    let isFormValid = true

    const newErrors = { ...errors }

    for (const fieldName of fieldsToValidate) {
      const rules = validationRules[fieldName]
      const value = (data as any)[fieldName]
      let fieldError = ''

      if (rules) {
        for (const rule of rules) {
          if (rule.required && (!value || String(value).trim() === '')) {
            fieldError = `${String(fieldName)} is required`
            break
          }

          if (rule.minLength && String(value).length < rule.minLength) {
            fieldError = `${String(fieldName)} must be at least ${rule.minLength} characters`
            break
          }

          if (rule.maxLength && String(value).length > rule.maxLength) {
            fieldError = `${String(fieldName)} must be no more than ${rule.maxLength} characters`
            break
          }

          if (rule.pattern && !rule.pattern.test(String(value))) {
            fieldError = `${String(fieldName)} format is invalid`
            break
          }

          if (rule.custom) {
            const customError = rule.custom(value)
            if (customError) {
              fieldError = customError
              break
            }
          }
        }
      }

      ;(newErrors as any)[fieldName] = fieldError
      if (fieldError) isFormValid = false
    }

    setErrors(newErrors)
    setIsValid(isFormValid)
    return isFormValid
  }

  const reset = () => {
    setData({ ...initialData })
    setErrors({} as Record<keyof T, string>)
    setIsValid(true)
    setIsDirty(false)
  }

  const updateField = (field: keyof T, value: T[keyof T]) => {
    setData((prevData) => ({ ...prevData, [field]: value }))
    setIsDirty(true)

    // Clear error for this field when user starts typing
    if ((errors as any)[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }))
    }
  }

  const getFieldError = (field: keyof T): string => {
    return (errors as any)[field] || ''
  }

  const hasFieldError = (field: keyof T): boolean => {
    return !!(errors as any)[field]
  }

  return {
    data,
    errors,
    isDirty,
    isValid,
    validate,
    reset,
    updateField,
    getFieldError,
    hasFieldError,
  }
}
