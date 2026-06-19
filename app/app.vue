<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { Ref, ComponentPublicInstance } from 'vue';

interface FirstDocLike {
  path: string;
}

const { seo } = useAppConfig();
const route = useRoute();
const docsScrollArea = ref<ComponentPublicInstance | HTMLElement | null>(null);
let pendingHashScrollTimer: number | null = null;
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
const files = computed(() => docsFiles.value ?? []);

const resolveDocsScrollElement = () => {
  const articlePanel = document.querySelector('.docs-article-panel');
  if (articlePanel instanceof HTMLElement) {
    return articlePanel;
  }

  const target = docsScrollArea.value;
  if (!target) {
    return null;
  }

  return target instanceof HTMLElement ? target : ((target.$el as HTMLElement | undefined) ?? null);
};

const getHashTarget = (hash: string) => {
  if (!hash) {
    return null;
  }

  const decodedHash = decodeURIComponent(hash.slice(1));
  if (!decodedHash) {
    return null;
  }

  return document.getElementById(decodedHash);
};

const clearPendingHashScroll = () => {
  if (pendingHashScrollTimer) {
    window.clearTimeout(pendingHashScrollTimer);
    pendingHashScrollTimer = null;
  }
};

const syncDocsHashScroll = (hash: string, attempt = 0) => {
  const scrollElement = resolveDocsScrollElement();
  if (!scrollElement) {
    return;
  }

  if (!hash) {
    scrollElement.scrollTo({ top: 0, behavior: attempt === 0 ? 'auto' : 'smooth' });
    return;
  }

  const target = getHashTarget(hash);
  if (!target) {
    if (attempt >= 8) {
      return;
    }

    clearPendingHashScroll();
    pendingHashScrollTimer = window.setTimeout(() => {
      syncDocsHashScroll(hash, attempt + 1);
    }, 80);
    return;
  }

  clearPendingHashScroll();

  const targetTop = target.getBoundingClientRect().top;
  const containerTop = scrollElement.getBoundingClientRect().top;
  const scrollMarginTop =
    Number.parseFloat(window.getComputedStyle(target).scrollMarginTop || '0') || 0;
  const top = scrollElement.scrollTop + targetTop - containerTop - scrollMarginTop;

  scrollElement.scrollTo({
    top: Math.max(0, top),
    behavior: attempt === 0 ? 'auto' : 'smooth'
  });
};

onMounted(() => {
  watch(
    () => route.fullPath,
    async () => {
      if (!isDocsRoute.value) {
        clearPendingHashScroll();
        return;
      }

      await nextTick();
      requestAnimationFrame(() => {
        syncDocsHashScroll(route.hash);
      });
    },
    {
      immediate: true,
      flush: 'post'
    }
  );
});

onBeforeUnmount(() => {
  clearPendingHashScroll();
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
provide<Ref<FirstDocLike | null | undefined>>('firstDoc', firstDoc);
provide<ComputedRef<boolean>>('isDocsRoute', isDocsRoute);
provide<ComputedRef<ContentNavigationItem[]>>('sideNav', sideNav);
</script>

<template>
  <UApp>
    <div class="macos-window">
      <NuxtLoadingIndicator />

      <Header />

      <UMain
        ref="docsScrollArea"
        class="macos-scroll-area"
        :class="{ 'macos-scroll-area-docs': isDocsRoute }"
      >
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UMain>
    </div>

    <!-- <AppFooter /> -->

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
