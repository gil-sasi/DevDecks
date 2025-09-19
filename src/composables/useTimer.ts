import { useState, useEffect, useMemo, useRef } from 'react'

export function useTimer(initialTime = 0, interval = 1000) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const timerIdRef = useRef<NodeJS.Timeout | null>(null)

  const formattedTime = useMemo(() => {
    const totalSeconds = time
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [time])

  const start = () => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }

  const stop = () => {
    if (isRunning && timerIdRef.current) {
      setIsRunning(false)
      clearInterval(timerIdRef.current)
      timerIdRef.current = null
    }
  }

  const reset = (newTime = initialTime) => {
    stop()
    setTime(newTime)
  }

  const pause = () => {
    stop()
  }

  const resume = () => {
    start()
  }

  // Handle timer interval
  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + interval / 1000)
      }, interval)
    } else {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current)
        timerIdRef.current = null
      }
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [isRunning, interval])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [])

  return {
    time,
    formattedTime,
    isRunning,
    start,
    stop,
    reset,
    pause,
    resume,
  }
}
