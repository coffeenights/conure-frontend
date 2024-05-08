<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'

const store = useBreadCrumbStore()
</script>

<template>
  <Navbar v-if="!store.isLoading" />
  <section>
    <div v-if="!store.isLoading" class="flex flex-col items-center">
      <router-view></router-view>
    </div>
  </section>
</template>
