<script setup lang="ts">
import SettingsWrapper from './SettingsWrapper.vue'
import { NavMenu, NavItem } from '@/components/ui/vertical-nav'
</script>

<template>
  <SettingsWrapper>
    <div class="relative min-h-lvh grid grid-cols-6">
      <NavMenu class="text-sm">
        <NavItem icon-class="bi-gear" :active="true">General</NavItem>
        <NavItem icon-class="bi-plug">Integrations</NavItem>
        <NavItem icon-class="bi-exclamation-triangle">Limits</NavItem>
        <NavItem icon-class="bi-lock">Security</NavItem>
      </NavMenu>
      <section class="col-span-5"></section>
    </div>
  </SettingsWrapper>
</template>
