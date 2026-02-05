<script setup lang="ts">
interface Resource {
  name: string;
  url: string;
  description?: string;
  post?: string;
}
interface Props {
  resource: Resource;
}

const props = defineProps<Props>();

/**
 * 判断资源是否有关联博客文章
 */
const hasBlogPost = computed(() => !!props.resource.post);

/**
 * 获取网站 favicon
 * 使用 DuckDuckGo favicon API,国内访问更稳定
 */
const faviconUrl = computed(() => {
  try {
    const hostname = new URL(props.resource.url).hostname;
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
  } catch {
    return null;
  }
});

/**
 * 获取颜色模式
 */
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

/**
 * 获取当前网站 host
 */
const config = useRuntimeConfig();
const siteUrl = computed(() =>
  config.app.baseURL ? `${config.app.baseURL.replace(/\/$/, '')}` : ''
);

/**
 * 点击卡片的处理逻辑 - 始终前往外部 url
 */
const handleClick = () => {
  window.open(props.resource.url, '_blank');
};

/**
 * 点击 Badge 的处理逻辑 - 前往关联文章
 */
const handleBadgeClick = (event: MouseEvent) => {
  event.stopPropagation();
  if (props.resource.post) {
    const fullUrl = props.resource.post.startsWith('http')
      ? props.resource.post
      : `${siteUrl.value}${props.resource.post.startsWith('/') ? '' : '/'}${props.resource.post}`;
    window.open(fullUrl, '_blank');
  }
};
</script>

<template>
  <UCard class="cursor-pointer" @click="handleClick">
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="w-6 h-6 shrink-0 rounded flex items-center justify-center"
          :class="isDark ? 'bg-gray-800' : ''"
        >
          <img
            v-if="faviconUrl"
            :src="faviconUrl"
            :alt="resource.name"
            class="w-5 h-5"
            loading="lazy"
            @error="
              (e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }
            "
          />
          <UIcon name="i-lucide-globe" class="w-5 h-5 hidden text-muted" />
        </div>
        <div class="flex items-center justify-between gap-2 flex-1 min-w-0">
          <h3 class="font-semibold truncate">{{ resource.name }}</h3>
          <UBadge
            v-if="hasBlogPost"
            color="primary"
            variant="soft"
            size="lg"
            class="shrink-0 cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900"
            @click="handleBadgeClick"
          >
            关联文章
          </UBadge>
        </div>
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
