<script setup lang="ts">
import TabNav from '@/components/TabNav.vue'

const tabs = [
  { routeName: 'componentDetailsTab', caption: 'Details' },
  { routeName: 'componentSettingsTab', caption: 'Settings' },
]

const defaultTab: string = 'componentDetailsTab'

</script>
<template>
  <div
    id="componentDetails"
    class="p-3 rounded-md border border-color absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-900 overflow-y-scroll"
  >
    <div class="flex justify-end">
      <router-link :to="{ name: 'componentList' }" custom v-slot="{ navigate }">
        <div @click="navigate" class="text-md cursor-pointer">X</div>
      </router-link>
    </div>
    <div class="flex flex-col h-full">
      <TabNav :tabs="tabs" :default="defaultTab" />
      <div id="componentTabsContent" class="mt-4 h-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
