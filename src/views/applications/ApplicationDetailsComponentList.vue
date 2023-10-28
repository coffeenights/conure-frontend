<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
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
            <div id="componentsGroupList" class="flex mt-4 gap-3">
                <div @click="show = !show" class="w-80 h-40 border border-color rounded-md p-3 cursor-pointer">
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
            </div>
        </div>
        <Transition>
        <div v-if="show" id="componentDetails" class="p-3 rounded-md border border-color absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-900 overflow-y-scroll">
            <div class="flex">
                <div class="grow text-lg">api-server</div>
                <div @click="show = !show" class="text-md cursor-pointer">X</div>
            </div>
            <div class="flex flex-col h-full">
                <div id="componentTabsHeader" class="flex gap-2 border-b mt-3 border-color">
                    <div class="mb-[-1px] p-3 cursor-pointer tab-active">Details</div>
                    <div class="mb-[-1px] p-3 hover:tab-active cursor-pointer">Settings</div>
                </div>
                <div id="componentTabsContent" class="mt-4 h-full">
                    <div class="text-lg col-start-1 col-span-2 md:row-start-1 mb-3"><span class="bi-globe mr-2"></span>Web Service</div>
                    <div class="grid md:grid-cols-2 md:grid-component-details grid-cols-1 h-full gap-4">
                        <div class="mt-1 gap-2 col-start-1 flex flex-wrap h-fit">
                            <div class="grow text-sm grid grid-cols-2 gap-y-4">
                                <div class="text-gray-500">Last activity:</div>
                                <div class="">3 days ago</div>
                                <div class="text-gray-500">External Ip:</div>
                                <div class="">192.168.1.50</div>
                                <div class="text-gray-500">Image:</div>
                                <div class="">nginx/nginx:latest</div>
                                <div class="text-gray-500">Addresses:</div>
                                <ul>
                                    <li class="">http://192.168.1.50:8010</li>
                                    <li class="">https://192.168.1.50:8010</li>
                                </ul>
                            </div>
                            <div class="grow text-sm grid grid-cols-2 gap-y-4">
                                <div class="text-gray-500">Creation time:</div>
                                <div class="">4 days ago</div>
                                <div class="text-gray-500">Status:</div>
                                <div class="">Active</div>
                                <div class="text-gray-500">Ports:</div>
                                <ul>
                                    <li>8010 TCP</li>
                                    <li>9010 TCP</li>
                                </ul>
                            </div>
                        </div>
                        <div class="md:col-start-2 grid grid-cols-2 text-sm h-fit gap-y-4">
                            <div class="text-gray-500">CPU:</div>
                            <div class="">
                                <input class="py-2 px-2 rounded-md bg-transparent border border-color w-14 text-center" />
                            </div>
                            <div class="text-gray-500">Memory:</div>
                            <div class="">
                                <input class="py-2 px-2 rounded-md bg-transparent border border-color w-14 text-center" />
                            </div>
                            <div class="text-gray-500">Replicas:</div>
                            <div class="">
                                <input class="py-2 px-2 rounded-md bg-transparent border border-color w-14 text-center" />
                            </div>
                        </div>
                        <div class="bg-black md:row-start-2 col-start-1 md:col-span-2">
                                asdasdasd
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        </Transition>
    </div>
</template>