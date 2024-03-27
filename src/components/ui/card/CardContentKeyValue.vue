<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  cKey?: string
  value?: string | number[] | number
}>()
</script>

<template>
  <div :class="cn('flex gap-2 mb-2', props.class)">    
    <div class="text-gray-500 text-sm">{{ cKey }}:</div>
    <div class="text-sm">{{ value }}</div>
  </div>
</template>
