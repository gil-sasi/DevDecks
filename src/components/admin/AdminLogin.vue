<template>
  <div class="max-w-lg mx-auto">
    <BaseCard size="lg">
      <div class="text-center mb-8">
        <div
          class="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Secure Access</h2>
        <p class="text-gray-600 text-lg">
          Enter your administrative credentials to access the quiz management dashboard
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-7">
        <BaseInput
          v-model="token"
          type="password"
          label="Administrative Token"
          placeholder="Enter your admin token"
          required
          size="lg"
          :error="error"
        />

        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
          class="w-full"
          :loading="loading"
          loading-text="Authenticating..."
        >
          Access Dashboard
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  loading?: boolean
  error?: string
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: '',
})

const emit = defineEmits<{
  login: [token: string]
}>()

const token = ref('')

const handleSubmit = () => {
  if (token.value.trim()) {
    emit('login', token.value.trim())
  }
}
</script>
