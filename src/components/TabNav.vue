<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

interface Tab {
  routeName: string
  caption: string
}
const props = defineProps<{
  tabs: Tab[]
  default: string
}>()

const tabItem = ref('')
if (props.tabs.some((e) => e.routeName === route.name)) {
  tabItem.value = route.name.toString()
} else {
  tabItem.value = props.default
}

function setTab(tab: string) {
  tabItem.value = tab
  router.push({ name: tab })
}
function isActive(tab: string): boolean {
  return tabItem.value == tab
}
</script>

<template>
  <div class="flex gap-2 border-b mt-3 border-color">
    <div
      v-for="tab in props.tabs"
      @click="setTab(tab.routeName)"
      class="mb-[-1px] p-3 cursor-pointer"
      :class="{ 'tab-active': isActive(tab.routeName) }"
    >
      {{ tab.caption }}
    </div>
  </div>
</template>
