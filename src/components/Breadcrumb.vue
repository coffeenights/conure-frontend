<script setup lang="ts">
import { useBreadCrumbStore } from '../stores/BreadCrumbStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { detailOrganization } from '../services/organizations';
const route = useRoute()
const router = useRouter()
const store = useBreadCrumbStore()
let organization = ref('')
let application = ref('')
let environment = ref('')

onMounted(() => {
    if (route.params.organizationId) {
        organization.value = route.params.organizationId as string
        detailOrganization(route.params.organizationId as string)
            .then((response) => {
                organization.value = response.data.name
                store.organization = response.data.name
                store.organizationId = response.data.id
            })
            .catch((error) => {
                console.log(error)
            })
    }
})

watch([() => store.organization, () => store.application, () => store.environment], async ([newOrganization, newApplication, newEnvironment]) => {
    organization.value = newOrganization
    application.value = newApplication
    environment.value = newEnvironment
})

</script>
<template>
    <div class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500  transition duration-500 inline-block mr-2">
        <label class="mr-2 cursor-pointer">{{ organization }}</label>
    </div>
    <label class="text-gray-400 dark:text-gray-700 mr-2">/</label>
    <div class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500  transition duration-500 inline-block mr-2">
        <label class="mr-2 cursor-pointer">
            <i class="bi bi-diagram-3 cursor-pointer pr-1"></i>
            {{ application }}
        </label>
        <i class="bi-chevron-down cursor-pointer"></i>
    </div>
    <div v-if="environment" class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500  transition duration-500 inline-block mr-2">
        <label class="mr-2 cursor-pointer">{{ environment }}</label>
        <i class="bi-chevron-down cursor-pointer"></i>
    </div>
</template>