<script setup lang="ts">
import { detailOrganization, detailApplication } from '@/services/organizations'
import { onMounted, ref, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useBreadCrumbStore()
const isStoreLoaded = ref(false)

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
    <div class="flex flex-col items-center">
      <router-view v-if="isStoreLoaded"></router-view>
    </div>
  </section>
</template>
