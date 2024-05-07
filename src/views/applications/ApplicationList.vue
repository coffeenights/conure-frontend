<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { listApplications, Application } from '@/services/organizations'
import { useRoute } from 'vue-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  ApplicationCard,
  ApplicationEnvironmentAddCard,
} from '@/components'

let applications = ref([] as Application[])
const route = useRoute()
const store = useBreadCrumbStore()
onMounted(() => {
  // update breadcrumb
  store.application = ''
  store.applicationId = ''
  store.environment = ''
  listApplications(
    store.organizationId || (route.params.organizationId as string),
  )
    .then((response) => {
      applications.value = response.data.applications
    })
    .catch((error) => {
      throw error
    })
})
</script>
<template>
  <div class="content-wrapper">
    <div class="flex flex-col flex-wrap gap-5 p-5">
      <div v-for="application in applications" :key="application.id">
        <Accordion type="single" collapsible default-value="environments">
          <AccordionItem value="environments" class="border rounded-md">
            <AccordionTrigger class="px-4 bg-transparent">
              {{ application.name }}
            </AccordionTrigger>
            <AccordionContent
              class="p-5 bg-background rounded-b-md flex flex-row gap-5"
            >
              <ApplicationCard
                v-for="environment in application.environments"
                :key="environment.id"
                :application="application"
                :environment="environment"
              />
              <ApplicationEnvironmentAddCard />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>
