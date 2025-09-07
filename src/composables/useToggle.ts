import { ref, Ref } from 'vue'

export function useToggle(
  initialValue = false
): [Ref<boolean>, (value?: boolean) => void, () => void, () => void] {
  const state = ref(initialValue)

  const toggle = (value?: boolean) => {
    state.value = value !== undefined ? value : !state.value
  }

  const setTrue = () => {
    state.value = true
  }

  const setFalse = () => {
    state.value = false
  }

  return [state, toggle, setTrue, setFalse]
}
