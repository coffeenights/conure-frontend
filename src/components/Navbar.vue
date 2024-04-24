<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import CompanyLogo from '../components/CompanyLogo.vue'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card'
import { HoverCardArrow } from 'radix-vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDarkMode, toggleDarkMode } = useDarkMode()
</script>
<template>
  <nav class="bg-card h-16 shadow-sm min-w-max sticky top-0 border-b z-10">
    <div class="flex flex-row items-center">
      <div class="logo mr-6 w-12 ml-3">
        <CompanyLogo />
      </div>
      <div class="breadcrumbs">
        <Breadcrumb />
      </div>
      <div class="flex flex-grow justify-end mt-2">
        <HoverCard>
          <HoverCardTrigger as-child>
            <Button
              size="icon"
              variant="ghost"
              class="mr-5"
              @click="toggleDarkMode"
            >
              <span
                class="text-xl"
                :class="{ 'bi-moon-stars': isDarkMode, 'bi-sun': !isDarkMode }"
              ></span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent class="text-sm w-max bg-black border-0 text-white dark:text-black dark:bg-white">
            Switch theme
            <HoverCardArrow class="dark:fill-white" :width="8" />
          </HoverCardContent>
        </HoverCard>
      </div>
      <div class="mr-5 mt-2">
        <Avatar class="h-10 w-10">
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </nav>
</template>
