import { reactive, computed } from 'vue'

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
  const formState = reactive({
    data: { ...initialData } as T,
    errors: {} as Record<keyof T, string>,
    isValid: true,
    isDirty: false,
  })

  const validate = (field?: keyof T): boolean => {
    if (!validationRules) return true

    const fieldsToValidate = field ? [field] : (Object.keys(validationRules) as (keyof T)[])
    let isFormValid = true

    for (const fieldName of fieldsToValidate) {
      const rules = validationRules[fieldName]
      const value = (formState.data as any)[fieldName]
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

      ;(formState.errors as any)[fieldName] = fieldError
      if (fieldError) isFormValid = false
    }

    formState.isValid = isFormValid
    return isFormValid
  }

  const reset = () => {
    // Reset data by updating each property individually
    Object.keys(initialData).forEach((key) => {
      ;(formState.data as any)[key] = initialData[key]
    })
    // Reset errors by creating a new empty object
    Object.keys(initialData).forEach((key) => {
      ;(formState.errors as any)[key] = ''
    })
    formState.isValid = true
    formState.isDirty = false
  }

  const updateField = (field: keyof T, value: T[keyof T]) => {
    ;(formState.data as any)[field] = value
    formState.isDirty = true

    // Clear error for this field when user starts typing
    if ((formState.errors as any)[field]) {
      ;(formState.errors as any)[field] = ''
    }
  }

  const getFieldError = (field: keyof T): string => {
    return (formState.errors as any)[field] || ''
  }

  const hasFieldError = (field: keyof T): boolean => {
    return !!(formState.errors as any)[field]
  }

  const isDirty = computed(() => formState.isDirty)
  const isValid = computed(() => formState.isValid)
  const data = computed(() => formState.data)
  const errors = computed(() => formState.errors)

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
