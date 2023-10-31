<script setup lang="ts">
import ComponentDetailsTab from './ComponentDetailsTab.vue'
defineProps(['show'])
</script>
<template>
    <div d="componentDetails" class="p-3 rounded-md border border-color absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-900 overflow-y-scroll">
        <div class="flex">
            <div class="grow text-lg">api-server</div>
            <router-link :to="{ name: 'componentList' }" custom v-slot="{ navigate }">
                <div @click="navigate" class="text-md cursor-pointer">X</div>
            </router-link>
        </div>
        <div class="flex flex-col h-full">
            <div id="componentTabsHeader" class="flex gap-2 border-b mt-3 border-color">
                <div class="mb-[-1px] p-3 cursor-pointer tab-active">Details</div>
                <div class="mb-[-1px] p-3 hover:tab-active cursor-pointer">Settings</div>
            </div>
            <div id="componentTabsContent" class="mt-4 h-full">
                <router-view></router-view>
            </div>
            
        </div>
    </div>
</template>