<script setup lang="ts">
import { transformToCategories } from '~/types/resources';
import type { ResourceCategory, ResourceCollection, Resource } from '~/types/resources';

/**
 * 搜索结果类型定义
 */
interface SearchResult {
  category: ResourceCategory;
  collection: ResourceCollection;
  resource: Resource;
}

definePageMeta({
  layout: 'default'
});

const route = useRoute();

/**
 * 从 Nuxt Content 获取资源集合数据
 */
const { data: resourceCollections } = await useAsyncData('resource-collections', () =>
  queryCollection('resourceCollections').all()
);

/**
 * 将 Content 数据转换为页面需要的结构
 */
const resourceCategories = computed<ResourceCategory[]>(() => {
  if (!resourceCollections.value) return [];
  return transformToCategories(resourceCollections.value);
});

/**
 * 是否只显示有博客文章的资源
 */
const showOnlyWithBlog = ref(false);

/**
 * 搜索关键词
 */
const searchQuery = ref('');

/**
 * 搜索所有资源（搜索模式下不过滤"只显示有文章"）
 */
const searchResults = computed<SearchResult[]>(() => {
  if (!searchQuery.value.trim()) {
    return [];
  }

  const query = searchQuery.value.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const category of resourceCategories.value) {
    for (const collection of category.collections) {
      for (const resource of collection.resources) {
        const nameMatch = resource.name.toLowerCase().includes(query);
        const descMatch = resource.description?.toLowerCase().includes(query);

        if (nameMatch || descMatch) {
          results.push({ category, collection, resource });
        }
      }
    }
  }

  return results;
});

/**
 * 是否处于搜索模式
 */
const isSearching = computed(() => searchQuery.value.trim().length > 0);

/**
 * 当前激活的一级分类
 */
const activeCategory = ref<string>(
  (route.query.category as string) || resourceCategories.value[0]?.id || ''
);

/**
 * 当前激活的二级集合
 */
const activeCollection = ref<string>((route.query.collection as string) || '');

/**
 * 过滤资源列表
 */
const filterResources = (resources: Resource[]): Resource[] => {
  if (!showOnlyWithBlog.value) {
    return resources;
  }
  return resources.filter((r) => !!r.post);
};

/**
 * 获取当前激活的分类
 */
const currentCategory = computed<ResourceCategory | undefined>(() =>
  resourceCategories.value.find((c) => c.id === activeCategory.value)
);

/**
 * 获取当前激活的集合(带过滤)
 */
const currentCollection = computed<ResourceCollection | undefined>(() => {
  const collection = currentCategory.value?.collections.find(
    (c) => c.id === activeCollection.value
  );
  if (!collection) {
    return undefined;
  }
  return {
    ...collection,
    resources: filterResources(collection.resources)
  };
});

/**
 * 获取带过滤的资源数量
 */
const getResourceCount = (resources: Resource[]): number => {
  return filterResources(resources).length;
};

/**
 * 切换一级分类
 */
const selectCategory = (id: string) => {
  activeCategory.value = id;
};

/**
 * 切换二级集合
 */
const selectCollection = (id: string) => {
  activeCollection.value = id;
};

/**
 * 清除搜索关键词
 */
const clearSearch = () => {
  searchQuery.value = '';
};

/**
 * 初始化时设置默认二级集合
 */
onMounted(() => {
  if (!activeCollection.value && currentCategory.value?.collections?.[0]?.id) {
    activeCollection.value = currentCategory.value.collections[0].id;
  }
});

/**
 * 监听分类变化并更新 URL
 */
watch(activeCategory, () => {
  const category = resourceCategories.value.find((c) => c.id === activeCategory.value);
  if (category?.collections?.[0]?.id) {
    activeCollection.value = category.collections[0].id;
  }
  navigateTo({
    query: {
      category: activeCategory.value,
      collection: activeCollection.value
    }
  });
});

/**
 * 监听集合变化并更新 URL
 */
watch(activeCollection, (newValue) => {
  navigateTo({
    query: { category: activeCategory.value, collection: newValue }
  });
});

/**
 * SEO 配置
 */
useSeoMeta({
  title: '资源合集',
  description: '精选前端开发资源和工具',
  ogTitle: '资源合集',
  ogDescription: '精选前端开发资源和工具'
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageBody>
        <div class="flex flex-col gap-8">
          <!-- 顶部导航区域: 一级分类 -->
          <header class="sticky top-16 z-20 space-y-4">
            <!-- 一级分类按钮组 - 搜索时隐藏 -->
            <div
              class="flex flex-wrap justify-center gap-2 pb-2"
              :style="{ visibility: isSearching ? 'hidden' : 'visible' }"
            >
              <UButton
                v-for="category in resourceCategories"
                :key="category.id"
                :variant="activeCategory === category.id ? 'solid' : 'outline'"
                :color="activeCategory === category.id ? 'primary' : 'neutral'"
                size="md"
                @click="selectCategory(category.id)"
              >
                {{ category.name }}
                <template #trailing>
                  <span class="text-xs opacity-70">
                    {{
                      category.collections.reduce(
                        (sum: number, c: ResourceCollection) => sum + getResourceCount(c.resources),
                        0
                      )
                    }}
                  </span>
                </template>
              </UButton>
            </div>
          </header>

          <!-- 主内容区域: 左侧边栏 + 右侧资源列表 -->
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- 左侧边栏 -->
            <aside class="lg:w-56 shrink-0">
              <div class="sticky top-40 space-y-4">
                <!-- 搜索框 -->
                <UInput
                  v-model="searchQuery"
                  icon="i-lucide-search"
                  placeholder="搜索资源名称或描述..."
                  size="lg"
                >
                  <template #trailing>
                    <UButton
                      v-if="searchQuery"
                      icon="i-lucide-x"
                      color="neutral"
                      variant="ghost"
                      size="sm"
                      @click="clearSearch"
                    />
                  </template>
                </UInput>

                <!-- 二级集合导航 -->
                <UCard v-if="!isSearching && currentCategory">
                  <template #header>
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold text-sm">
                        {{ currentCategory.name }}
                      </h3>
                    </div>
                  </template>

                  <!-- 过滤选项 -->
                  <div class="pb-3">
                    <UCheckbox v-model="showOnlyWithBlog" label="只显示有文章" size="sm" />
                  </div>

                  <!-- 集合列表 -->
                  <nav class="pt-3 space-y-1">
                    <button
                      v-for="collection in currentCategory.collections"
                      :key="collection.id"
                      :class="[
                        'w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-sm transition-colors cursor-pointer',
                        activeCollection === collection.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-muted'
                      ]"
                      :disabled="getResourceCount(collection.resources) === 0"
                      @click="selectCollection(collection.id)"
                    >
                      <span class="truncate">{{ collection.name }}</span>
                      <span
                        :class="[
                          'shrink-0 text-xs',
                          getResourceCount(collection.resources) === 0
                            ? 'text-muted/50'
                            : 'text-muted'
                        ]"
                      >
                        {{ getResourceCount(collection.resources) }}
                      </span>
                    </button>
                  </nav>
                </UCard>
              </div>
            </aside>

            <!-- 右侧内容区 -->
            <main class="flex-1 min-w-0">
              <!-- 搜索结果视图 -->
              <section v-if="isSearching" class="space-y-6">
                <div v-if="searchResults.length > 0">
                  <p class="text-muted mb-4">
                    找到
                    <span class="font-semibold text-foreground">{{ searchResults.length }}</span>
                    个资源
                  </p>

                  <div
                    class="grid gap-4"
                    style="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))"
                  >
                    <div
                      v-for="result in searchResults"
                      :key="result.resource.url"
                      class="space-y-2"
                    >
                      <!-- 分类/集合面包屑 -->
                      <div class="flex items-center gap-2 text-xs text-muted">
                        <span class="font-medium">{{ result.category.name }}</span>
                        <UIcon name="i-lucide-chevron-right" class="w-3 h-3" />
                        <span>{{ result.collection.name }}</span>
                      </div>
                      <ResourceCard :resource="result.resource" />
                    </div>
                  </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="text-center py-16">
                  <div class="flex flex-col items-center gap-4">
                    <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <UIcon name="i-lucide-search-x" class="w-8 h-8 text-muted" />
                    </div>
                    <div class="space-y-1">
                      <p class="font-medium">没有找到匹配的资源</p>
                      <p class="text-sm text-muted">尝试使用其他关键词搜索</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 常规视图: 资源集合 -->
              <section v-else-if="currentCollection" class="space-y-6">
                <!-- 集合描述 -->
                <div
                  v-if="currentCollection.description"
                  class="prose prose-sm dark:prose-invert max-w-none"
                >
                  <p class="text-muted">{{ currentCollection.description }}</p>
                </div>

                <!-- 资源卡片网格 -->
                <div
                  v-if="currentCollection.resources.length > 0"
                  class="grid gap-4"
                  style="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))"
                >
                  <ResourceCard
                    v-for="resource in currentCollection.resources"
                    :key="resource.url"
                    :resource="resource"
                  />
                </div>

                <!-- 空状态 -->
                <div v-else class="text-center py-16">
                  <div class="flex flex-col items-center gap-4">
                    <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <UIcon name="i-lucide-folder-open" class="w-8 h-8 text-muted" />
                    </div>
                    <div class="space-y-1">
                      <p class="font-medium">该集合暂无资源</p>
                      <p class="text-sm text-muted">关闭"只显示有文章"筛选查看更多</p>
                    </div>
                    <UButton
                      v-if="showOnlyWithBlog"
                      color="neutral"
                      variant="outline"
                      size="sm"
                      @click="showOnlyWithBlog = false"
                    >
                      显示所有资源
                    </UButton>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
