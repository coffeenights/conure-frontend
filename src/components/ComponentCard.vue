<script setup lang="ts">
// declare props and define their types and default values using composition api
import {
  ComponentShort,
  statusComponent,
  getTimeAgo,
} from '@/services/organizations'
import { getIconPath } from '@/utils'
import { defineProps, onMounted, ref } from 'vue'
const props = defineProps({
  component: {
    type: Object as () => ComponentShort,
    required: true,
  },
  organizationId: {
    type: String,
    required: true,
  },
  applicationId: {
    type: String,
    required: true,
  },
  environmentId: {
    type: String,
    required: true,
  },
})

const isLoading = ref(true)
const date = ref('')

onMounted(() => {
  statusComponent(
    props.organizationId,
    props.applicationId,
    props.environmentId,
    props.component.name,
  )
    .then((response) => {
      isLoading.value = false
      date.value = response.data.updated
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="w-80 h-40 border border-color rounded-md p-3 cursor-pointer">
    <div class="flex">
      <div class="grow">
        <img :src="getIconPath(component.type)" class="w-10 h-12" />
      </div>
      <div>
        <img src="@/assets/icons/docker.svg" class="w-10 h-12" />
      </div>
    </div>
    <div class="mt-3 pb-2 border-b border-color">
      <div class="font-bold text-lg">{{ component.name }}</div>
      <div
        class="w-40 h-3 mt-2 rounded-sm skeleton"
        :class="{ hidden: !isLoading }"
      ></div>
      <div
        class="font-bold text-xs text-gray-500"
        :class="{ hidden: isLoading }"
      >
        Last update {{ getTimeAgo(date) }} ago
      </div>
    </div>
    <div class="flex items-center mt-1 justify-end">
      <div class="text-lime-600">
        <span class="text-xs bi-circle-fill pr-2"></span>
      </div>
      <div class="text-xs">active</div>
    </div>
  </div>
</template>
