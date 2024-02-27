<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import { listComponents, ComponentShort } from '@/services/organizations';
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore';
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const components = ref<ComponentShort[]>([])
const store = useBreadCrumbStore()


onMounted(() => {
    listComponents(route.params.organizationId as string, route.params.applicationId as string, route.params.environment as string)
        .then((response) => {
            components.value = response.data.components
        })
        .catch((error) => {
            if (error.response.status === 404) {
                router.push({ name: '404' })
            } else {
                throw (error)
            }
        })
})


</script>

<template>
    <div class="flex gap-2">
        <div class="border border-color py-2 px-4 text-md cursor-pointer rounded-md dark:bg-blue-800"><span
                class="bi-plus mr-2"> Add</span></div>
        <div class="border border-color py-2 px-4 text-md cursor-pointer rounded-md dark:bg-blue-800"><span
                class="bi-grid-fill"></span></div>
        <div class="grow">
            <input placeholder="Search"
                class="w-full py-2 px-4 rounded-md bg-transparent border dark:border-gray-700 border-gray-200"
                type="search" />
        </div>
    </div>
    <div class="relative grow overflow-hidden mt-3">
        <div id="componentsList" class="">
            <div class="py-3 mt-5 border-b border-color">
                <div class="text-lg">Services</div>
            </div>
            <div id="componentsGroupList" class="flex mt-4 gap-3 flex-wrap ">
                <router-link v-for="(c, index) in components" :key="index"
                    :to="{ name: 'componentDetails', params: { componentName: c.name } }" custom v-slot="{ navigate }">
                    <ComponentCard @click="navigate" :component="c" :organizationId="store.organizationId" :applicationId="store.applicationId"
                        :environmentId="store.environment" />
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