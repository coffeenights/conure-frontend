<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{
  class?: string
  status: string
  text?: string
}>()

const color = () => {
  switch (props.status) {
    case 'active':
      return 'text-lime-600'
    case 'disabled':
      return 'text-gray-400'
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'progressing':
      return 'text-orange-600'
  }
}
</script>

<template>
  <div :class="cn('flex items-center', props.class)">
    <div :class="color()">
      <span class="text-xs bi-circle-fill pr-2"></span>
    </div>
    <div class="text-xs">{{ props.text }}</div>
  </div>
</template>
