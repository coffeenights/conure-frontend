<script setup lang="ts">
import {
  ComponentPod,
  ComponentPodCondition,
  getComponentPods,
} from '@/services/organizations'
import { watch, ref } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Status } from '@/components/ui/status'
import { LogConsole } from '@/components'

const route = useRoute()
const breadCrumbStore = useBreadCrumbStore()
const pods = ref([] as ComponentPod[])
const isLoading = ref<boolean>(false)
const notDeployed = ref<boolean>(false)
const selectedPods = ref([] as ComponentPod[])
const emits = defineEmits(['podsLoaded'])
const podCondition = ref({} as ComponentPodCondition)

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

const handlePodClick = (pod: ComponentPod) => {
  if (isAllSelected()) {
    selectedPods.value = [pod]
  } else if (selectedPods.value.includes(pod)) {
    selectedPods.value = selectedPods.value.filter((p) => p !== pod)
  } else {
    selectedPods.value = [...selectedPods.value, pod]
  }

  if (selectedPods.value.length === 1) {
    for (const condition of selectedPods.value[0].conditions) {
      if (condition.status === 'False') {
        podCondition.value = condition
        break
      }
    }
  } else {
    podCondition.value = {} as ComponentPodCondition
  }
}

const isPodSelected = (pod: ComponentPod) => {
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

const getStatus = (phase: string) => {
  if (phase === 'Running') {
    return 'active'
  } else if (phase === 'Pending') {
    return 'progressing'
  } else if (phase === 'Failed') {
    return 'error'
  } else if (phase === 'Succeeded') {
    return 'active'
  } else {
    return 'disabled'
  }
}
</script>

<template>
  <div class="flex flex-row h-full gap-2">
    <div class="flex flex-col gap-2 min-w-72 overflow-y-scroll items-center">
      <Card
        class="cursor-pointer w-72"
        :class="{ 'bg-accent': isAllSelected() }"
        @click="handleAllPodsClick"
      >
        <CardContent class="text-xs p-4 text-center">Select all</CardContent>
      </Card>
      <Card
        v-for="pod in pods"
        :key="pod.name"
        class="cursor-pointer w-72"
        :class="{ 'bg-accent': isPodSelected(pod) }"
        @click="handlePodClick(pod)"
      >
        <CardContent class="flex text-xs p-4 text-center">
          <Status :status="getStatus(pod.phase)" />
          <div class="grow">{{ pod.name }}</div>
        </CardContent>
      </Card>
    </div>
    <div class="flex flex-col gap-2 h-full grow max-w-full overflow-x-hidden">
      <Alert v-if="podCondition.status === 'False'" variant="destructive">
        <AlertTitle>Error: Pod {{ podCondition.reason }}</AlertTitle>
        <AlertDescription>
          {{ podCondition.message }}
        </AlertDescription>
      </Alert>
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
