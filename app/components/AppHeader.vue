<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { header } = useAppConfig();
const route = useRoute();

/**
 * 主导航菜单项配置
 */
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '博客',
    to: '/docs',
    active: route.path.startsWith('/docs')
  },
  {
    label: '资源',
    to: '/resources',
    active: route.path.startsWith('/resources')
  }
]);
</script>

<template>
  <UHeader :to="header?.to || '/'">
    <!-- Logo/Title -->
    <template v-if="header?.logo?.dark || header?.logo?.light || header?.title" #title>
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template v-else #left>
      <NuxtLink :to="header?.to || '/'">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <!-- 中心区域: 导航菜单 -->
    <UNavigationMenu :items="items" />

    <!-- 右侧工具栏 -->
    <template #right>
      <ThemePicker />
      <!-- 搜索按钮(所有屏幕尺寸) -->
      <UContentSearchButton v-if="header?.search" />
      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <!-- 底部一级目录导航 (仅 docs 路由) -->
    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <AppHeaderBottom />
    </template>
  </UHeader>
</template>
