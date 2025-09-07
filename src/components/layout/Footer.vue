<template>
  <footer class="mt-auto pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center text-gray-500 text-sm">
        <p>&copy; {{ currentYear }} All Rights Reserved to Gil Sasi</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
