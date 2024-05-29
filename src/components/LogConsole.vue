<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  organizationId: {
    type: String,
    required: true,
  },
  applicationId: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  componentId: {
    type: String,
    required: true,
  },
  pods: {
    type: Array as () => Array<string>,
    required: true,
  },
})

const logs = ref([] as string[])
const logConsole = ref(null)
let url = new URL(import.meta.env.VITE_APP_API_URL)

let sources: EventSource[] = []

url.pathname = `/organizations/${props.organizationId}/a/${props.applicationId}/e/${props.environment}/c/${props.componentId}/status/logs`

const loadLogs = () => {
  let params = new URLSearchParams()
  params.append('pods', props.pods.join(','))
  url.search = params.toString()
  for (const s of sources) {
    s.close()
  }

  logs.value = []
  const source = new EventSource(url.toString(), {
    withCredentials: true,
  })

  source.onmessage = function (event) {
    logs.value.push(event.data)
  }

  // Define the onopen handler
  source.onopen = function () {
    sources.push(source)
  }

  // Define the onerror handler
  source.onerror = function () {
    source.close()
  }
}

watch(() => props.pods, loadLogs, { immediate: true })
</script>

<template>
  <div
    ref="logConsole"
    class="bg-background h-full grow overflow-y-scroll overflow-x-scroll p-3 scroller text-xs max-w-full rounded-sm dark:text-gray-300"
  >
    <div v-for="log in logs" :key="log">
      {{ log }}
    </div>
    <div class="anchor"></div>
  </div>
</template>

<style scoped>
.scroller {
  scroll-behavior: smooth;
  white-space: nowrap;
  font-family: Menlo, monospace;
}
.scroller * {
  overflow-anchor: none;
}

.anchor {
  overflow-anchor: auto;
  height: 1px;
}
</style>
