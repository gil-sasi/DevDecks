<template>
  <div
    class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 transition-all duration-300"
    :class="[
      {
        'hover:shadow-2xl hover:scale-[1.02]': hoverable,
        'p-4': size === 'sm',
        'p-6': size === 'md',
        'p-8': size === 'lg',
      },
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

withDefaults(defineProps<Props>(), {
  hoverable: false,
  size: 'md',
  className: '',
})
</script>
