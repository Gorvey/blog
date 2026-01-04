<script setup lang="ts">
/**
 * 首页
 * 显示欢迎信息和最新内容
 */
import type { BlogPostProps } from '#ui/types';

const { data: page } = await useAsyncData('index', () =>
  queryCollection('landing').path('/').first()
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
});

/**
 * 获取最新博客文章（前3篇）
 */
const { data: latestPosts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog').where('id', 'LIKE', '%.md').order('date', 'DESC').limit(3).all()
);

/**
 * 转换为 BlogPost 组件格式
 */
const blogPosts = computed<BlogPostProps[]>(() => {
  if (!latestPosts.value) return [];
  return latestPosts.value.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    to: post.path,
    badge: post.category
  }));
});
</script>

<template>
  <div>
    <!-- Hero 区域：渲染 content/index.md -->
    <ContentRenderer v-if="page" :value="page" :prose="false" />

    <!-- 最新博客文章 -->
    <UContainer class="py-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">最新文章</h2>
        <UButton to="/blog" variant="ghost" trailing-icon="i-lucide-arrow-right">
          查看全部
        </UButton>
      </div>

      <UBlogPosts v-if="blogPosts.length > 0" orientation="vertical">
        <UBlogPost v-for="(post, index) in blogPosts" :key="index" v-bind="post" />
      </UBlogPosts>

      <UEmpty v-else icon="i-lucide-file-text" title="暂无文章" description="还没有发布任何文章" />
    </UContainer>
  </div>
</template>
