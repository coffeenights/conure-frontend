<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  cKey?: string
  value?: string | number[] | number | boolean
  isLoading?: boolean
}>()
</script>

<template>
  <div v-if="!isLoading" :class="cn('block', props.class)">
    <div class="text-muted-foreground text-sm">{{ cKey }}:</div>
    <div class="text-lg">{{ value }}</div>
  </div>
  <div v-else :class="cn('block', props.class)">
    <Skeleton class="h-3 w-1/2 mb-4" />
    <Skeleton class="h-5 w-25" />
  </div>
</template>
