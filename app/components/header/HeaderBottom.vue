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
  <div class="docs-subnav hidden lg:block">
    <nav class="docs-subnav-inner" aria-label="Docs sections">
      <div class="docs-subnav-track">
        <NuxtLink
          v-for="item in subNavItems"
          :key="item.to"
          :to="item.to"
          class="docs-subnav-link"
          :class="{ 'docs-subnav-link-active': item.active }"
        >
          <UIcon v-if="item.icon" :name="item.icon as string" class="docs-subnav-icon" />
          <span class="truncate">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>
