<template>
  <BaseCard class="text-center" :size="size">
    <div class="py-8">
      <div
        class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title }}
      </h3>
      
      <p class="text-red-700 mb-6">
        {{ message }}
      </p>
      
      <BaseButton
        v-if="showRetry"
        variant="danger"
        @click="$emit('retry')"
      >
        <template #icon>
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </template>
        Try Again
      </BaseButton>
      
      <slot name="action" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  message: string
  showRetry?: boolean
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  showRetry: true,
  size: 'md',
})

defineEmits<{
  retry: []
}>()
</script>
