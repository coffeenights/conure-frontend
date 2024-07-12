<script setup lang="ts">
import SettingsWrapper from './SettingsWrapper.vue'
import { NavMenu, NavItem } from '@/components/ui/vertical-nav'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

type Item = {
  iconClass: string
  text: string
  routeName: string
}

const items: Item[] = [
  {
    iconClass: 'bi-gear',
    text: 'General',
    routeName: 'settingsGeneral',
  },
  {
    iconClass: 'bi-plug',
    text: 'Integrations',
    routeName: 'settingsIntegrations',
  },
  {
    iconClass: 'bi-exclamation-triangle',
    text: 'Limits',
    routeName: 'settingsLimits',
  },
  {
    iconClass: 'bi-lock',
    text: 'Security',
    routeName: 'settingsSecurity',
  },
]

const onClick = (item: Item) => {
  if (route.name === item.routeName) return
  router.push({ name: item.routeName })
}
</script>

<template>
  <SettingsWrapper>
    <div class="relative min-h-lvh grid grid-cols-6">
      <NavMenu class="text-sm">
        <NavItem
          v-for="(item, i) in items"
          :key="i"
          :icon-class="item.iconClass"
          :active="route.name === item.routeName"
          @click="onClick(item)"
        >
          {{ item.text }}
        </NavItem>
      </NavMenu>
      <section class="col-span-5">
        <router-view />
      </section>
    </div>
  </SettingsWrapper>
</template>
