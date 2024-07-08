<script setup lang="ts">
import ServiceIcon from "@/components/ServiceIcon.vue"
import {Card, CardContent} from "@/components/ui/card"

const props = defineProps<{
  name: string
  alt: string
  title: string
}>()
</script>

<template>
  <Card>
    <CardContent class="p-5 flex flex-col w-36 cursor-pointer">
      <ServiceIcon :alt="alt" class="w-12 h-12 self-center" :name="name" />
      <div class="text-sm font-semibold mt-2 self-center text-center">{{ title }}</div>
    </CardContent>
  </Card>
</template>
