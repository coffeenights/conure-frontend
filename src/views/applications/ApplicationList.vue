<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBreadCrumbStore } from '../../stores/BreadCrumbStore';

const applications = ref({})
onMounted(() => {
    // update breadcrumb
    const store = useBreadCrumbStore()
    store.application = ''
    store.applicationId = ''
    store.environment = ''
}) 
</script>
<template>
<div class="content-wrapper">
    <div class="p-5">
        <input placeholder="Search" class="w-full pt-2 pb-2 pl-4 pr-4 rounded-md bg-transparent border dark:border-gray-700 border-gray-200" type="search" />
    </div>
    <div class="flex flex-row flex-wrap items-center justify-center gap-5 p-5">
        <div class="cursor-pointer border border-gray-200 dark:bg-gray-900 min-h-[20em] w-64 dark:border-gray-700 shrink-0 rounded-lg flex flex-col items-center justify-center dark:text-gray-300 text-gray-700">
            <span class="bi-plus text-9xl"></span>
            <p>Add Application</p>
        </div>
        <router-link :to="{ name: 'componentList', params: { applicationId: 'asdf' } }" custom v-slot="{ navigate }">
            <div @click="navigate" class="cursor-pointer border border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-[20em] w-64 shrink-0 rounded-lg flex flex-col dark:text-gray-300 text-gray-700 overflow-hidden">
                <div class="bg-green-900 min-h-[9em] min-w-full flex flex-row justify-center items-center">
                    <span class="text-6xl text-gray-300">F</span>
                </div>
                <div class="p-4">
                    <div class="text-lg">first-app</div>
                    <div class="text-xs dark:text-gray-500">2 days since last activity</div>
                    <div class="border-gray-200 dark:border-gray-700 border border-t-[1px] border-b-0 mt-9 h-0"></div>
                    <div class="text-xl flex items-center pt-2 pb-2 justify-center">
                        <div class="grow flex items-center justify-center gap-2">
                            <div class="bi-boxes"></div>
                            <span class="text-sm">100</span>
                        </div>
                        <div class="h-5 w-0 border border-l-0 border-gray-200 dark:border-gray-700"></div>
                        <div class="grow flex items-center justify-center gap-2">
                            <div class="bi-people"></div>
                            <span class="text-sm">3</span>
                        </div>
                        
                    </div>
                    <div class="border border-t-[1px] border-b-0 h-0 border-gray-200 dark:border-gray-700"></div>
                    <div class="flex items-center mt-1 dark:text-gray-500">
                        <div class="text-xs grow">Rev. 105</div>
                        <div class="text-lime-600">
                            <span class="text-xs bi-circle-fill pr-1"></span>
                        </div>
                        <div class="text-xs">active</div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</div>
</template>