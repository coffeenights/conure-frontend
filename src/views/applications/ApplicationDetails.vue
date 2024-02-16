<script setup lang="ts">
import { onMounted } from "vue";
import DetailsHeader from "../../components/DetailsHeader.vue";
import TabNav from "../../components/TabNav.vue";
import { useBreadCrumbStore } from "../../stores/BreadCrumbStore";

onMounted(() => {
    // update breadcrumb
    const store = useBreadCrumbStore()
    store.application = 'first-app'
    store.applicationId = 'asdasd'
    store.environment = 'default'
})
const tabs = [
    { routeName: 'componentList', caption: 'Components' },
    { routeName: 'applicationDetailsVariables', caption: 'Variables' },
    { routeName: 'users', caption: 'Users' },
    { routeName: 'activity', caption: 'Activity' },
] 

const defaultTab = 'componentList'
</script>

<template>
    <div class="content-wrapper p-4 flex flex-col justify-stretch">
        <DetailsHeader />
        <TabNav :tabs=tabs :default=defaultTab />
        <div id="tabsWrapper" class="mt-3 grow flex flex-col">
            <router-view></router-view>
        </div>
    </div>
</template>