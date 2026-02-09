<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

useHead({
  htmlAttrs: {
    lang: 'en'
  }
});

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
});

const { data: docsNavigation } = await useAsyncData('error-docs-navigation', () =>
  queryCollectionNavigation('docs')
);
const { data: resourcesNavigation } = await useAsyncData('error-resources-navigation', () =>
  queryCollectionNavigation('resources')
);

const navigation = computed(() => {
  const nav = [];
  if (docsNavigation.value) {
    nav.push(...docsNavigation.value);
  }
  if (resourcesNavigation.value) {
    nav.push(...resourcesNavigation.value);
  }
  return nav;
});

const { data: docsFiles } = useLazyAsyncData(
  'error-docs-search',
  () => queryCollectionSearchSections('docs'),
  {
    server: false
  }
);

const { data: resourcesFiles } = useLazyAsyncData(
  'error-resources-search',
  () => queryCollectionSearchSections('resources'),
  {
    server: false
  }
);

const files = computed(() => {
  const result = [];
  if (docsFiles.value) {
    result.push(...docsFiles.value);
  }
  if (resourcesFiles.value) {
    result.push(...resourcesFiles.value);
  }
  return result;
});

provide('navigation', navigation);
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
