<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import PageNotFound from '../views/404.vue'
</script>

<template>
    <div class="row">
        <Sidebar />
        <div class="col main">
            <main class="row">
                <Navbar />
            </main>
            <div class="row d-flex justify-content-center main-content-wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>