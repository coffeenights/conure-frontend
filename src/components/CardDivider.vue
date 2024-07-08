<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="py-3 border-b">
    <div class="text-lg">{{ title }}</div>
  </div>
</template>
