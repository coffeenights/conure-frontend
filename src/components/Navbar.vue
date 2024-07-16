<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import CompanyLogo from '../components/CompanyLogo.vue'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDarkMode } from '@/composables/useDarkMode'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useRouter, useRoute } from 'vue-router'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'

const store = useBreadCrumbStore()
const { isDarkMode, toggleDarkMode } = useDarkMode()
const router = useRouter()
const route = useRoute()
const goToSettings = () => {
  if (route.name === 'settingsGeneral') return
  router.push({
    name: 'settingsGeneral',
    params: {
      organizationId: store.organizationId,
    },
  })
}
</script>
<template>
  <nav class="bg-card h-16 shadow-sm min-w-max sticky top-0 border-b z-10">
    <div class="flex flex-row items-center">
      <router-link :to="{ name: 'organizations' }">
        <div class="logo mr-6 w-12 ml-3">
          <CompanyLogo />
        </div>
      </router-link>
      <div class="breadcrumbs">
        <Breadcrumb />
      </div>
      <div class="flex flex-grow justify-end mt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant="ghost"
                class="mr-1"
                @click="toggleDarkMode"
              >
                <span
                  class="text-xl"
                  :class="{
                    'bi-moon-stars': isDarkMode,
                    'bi-sun': !isDarkMode,
                  }"
                ></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Switch theme</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                v-if="store.organizationId != ''"
                size="icon"
                variant="ghost"
                @click="goToSettings"
              >
                <span class="text-xl bi-gear"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div class="mx-5 mt-2">
        <Avatar class="h-10 w-10">
          <AvatarFallback
            ><span class="text-lg bi bi-person"></span
          ></AvatarFallback>
        </Avatar>
      </div>
    </div>
  </nav>
</template>
