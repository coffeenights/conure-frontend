<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  cKey?: string
  value?: string | number[] | number
  isLoading?: boolean
}>()
</script>

<template>
  <div :class="cn('flex gap-2 mb-2', props.class)"  v-if="!isLoading">    
    <div class="text-gray-500 text-sm">{{ cKey }}:</div>
    <div class="text-sm">{{ value }}</div>
  </div>
  <div :class="cn('flex gap-2 mb-2', props.class)" v-else> 
    <Skeleton class="h-3 w-1/2 mb-2" />
  </div>
</template>
