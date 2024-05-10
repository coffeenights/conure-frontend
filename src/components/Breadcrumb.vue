<script setup lang="ts">
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {detailApplication, Environment} from "@/services/organizations";

const store = useBreadCrumbStore()
const router = useRouter()
const route = useRoute()
const organization = ref(store.organization)
const application = ref(store.application)
const environment = ref(store.environment)
const envList = ref([] as Environment[])

watch(
  () => store.organization,
  (newOrganization) => {
    organization.value = newOrganization
  },
)
watch(
  () => store.application,
  (newApplication) => {
    application.value = newApplication
  },
)
watch(
  () => store.environment,
  (newEnvironment) => {
    environment.value = newEnvironment
  },
)

const goToApplications = (oId: string) => {
  if (route.name === 'applications') {
    return
  }
  router.push({
    name: 'applications',
    params: { organizationId: oId },
  })
}

const goToComponents = (oId: string, aId: string) => {
  if (route.name === 'componentList') {
    return
  }
  router.push({
    name: 'componentList',
    params: {
      organizationId: oId,
      applicationId: aId,
    },
  })
}

const onEnvMenuOpen = (isOpen: boolean) => {
  if (!isOpen) {
    return
  }
  detailApplication(store.organizationId, store.applicationId, store.environment)
    .then((response) => {
      envList.value = response.data.environments
    })
    .catch((error) => {
      console.log(error)
    })
}

const onEnvSelect = (env: Environment) => {
  if (env.name === store.environment) {
    return
  }
  store.environment = env.name
  router.push({
    name: 'componentList',
    params: {
      organizationId: store.organizationId,
      applicationId: store.applicationId,
      environment: env.name,
    },
  })
}
</script>
<template>
  <div
    v-if="organization"
    class="cursor-pointer border rounded-lg mt-1 p-2.5 hover:border-ring transition duration-500 sm:inline-block mr-2 hidden sm:visible"
    @click="goToApplications(store.organizationId)"
  >
    <label class="mr-2 cursor-pointer">{{ organization }}</label>
  </div>
  <label class="mr-2 hidden sm:visible">/</label>
  <div
    v-if="organization"
    class="cursor-pointer border rounded-lg mt-1 p-2.5 hover:border-ring transition duration-500 inline-block mr-2"
    @click="goToComponents(store.organizationId, store.applicationId)"
  >
    <label class="mr-2 cursor-pointer">
      <i class="bi bi-diagram-3 cursor-pointer pr-1"></i>
      {{ application }}
    </label>
  </div>
  <DropdownMenu @update:open="onEnvMenuOpen" >
    <DropdownMenuTrigger>
      <div
        v-if="environment && organization"
        class="cursor-pointer border rounded-lg mt-1 p-2.5 hover:border-ring transition duration-500 inline-block mr-2"
      >
        <label class="mr-2 cursor-pointer">{{ environment }}</label>
        <i class="bi-chevron-down cursor-pointer"></i>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="env in envList" :key="env.id" class="cursor-pointer" @select="onEnvSelect(env)">
        {{ env.name }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

</template>
