<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { listApplications, Application } from '@/services/organizations'
import { useRoute } from 'vue-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { ApplicationCard, ApplicationEnvironmentAddCard } from '@/components'

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

let applications = ref([] as Application[])
const route = useRoute()
const store = useBreadCrumbStore()
const fetchData = () => {
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
}

watch(() => route.params.organizationId, fetchData, { immediate: true })
</script>
<template>
  <div class="content-wrapper">
    <div class="flex flex-col flex-wrap gap-5 p-5">
      <div v-for="application in applications" :key="application.id">
        <Accordion type="single" collapsible default-value="environments">
          <AccordionItem value="environments" class="border rounded-md">
            <AccordionTrigger class="px-4 bg-transparent">
              {{ application.name }}
              <div class="text-xl flex pt-2 pb-2 flex-grow justify-end mr-10">
                <div class="flex gap-10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger class="grow flex items-center gap-2">
                        <div class="bi-boxes"></div>
                        <span class="text-sm">{{
                          application.total_components
                        }}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Total amount of components
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger class="grow flex items-center gap-2">
                        <div class="bi-people"></div>
                        <span class="text-sm">1</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Total amount of users with access
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent
              class="p-5 bg-background rounded-b-md flex flex-row gap-5 flex-wrap"
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
