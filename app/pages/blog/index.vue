<script setup lang="ts">
/**
 * 博客列表页面
 * 展示所有博客文章，支持分页、筛选和排序
 */
import type { BlogPostProps } from '#ui/types';

definePageMeta({
  layout: 'default'
});

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const itemsPerPage = 10;

/**
 * 筛选条件
 */
const selectedCategory = ref<string>('');
const selectedTag = ref<string>('');

/**
 * 获取所有博客文章
 */
const { data: allPosts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').where('id', 'LIKE', '%.md').order('date', 'DESC').all()
);

/**
 * 过滤后的文章
 */
const filteredPosts = computed(() => {
  if (!allPosts.value) return [];
  let posts = allPosts.value;

  // 按分类筛选
  if (selectedCategory.value) {
    posts = posts.filter((post) => post.category === selectedCategory.value);
  }

  // 按标签筛选
  if (selectedTag.value) {
    posts = posts.filter((post) => post.tags?.includes(selectedTag.value));
  }

  return posts;
});

/**
 * 获取所有分类
 */
const categories = computed(() => {
  if (!allPosts.value) return [];
  const cats = new Set<string>();
  allPosts.value.forEach((post) => {
    if (post.category) cats.add(post.category);
  });
  return Array.from(cats).sort();
});

/**
 * 获取所有标签
 */
const tags = computed(() => {
  if (!allPosts.value) return [];
  const tagSet = new Set<string>();
  allPosts.value.forEach((post) => {
    post.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
});

/**
 * 总数
 */
const total = computed(() => filteredPosts.value.length);

/**
 * 当前页的文章
 */
const posts = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPosts.value.slice(start, end);
});

/**
 * 转换为 BlogPost 组件需要的格式
 */
const blogPosts = computed<BlogPostProps[]>(() => {
  return posts.value.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    to: post.path,
    badge: post.category
  }));
});

/**
 * 分页跳转函数
 */
function toPage(pageNum: number) {
  return {
    path: route.path,
    query: {
      page: pageNum,
      category: selectedCategory.value || undefined,
      tag: selectedTag.value || undefined
    }
  };
}

/**
 * 重置筛选条件
 */
function resetFilters() {
  selectedCategory.value = '';
  selectedTag.value = '';
  page.value = 1;
}

/**
 * 监听筛选条件变化，重置页码
 */
watch([selectedCategory, selectedTag], () => {
  page.value = 1;
});

/**
 * 监听路由参数变化
 */
watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage || 1);
  }
);

useSeoMeta({
  title: '博客',
  description: '技术文章与学习笔记'
});
</script>

<template>
  <UPage>
    <UPageHeader class="px-4 sm:px-6 lg:px-8" title="博客" description="技术文章与学习笔记" />

    <UPageBody>
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- 左侧：文章列表 -->
          <div class="lg:col-span-3">
            <UBlogPosts v-if="blogPosts.length > 0" orientation="vertical">
              <UBlogPost v-for="(post, index) in blogPosts" :key="index" v-bind="post" />
            </UBlogPosts>

            <UEmpty
              v-else
              icon="i-lucide-file-text"
              title="暂无文章"
              description="没有找到符合条件的文章"
            >
              <template #footer>
                <UButton @click="resetFilters"> 清除筛选条件 </UButton>
              </template>
            </UEmpty>

            <div v-if="total > itemsPerPage" class="mt-8 flex justify-center">
              <UPagination
                v-model:page="page"
                :total="total"
                :items-per-page="itemsPerPage"
                :to="toPage"
                show-edges
              />
            </div>
          </div>

          <!-- 右侧：筛选 -->
          <div class="lg:col-span-1">
            <div class="sticky top-4 space-y-6">
              <!-- 分类筛选 -->
              <UCard>
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold">分类</h3>
                    <UButton
                      v-if="selectedCategory"
                      icon="i-lucide-x"
                      size="xs"
                      color="neutral"
                      variant="ghost"
                      @click="selectedCategory = ''"
                    />
                  </div>
                </template>

                <div class="space-y-2">
                  <UButton
                    v-for="category in categories"
                    :key="category"
                    :variant="selectedCategory === category ? 'solid' : 'ghost'"
                    :color="selectedCategory === category ? 'primary' : 'neutral'"
                    block
                    @click="selectedCategory = category"
                  >
                    {{ category }}
                  </UButton>
                </div>
              </UCard>

              <!-- 标签筛选 -->
              <UCard>
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold">标签</h3>
                    <UButton
                      v-if="selectedTag"
                      icon="i-lucide-x"
                      size="xs"
                      color="neutral"
                      variant="ghost"
                      @click="selectedTag = ''"
                    />
                  </div>
                </template>

                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in tags"
                    :key="tag"
                    :variant="selectedTag === tag ? 'solid' : 'subtle'"
                    :color="selectedTag === tag ? 'primary' : 'neutral'"
                    class="cursor-pointer"
                    @click="selectedTag = tag"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </UCard>

              <!-- 重置按钮 -->
              <UButton
                v-if="selectedCategory || selectedTag"
                icon="i-lucide-rotate-ccw"
                block
                @click="resetFilters"
              >
                重置筛选
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
