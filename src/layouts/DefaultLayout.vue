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

onMounted(() => {
  let orgResponse: Promise<any> | undefined
  let appResponse: Promise<any> | undefined
  if (route.params.organizationId) {
    orgResponse = detailOrganization(route.params.organizationId as string)
      .then((response) => {
        store.organization = response.data.name
        store.organizationId = response.data.id
      })
      .catch((error) => {
        if (error.response.status === 404) {
          router.push({ name: '404' })
        } else {
          throw error
        }
      })
  }
  if (route.params.applicationId) {
    appResponse = detailApplication(
      route.params.organizationId as string,
      route.params.applicationId as string,
      route.params.environment as string,
    )
      .then((response) => {
        store.application = response.data.name
        store.applicationId = response.data.id
      })
      .catch((error) => {
        if (error.response.status === 404) {
          router.push({ name: '404' })
        } else {
          throw error
        }
      })
  }
  if (route.params.environment) {
    store.environment = route.params.environment as string
  }
  Promise.all([orgResponse, appResponse])
    .then(() => {
      store.isLoaded = true
    })
    .catch((error) => {
      throw error
    })
})
</script>

<template>
  <Navbar v-if="isStoreLoaded" />
  <section>
    <div class="flex flex-col items-center">
      <router-view v-if="isStoreLoaded"></router-view>
    </div>
  </section>
</template>
