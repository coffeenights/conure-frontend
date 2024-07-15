<script setup lang="ts">
import { CardDivider, ComponentSelectionCard } from '@/components'
</script>

<template>
  <CardDivider
    title="Repositories"
    class="mt-5"
    :button="false"
  />
  <div class="flex flex-row flex-wrap mt-10 gap-5">
    <ComponentSelectionCard
      alt="Docker Repository"
      name="docker"
      title="Docker Repository"
    />
    <ComponentSelectionCard
      alt="Docker Repository"
      name="github"
      title="Github"
    />
  </div>
</template>

<style scoped></style>
