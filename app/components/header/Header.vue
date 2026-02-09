<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { ContentNavigationItem } from '@nuxt/content';

const { header } = useAppConfig();
const route = useRoute();

/**
 * 获取 docs 集合的第一条内容路径
 */
const { data: firstDoc } = useAsyncData('first-doc', () =>
  queryCollection('docs').where('extension', '=', 'md').first()
);
/**
 * 主导航菜单项配置
 */
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

    <UNavigationMenu :items="items" />

    <template #right>
      <ThemePicker />
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
    <template #body>
      <HeaderBody :items="items" :sub-nav-items="subNavItems" :is-docs-route="isDocsRoute" />
    </template>
    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <HeaderBottom :sub-nav-items="subNavItems" />
    </template>
  </UHeader>
</template>
