<script setup lang="ts">
const { seo } = useAppConfig();

/**
 * 获取博客集合的导航数据
 */
const { data: blogNavigation } = await useAsyncData('blog-navigation', () =>
  queryCollectionNavigation('blog')
);

/**
 * 合并导航数据
 */
const navigation = computed(() => {
  const nav = [];
  if (blogNavigation.value) {
    nav.push(...blogNavigation.value);
  }

  return nav;
});

/**
 * 获取博客集合的搜索索引数据
 */
const { data: blogFiles } = useLazyAsyncData(
  'blog-search',
  () => queryCollectionSearchSections('blog'),
  {
    server: false
  }
);

/**
 * 合并搜索索引数据
 */
const files = computed(() => {
  const result = [];
  if (blogFiles.value) {
    result.push(...blogFiles.value);
  }

  return result;
});

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'zh-CN'
  }
});

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
});

provide('navigation', navigation);
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <!-- <AppFooter /> -->

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
