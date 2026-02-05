<script setup lang="ts">
import {
  transformToCategories,
  type ResourceCategory,
  type ResourceCollection,
  type Resource
} from '~/types/resources';

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
const resourceCategories = computed(() => {
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
 * 搜索结果类型
 */
interface SearchResult {
  category: ResourceCategory;
  collection: ResourceCollection;
  resource: Resource;
}

/**
 * 搜索所有资源（搜索模式下不过滤"只显示有文章"）
 */
const searchResults = computed((): SearchResult[] => {
  if (!searchQuery.value.trim()) {
    return [];
  }

  const query = searchQuery.value.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const category of resourceCategories.value) {
    for (const collection of category.collections) {
      for (const resource of collection.resources) {
        // 搜索资源名称和描述
        const nameMatch = resource.name.toLowerCase().includes(query);
        const descMatch = resource.description?.toLowerCase().includes(query);

        if (nameMatch || descMatch) {
          results.push({
            category,
            collection,
            resource
          });
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
const activeCategory = ref((route.query.category as string) || resourceCategories.value[0]?.id);

/**
 * 当前激活的二级集合
 */
const activeCollection = ref((route.query.collection as string) || '');

/**
 * 过滤资源列表
 */
const filterResources = (resources: Resource[]): Resource[] => {
  if (!showOnlyWithBlog.value) {
    return resources;
  }
  return resources.filter((r: Resource) => !!r.post);
};

/**
 * 获取当前激活的分类
 */
const currentCategory = computed((): ResourceCategory | undefined => {
  return resourceCategories.value.find((c: ResourceCategory) => c.id === activeCategory.value);
});

/**
 * 获取当前激活的集合(带过滤)
 */
const currentCollection = computed((): ResourceCollection | undefined => {
  const collection = currentCategory.value?.collections.find(
    (c: ResourceCollection) => c.id === activeCollection.value
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
  const category = resourceCategories.value.find(
    (c: ResourceCategory) => c.id === activeCategory.value
  );
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

watch(activeCollection, (newValue) => {
  navigateTo({
    query: { category: activeCategory.value, collection: newValue }
  });
});

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
        <div class="flex flex-col gap-6">
          <!-- 顶部一级分类导航 - 固定 -->
          <div class="sticky top-16 z-10 bg-background/95 backdrop-blur pb-4 -mt-4 pt-4">
            <!-- 一级分类 - 搜索时隐藏但保持高度 -->
            <div
              :class="[
                'flex justify-center transition-opacity duration-200',
                isSearching ? 'invisible opacity-0' : 'visible opacity-100'
              ]"
            >
              <div class="flex flex-wrap items-center gap-2">
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
                          (sum: number, c: ResourceCollection) =>
                            sum + getResourceCount(c.resources),
                          0
                        )
                      }}
                    </span>
                  </template>
                </UButton>
              </div>
            </div>
          </div>

          <!-- 下方区域: 左侧二级集合 + 右侧资源列表 -->
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- 左侧栏 -->
            <div class="lg:w-56 shrink-0">
              <div class="sticky top-36 space-y-4">
                <!-- 搜索框 - 始终显示 -->
                <UInput
                  v-model="searchQuery"
                  icon="i-lucide-search"
                  placeholder="搜索资源..."
                  size="md"
                >
                  <template #trailing>
                    <UButton
                      v-if="searchQuery"
                      icon="i-lucide-x"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      @click="searchQuery = ''"
                    />
                  </template>
                </UInput>

                <!-- 二级集合导航 - 仅在非搜索模式显示 -->
                <UCard v-if="!isSearching && currentCategory">
                  <template #header>
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold">
                        {{ currentCategory.name }}
                      </h3>
                      <UCheckbox v-model="showOnlyWithBlog" label="只显示有文章" size="sm" />
                    </div>
                  </template>
                  <nav class="space-y-1">
                    <button
                      v-for="collection in currentCategory.collections"
                      :key="collection.id"
                      :class="[
                        'w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-sm transition-colors',
                        activeCollection === collection.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-muted'
                      ]"
                      @click="selectCollection(collection.id)"
                    >
                      <span class="truncate">{{ collection.name }}</span>
                      <span class="shrink-0 text-xs text-muted">
                        {{ getResourceCount(collection.resources) }}
                      </span>
                    </button>
                  </nav>
                </UCard>
              </div>
            </div>

            <!-- 右侧内容区 -->
            <div class="flex-1 min-w-0">
              <!-- 搜索结果 -->
              <div v-if="isSearching" class="space-y-6">
                <div v-if="searchResults.length > 0">
                  <div class="text-muted">
                    找到
                    <span class="font-semibold text-foreground">{{ searchResults.length }}</span>
                    个资源
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div
                      v-for="result in searchResults"
                      :key="result.resource.url"
                      class="space-y-2"
                    >
                      <div class="text-xs text-muted flex items-center gap-2">
                        <span>{{ result.category.name }}</span>
                        <span class="text-muted/50">/</span>
                        <span>{{ result.collection.name }}</span>
                      </div>
                      <ResourceCard :resource="result.resource" />
                    </div>
                  </div>
                </div>

                <div v-else class="text-center py-12">
                  <p class="text-muted">没有找到匹配的资源</p>
                </div>
              </div>

              <!-- 常规模式：资源列表 -->
              <div v-else-if="currentCollection" class="space-y-6">
                <div v-if="currentCollection.description" class="text-muted">
                  {{ currentCollection.description }}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <ResourceCard
                    v-for="resource in currentCollection.resources"
                    :key="resource.url"
                    :resource="resource"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
