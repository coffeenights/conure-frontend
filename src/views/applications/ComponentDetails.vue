<script setup lang="ts">
import TabNav from '@/components/TabNav.vue'
import { ComponentView } from '@/components'

const tabs = [
  { routeName: 'componentDetailsTab', caption: 'Details' },
  { routeName: 'componentSettingsTab', caption: 'Settings' },
  { routeName: 'componentVariablesTab', caption: 'Variables' },
  { routeName: 'componentLogsTab', caption: 'Logs' },
]

const defaultTab: string = 'componentDetailsTab'
</script>
<template>
  <ComponentView>
    <div class="flex flex-col height-100">
      <TabNav :tabs="tabs" :default="defaultTab" />
      <div id="componentTabsContent" class="mt-4 h-full">
        <router-view></router-view>
      </div>
    </div>
  </ComponentView>
</template>
<style scoped>
.height-100 {
  height: calc(100% - 2.5rem);
}
</style>
