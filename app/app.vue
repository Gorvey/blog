<script setup lang="ts">
const { seo } = useAppConfig();

/**
 * 获取文档集合的导航数据
 */
const { data: docsNavigation } = await useAsyncData('docs-navigation', () =>
  queryCollectionNavigation('docs')
);

/**
 * 合并导航数据
 */
const navigation = computed(() => {
  const docsNav = docsNavigation.value?.find((item) => item.path === '/docs');
  return docsNav?.children || [];
});

/**
 * 获取文档集合的搜索索引数据
 */
const { data: docsFiles } = useLazyAsyncData(
  'docs-search',
  () => queryCollectionSearchSections('docs'),
  {
    server: false
  }
);

/**
 * 合并搜索索引数据
 */
const files = computed(() => {
  const result = [];
  if (docsFiles.value) {
    result.push(...docsFiles.value);
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
