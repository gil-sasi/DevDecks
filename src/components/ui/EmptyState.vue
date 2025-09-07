<template>
  <BaseCard class="text-center" :size="size">
    <div class="py-8">
      <div
        class="rounded-full flex items-center justify-center mx-auto mb-6"
        :class="iconContainerClasses"
      >
        <slot name="icon">
          <svg
            class="text-gray-400"
            :class="iconClasses"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </slot>
      </div>
      
      <h3 class="font-bold text-gray-900 mb-3" :class="titleClasses">
        {{ title }}
      </h3>
      
      <p class="text-gray-600 mb-6 max-w-md mx-auto" :class="descriptionClasses">
        {{ description }}
      </p>
      
      <slot name="action" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from './BaseCard.vue'

interface Props {
  title: string
  description: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const iconContainerClasses = computed(() => {
  const sizes = {
    sm: 'w-12 h-12 bg-gray-100',
    md: 'w-16 h-16 bg-gray-100',
    lg: 'w-20 h-20 bg-gradient-to-r from-gray-100 to-blue-100',
  }
  return sizes[props.size]
})

const iconClasses = computed(() => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }
  return sizes[props.size]
})

const titleClasses = computed(() => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }
  return sizes[props.size]
})

const descriptionClasses = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }
  return sizes[props.size]
})
</script>
