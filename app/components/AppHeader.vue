<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content"
import type { NavigationMenuItem } from "@nuxt/ui"

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation")
const { header } = useAppConfig()
const route = useRoute()

/**
 * 获取博客集合中第一篇文章的路径
 */
const { data: firstBlogPost } = await useAsyncData('first-blog-post', async () => {
  const posts = await queryCollection('blog').order('date', 'DESC').all()
  return posts[0]?._path
})

/**
 * 主导航菜单项配置
 */
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '博客',
    to: firstBlogPost.value || '/blog',
    active: route.path.startsWith('/blog')
  },
  {
    label: '资源',
    to: '/resources',
    active: route.path.startsWith('/resources')
  }
])
</script>

<template>
  <UHeader :to="header?.to || '/'">
    <!-- Logo/Title -->
    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template v-else #left>
      <NuxtLink :to="header?.to || '/'">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <!-- 中心区域: 导航菜单 -->
    <UNavigationMenu :items="items" />

    <!-- 右侧工具栏 -->
    <template #right>
      <ThemePicker />
      <!-- 搜索按钮(所有屏幕尺寸) -->
      <UContentSearchButton v-if="header?.search" />
      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UHeader>
</template>
