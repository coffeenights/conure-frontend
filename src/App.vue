<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'
import NonLoggedUserLayout from './layouts/NonLoggedUserLayout.vue'
import { useUserStore } from '@/stores/UserStore'
import Toaster from '@/components/ui/toast/Toaster.vue'

const userStore = useUserStore()
</script>

<template>
  <Toaster />
  <div>
    <DefaultLayout v-if="userStore.authenticated" />
    <NonLoggedUserLayout v-else />
  </div>
</template>
