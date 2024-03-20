<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import {
  listApplications,
  Application,
} from '@/services/organizations'
import { useRoute, useRouter } from 'vue-router'
import ApplicationCard from '../../components/ApplicationCard.vue'

let applications = ref([] as Application[])
const router = useRouter()
const route = useRoute()
const store = useBreadCrumbStore()
onMounted(() => {
    // update breadcrumb
    store.application = ''
    store.applicationId = ''
    store.environment = ''
    listApplications(store.organizationId || route.params.organizationId as string)
        .then((response) => {
            applications.value = response.data.applications
        })
        .catch((error) => {
            throw(error)
    })
})

</script>
<template>
  <div class="content-wrapper">
    <div class="p-5">
      <input
        placeholder="Search"
        class="w-full pt-2 pb-2 pl-4 pr-4 rounded-md bg-transparent border dark:border-gray-700 border-gray-200"
        type="search"
      />
    </div>
    <div class="flex flex-row flex-wrap items-center justify-center gap-5 p-5">
      <div
        class="cursor-pointer border border-gray-200 dark:item-background-color-dark min-h-[20em] w-64 dark:border-gray-700 shrink-0 rounded-lg flex flex-col items-center justify-center dark:text-gray-300 text-gray-700"
      >
        <span class="bi-plus text-9xl"></span>
        <p>Add Application</p>
      </div>
      <div v-for="application in applications" :key="application.id">
        <ApplicationCard :application="application" />
      </div>
    </div>
  </div>
</template>
