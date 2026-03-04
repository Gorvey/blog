<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { Ref } from 'vue';

interface FirstDocLike {
  path: string;
}

const { seo } = useAppConfig();
const route = useRoute();
/**
 * 获取 docs 集合的第一条内容路径
 */
const { data: firstDoc } = await useAsyncData<FirstDocLike | null>('first-doc', () =>
  queryCollection('docs').where('extension', '=', 'md').first()
);
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
const isDocsRoute = computed(() => route.path.startsWith('/docs'));

/**
 * 根路径统一重定向到 docs 第一篇文档
 */
const redirectRootToFirstDoc = async () => {
  if (route.path !== '/') {
    return;
  }

  const targetPath = firstDoc.value?.path;
  if (!targetPath || targetPath === '/') {
    return;
  }

  await navigateTo(targetPath, {
    replace: true,
    redirectCode: 301
  });
};

await redirectRootToFirstDoc();
watch(
  () => route.path,
  async () => {
    await redirectRootToFirstDoc();
  }
);

/**
 * 侧边栏导航数据
 * 查找当前路由匹配的一级目录
 */
const sideNav = computed(() => {
  if (!navigation.value) {
    return [];
  }

  const currentTopLevel = navigation.value.find((item) => route.path.startsWith(item.path));

  return currentTopLevel?.children || [];
});

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

/**
 * 文档页面时增加 header 高度
 */
const docsPageStyle = computed(() =>
  isDocsRoute.value
    ? [
        {
          innerHTML: `
@media (min-width: 1024px) {
  :root {
    --ui-header-height: 112px;
  }
}
        `
        }
      ]
    : []
);

useHead({
  style: docsPageStyle
});

provide('navigation', navigation);
provide<Ref<FirstDocLike | null | undefined>>('firstDoc', firstDoc);
provide<ComputedRef<boolean>>('isDocsRoute', isDocsRoute);
provide<ComputedRef<ContentNavigationItem[]>>('sideNav', sideNav);
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <Header />

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
