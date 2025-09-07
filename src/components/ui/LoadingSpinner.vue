<template>
  <div class="flex items-center justify-center" :class="containerClasses">
    <div class="animate-spin rounded-full border-solid" :class="spinnerClasses">
      <div class="sr-only">Loading...</div>
    </div>
    <span v-if="text" class="ml-3 text-gray-600" :class="textClasses">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  center?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  text: '',
  center: false,
})

const containerClasses = computed(() => ({
  'min-h-[200px]': props.center,
}))

const spinnerClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4 border-2 border-gray-300 border-t-blue-600',
    md: 'h-6 w-6 border-2 border-gray-300 border-t-blue-600',
    lg: 'h-8 w-8 border-3 border-gray-300 border-t-blue-600',
    xl: 'h-12 w-12 border-4 border-gray-300 border-t-blue-600',
  }
  return sizes[props.size]
})

const textClasses = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  return sizes[props.size]
})
</script>
