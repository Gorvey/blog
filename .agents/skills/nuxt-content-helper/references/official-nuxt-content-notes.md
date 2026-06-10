# Nuxt Content 官方规则摘要

这些内容是为本 skill 压缩后的官方要点，便于在写内容时快速回忆。

## Collection 类型

- `page` collection 适合和站点页面一一对应的内容
- `data` collection 适合结构化数据，不直接作为页面渲染
- `page` collection 会自动生成这些常见字段：
  - `path`
  - `title`
  - `description`
  - `seo`
  - `body`
  - `navigation`
- 两类 collection 都有一些默认字段：
  - `id`
  - `stem`
  - `extension`
  - `meta`

## 路由生成

官方示例说明：

- `content/index.md` -> `/`
- `content/about.md` -> `/about`
- `content/blog/index.md` -> `/blog`
- `content/blog/hello.md` -> `/blog/hello`
- 带数字前缀的名字如 `content/1.guide/2.installation.md` 会生成 `/guide/installation`

映射到本仓库时：

- `content/docs/3.frontend/index.md` -> `/docs/frontend`
- `content/docs/3.frontend/nuxt-content-query.md` -> `/docs/frontend/nuxt-content-query`

## Markdown 文件

- Markdown 支持 YAML frontmatter
- frontmatter 数据可以在查询结果里直接读到
- Nuxt Content 支持 MDC，因此 Markdown 中可以在需要时嵌入内容组件

最小官方写法：

```md
---
title: '页面标题'
description: '页面描述'
---

# 页面标题
```

## YAML 数据文件

- YAML 文件可以作为 `data` collection 的数据源
- 整个 YAML 文档就是该条数据本身
- 应始终以 `content.config.ts` 里的 Zod schema 为准

最小官方写法：

```yml
name: 示例
url: https://example.com
```

## 导航元数据

- `.navigation.yml` 可以给目录补充导航元数据
- 官方常见字段是 `title` 和 `icon`
- 适合给文档分组目录设置导航标题，而不需要把这些信息重复写进每篇文章

## 查询方式

- 按页面路径取内容时，可使用 `queryCollection('docs').path(route.path).first()`
- 需要生成目录导航时，可使用 `queryCollectionNavigation('docs')`

## 官方文档链接

- https://content.nuxt.com/docs/collections/types
- https://content.nuxt.com/docs/files/markdown
- https://content.nuxt.com/docs/files/yaml
- https://content.nuxt.com/docs/utils/query-collection
- https://content.nuxt.com/docs/utils/query-collection-navigation
