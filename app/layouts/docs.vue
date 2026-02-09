<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

/**
 * 获取注入的侧边栏导航数据
 */
const sideNav = inject<ComputedRef<ContentNavigationItem[]>>('sideNav');
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation highlight :navigation="sideNav" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
