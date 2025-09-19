import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer = {
    read: (value: string): T => {
      try {
        return JSON.parse(value)
      } catch {
        return defaultValue
      }
    },
    write: (value: T): string => JSON.stringify(value),
  }
): [T, (value: T) => void, () => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue !== null ? serializer.read(storedValue) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setValue = (value: T) => {
    try {
      setState(value)
      localStorage.setItem(key, serializer.write(value))
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      localStorage.removeItem(key)
      setState(defaultValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, serializer.write(state))
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error)
    }
  }, [key, state, serializer])

  return [state, setValue, removeValue]
}
