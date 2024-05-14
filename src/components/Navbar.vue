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

const { isDarkMode, toggleDarkMode } = useDarkMode()
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
                class="mr-5"
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
      </div>
      <div class="mr-5 mt-2">
        <Avatar class="h-10 w-10">
          <AvatarFallback
            ><span class="text-lg bi bi-person"></span
          ></AvatarFallback>
        </Avatar>
      </div>
    </div>
  </nav>
</template>
