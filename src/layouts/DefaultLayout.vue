<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>

<template>
    <Navbar />
    <section>
        <div class="flex flex-col items-center">
            <router-view></router-view>
        </div>
    </section>
</template>