<script setup lang="ts">
import { getComponentPods } from '@/services/organizations'
import { watch, ref } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { LogConsole } from '@/components'

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
      selectedPods.value = response.data.pods
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

const handlePodClick = (pod: string) => {
  if (selectedPods.value.includes(pod)) {
    selectedPods.value = selectedPods.value.filter((p) => p !== pod)
  } else {
    selectedPods.value = [...selectedPods.value, pod]
  }
}

const isPodSelected = (pod: string) => {
  return selectedPods.value.includes(pod)
}

const isAllSelected = () => {
  return selectedPods.value.length === pods.value.length
}

const handleAllPodsClick = () => {
  if (selectedPods.value.length === pods.value.length) {
    selectedPods.value = []
  } else {
    selectedPods.value = [...pods.value]
  }
}
</script>

<template>
  <div class="flex flex-row h-full gap-2">
    <div class="flex flex-col gap-2 overflow-y-scroll">
      <Card
        class="cursor-pointer"
        :class="{ 'bg-accent': isAllSelected() }"
        @click="handleAllPodsClick"
      >
        <CardContent class="text-xs p-4 w-64 text-center">
          Select all
        </CardContent>
      </Card>
      <Card
        v-for="pod in pods"
        :key="pod"
        class="cursor-pointer"
        :class="{ 'bg-accent': isPodSelected(pod) }"
        @click="handlePodClick(pod)"
      >
        <CardContent class="text-xs p-4 w-64 text-center">
          {{ pod }}
        </CardContent>
      </Card>
    </div>
    <div class="flex flex-col gap-2 h-full grow max-w-full overflow-x-hidden">
      <LogConsole
        v-if="!isLoading"
        :organization-id="breadCrumbStore.organizationId"
        :application-id="breadCrumbStore.applicationId"
        :environment="breadCrumbStore.environment"
        :component-id="route.params.componentId as string"
        :pods="selectedPods"
      />
    </div>
  </div>
</template>
