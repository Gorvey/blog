---
title: 文章详情组件样式测试
category: AI 代码
date: 2026-06-10
description: 覆盖文章详情页常见 Markdown 与 Nuxt UI MDC 组件，用于验证 macOS 原生应用风格。
tags:
  - UI
  - Markdown
  - macOS
---

这篇文章用于集中测试详情页里的常见组件。正文包含 [内部链接](/docs/ai-code/code-plan)、[外部链接](https://nuxt.com)、`inline code`、 :kbd[⌘] + :kbd[K] 、**强调文本**和不同层级的排版。

::callout{color="primary" icon="i-lucide-info"}
这是一条用于测试提示组件的内容，需要在亮色和暗色模式下都有清晰边界。
::

## 文本层级

文章正文应该保持舒展，但不要像网页落地页那样夸张。macOS 本地应用的阅读区域更接近“窗口里的文档面板”，重点是层级清楚、线条克制、控件稳定。

### 三级标题

三级标题常用于拆分具体功能或局部流程，间距需要比二级标题更紧凑。

#### 四级标题

四级标题用于短说明，不应该抢走主要内容的视觉重量。

> 这是一个引用块。它应该看起来像系统备注，而不是普通网页里的大色块。引用里也可能包含 `code`、链接和较长文本。

## 列表组件

- 普通列表第一项，测试项目符号、缩进和行高。
- 普通列表第二项，包含一个 [资源链接](https://nuxt.com)。
- 普通列表第三项，包含 `pnpm dev` 这类短代码。

1. 有序列表第一步，先观察结构。
2. 有序列表第二步，确认间距。
3. 有序列表第三步，检查数字对齐。

- 任务状态文字第一项，测试短标签和正文节奏。
- 任务状态文字第二项，测试同类列表的连续间距。

## 表格组件

| 组件   | 状态   | 备注                     |
| ------ | ------ | ------------------------ |
| 标题   | 已覆盖 | H2/H3/H4 都需要稳定      |
| 表格   | 已覆盖 | 横向空间不足时只滚动表格 |
| 代码块 | 已覆盖 | 亮色和暗色都要像本地面板 |
| 提示   | 已覆盖 | 使用 Nuxt UI MDC         |

## 代码组件

```ts
type ArticleState = {
  title: string;
  theme: 'light' | 'dark';
  ready: boolean;
};

const state: ArticleState = {
  title: '文章详情组件样式测试',
  theme: 'light',
  ready: true
};
```

```bash
pnpm dev
pnpm exec eslint "app/**/*.vue"
```

::code-group

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue'
    }
  }
});
```

```vue [ArticlePreview.vue]
<template>
  <article class="docs-article-panel">
    <slot />
  </article>
</template>
```

::

::code-collapse{close-text="收起" name="长代码示例" open-text="展开"}

```ts
const componentChecklist = [
  'heading',
  'paragraph',
  'link',
  'table',
  'code',
  'callout',
  'card',
  'tabs',
  'accordion',
  'steps',
  'field',
  'prompt'
];

export function hasArticleComponent(name: string) {
  return componentChecklist.includes(name);
}
```

::

## 媒体和分割线

![macOS document preview](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80)

---

## Prose 组件

::card{icon="i-lucide-box" title="组件卡片" to="/docs/ai-code/code-plan"}
这是一张用于测试 Prose Card 的内容区域。它应该和文章正文保持一致的 macOS 本地应用质感。
::

::card-group
:::card{icon="i-lucide-panel-top" title="轻量边框"}
用于测试同一行多个卡片的间距和暗色边界。
:::

:::card{icon="i-lucide-mouse-pointer-click" title="点击区域" to="https://nuxt.com"}
用于测试外链卡片和外部链接图标。
:::
::

::tabs
:::tabs-item{icon="i-lucide-sun" label="浅色模式"}
浅色模式下，组件应该保持足够清晰的边界，但不应该有厚重阴影。
:::

:::tabs-item{icon="i-lucide-moon" label="暗色模式"}
暗色模式下，面板需要降低亮度，同时保证文本和边框对比度。
:::
::

::accordion
:::accordion-item{icon="i-lucide-list-tree" label="折叠项 A"}
折叠内容用于测试交互组件的边线、圆角和展开后的正文节奏。
:::

:::accordion-item{icon="i-lucide-settings-2" label="折叠项 B"}
第二个折叠项用于测试相邻项目之间的分割线和 hover 状态。
:::
::

::code-preview
预览区域用于测试 CodePreview 的上半部分，它应该像一个轻量原生预览面板。

#code

```vue [PreviewButton.vue]
<template>
  <button class="rounded-md border border-default px-3 py-1.5 text-sm">Preview action</button>
</template>
```

::

::code-tree{expand-all default-value="app/app.config.ts"}

```ts [app/app.config.ts]
export default defineAppConfig({
  ui: {
    colors: { primary: 'blue' }
  }
});
```

```vue [app/components/ArticleShell.vue]
<template>
  <article class="docs-article-panel">
    <slot />
  </article>
</template>
```

::

::steps

### 准备内容

先写一篇覆盖所有常见文章组件的测试内容。

### 调整样式

再围绕 `.docs-article-body` 统一覆盖 Prose 组件样式。

### 浏览器验证

最后在浅色、暗色、桌面和移动端逐项检查。
::

::field-group
:::field{required name="theme" type="'light' | 'dark'"}
当前详情页需要同时适配浅色和暗色模式。
:::

:::field{name="component" type="ProseCard"}
组件样式应该继承文章详情页的 macOS 视觉语言。
:::
::

::prompt{description="用于测试 Prompt 组件的复制操作。" icon="i-lucide-terminal"}
请检查这篇文章详情页在浅色、暗色、桌面和移动端的组件质感。
::

普通文字中也可以放置 :badge[Prose]{type="info"} 和 :icon{name="i-lucide-sparkles"} 这样的内联组件。

## 收尾

这篇测试文章会持续作为详情页样式的回归样本：新增文章组件时，先放到这里观察浅色、暗色、桌面和移动端效果。
