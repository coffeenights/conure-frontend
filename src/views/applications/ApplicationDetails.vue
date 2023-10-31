<script setup lang="ts">
import DetailsHeader from "../../components/DetailsHeader.vue";
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const tabItem = ref('componentList')
function setTab(tab: string) {
    tabItem.value = tab
    router.push({name: tab})
}
function isActive(tab: string): boolean {
    return tabItem.value == tab
}
</script>

<template>
    <div class="content-wrapper p-4 flex flex-col justify-stretch">
        <DetailsHeader />
        <div id="tabsHeader" class="flex gap-2 border-b mt-3 border-color">
            <div @click="setTab('componentList')" class="mb-[-1px] p-3 cursor-pointer" :class="{'tab-active': isActive('componentList')}">Components</div>
            <div @click="setTab('applicationDetailsVariables')" class="mb-[-1px] p-3 hover:tab-active cursor-pointer" :class="{'tab-active': isActive('applicationDetailsVariables')}">Variables</div>
            <div @click="setTab('users')" class="mb-[-1px] p-3 hover:tab-active cursor-pointer" :class="{'tab-active': isActive('users')}">Users</div>
            <div @click="setTab('activity')" class="mb-[-1px] p-3 hover:tab-active cursor-pointer" :class="{'tab-active': isActive('activity')}">Activity</div>
        </div>
        <div id="tabsWrapper" class="mt-3 grow flex flex-col">
            <router-view></router-view>
        </div>
    </div>
</template>