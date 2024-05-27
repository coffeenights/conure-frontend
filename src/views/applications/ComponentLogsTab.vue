<script setup lang="ts">
import { getComponentPods } from '@/services/organizations'
import { watch, ref } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'

const route = useRoute()
const breadCrumbStore = useBreadCrumbStore()
const pods = ref([] as string[])
const isLoading = ref<boolean>(false)
const notDeployed = ref<boolean>(false)

const fetchData = () => {
  isLoading.value = true
  getComponentPods(
    breadCrumbStore.organizationId,
    breadCrumbStore.applicationId,
    breadCrumbStore.environment,
    route.params.componentId as string,
  )
    .then((response) => {
      pods.value = response.data.pods
      isLoading.value = false
    })
    .catch((error) => {
      if (error.response.data.code === '4004') {
        isLoading.value = false
        notDeployed.value = true
      } else {
        throw error
      }
    })
}
watch(() => route.params.componentId, fetchData, { immediate: true })
</script>

<template>
  <div class="flex flex-row h-full">
    <div class="flex flex-col gap-2">
      <Card v-for="pod in pods" :key="pod">
        <CardContent class="text-sm">
          {{ pod }}
        </CardContent>
      </Card>
      <div>
      </div>
    </div>
    <div class="flex flex-row"></div>
  </div>
</template>
