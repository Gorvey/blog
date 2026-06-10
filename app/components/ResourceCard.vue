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

const openBlogPost = () => {
  if (!props.resource.post) {
    return;
  }

  const fullUrl = props.resource.post.startsWith('http')
    ? props.resource.post
    : `${siteUrl.value}${props.resource.post.startsWith('/') ? '' : '/'}${props.resource.post}`;
  window.open(fullUrl, '_blank');
};

/**
 * 点击 Badge 的处理逻辑 - 前往关联文章
 */
const handleBadgeClick = (event: MouseEvent) => {
  event.stopPropagation();
  openBlogPost();
};
</script>

<template>
  <UCard
    class="resource-card group"
    role="link"
    tabindex="0"
    :aria-label="`打开 ${resource.name}`"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <template #header>
      <div class="resource-card-header-content">
        <div class="resource-card-icon">
          <img
            v-if="faviconUrl"
            :src="faviconUrl"
            :alt="resource.name"
            class="resource-card-favicon"
            loading="lazy"
            @error="
              (e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }
            "
          />
          <UIcon name="i-lucide-globe" class="resource-card-fallback-icon hidden" />
        </div>
        <div class="resource-card-title-row">
          <h3 class="resource-card-title">{{ resource.name }}</h3>
          <button
            v-if="hasBlogPost"
            type="button"
            class="resource-card-badge"
            @click="handleBadgeClick"
            @keydown.stop
          >
            <UIcon name="i-lucide-file-text" class="resource-card-badge-icon" />
            <span>文章</span>
          </button>
        </div>
      </div>
    </template>

    <div class="resource-card-description">
      {{ resource.description || '暂无描述' }}
    </div>

    <template #footer>
      <div class="resource-card-url-row">
        <span class="resource-card-url">{{ resource.url }}</span>
        <UIcon :name="hasBlogPost ? 'i-lucide-arrow-right' : 'i-lucide-external-link'" />
      </div>
    </template>
  </UCard>
</template>
