<script setup lang="ts">
import { useComponentStore } from '@/stores/ComponentStore'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardContentKeyValue,
  CardContentKeyValueVertical,
} from '@/components/ui/card'
import { onMounted, ref } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { statusComponent } from '@/services/organizations'
import { useRoute } from 'vue-router'

const route = useRoute()
const componentStore = useComponentStore()
const breadCrumbStore = useBreadCrumbStore()
const store = useComponentStore()
const isLoading = ref<boolean>(true)

onMounted(() => {
  statusComponent(
    breadCrumbStore.organizationId,
    breadCrumbStore.applicationId,
    breadCrumbStore.environment,
    route.params.componentName as string,
  )
    .then((response) => {
      componentStore.componentStatus = response.data
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
<template>
  <div class="flex flex-row gap-2 flex-wrap">
    <div class="grow flex flex-col gap-2 sm:min-w-[22rem] md:min-w-[34rem]">
      <Card class="grow">
        <CardContent class="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <CardContentKeyValueVertical
            c-key="Name"
            :value="store.componentStatus?.component?.id"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Type"
            :value="store.componentStatus?.component?.type"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Replicas"
            :value="store.componentStatus?.properties?.resources?.replicas"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Status"
            :value="store.componentStatus?.properties?.status"
            :is-loading="isLoading"
          />
        </CardContent>
      </Card>
      <div class="flex grow gap-2 flex-wrap sm:flex-nowrap">
        <Card class="grow min-w-[10rem] w-full">
          <CardHeader class="pl-4 pt-4 pb-0">
            <CardTitle class="text-lg">
              <span class="bi-ethernet mr-2"></span>Network
            </CardTitle>
          </CardHeader>
          <CardContent class="p-4">
            <CardContentKeyValue
              c-key="IP"
              :value="store.componentStatus?.properties?.network?.ip"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="External IP"
              :value="store.componentStatus?.properties?.network?.external_ip"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Host"
              :value="store.componentStatus?.properties?.network?.host"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Ports"
              :value="store.componentStatus?.properties?.network?.port"
              :is-loading="isLoading"
            />
          </CardContent>
        </Card>
        <Card class="grow min-w-[10rem] w-full">
          <CardHeader class="pl-4 pt-4 pb-0">
            <CardTitle class="text-lg">
              <span class="bi-file-code mr-2"></span>Source
            </CardTitle>
          </CardHeader>
          <CardContent class="p-4">
            <CardContentKeyValue
              c-key="Image"
              :value="
                store.componentStatus?.properties?.source?.container_image
              "
              :is-loading="isLoading"
            />
          </CardContent>
        </Card>
      </div>
      <div class="flex grow gap-2 flex-wrap sm:flex-nowrap">
        <Card class="grow min-w-[10rem] w-full">
          <CardHeader class="pl-4 pt-4 pb-0">
            <CardTitle class="text-lg">
              <span class="bi-cpu mr-2"></span>Resources
            </CardTitle>
          </CardHeader>
          <CardContent class="p-4">
            <CardContentKeyValue
              c-key="CPU"
              :value="store.componentStatus?.properties?.resources?.cpu"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Memory"
              :value="store.componentStatus?.properties?.resources?.memory"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Replicas"
              :value="store.componentStatus?.properties?.resources?.replicas"
              :is-loading="isLoading"
            />
          </CardContent>
        </Card>
        <Card class="grow min-w-[10rem] w-full">
          <CardHeader class="pl-4 pt-4 pb-0">
            <CardTitle class="text-lg">
              <span class="bi-device-hdd mr-2"></span>Storage
            </CardTitle>
          </CardHeader>
          <CardContent class="p-4">
            <CardContentKeyValue
              c-key="Size"
              :value="store.componentStatus?.properties?.storage?.size"
              :is-loading="isLoading"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
