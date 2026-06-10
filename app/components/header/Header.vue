<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { ContentNavigationItem } from '@nuxt/content';
import type { Ref } from 'vue';

interface FirstDocLike {
  path: string;
}

const { header } = useAppConfig();
const route = useRoute();
/**
 * 主导航菜单项配置
 */
const firstDoc = inject<Ref<FirstDocLike | null | undefined>>('firstDoc', ref(null));

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '笔记',
    to: firstDoc.value?.path || '/docs',
    icon: 'i-lucide-book-open',
    active: route.path.startsWith('/docs')
  },
  {
    label: '资源',
    to: '/resources',
    icon: 'i-lucide-folder',
    active: route.path.startsWith('/resources')
  }
]);

/**
 * 获取注入的导航数据
 */
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');
const isDocsRoute = inject<ComputedRef<boolean>>('isDocsRoute');

/**
 * 处理一级目录导航项
 * 将 docs 集合的一级目录转换为导航菜单项
 */
const subNavItems = computed(() => {
  if (!navigation?.value) {
    return [];
  }

  return navigation.value.map((item) => ({
    label: item.title,
    to: item?.children?.[0]?.path || item.path,
    active: route.path.startsWith(item.path),
    icon: item.icon,
    children: undefined
  }));
});
</script>

<template>
  <UHeader :to="header?.to || '/'" class="macos-toolbar">
    <template #left>
      <div class="flex items-center gap-4">
        <div class="macos-traffic-lights hidden sm:inline-flex" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <NuxtLink :to="firstDoc?.path || header?.to || '/docs'" class="flex items-center">
          <AppLogo class="w-auto h-8 shrink-0" />
        </NuxtLink>
      </div>
    </template>

    <UNavigationMenu :items="items" variant="pill" class="macos-main-switcher hidden md:flex" />

    <template #right>
      <div class="macos-toolbar-actions">
        <ThemePicker class="macos-toolbar-action hidden sm:inline-flex" />
        <UContentSearchButton v-if="header?.search" class="macos-toolbar-action" />
        <UColorModeButton v-if="header?.colorMode" class="macos-toolbar-action" />
        <template v-if="header?.links">
          <UButton
            v-for="(link, index) of header.links"
            :key="index"
            class="macos-toolbar-action hidden sm:inline-flex"
            v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          />
        </template>
      </div>
    </template>

    <template #body>
      <HeaderBody :items="items" :sub-nav-items="subNavItems" :is-docs-route="isDocsRoute" />
    </template>

    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <HeaderBottom :sub-nav-items="subNavItems" />
    </template>
  </UHeader>
</template>
