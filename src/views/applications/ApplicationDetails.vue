<script setup lang="ts">
import DetailsHeader from '../../components/DetailsHeader.vue'
import TabNav from '../../components/TabNav.vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'

const tabs = [
  { routeName: 'componentList', caption: 'Components' },
  { routeName: 'applicationDetailsVariables', caption: 'Variables' },
  { routeName: 'users', caption: 'Users' },
  { routeName: 'activity', caption: 'Activity' },
]
const store = useBreadCrumbStore()
const organizationId = store.organizationId
const defaultTab = 'componentList'
</script>

<template>
  <div class="content-wrapper p-4 flex flex-col justify-stretch">
    <DetailsHeader :organizationId="store.organizationId" />
    <TabNav :tabs="tabs" :default="defaultTab" />
    <div id="tabsWrapper" class="mt-3 grow flex flex-col">
      <router-view></router-view>
    </div>
  </div>
</template>
