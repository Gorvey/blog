# 博客和资源页面重构实施计划

## 概述

将文档型网站改造为博客网站,添加资源页面功能。主要包括 Header 导航改造、路由重构、内容迁移和新资源页面开发。

## 用户需求确认

- **Header 导航样式**: 水平标签页(pill 样式)
- **数据存储方式**: TypeScript 配置文件
- **博客路由**: `/blog/*` (所有现有内容迁移到此路由下)
- **资源路由**: `/resources/*`
- **现有内容处理**: 迁移到 `/blog` 路由下

## 实施步骤

### 第一阶段: 内容集合和路由重构

#### 1.1 修改内容集合配置 (`content.config.ts`)

```typescript
export default defineContentConfig({
  collections: {
    // 保持首页集合不变
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),

    // 新增 blog 集合
    blog: defineCollection({
      type: 'page',
      source: {
        include: 'blog/**',
        exclude: 'blog/index.md'
      },
      schema: z.object({
        links: z
          .array(
            z.object({
              label: z.string(),
              icon: z.string(),
              to: z.string(),
              target: z.string().optional()
            })
          )
          .optional()
      })
    }),

    // 新增 resources 集合
    resources: defineCollection({
      type: 'page',
      source: {
        include: 'resources/**'
      }
    })
  }
});
```

#### 1.2 创建新的路由文件

**创建 `app/pages/blog/[...slug].vue`**:

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'docs'
});

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first()
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path);
});

// SEO 配置
const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title" :description="page.description">
      <template v-if="page.links?.length" #links>
        <UButton v-for="(link, index) in page.links" :key="index" v-bind="link" />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer :value="page" />
      <USeparator v-if="surround?.length" />
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template #right>
      <UContentToc :links="page.body?.toc?.links" />
    </template>
  </UPage>
</template>
```

**创建 `app/pages/resources/index.vue`**:

```vue
<script setup lang="ts">
import { resourceCollections } from '~/config/resources';

definePageMeta({
  layout: 'default'
});

const route = useRoute();
const activeCollection = ref((route.query.category as string) || resourceCollections[0].id);

const collections = resourceCollections.map((collection) => ({
  label: collection.name,
  value: collection.id,
  slot: collection.id
}));

watch(activeCollection, (newValue) => {
  navigateTo({ query: { category: newValue } });
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader title="资源合集" description="精选前端开发资源和工具" />

      <UPageBody>
        <UTabs v-model="activeCollection" :items="collections" class="w-full">
          <template v-for="collection in resourceCollections" :key="collection.id" #[collection.id]>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <ResourceCard
                v-for="resource in collection.resources"
                :key="resource.url"
                :resource="resource"
              />
            </div>
          </template>
        </UTabs>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
```

#### 1.3 迁移内容文件

**操作步骤**:

1. 创建 `content/blog/` 文件夹
2. 将 `content/ai/` 移动到 `content/blog/ai/`
3. 将 `content/docs/` 移动到 `content/blog/docs/`(如果存在)
4. 创建 `content/resources/` 文件夹(预留,可能不需要 Markdown 文件)

**迁移后的路径映射**:

- 原路径: `/ai/mcp/context7`
- 新路径: `/blog/ai/mcp/context7`

### 第二阶段: Header 组件改造

#### 2.1 修改 AppHeader.vue

**关键改动**:

1. 将中心区域的全宽搜索框改为 UTabs 导航
2. 将搜索功能移到右侧,显示为按钮
3. 根据当前路由激活对应的 Tab

**修改 `app/components/AppHeader.vue`**:

```vue
<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');
const { header } = useAppConfig();
const route = useRoute();

/**
 * 主导航标签页配置
 */
const mainTabs = [
  { label: '博客', value: 'blog', to: '/blog' },
  { label: '资源', value: 'resources', to: '/resources' }
];

/**
 * 根据当前路由确定激活的标签
 */
const activeTab = computed(() => {
  const path = route.path;
  if (path.startsWith('/resources')) return 'resources';
  if (path.startsWith('/blog')) return 'blog';
  return 'blog'; // 默认
});

/**
 * 处理标签切换
 */
const handleTabChange = (value: string) => {
  const tab = mainTabs.find((t) => t.value === value);
  if (tab) {
    navigateTo(tab.to);
  }
};
</script>

<template>
  <UHeader :ui="{ center: 'flex-1 flex justify-center' }" :to="header?.to || '/'">
    <!-- 中心区域: 导航 Tabs -->
    <template #center>
      <UTabs
        :model-value="activeTab"
        :items="mainTabs"
        :content="false"
        variant="pill"
        color="primary"
        @update:model-value="handleTabChange"
      />
    </template>

    <!-- Logo/Title -->
    <template #title>
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
      />
      <span v-else-if="header?.title" class="font-bold">{{ header.title }}</span>
      <AppLogo v-else />
    </template>

    <!-- 右侧工具栏 -->
    <template #right>
      <ThemePicker />
      <!-- 搜索按钮(所有屏幕尺寸) -->
      <UContentSearchButton v-if="header?.search" />
      <UColorModeButton v-if="header?.colorMode" />
      <template v-if="header?.links">
        <UButton v-for="(link, index) of header.links" :key="index" v-bind="link" />
      </template>
    </template>

    <!-- 移除下方导航 -->
    <!-- <template #body>
      <UContentNavigation highlight :navigation="navigation" />
    </template> -->
  </UHeader>
</template>
```

**关键修改点**:

- `#center` 插槽: 添加 `UTabs` 组件,设置 `:content="false"` 只显示标签不显示内容
- `activeTab` 计算属性: 根据 `route.path` 判断当前激活标签
- `handleTabChange`: 点击标签时导航到对应路由
- 移除 `#body` 插槽中的文档导航(或根据需要保留)

#### 2.2 调整 app.vue 中的导航数据源

**修改 `app/app.vue`**:

```vue
<script setup lang="ts">
// 改为查询 blog 集合的导航
const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('blog')
);

// 搜索索引也改为 blog 集合
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('blog'), {
  server: false
});

provide('navigation', navigation);
</script>
```

### 第三阶段: 资源页面开发

#### 3.1 创建资源数据配置

**创建 `app/config/resources.ts`**:

```typescript
/**
 * 资源项类型定义
 */
export interface Resource {
  /** 资源名称 */
  name: string;
  /** 资源 URL */
  url: string;
  /** 关联的博客文章路径(可选) */
  post?: string;
  /** 资源描述(可选) */
  description?: string;
  /** 资源图标(可选) */
  icon?: string;
}

/**
 * 资源集合类型定义
 */
export interface ResourceCollection {
  /** 集合唯一标识 */
  id: string;
  /** 集合名称 */
  name: string;
  /** 集合描述 */
  description?: string;
  /** 集合图标 */
  icon?: string;
  /** 资源列表 */
  resources: Resource[];
}

/**
 * 所有资源集合
 */
export const resourceCollections: ResourceCollection[] = [
  {
    id: 'frontend',
    name: '前端框架',
    description: 'Vue、React、Nuxt 等前端框架资源',
    icon: 'i-lucide-code',
    resources: [
      {
        name: 'Vue.js 官方文档',
        url: 'https://vuejs.org',
        description: 'Vue 3 官方文档',
        icon: 'i-simple-icons-vuedotjs',
        post: '/blog/vue/getting-started'
      },
      {
        name: 'Nuxt 官方文档',
        url: 'https://nuxt.com',
        description: 'Nuxt 3 官方文档',
        icon: 'i-simple-icons-nuxtdotjs'
      }
    ]
  },
  {
    id: 'tools',
    name: '开发工具',
    description: 'IDE、构建工具、调试工具等',
    icon: 'i-lucide-wrench',
    resources: [
      {
        name: 'VS Code',
        url: 'https://code.visualstudio.com',
        description: '微软开源代码编辑器',
        icon: 'i-simple-icons-visualstudiocode'
      }
    ]
  }
];
```

#### 3.2 创建资源卡片组件

**创建 `app/components/ResourceCard.vue`**:

```vue
<script setup lang="ts">
import type { Resource } from '~/config/resources';

interface Props {
  resource: Resource;
}

const props = defineProps<Props>();

/**
 * 判断资源是否有关联博客文章
 */
const hasBlogPost = computed(() => !!props.resource.post);

/**
 * 点击卡片的处理逻辑
 */
const handleClick = () => {
  if (props.resource.post) {
    // 如果有关联文章,跳转到博客文章
    navigateTo(props.resource.post);
  } else {
    // 否则在新窗口打开外部链接
    window.open(props.resource.url, '_blank');
  }
};
</script>

<template>
  <UCard class="cursor-pointer hover:shadow-lg transition-shadow" @click="handleClick">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon v-if="resource.icon" :name="resource.icon" class="text-2xl text-primary" />
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold truncate">{{ resource.name }}</h3>
        </div>
        <UBadge v-if="hasBlogPost" color="primary" variant="soft" size="xs"> 有文章 </UBadge>
      </div>
    </template>

    <div class="text-sm text-muted">
      {{ resource.description || '暂无描述' }}
    </div>

    <template #footer>
      <div class="flex items-center justify-between text-xs text-muted">
        <span class="truncate">{{ resource.url }}</span>
        <UIcon
          :name="hasBlogPost ? 'i-lucide-arrow-right' : 'i-lucide-external-link'"
          class="shrink-0 ml-2"
        />
      </div>
    </template>
  </UCard>
</template>
```

### 第四阶段: 配置和优化

#### 4.1 更新 app.config.ts

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  seo: {
    siteName: 'Gorvey的技术笔记'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/Gorvey',
        target: '_blank',
        'aria-label': 'GitHub'
      }
    ]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      links: [
        // 可以保留或删除
      ]
    }
  }
});
```

#### 4.2 更新预渲染配置

**修改 `nuxt.config.ts`** (如果存在预渲染配置):

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/', '/blog', '/resources'],
      crawlLinks: true
    }
  }
});
```

### 第五阶段: 测试和验证

#### 5.1 测试清单

- [ ] Header 导航标签可以正常切换
- [ ] 搜索按钮可以打开搜索框
- [ ] `/blog` 路由可以正常访问博客文章
- [ ] `/blog/ai/mcp/context7` 等迁移后的路径正常工作
- [ ] `/resources` 页面可以正常显示
- [ ] 资源集合 Tab 切换正常
- [ ] 资源卡片点击跳转正常(区分有无 post 字段)
- [ ] 搜索功能正常(搜索 blog 集合内容)
- [ ] 导航高亮状态正确
- [ ] 响应式布局正常(移动端/桌面端)

#### 5.2 可能的问题和解决方案

**问题 1**: 迁移后链接失效

- **解决**: 在 `nuxt.config.ts` 中添加重定向规则

**问题 2**: 搜索无法找到迁移的内容

- **解决**: 确认 `app.vue` 中搜索索引已改为查询 `blog` 集合

**问题 3**: 导航高亮不准确

- **解决**: 调整 `activeTab` 计算逻辑,使用更精确的路径匹配

## 关键文件清单

### 需要修改的文件

- `content.config.ts` - 添加 blog 和 resources 集合
- `app/components/AppHeader.vue` - 改造 Header 导航
- `app/app.vue` - 更新导航和搜索数据源
- `app.config.ts` - 配置调整(可选)

### 需要新建的文件

- `app/pages/blog/[...slug].vue` - 博客文章路由
- `app/pages/resources/index.vue` - 资源页面
- `app/config/resources.ts` - 资源数据配置
- `app/components/ResourceCard.vue` - 资源卡片组件

### 需要移动的文件

- `content/ai/` → `content/blog/ai/`
- `content/docs/` → `content/blog/docs/` (如果存在)

### 需要创建的文件夹

- `content/blog/`
- `content/resources/` (可选)

## 预估工作量

- 内容迁移: 5 分钟
- 配置修改: 10 分钟
- Header 改造: 15 分钟
- 资源页面开发: 20 分钟
- 测试调试: 15 分钟

**总计**: 约 65 分钟

## 注意事项

1. **编码格式**: 所有文件使用 UTF-8 编码,确保中文正常显示
2. **JSDoc 注释**: 所有函数添加 JSDoc 多行注释
3. **类型安全**: 充分利用 TypeScript 类型定义
4. **响应式设计**: 确保移动端和桌面端体验良好
5. **SEO**: 迁移后的路径需要考虑 SEO 影响,可能需要添加重定向

## 后续优化建议

1. 添加博客文章列表页 (`/blog/index.vue`)
2. 为资源卡片添加标签/分类功能
3. 添加搜索高亮和筛选功能
4. 考虑添加面包屑导航
5. 为资源页面添加排序和过滤功能
