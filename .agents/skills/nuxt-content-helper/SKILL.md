---
name: nuxt-content-helper
description: '维护本仓库的 Nuxt Content 内容层。用于在 E:/code/blog 中新增或修改首页内容、博客/文章 Markdown 页面、文档分组导航 .navigation.yml、以及 content/resource-collections/**/*.yml 资源数据时。收到“添加博客”“新增文章”“补充内容”“添加资源”等请求时，按本项目现有 collection、路由、排序和字段约定，只编辑 ./content 下相关文件。'
---

# Nuxt Content 助手

按当前仓库的 Nuxt Content 结构维护 Markdown 页面和 YAML 资源数据。

当用户说“帮我添加一个博客”“新增一篇文章”“补充内容”“添加资源”时，把请求转换成对 `./content` 的实际编辑，并同时遵守 Nuxt Content 官方规则与本项目现有约定。

## 先看什么

1. 先读 `references/project-content-map.md`，确认本项目的内容结构。
2. 需要回忆 Nuxt Content 行为时，再读 `references/official-nuxt-content-notes.md`。
3. 真正动手前，先看 `content.config.ts` 和目标目录里相邻的现有内容文件。

## 先判断用户要改哪一类内容

把需求映射到这三类目标之一：

- 首页或落地页文案：编辑 `content/index.md`
- 博客、文章、文档、内容页：在 `content/docs/**` 下新增或修改 Markdown
- 资源、链接合集、工具清单：在 `content/resource-collections/**` 下新增或修改 YAML

除非用户明确要求重构内容架构，否则不要新造顶层内容目录。

## 必须遵守的项目规则

- 当前有效 collection 只有 `landing`、`docs`、`resourceCollections`
- 这个仓库的文章实际来自 `docs` collection，即使部分 UI 文案还写着“博客”
- 新文章优先放到 `content/docs/**`，不要创建 `content/docs/index.md`，因为它已在 `content.config.ts` 里被排除
- 文档一级分组沿用带数字前缀的目录，如 `2.ai-code`、`3.frontend`
- 目录名前的数字只影响排序，不会出现在公开路由里
- 新的真实文章文件优先使用语义化 kebab-case 文件名，因为文件名会直接变成路由 slug
- 资源 YAML 里的 `category` 和 `collection` 是分组展示名，不要随意改旧值，否则会影响页面分组和 id 生成
- 资源项里的 `post` 必须写真实文章路径，例如 `/docs/frontend/nuxt-content-query`，不要继续沿用错误的 `/blog/...`

## 新增或修改文章

处理文章时按这个顺序做：

1. 先选最合适的现有分组目录
2. 如果没有合适分组，再新增一个新的带序号目录，并补齐：
   - `index.md`
   - `.navigation.yml`
3. 新文章使用 Markdown + YAML frontmatter
4. 通常应补齐这些字段：
   - `title`
   - `description`
   - `date`
   - `category`
   - `tags`
5. `date` 使用 `YYYY-MM-DD`，这样按字符串排序也能稳定按时间倒序
6. `category` 取当前分组的展示标题
7. `tags` 保持简短、可复用
8. 默认先写普通 Markdown；只有页面明确需要时才使用 MDC 组件语法

需要模板时，直接参考：

- `assets/doc-article-template.md`
- `assets/doc-section-index-template.md`
- `assets/navigation-template.yml`

## 新增或修改资源 YAML

处理资源集合时按这个顺序做：

1. 先选最合适的分类目录 `content/resource-collections/<n.category>/`
2. 如果分类不存在，再新增一个新的带序号目录
3. 文件名优先写成 `<sort>.<slug>.yml`
4. 字段必须匹配 schema：
   - `title?`
   - `category`
   - `collection`
   - `sort?`
   - `description?`
   - `resources[]`
5. 每个 `resources[]` 项必须包含：
   - `name`
   - `url`
   - `post?`
   - `description?`
6. `url` 必须是绝对地址
7. 没有真实关联文章时，省略 `post`，不要写空壳占位值

需要模板时，直接参考 `assets/resource-collection-template.yml`。

## 修改首页内容时要小心

- `content/index.md` 现在使用了 MDC block 和 slot 语法
- 除非用户明确要求重做首页，否则优先做局部文案调整
- 不要为了改一句文案把现有结构整体抹掉

## 完成前自检

- 重新打开改过的文件，确认 frontmatter 或 YAML 键名与 schema 一致
- 对照相邻文件，确认命名、语气、排序风格没有跑偏
- 新建文章后，按文件路径检查预期路由是否正确
- 新建资源 YAML 后，检查 `sort`、`category`、`collection` 是否仍能被资源页正确分组

## 参考资料

- `references/project-content-map.md`：本仓库内容层结构、路由样例、已知约束
- `references/official-nuxt-content-notes.md`：本 skill 用到的 Nuxt Content 官方规则摘要
