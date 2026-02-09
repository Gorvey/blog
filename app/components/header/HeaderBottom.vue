<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

/**
 * 接收一级目录导航项
 */
defineProps<{
  subNavItems: NavigationMenuItem[];
}>();
</script>

<template>
  <USeparator class="hidden lg:flex" />

  <UContainer class="hidden lg:flex items-center justify-between py-2">
    <UNavigationMenu :items="subNavItems" variant="pill" highlight class="-mx-2.5 -mt-2.5" />
  </UContainer>
</template>
