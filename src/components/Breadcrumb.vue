<script setup lang="ts">
import { useBreadCrumbStore } from '../stores/BreadCrumbStore'
import { ref, watch } from 'vue'

const store = useBreadCrumbStore()
let organization = ref(store.organization)
let application = ref(store.application)
let environment = ref(store.environment)

watch(
  () => store.organization,
  (newOrganization) => {
    organization.value = newOrganization
  },
)
watch(
  () => store.application,
  (newApplication) => {
    application.value = newApplication
  },
)
watch(
  () => store.environment,
  (newEnvironment) => {
    environment.value = newEnvironment
  },
)
</script>
<template>
  <div
    class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500 transition duration-500 inline-block mr-2"
  >
    <label class="mr-2 cursor-pointer">{{ organization }}</label>
  </div>
  <label class="text-gray-400 dark:text-gray-700 mr-2">/</label>
  <div
    class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500 transition duration-500 inline-block mr-2"
  >
    <label class="mr-2 cursor-pointer">
      <i class="bi bi-diagram-3 cursor-pointer pr-1"></i>
      {{ application }}
    </label>
    <i class="bi-chevron-down cursor-pointer"></i>
  </div>
  <div
    v-if="environment"
    class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500 transition duration-500 inline-block mr-2"
  >
    <label class="mr-2 cursor-pointer">{{ environment }}</label>
    <i class="bi-chevron-down cursor-pointer"></i>
  </div>
</template>
