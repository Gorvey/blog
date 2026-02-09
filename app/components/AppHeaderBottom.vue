<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
/**
 * 获取注入的导航数据
 */
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');
const route = useRoute();

/**
 * 处理一级目录导航项
 * 将 docs 集合的一级目录转换为导航菜单项
 */
const items = computed(() => {
  if (!navigation?.value) {
    return [];
  }

  return navigation.value.map((item) => ({
    label: item.title,
    to: item?.children?.[0]?.path || item.path,
    active: route.path.startsWith(item.path),
    children: undefined
  }));
});
</script>

<template>
  <USeparator class="hidden lg:flex" />

  <UContainer class="hidden lg:flex items-center justify-between py-2">
    <UNavigationMenu :items="items" variant="pill" highlight class="-mx-2.5 -mb-px" />
  </UContainer>
</template>
