<script setup lang="ts">
import { getComponentPods } from '@/services/organizations'
import { watch, ref } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import {LogConsole} from "@/components";

const route = useRoute()
const breadCrumbStore = useBreadCrumbStore()
const pods = ref([] as string[])
const isLoading = ref<boolean>(false)
const notDeployed = ref<boolean>(false)
const selectedPods = ref([] as string[])
const emits = defineEmits(['podsLoaded'])


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
      emits('podsLoaded')

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
  <div class="flex flex-row h-full gap-2">
    <div class="flex flex-col gap-2">
      <Card v-for="pod in pods" :key="pod">
        <CardContent class="text-xs p-6">
          {{ pod }}
        </CardContent>
      </Card>
    </div>
    <div class="flex flex-col gap-2 h-full grow max-w-full overflow-x-hidden">
        <LogConsole
          v-if="!isLoading"
          :organizationId="breadCrumbStore.organizationId"
          :applicationId="breadCrumbStore.applicationId"
          :environment="breadCrumbStore.environment"
          :componentId="route.params.componentId as string"
          :pods="pods"
        />
    </div>
  </div>
</template>
