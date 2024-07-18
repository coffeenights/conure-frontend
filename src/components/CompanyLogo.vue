<script setup lang="ts">
import ServiceIcon from '@/components/ServiceIcon.vue'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <ServiceIcon name="logo" alt="Home" :class="props.class" />
</template>
