<script setup lang="ts">
import { cn } from '@/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  title: string
  class?: string
  button?: boolean
  buttonLabel?: string
  buttonIcon?: string
}>()

const emit = defineEmits(['buttonClick'])
</script>

<template>
  <div :class="cn('py-3 border-b flex items-baseline', props.class)">
    <div class="text-lg grow">{{ title }}</div>
    <Button
      v-if="button"
      class="text-sm"
      variant="default"
      size="sm"
      @click="emit('buttonClick')"
    >
      <span v-if="buttonIcon != ''" :class="buttonIcon" class="text-lg"></span>
      {{ buttonLabel }}
    </Button>
  </div>
</template>
