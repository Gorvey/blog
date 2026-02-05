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
            <!-- 一级分类 - 居中 -->
            <div class="flex justify-center">
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
            <!-- 左侧二级集合导航 -->
            <div v-if="currentCategory" class="lg:w-56 shrink-0">
              <div class="sticky top-36">
                <UCard>
                  <template #header>
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold">
                        {{ currentCategory.name }}
                      </h3>
                      <!-- 筛选移到二级分类下面 -->
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

            <!-- 右侧资源列表 -->
            <div class="flex-1 min-w-0">
              <div v-if="currentCollection" class="space-y-6">
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
