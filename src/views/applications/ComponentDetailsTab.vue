<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardContentKeyValue,
  CardContentKeyValueVertical,
} from '@/components/ui/card'
import { ref, watch } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import {
  ComponentStatus,
  getTimeAgo,
  statusComponent,
} from '@/services/organizations'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadCrumbStore = useBreadCrumbStore()
const c = ref({} as ComponentStatus)
const isLoading = ref<boolean>(true)
const notDeployed = ref<boolean>(false)

const fetchData = () => {
  statusComponent(
    breadCrumbStore.organizationId,
    breadCrumbStore.applicationId,
    breadCrumbStore.environment,
    route.params.componentId as string,
  )
    .then((response) => {
      c.value = response.data
      isLoading.value = false
    })
    .catch((error) => {
      if (error.response.data.code === '4004') {
        notDeployed.value = true
      } else {
        throw error
      }
    })
}
watch(() => route.params.componentId, fetchData, { immediate: true })
</script>
<template>
  <div v-if="!notDeployed" class="flex flex-row gap-2 flex-wrap">
    <div class="grow flex flex-col gap-2 sm:min-w-[22rem] md:min-w-[34rem]">
      <Card class="grow">
        <CardContent class="p-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          <CardContentKeyValueVertical
            c-key="Name"
            :value="c.component?.name"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Type"
            :value="c.component?.type"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Healthy"
            :value="c.properties?.health.healthy"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Status"
            :value="c.properties?.health.message"
            :is-loading="isLoading"
          />
          <CardContentKeyValueVertical
            c-key="Updated"
            :value="getTimeAgo(c.properties?.health.updated) + ' ago'"
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
              :value="c.properties?.network?.ip"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="External IP"
              :value="c.properties?.network?.external_ip"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Host"
              :value="c.properties?.network?.host"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Ports"
              :value="c.properties?.network?.port"
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
              :value="c.properties?.source?.container_image"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Command"
              :value="c.properties?.source?.command"
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
              :value="c.properties?.resources?.cpu"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Memory"
              :value="c.properties?.resources?.memory"
              :is-loading="isLoading"
            />
            <CardContentKeyValue
              c-key="Replicas"
              :value="c.properties?.resources?.replicas"
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
            <div
              v-for="vol in c.properties?.storage.volumes"
              :key="vol.name"
              class="mb-5"
            >
              <div class="text-lg">{{ vol.name }}</div>
              <CardContentKeyValue
                c-key="Size"
                :value="vol.size"
                :is-loading="isLoading"
              />
              <CardContentKeyValue
                c-key="Mount Path"
                :value="vol.path"
                :is-loading="isLoading"
              />
            </div>
            <div
              v-if="!c.properties?.storage.volumes.length"
              class="text-muted-foreground text-center"
            >
              No storage volumes found
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-96">
    <div class="text-lg text-muted-foreground">
      This component has not been deployed yet
    </div>
  </div>
</template>
