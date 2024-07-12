<script setup lang="ts">
import { cn } from '@/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  iconClass?: string
  class?: HTMLAttributes['class']
  active?: boolean
}>()
</script>

<template>
  <div
    :class="
      cn(
        { 'bg-accent': props.active },
        'sm:w-full flex gap-3 hover:bg-accent py-2 px-2 sm:px-4 rounded-md cursor-pointer w-12 justify-center items-center sm:justify-start',
        props.class,
      )
    "
  >
    <span
      v-if="props.iconClass"
      :class="cn(props.iconClass, 'text-lg sm:text-sm')"
    ></span>
    <div class="hidden sm:block"><slot /></div>
  </div>
</template>
