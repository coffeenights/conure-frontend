<script setup lang="ts">
import { useComponentStore } from '@/stores/ComponentStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContentKeyValue
} from '@/components/ui/card'
const store = useComponentStore()

</script>
<template>
  <div class="flex flex-row gap-2 flex-wrap">
    <div class="grow flex flex-col gap-2 sm:min-w-[22rem] md:min-w-[34rem]">
      <Card class="grow">
        <CardContent class="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div class="block">
            <div class="text-gray-500 text-sm">Name:</div>
            <div class="text-lg">{{ store.componentStatus?.component?.id}}</div>
          </div>
          <div class="block">
            <div class="text-gray-500 text-sm">Type:</div>
            <div class="text-lg">{{ store.componentStatus?.component?.type }}</div>
          </div>
          <div class="block">
            <div class="text-gray-500 text-sm">Replicas:</div>
            <div class="text-lg">{{ store.componentStatus?.properties?.resources?.replicas }}</div>
          </div>
          <div class="block">
            <div class="text-gray-500 text-sm">Status:</div>
            <div class="text-lg">Progressing</div>
          </div>
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
            <CardContentKeyValue cKey="IP" :value="store.componentStatus?.properties?.network?.ip" />
            <CardContentKeyValue cKey="External IP" :value="store.componentStatus?.properties?.network?.external_ip" />
            <CardContentKeyValue cKey="Host" :value="store.componentStatus?.properties?.network?.host" />
            <CardContentKeyValue cKey="Ports" :value="store.componentStatus?.properties?.network?.port" />
          </CardContent>
        </Card>
        <Card class="grow min-w-[10rem] w-full">
          <CardHeader class="pl-4 pt-4 pb-0">
            <CardTitle class="text-lg">
              <span class="bi-file-code mr-2"></span>Source
            </CardTitle>
          </CardHeader>
          <CardContent class="p-4">
            <CardContentKeyValue cKey="Image" :value="store.componentStatus?.properties?.source?.container_image" />
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
            <CardContentKeyValue cKey="CPU" :value="store.componentStatus?.properties?.resources?.cpu" />
            <CardContentKeyValue cKey="Memory" :value="store.componentStatus?.properties?.resources?.memory" />
            <CardContentKeyValue cKey="Replicas" :value="store.componentStatus?.properties?.resources?.replicas" />
          </CardContent>
        </Card>
        <Card class="grow min-w-[10rem] w-full">
          <CardHeader class="pl-4 pt-4 pb-0">
            <CardTitle class="text-lg">
              <span class="bi-device-hdd mr-2"></span>Storage
            </CardTitle>
          </CardHeader>
          <CardContent class="p-4">
            <CardContentKeyValue cKey="Size" :value="store.componentStatus?.properties?.storage?.size" />
          </CardContent>
        </Card>
      </div>
    </div>
    <div class="grow flex-col min-w-[20rem]">
      <Card class="grow min-w-[20rem] w-full">
        <CardHeader class="pl-4 pt-4 pb-0">
          <CardTitle class="text-lg">
            <span class="bi-clock-history mr-2"></span>Activity
          </CardTitle>
        </CardHeader>
        <CardContent class="p-4">
          <div class=""></div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
