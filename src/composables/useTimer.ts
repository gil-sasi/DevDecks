import { ref, computed, onUnmounted } from 'vue'

export function useTimer(initialTime = 0, interval = 1000) {
  const time = ref(initialTime)
  const isRunning = ref(false)
  let timerId: NodeJS.Timeout | null = null

  const formattedTime = computed(() => {
    const totalSeconds = time.value
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const start = () => {
    if (!isRunning.value) {
      isRunning.value = true
      timerId = setInterval(() => {
        time.value += interval / 1000
      }, interval)
    }
  }

  const stop = () => {
    if (isRunning.value && timerId) {
      isRunning.value = false
      clearInterval(timerId)
      timerId = null
    }
  }

  const reset = (newTime = initialTime) => {
    stop()
    time.value = newTime
  }

  const pause = () => {
    stop()
  }

  const resume = () => {
    start()
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stop()
  })

  return {
    time: computed(() => time.value),
    formattedTime,
    isRunning: computed(() => isRunning.value),
    start,
    stop,
    reset,
    pause,
    resume,
  }
}
