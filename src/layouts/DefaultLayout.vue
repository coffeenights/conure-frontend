<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'

const store = useBreadCrumbStore()
const isStoreLoaded = ref(false)

onBeforeMount(() => {
  if (store.isLoaded) {
    isStoreLoaded.value = true
  }
})

watch(
  () => store.isLoaded,
  (newVal) => {
    isStoreLoaded.value = newVal
  },
)
</script>

<template>
  <Navbar v-if="isStoreLoaded" />
  <section>
    <div v-if="isStoreLoaded" class="flex flex-col items-center">
      <router-view></router-view>
    </div>
  </section>
</template>
