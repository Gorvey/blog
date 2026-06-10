# 项目内容地图

## 当前启用的 Collections

`content.config.ts` 里现在定义了这三个 collection：

- `landing`
  - 类型：`page`
  - 来源：`index.md`
  - 当前文件：`content/index.md`
- `docs`
  - 类型：`page`
  - 来源：`docs/**`
  - 排除：`docs/index.md`
  - 额外 schema 字段：
    - `date?: string`
    - `category?: string`
    - `tags?: string[]`
- `resourceCollections`
  - 类型：`data`
  - 来源：`resource-collections/**/*.{md,yml}`
  - 当前项目实际使用：YAML

## 仓库里的内容结构

### 首页内容

- 文件：`content/index.md`
- 用途：首页 Hero 与文案内容
- 备注：文件里已经使用了 MDC block 语法，例如 `::u-page-hero`

### 文档 / 文章

- 根目录：`content/docs/`
- 现有一级分组：
  - `2.ai-code`
  - `3.frontend`
  - `4.backend`
  - `5.devops`
- 每个分组里通常有：
  - `index.md`
  - `.navigation.yml`
  - 若干文章 Markdown

从当前生成出的内容数据库可以观察到这些路由样例：

- `content/docs/3.frontend/index.md` -> `/docs/frontend`
- `content/docs/3.frontend/fe-1.md` -> `/docs/frontend/fe-1`
- `content/docs/2.ai-code/code-plan.md` -> `/docs/ai-code/code-plan`

结论：

- 目录名前的数字前缀只用于排序
- 数字前缀不会进入公开路由

### 资源数据

- 根目录：`content/resource-collections/`
- 现有分类目录都带序号，例如：
  - `1.ai-programming`
  - `3.framework-ecosystem`
  - `9.ui-design`
- 文件名基本是：
  - `1.skill.yml`
  - `10.code-plan.yml`
  - `100.claude.yml`

资源页通过 `queryCollection('resourceCollections').all()` 读出全部数据，再按照 `category` 和 `collection` 字段分组。

## 运行时行为

### 文章列表页的排序与筛选

`app/pages/docs/index.vue` 使用：

- `queryCollection('docs').where('id', 'LIKE', '%.md').order('date', 'DESC').all()`

这意味着：

- 新文章通常应该写 `date`
- `date` 最好使用 `YYYY-MM-DD`
- `category` 和 `tags` 会直接驱动文章列表页右侧筛选

### 资源页的分组逻辑

`app/types/resources.ts` 会把 YAML 转成页面所需分组结构。

这意味着：

- `category` 是一级分组标题
- `collection` 是二级分组标题
- 页面内部 id 由这些展示名小写化并替换空格后生成
- 直接修改已有 `category` 或 `collection` 文案，可能会影响分组、tab id 和链接状态

### 资源卡上的关联文章

`app/components/ResourceCard.vue` 会把 `resource.post` 当成关联文章链接。

这意味着：

- 应填写真实内部路径，如 `/docs/ai-code/code-plan`
- 除非路由层真的改了，否则不要写 `/blog/...`
- 没有关联文章时直接省略 `post`

## 当前项目里的已知小问题

- 代码里的文章数据来自 `docs` collection，但部分 UI 文案仍写“博客”
- `content/index.md` 里仍有一个 `/blog` 链接，而实际文章列表页在 `/docs`
- `app/error.vue` 仍引用了 `resources` page collection，但 `content.config.ts` 里并没有定义它

除非用户明确要求修这些信息架构问题，否则不要顺手改路由或页面逻辑；只要在新增内容时不要继续复制错误约定即可。

## 推荐起稿格式

新文章可从下面的 frontmatter 起步：

```md
---
title: <清晰标题>
description: <一句话摘要>
date: 2026-03-19
category: <分组标题>
tags:
  - <标签1>
  - <标签2>
---
```

新资源集合可从下面的 YAML 起步：

```yml
title: <可选标题>
category: '<一级分类展示名>'
collection: '<二级集合展示名>'
sort: 10
description: '<可选集合说明>'
resources:
  - name: <资源名>
    url: https://example.com
    description: <可选资源说明>
    post: /docs/<section>/<slug>
```
