<script setup lang="ts">
import DetailsHeader from "../../components/DetailsHeader.vue";
import ApplicationDetailsComponentList from "./ApplicationDetailsComponentList.vue";
</script>

<template>
    <div class="content-wrapper p-4 flex flex-col justify-stretch">
        <DetailsHeader />
        <div id="tabsHeader" class="flex gap-2 border-b mt-3 border-color">
            <div class="mb-[-1px] p-3 cursor-pointer tab-active">Components</div>
            <div class="mb-[-1px] p-3 hover:tab-active cursor-pointer ">Variables</div>
            <div class="mb-[-1px] p-3 hover:tab-active cursor-pointer">Users</div>
            <div class="mb-[-1px] p-3 hover:tab-active cursor-pointer">Activity</div>
        </div>
        <div id="tabsWrapper" class="mt-3 grow flex flex-col">
            <router-view></router-view>
            <!-- <ApplicationDetailsComponentList /> -->
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