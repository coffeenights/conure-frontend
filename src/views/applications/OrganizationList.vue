<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card'

const getFirstLetter = (name: string): string => {
  return name.charAt(0).toUpperCase()
}
const route = useRoute()

const fetchData = () => {

}
watch(() => route.params.organizationId, fetchData, { immediate: true })

const store = useBreadCrumbStore()
const isStoreLoaded = ref(false)
</script>
<template>
  <div class="content-wrapper">
    <div class="flex flex-col flex-wrap gap-5 p-5">
      <Card class="overflow-hidden">
        <CardHeader class="bg-orange-500">
          <h1 class="text-xl font-semibold">{{ getFirstLetter('Conure') }}</h1>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    </div>
  </div>
</template>
