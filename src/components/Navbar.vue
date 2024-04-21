<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import CompanyLogo from '../components/CompanyLogo.vue'
</script>
<template>
  <nav
    class="bg-card h-16 shadow-sm min-w-max sticky top-0 border-b z-10"
  >
    <div class="flex flex-row items-center">
      <div class="logo mr-6 w-12 ml-3">
        <CompanyLogo />
      </div>
      <div class="breadcrumbs">
        <Breadcrumb />
      </div>
      <div class="profile"></div>
    </div>
  </nav>
</template>
