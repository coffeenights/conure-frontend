<script setup lang="ts">

import {onMounted, ref} from "vue";

const props = defineProps({
  organizationId: String,
  applicationId: String,
  environment: String,
  componentId: String,
  pods: {
    type: Array as () => Array<string>,
    required: true
  }
})

const logs = ref([] as string[])
const logConsole = ref(null)

onMounted(() => {
  let url = new URL(import.meta.env.VITE_APP_API_URL)
  url.pathname = `/organizations/${props.organizationId}/a/${props.applicationId}/e/${props.environment}/c/${props.componentId}/status/logs`

  let params = new URLSearchParams()

// Add some parameters
  let podsString = ''
  for (let i = 0; i < props.pods.length; i++) {
    podsString += props.pods[i]
    if (i < props.pods.length - 1) {
      podsString += ','
    }
  }
  params.append('pods', podsString)
  url.search = params.toString()

  const source = new EventSource(url.toString(), {
    withCredentials: true,
  })

  source.onmessage = function(event) {
    logs.value.push(event.data)
  };

// Define the onopen handler
  source.onopen = function(event) {
    console.log('Connection to server opened.')
  };

// Define the onerror handler
  source.onerror = function(event) {
    console.error('EventSource failed.')
  }
})

</script>

<template>
  <div ref="logConsole" class="bg-background h-full grow overflow-y-scroll overflow-x-scroll p-3 scroller text-xs max-w-full rounded-sm dark:text-gray-300">
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
