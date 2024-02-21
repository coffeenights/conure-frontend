<script setup lang="ts">
import { onMounted } from "vue";
import DetailsHeader from "../../components/DetailsHeader.vue";
import TabNav from "../../components/TabNav.vue";
import { useBreadCrumbStore } from "../../stores/BreadCrumbStore";
import { useRoute } from 'vue-router'
import { listApplications } from "../../services/organizations";
const route = useRoute()

onMounted(() => {

})
// log the applicationId coming from the url
console.log(route.params.applicationId)

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