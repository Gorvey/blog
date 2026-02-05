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
 * 点击处理 - 直接打开资源链接
 */
const handleClick = () => {
  window.open(props.resource.url, '_blank');
};
</script>

<template>
  <UCard class="cursor-pointer" @click="handleClick">
    <div class="flex items-center justify-between gap-4">
      <!-- 左侧: 图标 + 标题 -->
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <div
          class="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800"
        >
          <img
            v-if="faviconUrl"
            :src="faviconUrl"
            :alt="resource.name"
            class="w-6 h-6"
            loading="lazy"
            @error="
              (e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }
            "
          />
          <UIcon name="i-lucide-globe" class="w-6 h-6 hidden text-muted" />
        </div>
        <div class="flex flex-col min-w-0">
          <h3 class="font-semibold text-sm">{{ resource.name }}</h3>
          <p v-if="resource.description" class="text-xs text-muted truncate">
            {{ resource.description }}
          </p>
        </div>
      </div>

      <!-- 右侧: 前往按钮 -->
      <UButton
        icon="i-lucide-arrow-up-right"
        color="neutral"
        variant="ghost"
        size="sm"
        class="shrink-0"
      />
    </div>
  </UCard>
</template>
