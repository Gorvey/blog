# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Nuxt 4 的文档/博客网站,使用 Nuxt UI 和 Nuxt Content 构建。源自 Nuxt UI Docs Template,当前处于从文档模板向个人博客迁移的阶段。

## 常用开发命令

```bash
# 开发
pnpm dev                    # 启动开发服务器 (http://localhost:3000)
pnpm build                  # 构建生产版本
pnpm preview               # 预览生产构建

# 代码质量
pnpm lint                  # ESLint 代码检查
pnpm typecheck            # TypeScript 类型检查
```

## 技术栈

- **框架**: Nuxt 4 (Vue 3 + TypeScript)
- **UI**: Nuxt UI (基于 TailwindCSS)
- **内容管理**: Nuxt Content (Markdown 驱动)
- **图标**: Iconify (Lucide, Simple Icons, VS Code Icons)
- **OG 图片**: nuxt-og-image
- **AI 集成**: nuxt-llms
- **Node**: 25.0.0 (见 .nvmdrc)
- **包管理器**: pnpm 10.19.0

## 核心架构说明

### 内容集合系统 (content.config.ts)

项目定义了两个内容集合:

1. **landing**: 单页集合,指向 `content/index.md` (首页)
2. **docs**: 页面集合,包含所有其他 Markdown 文件(排除 index.md)
   - 支持自定义 schema 字段: `links` (可选的链接数组)

### 路由架构

- `app/pages/index.vue`: 首页路由
- `app/pages/[...slug].vue`: 动态文档路由,使用 `docs` 布局
  - 使用 `queryCollection('docs').path(route.path).first()` 获取内容
  - 自动生成 TOC(目录)、SEO meta 和 OG 图片

### 布局系统

- `app/layouts/default.vue`: 默认布局
- `app/layouts/docs.vue`: 文档页面布局 (用于所有 [...slug] 页面)

### 应用入口 (app/app.vue)

- 加载全局导航: `queryCollectionNavigation('docs')`
- 加载搜索索引: `queryCollectionSearchSections('docs')`
- 通过 `provide('navigation', navigation)` 注入导航
- 包含全局搜索组件 `<UContentSearch>`

### 关键组件

- `AppHeader.vue`: 顶部导航栏,包含搜索和主题切换
- `AppFooter.vue`: 页脚组件(当前在 app.vue 中被注释)
- `AppLogo.vue`: 网站 Logo
- `PageHeaderLinks.vue`: 页面头部链接
- `ThemePicker.vue` / `ThemePickerButton.vue`: 主题选择器
- `content/HeroBackground.vue`: 首页英雄区域背景
- `content/StarsBg.vue`: 星空背景效果
- `OgImage/OgImageDocs.vue`: 文档 OG 图片模板

### 主题配置 (app/app.config.ts)

```typescript
ui.colors: { primary: 'green', neutral: 'slate' }
seo.siteName: 'Gorvey的技术笔记'
header: {
  search: true,
  colorMode: true,
  links: [{ icon: 'i-simple-icons-github', to: 'https://github.com/Gorvey' }]
}
toc: { title: 'Table of Contents' }
```

### ESLint 配置

- 使用 `@nuxt/eslint` 和 Stylistic 规则
- 配置: `commaDangle: 'never'`, `braceStyle: '1tbs'`

### 预渲染配置

- 预渲染路由: `['/']`
- 启用 `crawlLinks: true` 自动发现链接
- 禁用 `autoSubfolderIndex`

## 代码规范要求

- **缩进**: 2 空格
- **编码**: UTF-8
- **注释**: Vue/TS/JS 函数必须使用 JSDoc 多行注释,禁止单行注释
- **尾随逗号**: 禁用 (commaDangle: 'never')

## 内容创作

### Front Matter 基础字段

```yaml
---
title: 页面标题
description: 页面描述
seo:
  title: SEO 标题 (可选,默认使用 title)
  description: SEO 描述 (可选,默认使用 description)
links: # 可选,显示在页面头部的链接
  - label: 链接文本
    icon: i-lucide-external-link
    to: https://example.com
    target: _blank
---
```

### Markdown 增强

- **TOC**: 通过 `page.body?.toc?.links` 自动生成 (searchDepth: 1)
- **代码高亮**: 自动启用
- **MDC 组件**: 支持 Nuxt Content 的 MDC 语法
- **SEO**: 自动生成 OG 图片和 meta 标签

### 当前内容结构

```
content/
├── index.md              # 首页 (landing 集合)
└── ai/
    └── MCP/
        └── context7.md   # 示例文档 (docs 集合)
```

## 开发注意事项

- **环境**: Windows (使用 PowerShell 命令)
- **全局导航**: 通过 `inject('navigation')` 访问
- **搜索**: 基于 `queryCollectionSearchSections` 的全站搜索
- **布局**: 所有非首页路由自动使用 `docs` layout
- **404**: 当 `queryCollection('docs').path(route.path).first()` 返回 null 时抛出 404

## 部署

- 支持 Vercel 一键部署
- 支持静态生成 (Nuxt generate)
- 预渲染策略: 首页预渲染 + 链接爬取
