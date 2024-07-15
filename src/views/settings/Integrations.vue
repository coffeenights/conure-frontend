<script setup lang="ts">
import { CardDivider } from '@/components'
import { useRouter } from 'vue-router'

const router = useRouter()
const onNewIntegration = () => {
  router.push({ name: 'settingsNewIntegration' })
}
</script>

<template>
  <CardDivider
    title="Integrations"
    class="mt-5"
    :button="true"
    button-label="New"
    button-icon="bi-plus"
    @button-click="onNewIntegration"
  />
  <div class="">
    <router-view></router-view>
  </div>
</template>
