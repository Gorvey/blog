<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'
import { resourceCategories } from '~/config/resources/index'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

/**
 * 获取资源文章页面数据
 */
const { data: page } = await useAsyncData(route.path, () => queryCollection('resources').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

/**
 * 获取相邻文章用于导航
 */
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('resources', route.path, {
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
 * 获取关联的资源
 * 通过 frontmatter 中的 link 字段匹配资源
 */
const linkedResource = computed(() => {
  const link = (page.value as any).link
  if (!link) return null

  // 遍历所有分类和集合查找匹配的资源
  for (const category of resourceCategories) {
    for (const collection of category.collections) {
      const resource = collection.resources.find(r => r.url === link)
      if (resource) {
        return resource
      }
    }
  }
  return null
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
      <!-- 关联资源卡片 -->
      <ResourceCardInline
        v-if="linkedResource"
        :resource="linkedResource"
        class="mb-6"
      />
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
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
