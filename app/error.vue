<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  }
});

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
});

const { data: docsNavigation } = await useAsyncData('error-docs-navigation', () =>
  queryCollectionNavigation('docs')
);

const navigation = computed(() => docsNavigation.value ?? []);

const { data: docsFiles } = useLazyAsyncData(
  'error-docs-search',
  () => queryCollectionSearchSections('docs'),
  {
    server: false
  }
);

const files = computed(() => docsFiles.value ?? []);

provide('navigation', navigation);
provide(
  'isDocsRoute',
  computed(() => false)
);
</script>

<template>
  <UApp>
    <div class="macos-window">
      <NuxtLoadingIndicator />

      <Header />

      <UMain class="macos-scroll-area">
        <div class="flex items-center justify-center min-h-full px-4 py-16">
          <UError :error="error" />
        </div>
      </UMain>
    </div>

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
