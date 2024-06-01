<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue'
import Button from '@/components/ui/button/Button.vue'
import { listComponents, ComponentService } from '@/services/organizations'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { registerError } from '@/services/errors'
import ComponentSearch from './ComponentSearch.vue'

const route = useRoute()
const components = ref<ComponentService[]>([])
const store = useBreadCrumbStore()

const fetchData = () => {
  components.value = []
  listComponents(
    route.params.organizationId as string,
    route.params.applicationId as string,
    route.params.environment as string,
  )
    .then((response) => {
      components.value = response.data.components
    })
    .catch((error) => {
      if (!axios.isAxiosError(error)) {
        registerError(error, {
          title: 'An error occurred',
          description: 'An unexpected error occurred.',
        })
      }
    })
}

watch(() => route.params.environment, fetchData, { immediate: true })
</script>

<template>
  <div class="flex gap-2">
    <Button> <span class="bi-plus mr-1 text-2xl"></span>Add </Button>
    <Button variant="secondary" size="icon">
      <span class="bi-grid-fill text-xl"></span>
    </Button>
    <ComponentSearch
      v-if="components.length > 0"
      :organization-id="store.organizationId"
      :application-id="store.applicationId"
      :environment-id="store.environment"
      :components="components"
    />
  </div>
  <div class="relative grow overflow-hidden mt-3">
    <div id="componentsList" class="">
      <div class="py-3 mt-5 border-b">
        <div class="text-lg">Services</div>
      </div>
      <div id="componentsGroupList" class="flex mt-4 gap-3 flex-wrap">
        <router-link
          v-for="(c, index) in components"
          :key="index"
          v-slot="{ navigate }"
          :to="{ name: 'componentDetails', params: { componentId: c.id } }"
          custom
        >
          <ComponentCard
            :component="c"
            :organization-id="store.organizationId"
            :application-id="store.applicationId"
            :environment-id="store.environment"
            @click="navigate"
          />
        </router-link>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
</style>
