<script setup lang="ts">
defineProps({
  organizationId: String,
})

</script>

<template>
  <div class="flex">
    <div class="text-lg grow">
      <router-link
        :to="{ name: 'applications', params: { organizationId: organizationId } }"
        custom
        v-slot="{ navigate }"
      >
        <span
          @click="navigate"
          class="cursor-pointer bi-arrow-left mr-3"
        ></span>
      </router-link>
      first-app
    </div>
    <div class="flex gap-2">
      <div class="button bg-yellow-600">Deploy</div>
      <div class="button">
        <span class="bi-chevron-down"></span>
      </div>
    </div>
  </div>
</template>
