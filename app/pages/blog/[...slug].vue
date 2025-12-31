<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'
import { resourceCategories, type Resource } from '~/config/resources/index'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

/**
 * 获取博客文章页面数据
 */
const { data: page } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

/**
 * 获取相邻文章用于导航
 */
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path, {
    fields: ['description']
  })
})

/**
 * 页面 SEO 配置
 */
const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

/**
 * 获取页面标题层级
 */
const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

defineOgImageComponent('Docs', {
  headline: headline.value
})

/**
 * 获取页面的 links 字段
 */
const pageLinks = computed(() => {
  if (!page.value) return []
  return (page.value as any).links || []
})

/**
 * 获取当前文章相关的资源
 * 通过查找资源配置中 post 字段指向当前文章路径的资源
 */
const relatedResources = computed((): Resource[] => {
  const currentPath = route.path
  const resources: Resource[] = []

  for (const category of resourceCategories) {
    for (const collection of category.collections) {
      for (const resource of collection.resources) {
        if (resource.post === currentPath) {
          resources.push(resource)
        }
      }
    }
  }

  return resources
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    >
      <template #links>
        <UButton
          v-for="(link, index) in pageLinks"
          :key="index"
          v-bind="link"
        />

        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <!-- 文章开头显示相关资源 -->
      <div v-if="relatedResources.length" class="mb-8">
        <div class="mb-4">
          <h3 class="text-lg font-semibold">相关资源</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ResourceCard
            v-for="resource in relatedResources"
            :key="resource.url"
            :resource="resource"
          />
        </div>
        <USeparator class="mt-8" />
      </div>

      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="surround?.length || relatedResources.length" />

      <UContentSurround :surround="surround" />

      <!-- 文章末尾显示相关资源 -->
      <div v-if="relatedResources.length" class="mt-8">
        <USeparator class="mb-8" />
        <div class="mb-4">
          <h3 class="text-lg font-semibold">相关资源</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ResourceCard
            v-for="resource in relatedResources"
            :key="resource.url"
            :resource="resource"
          />
        </div>
      </div>
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body?.toc?.links"
      />
    </template>
  </UPage>
</template>
