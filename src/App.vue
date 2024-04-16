<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'
import NonLoggedUserLayout from './layouts/NonLoggedUserLayout.vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
</script>

<template>
  <div>
    <DefaultLayout v-if="userStore.authenticated" />
    <NonLoggedUserLayout v-else />
  </div>
</template>
