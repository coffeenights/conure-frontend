<script setup lang="ts">
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import {
  Application,
  Environment,
  Revision,
  getTimeAgo,
  getLatestRevision,
  statusApplication,
} from '@/services/organizations'
import { Status } from '@/components/ui/status'
import { Skeleton } from '@/components/ui/skeleton'

const router = useRouter()
const store = useBreadCrumbStore()
const latestRevision = ref<Revision | null>(null)
const status = ref<string>('')
const statusLoading = ref<boolean>(true)

const props = defineProps({
  application: {
    type: Object as () => Application,
    required: true,
  },
  environment: {
    type: Object as () => Environment,
    required: true,
  },
})

const statusMap: Record<string, string> = {
  starting: 'progressing',
  rendering: 'progressing',
  generatingPolicy: 'active',
  runningWorkflow: 'progressing',
  workflowSuspending: 'warning',
  workflowTerminated: 'disabled',
  workflowFailed: 'error',
  running: 'active',
  unhealthy: 'error',
  deleting: 'disabled',
  notDeployed: 'disabled',
}

latestRevision.value = getLatestRevision(props.application)

function camelToSnakeCase(str: string)  {
  return str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
}

function goToDetailApplication(
  applicationId: string,
  applicationName: string,
  environment: string,
) {
  store.applicationId = applicationId
  store.environment = environment
  store.application = applicationName
  // navigate to the component list view
  router.push({
    name: 'componentList',
    params: {
      organizationId: store.organizationId,
      applicationId: applicationId,
      environment: environment,
    },
  })
}

onMounted(() => {
  statusLoading.value = true
  statusApplication(
    store.organizationId,
    props.application.id,
    props.environment?.name,
  )
    .then((response) => {
      status.value = response.data.status
    })
    .catch((error) => {
      if (error.response.data.code === '4004') {
        status.value = 'notDeployed'
      } else {
        throw error
      }
    })
    .finally(() => {
      statusLoading.value = false
    })
})
</script>

<template>
  <div
    class="cursor-pointer border bg-card drop-shadow w-64 shrink-0 rounded-lg flex flex-col overflow-hidden"
    @click="
      goToDetailApplication(application.id, application.name, environment.name)
    "
  >
    <div class="p-4">
      <div class="text-lg">{{ environment.name }}</div>
      <div v-if="latestRevision" class="text-xs text-muted-foreground">
        Last update {{ getTimeAgo(latestRevision.created_at) }} ago
      </div>
      <div v-else class="text-xs text-muted-foreground">No updates yet</div>
      <div class="border border-t-[1px] border-b-0 mt-5 mb-4 h-0"></div>
      <div class="flex items-center text-muted-foreground min-h-5">
        <div class="text-xs grow">
          Rev. {{ latestRevision?.revision_number ?? 0 }}
        </div>
        <Skeleton v-if="statusLoading" class="h-3 w-1/2" />
        <Status
          v-if="!statusLoading"
          :status="statusMap[status]"
          :text="camelToSnakeCase(status)"
        />
      </div>
    </div>
  </div>
</template>
