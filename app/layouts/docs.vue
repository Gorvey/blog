<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

/**
 * 获取注入的侧边栏导航数据
 */
const sideNav = inject<ComputedRef<ContentNavigationItem[]>>('sideNav');
const route = useRoute();

interface SidebarEntry {
  title: string;
  path?: string;
  icon?: string;
  depth: number;
  kind: 'group' | 'link';
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
          icon: item.icon,
          depth
        });
      } else {
        entries.push({
          kind: 'group',
          title: item.title,
          icon: item.icon,
          depth
        });
      }

      if (hasChildren) {
        visit(item.children, depth + 1);
      }
    }
  };

  visit(sideNav?.value || []);
  return entries;
});
</script>

<template>
  <UContainer class="docs-shell px-4 pt-5 pb-12 sm:px-6 lg:px-8">
    <div class="docs-frame docs-split-view">
      <aside class="docs-sidebar px-3 py-4" aria-label="Docs navigation">
        <div class="docs-sidebar-nav">
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
