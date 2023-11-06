<script setup lang="ts">
import ComponentDetails from "./ComponentDetails.vue";
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const show = ref(false)

if (route.query.componentId != undefined ) {
    console.log('aqui')
}
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
                <router-link :to="{ name: 'componentDetails', params: { componentId: 'asd' } }" custom v-slot="{ navigate }">
                <div @click="navigate" class="w-80 h-40 border border-color rounded-md p-3 cursor-pointer">
                    <div class="flex">
                        <div class="grow">
                            <img src="../../assets/img/aws_rds_dark.svg" class="w-10"/>
                        </div>
                        <div>
                            <img src="../../assets/img/aws_logo_dark.svg" class="w-14"/>
                        </div>
                    </div>
                    <div class="mt-3 pb-2 border-b border-color">
                        <div class="font-bold text-lg">api-db</div>
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