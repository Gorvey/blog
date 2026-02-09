<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { ContentNavigationItem } from '@nuxt/content';

/**
 * 接收主导航菜单项
 */
defineProps<{
  items: NavigationMenuItem[];
  subNavItems: NavigationMenuItem[];
  isDocsRoute: boolean | undefined;
}>();

/**
 * 获取注入的侧边栏导航数据
 */
const sideNav = inject<ComputedRef<ContentNavigationItem[]>>('sideNav');
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <!-- 主导航菜单 -->
    <UNavigationMenu :items="items" orientation="vertical" />

    <!-- 分割线 -->
    <USeparator />

    <!-- /docs 路由下的子导航 -->
    <template v-if="isDocsRoute">
      <div class="space-y-4">
        <UNavigationMenu :items="subNavItems" variant="pill" highlight orientation="vertical" />

        <!-- 分割线 -->
        <USeparator />

        <!-- 侧边栏导航 -->
        <UContentNavigation highlight :navigation="sideNav" class="px-2.5" />
      </div>
    </template>
  </div>
</template>
