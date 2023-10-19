<script setup lang="ts">
import { useBreadCrumbStore } from '../stores/BreadCrumbStore';
useBreadCrumbStore();
</script>
<template>
    <div class="cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg mt-1 p-2 hover:border-gray-500 dark:hover:border-gray-500  transition duration-500 inline-block mr-2">
        <label class="mr-2 cursor-pointer">{{ $attrs.title }}</label>
        <i class="bi-chevron-down cursor-pointer "></i>
    </div>
</template>