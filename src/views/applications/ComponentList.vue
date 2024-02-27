<script setup lang="ts">
import { listComponents, ComponentShort } from '@/services/organizations';
import { getIconPath } from '@/utils';
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const show = ref(false)
const components = ref<ComponentShort[]>([])


onMounted(() => {
    listComponents(route.params.organizationId as string, route.params.applicationId as string, route.params.environment as string)
        .then((response) => {
            components.value = response.data.components
        })
        .catch((error) => {
            if (error.response.status === 404) {
                router.push({ name: '404' })
            } else {
                throw(error)
            }
        })
})


</script>

<template>
    <div class="flex gap-2">
        <div class="border border-color py-2 px-4 text-md cursor-pointer rounded-md dark:bg-blue-800"><span class="bi-plus mr-2"> Add</span></div>
        <div class="border border-color py-2 px-4 text-md cursor-pointer rounded-md dark:bg-blue-800"><span class="bi-grid-fill"></span></div>
        <div class="grow">        
            <input placeholder="Search" class="w-full py-2 px-4 rounded-md bg-transparent border dark:border-gray-700 border-gray-200" type="search" />
        </div>
    </div>
    <div class="relative grow overflow-hidden mt-3">
        <div id="componentsList" class="">
            <div class="py-3 mt-5 border-b border-color">
                <div class="text-lg">Services</div>
            </div>
            <div id="componentsGroupList" class="flex mt-4 gap-3 flex-wrap ">
                <router-link v-for="(c, index) in components" :key="index" :to="{ name: 'componentDetails', params: { componentName: c.name } }" custom v-slot="{ navigate }">
                <div @click="navigate" class="w-80 h-40 border border-color rounded-md p-3 cursor-pointer">
                    <div class="flex">
                        <div class="grow">
                            <img :src="getIconPath(c.type)" class="w-10 h-12"/>
                        </div>
                        <div>
                            <img src="@/assets/icons/docker.svg" class="w-10 h-12"/>
                        </div>
                    </div>
                    <div class="mt-3 pb-2 border-b border-color">
                        <div class="font-bold text-lg">{{ c.name }}</div>
                        <div class="font-bold text-xs text-gray-500">Last update 4 hours ago</div>
                    </div>
                    <div class="flex items-center mt-1 justify-end">
                        <div class="text-lime-600">
                            <span class="text-xs bi-circle-fill pr-2"></span>
                        </div>
                        <div class="text-xs">active</div>
                    </div>
                </div>
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