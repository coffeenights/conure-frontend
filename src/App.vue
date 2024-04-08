<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'
import NonLoggedUserLayout from './layouts/NonLoggedUserLayout.vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
</script>

<template>
  <div>
    <template v-if="userStore.authenticated">
      <DefaultLayout />
    </template>
    <template v-else>
      <NonLoggedUserLayout />
    </template>
  </div>
</template>
