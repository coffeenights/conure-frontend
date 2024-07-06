<script setup lang="ts">
import { ref, watch } from 'vue'
import { ZodIssue } from 'zod'

const props = defineProps({
  errors: {
    type: Object as () => ZodIssue[],
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
})

const message = ref('')
watch(
  () => props.errors,
  () => {
    message.value = ' '
    for (const e of props.errors) {
      if (e.path.join('.') === props.path) {
        message.value = e.message
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <p class="text-sm font-medium text-destructive">
    {{ message }}
  </p>
</template>
