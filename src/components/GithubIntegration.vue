<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'World',
  },
})
</script>

<template>
  <h1>Hello, {{ name }}!</h1>
</template>
