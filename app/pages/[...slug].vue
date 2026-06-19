<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import { findPageHeadline } from '@nuxt/content/utils';

definePageMeta({
  layout: 'docs'
});

const route = useRoute();
const { toc } = useAppConfig();
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first()
);
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description']
  });
});

const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
});

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path));
const hasToc = computed(() => Boolean(page.value?.body?.toc?.links?.length));

// @ts-expect-error - 'Docs' component type not registered by nuxt-og-image
defineOgImageComponent('Docs', {
  headline: headline.value
});
</script>

<template>
  <div v-if="page" class="docs-article-layout xl:grid xl:grid-cols-[minmax(0,1fr)_248px]">
    <article class="docs-article-panel min-w-0">
      <UPageHeader
        :title="page.title"
        :description="page.description"
        :headline="headline"
        class="docs-article-header border-b border-default/70 pb-5 [&_h1]:text-3xl [&_h1]:font-semibold [&_p]:text-base"
      >
        <template #links>
          <PageHeaderLinks />
        </template>
      </UPageHeader>

      <div class="docs-article-body prose prose-slate max-w-none pt-6">
        <ContentRenderer v-if="page" :value="page" />
      </div>

      <div v-if="surround?.length" class="docs-article-surround pt-6">
        <USeparator />
        <UContentSurround :surround="surround" class="pt-6" />
      </div>
    </article>

    <aside
      class="docs-toc-column mt-5 xl:mt-0"
      :class="{ 'docs-toc-column-empty': !hasToc }"
      :aria-hidden="!hasToc"
    >
      <UContentToc
        v-if="hasToc"
        :title="toc?.title"
        :links="page.body?.toc?.links"
        class="docs-toc-panel px-4 py-4"
      />
    </aside>
  </div>
</template>
