import { useState } from 'react'

export function useToggle(
  initialValue = false
): [boolean, (value?: boolean) => void, () => void, () => void] {
  const [state, setState] = useState(initialValue)

  const toggle = (value?: boolean) => {
    setState(value !== undefined ? value : !state)
  }

  const setTrue = () => {
    setState(true)
  }

  const setFalse = () => {
    setState(false)
  }

  return [state, toggle, setTrue, setFalse]
}
