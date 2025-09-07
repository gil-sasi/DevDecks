<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <BaseInput
      v-model="formData.title"
      label="Deck Title"
      placeholder="Enter deck title..."
      required
      :error="errors.title"
    />

    <BaseTextarea
      v-model="formData.description"
      label="Description"
      placeholder="Enter deck description..."
      required
      :rows="4"
      :error="errors.description"
    />

    <div class="flex justify-end space-x-3 pt-4">
      <BaseButton
        type="button"
        variant="secondary"
        @click="$emit('cancel')"
      >
        Cancel
      </BaseButton>
      
      <BaseButton
        type="submit"
        variant="primary"
        :loading="loading"
        :loading-text="isEditing ? 'Updating...' : 'Creating...'"
      >
        {{ isEditing ? 'Update Deck' : 'Create Deck' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface DeckData {
  title: string
  description: string
}

interface Props {
  initialData?: DeckData
  loading?: boolean
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ title: '', description: '' }),
  loading: false,
  isEditing: false,
})

const emit = defineEmits<{
  submit: [data: DeckData]
  cancel: []
}>()

const formData = reactive<DeckData>({
  title: props.initialData.title,
  description: props.initialData.description,
})

const errors = reactive({
  title: '',
  description: '',
})

// Watch for prop changes to update form data
watch(() => props.initialData, (newData) => {
  formData.title = newData.title
  formData.description = newData.description
}, { deep: true })

const validateForm = (): boolean => {
  errors.title = ''
  errors.description = ''

  if (!formData.title.trim()) {
    errors.title = 'Title is required'
  }

  if (!formData.description.trim()) {
    errors.description = 'Description is required'
  }

  return !errors.title && !errors.description
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData })
  }
}
</script>
