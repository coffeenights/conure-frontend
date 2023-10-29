<script setup lang="ts">
import DetailsHeader from "../../components/DetailsHeader.vue";
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const tabItem = ref('applicationDetailsComponentList')
function setTab(tab: string) {
    tabItem.value = tab
    router.push({name: tab})
}
function isActive(tab: string): boolean {
    return tabItem.value == tab
}
// Redirect to components list if path is not specified
if (router.currentRoute.value.name == 'applicationDetails') {
    setTab('applicationDetailsComponentList')
}

</script>

<template>
    <div class="content-wrapper p-4 flex flex-col justify-stretch">
        <DetailsHeader />
        <div id="tabsHeader" class="flex gap-2 border-b mt-3 border-color">
            <div @click="setTab('applicationDetailsComponentList')" class="mb-[-1px] p-3 cursor-pointer" :class="{'tab-active': isActive('applicationDetailsComponentList')}">Components</div>
            <div @click="setTab('applicationDetailsVariables')" class="mb-[-1px] p-3 hover:tab-active cursor-pointer" :class="{'tab-active': isActive('applicationDetailsVariables')}">Variables</div>
            <div @click="setTab('users')" class="mb-[-1px] p-3 hover:tab-active cursor-pointer" :class="{'tab-active': isActive('users')}">Users</div>
            <div @click="setTab('activity')" class="mb-[-1px] p-3 hover:tab-active cursor-pointer" :class="{'tab-active': isActive('activity')}">Activity</div>
        </div>
        <div id="tabsWrapper" class="mt-3 grow flex flex-col">
            <router-view></router-view>
        </div>
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