<script setup lang="ts">
// declare props and define their types and default values using composition api
import {
  ComponentService,
  getTimeAgo,
  statusComponentHealth,
} from '@/services/organizations'
import { getIconPath } from '@/utils'
import { onMounted, ref } from 'vue'
import { Status } from '@/components/ui/status'

const props = defineProps({
  component: {
    type: Object as () => ComponentService,
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
const healthy = ref('')

const statusMap: Record<string, string> = {
  healthy: 'active',
  unhealthy: 'error',
  disabled: 'disabled',
}

onMounted(() => {
  statusComponentHealth(
    props.organizationId,
    props.applicationId,
    props.environmentId,
    props.component.id,
  )
    .then((response) => {
      date.value = response.data.updated
      healthy.value = response.data.healthy ? 'healthy' : 'unhealthy'
    })
    .catch((error) => {
      if (error.response.data.code === '4004') {
        date.value = ''
        healthy.value = 'disabled'
      } else {
        throw error
      }
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div class="w-80 h-40 border rounded-md p-3 cursor-pointer">
    <div class="flex">
      <div class="grow">
        <img :src="getIconPath(component.type)" class="w-10 h-12" />
      </div>
      <div>
        <img src="@/assets/icons/docker.svg" class="w-10 h-12" />
      </div>
    </div>
    <div class="mt-3 pb-2 border-b">
      <div class="font-bold text-lg">{{ component.name }}</div>
      <div
        class="w-40 h-3 mt-2 rounded-sm skeleton"
        :class="{ hidden: !isLoading }"
      ></div>
      <div
        v-if="date"
        class="text-xs text-muted-foreground"
        :class="{ hidden: isLoading }"
      >
        Last update {{ getTimeAgo(date) }} ago
      </div>
      <div
        v-else
        class="text-xs text-muted-foreground"
        :class="{ hidden: isLoading }"
      >
        Never updated
      </div>
    </div>
    <div class="flex items-center mt-1 justify-end">
      <Status
        v-if="!isLoading"
        :status="statusMap[healthy]"
        :text="healthy"
      />
    </div>
  </div>
</template>
