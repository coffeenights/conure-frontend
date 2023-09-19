<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import PageNotFound from '../views/404.vue'
</script>

<template>
    <Navbar />
    <section class="min-h-full">
        <div class="flex flex-col gap-1 items-center">
            <div class="h-40 bg-white shadow-sm rounded-lg md:w-4/5 md:min-w-0 min-w-full mt-10 border border-gray-200">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>