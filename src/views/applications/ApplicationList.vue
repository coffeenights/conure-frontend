<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import {
  listApplications,
  Application,
} from '@/services/organizations'
import { useRoute, useRouter } from 'vue-router'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'

import {
  ApplicationCard, 
  ApplicationEnvironmentAddCard
} from '../../components'

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
    <div class="flex flex-col flex-wrap gap-5 p-5">
      <div v-for="application in applications" :key="application.id">
        <Accordion type="single" collapsible default-value="environments">
          <AccordionItem value="environments" class="border dark:border-gray-700 border-gray-200 rounded-md">
            <AccordionTrigger class="border-b dark:border-gray-700 border-gray-200 px-4  bg-transparent hover:brightness-150">
              {{ application.name }}
            </AccordionTrigger>
            <AccordionContent class="p-5 dark:bg-bgblue1 bg-gray-100 rounded-b-md flex flex-row gap-5">
              <ApplicationCard v-for="environment in application.environments"  :application="application" :environment="environment" />
              <ApplicationEnvironmentAddCard />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>
