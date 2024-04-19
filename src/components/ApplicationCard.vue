<script setup lang="ts">
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {
  Application,
  Environment,
  Revision,
  getTimeAgo,
  getLatestRevision,
} from '@/services/organizations'

const router = useRouter()
const store = useBreadCrumbStore()
const latestRevision = ref<Revision | null>(null)

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

latestRevision.value = getLatestRevision(props.application)

const getFirstLetter = (name: string): string => {
  return name.charAt(0).toUpperCase()
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
      <div class="border border-t-[1px] border-b-0 mt-9 h-0"></div>
      <div class="text-xl flex items-center pt-2 pb-2 justify-center">
        <div class="grow flex items-center justify-center gap-2">
          <div class="bi-boxes"></div>
          <span class="text-sm">{{ application.total_components }}</span>
        </div>
        <div class="h-5 w-0 border border-l-0"></div>
        <div class="grow flex items-center justify-center gap-2">
          <div class="bi-people"></div>
          <span class="text-sm">3</span>
        </div>
      </div>
      <div class="border border-t-[1px] border-b-0 h-0"></div>
      <div class="flex items-center mt-1 text-muted-foreground">
        <div class="text-xs grow">
          Rev. {{ latestRevision.revision_number | 0 }}
        </div>
        <div class="text-lime-600">
          <span class="text-xs bi-circle-fill pr-1"></span>
        </div>
        <div class="text-xs">{{ application.status }}</div>
      </div>
    </div>
  </div>
</template>
