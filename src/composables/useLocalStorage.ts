import { ref, watch, Ref } from 'vue'

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
): [Ref<T>, (value: T) => void, () => void] {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue !== null ? serializer.read(storedValue) : defaultValue

  const state = ref<T>(initialValue) as Ref<T>

  const setState = (value: T) => {
    try {
      state.value = value
      localStorage.setItem(key, serializer.write(value))
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  }

  const removeState = () => {
    try {
      localStorage.removeItem(key)
      state.value = defaultValue
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Watch for changes and update localStorage
  watch(
    state,
    (newValue) => {
      try {
        localStorage.setItem(key, serializer.write(newValue))
      } catch (error) {
        console.error(`Error updating localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return [state, setState, removeState]
}
