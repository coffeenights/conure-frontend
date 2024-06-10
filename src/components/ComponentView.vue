<script setup lang="ts">

import {Button} from "@/components/ui/button";
</script>

<template>
  <div
    id="componentDetails"
    class="p-3 rounded-md border absolute top-0 left-0 w-full h-full bg-card overflow-y-scroll"
  >
    <div class="flex justify-end">
      <router-link v-slot="{ navigate }" :to="{ name: 'componentList' }" custom>
        <Button variant="ghost" size="icon" @click="navigate">
          <span class="bi-x-lg"></span>
        </Button>
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>

