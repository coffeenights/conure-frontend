<script setup lang="ts">
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore';
import { Button } from '@/components/ui/button'

defineProps({
  organizationId: String,
})

const store = useBreadCrumbStore()

</script>

<template>
  <div class="flex">
    <div class="text-lg grow">
      <router-link
        :to="{
          name: 'applications',
          params: { organizationId: organizationId },
        }"
        custom
        v-slot="{ navigate }"
      >
        <Button variant="ghost" size="icon">
          <span
            @click="navigate"
            class="bi-arrow-left text-lg"
          ></span>
        </Button>
      </router-link>
      {{ store.application }}
    </div>
    <div class="flex gap-2">
      <Button>Deploy</Button>
    </div>
  </div>
</template>
