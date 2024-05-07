<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute } from 'vue-router'

const store = useBreadCrumbStore()
const route = useRoute()
console.log(route)
</script>

<template>
  <Navbar v-if="!store.isLoading" />
  <section>
    <div v-if="!store.isLoading" class="flex flex-col items-center">
      <router-view></router-view>
    </div>
  </section>
</template>
