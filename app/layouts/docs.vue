<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

/**
 * 获取注入的侧边栏导航数据
 */
const sideNav = inject<ComputedRef<ContentNavigationItem[]>>('sideNav');
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');
const route = useRoute();

interface SidebarEntry {
  title: string;
  path?: string;
  icon?: string;
  depth: number;
  kind: 'group' | 'link';
}

interface SectionPickerItem {
  label: string;
  to: string;
  icon?: string;
  active: boolean;
  onSelect: () => unknown;
}

const sidebarEntries = computed<SidebarEntry[]>(() => {
  const entries: SidebarEntry[] = [];

  const visit = (items: ContentNavigationItem[], depth = 0) => {
    for (const item of items) {
      const hasChildren = Boolean(item.children?.length);
      const isLink = item.page !== false || (!hasChildren && Boolean(item.path));

      if (isLink) {
        entries.push({
          kind: 'link',
          title: item.title,
          path: item.path,
          icon: item.icon as string | undefined,
          depth
        });
      } else {
        entries.push({
          kind: 'group',
          title: item.title,
          icon: item.icon as string | undefined,
          depth
        });
      }

      if (hasChildren && item.children) {
        visit(item.children, depth + 1);
      }
    }
  };

  visit(sideNav?.value || []);
  return entries;
});

const sectionItems = computed<SectionPickerItem[]>(() => {
  if (!navigation?.value) {
    return [];
  }

  return navigation.value.map((item) => ({
    label: item.title,
    to: (item.children?.[0]?.path || item.path) as string,
    icon: item.icon as string | undefined,
    active: route.path.startsWith(item.path),
    onSelect() {
      return navigateTo((item.children?.[0]?.path || item.path) as string);
    }
  }));
});

const activeSection = computed(() => {
  return (
    sectionItems.value.find((item) => item.active) || {
      label: '选择分类',
      icon: 'i-lucide-panel-left-open'
    }
  );
});
</script>

<template>
  <UContainer class="docs-shell px-3 pt-3 pb-1.5 sm:px-4 lg:px-4">
    <div class="docs-frame docs-split-view">
      <aside class="docs-sidebar" aria-label="Docs navigation">
        <div class="docs-sidebar-nav">
          <div v-if="sectionItems.length" class="docs-sidebar-section-picker">
            <UDropdownMenu
              :items="sectionItems"
              :content="{
                align: 'start',
                side: 'bottom',
                sideOffset: 8
              }"
              :ui="{
                content: 'w-56'
              }"
            >
              <UButton
                color="neutral"
                variant="ghost"
                class="docs-sidebar-section-trigger"
                trailing-icon="i-lucide-chevron-down"
              >
                <template #leading>
                  <UIcon
                    v-if="activeSection.icon"
                    :name="activeSection.icon as string"
                    class="docs-sidebar-section-trigger-icon"
                  />
                </template>
                <span class="truncate">{{ activeSection.label }}</span>
              </UButton>
            </UDropdownMenu>
          </div>

          <nav v-if="sidebarEntries.length" class="docs-sidebar-tree">
            <template
              v-for="entry in sidebarEntries"
              :key="`${entry.kind}-${entry.path || entry.title}`"
            >
              <div
                v-if="entry.kind === 'group'"
                class="docs-sidebar-group"
                :style="{ '--docs-depth': entry.depth }"
              >
                <UIcon v-if="entry.icon" :name="entry.icon" class="docs-sidebar-group-icon" />
                <span class="truncate">{{ entry.title }}</span>
              </div>

              <NuxtLink
                v-else-if="entry.path"
                :to="entry.path"
                class="docs-sidebar-link"
                :class="{ 'docs-sidebar-link-active': route.path === entry.path }"
                :style="{ '--docs-depth': entry.depth }"
              >
                <UIcon
                  v-if="entry.icon && entry.depth === 0"
                  :name="entry.icon"
                  class="docs-sidebar-link-icon"
                />
                <span class="truncate">{{ entry.title }}</span>
              </NuxtLink>
            </template>
          </nav>
        </div>
      </aside>

      <div class="docs-main min-w-0">
        <slot />
      </div>
    </div>
  </UContainer>
</template>
