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

watch(
  resourceCategories,
  (categories) => {
    if (!categories.length) {
      return;
    }

    if (
      !activeCategory.value ||
      !categories.some((category) => category.id === activeCategory.value)
    ) {
      activeCategory.value = categories[0]?.id || '';
    }

    const category = categories.find((item) => item.id === activeCategory.value);
    if (
      category?.collections?.length &&
      (!activeCollection.value ||
        !category.collections.some((collection) => collection.id === activeCollection.value))
    ) {
      activeCollection.value = category.collections[0]?.id || '';
    }
  },
  { immediate: true }
);

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
  <UContainer class="px-0">
    <UPage>
      <UPageBody class="py-0">
        <div class="flex flex-col gap-6">
          <!-- 顶部导航区域: 一级分类 -->
          <header class="resource-category-shell sticky top-0 z-30">
            <!-- 一级分类按钮组 - 搜索时隐藏 -->
            <div
              class="resource-category-track mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-1 p-1"
              :style="{ visibility: isSearching ? 'hidden' : 'visible' }"
            >
              <UButton
                v-for="category in resourceCategories"
                :key="category.id"
                :variant="activeCategory === category.id ? 'solid' : 'ghost'"
                :color="activeCategory === category.id ? 'primary' : 'neutral'"
                size="sm"
                :class="[
                  'resource-category-button shadow-none',
                  activeCategory === category.id && 'resource-category-button-active'
                ]"
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
          <div class="grid grid-cols-1 gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
            <!-- 左侧边栏 -->
            <aside class="resources-sidebar min-w-0">
              <div class="resources-sidebar-stack sticky top-20 space-y-4">
                <!-- 搜索框 -->
                <UInput
                  v-model="searchQuery"
                  icon="i-lucide-search"
                  placeholder="搜索资源名称或描述..."
                  size="lg"
                  class="resources-search-field"
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
                <div
                  v-if="!isSearching && currentCategory"
                  class="resource-filter-panel"
                  role="navigation"
                  :aria-label="`${currentCategory.name}资源集合`"
                >
                  <div class="resource-filter-header">
                    <div class="min-w-0">
                      <h3 class="resource-filter-title">
                        {{ currentCategory.name }}
                      </h3>
                    </div>
                  </div>

                  <div class="resource-filter-body">
                    <!-- 过滤选项 -->
                    <div class="resource-filter-toggle">
                      <UCheckbox v-model="showOnlyWithBlog" label="只显示有文章" size="sm" />
                    </div>

                    <!-- 集合列表 -->
                    <nav class="resource-filter-list">
                      <button
                        v-for="collection in currentCategory.collections"
                        :key="collection.id"
                        :class="[
                          'resource-filter-button',
                          activeCollection === collection.id && 'resource-filter-button-active',
                          getResourceCount(collection.resources) === 0 &&
                            'resource-filter-button-disabled'
                        ]"
                        :disabled="getResourceCount(collection.resources) === 0"
                        @click="selectCollection(collection.id)"
                      >
                        <span class="resource-filter-label truncate">{{ collection.name }}</span>
                        <span class="resource-filter-count">
                          {{ getResourceCount(collection.resources) }}
                        </span>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </aside>

            <!-- 右侧内容区 -->
            <main class="min-w-0 flex-1">
              <!-- 搜索结果视图 -->
              <section v-if="isSearching" class="space-y-6">
                <div v-if="searchResults.length > 0">
                  <p class="mb-4 text-sm text-muted">
                    找到
                    <span class="font-semibold text-foreground">{{ searchResults.length }}</span>
                    个资源
                  </p>

                  <div class="macos-resource-grid grid gap-3">
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
                    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
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
                <div v-if="currentCollection.description" class="macos-panel px-4 py-3 text-sm">
                  <p class="text-muted">{{ currentCollection.description }}</p>
                </div>

                <!-- 资源卡片网格 -->
                <div
                  v-if="currentCollection.resources.length > 0"
                  class="macos-resource-grid grid gap-3"
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
                    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
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
