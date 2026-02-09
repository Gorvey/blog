<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const route = useRoute();
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');

const nav = computed(() => {
  if (!navigation?.value) {
    return [];
  }

  // 查找当前路由匹配的一级目录
  const currentTopLevel = navigation.value.find((item) => route.path.startsWith(item.path));

  return currentTopLevel?.children || [];
});
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation highlight :navigation="nav" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
