/**
 * 资源项类型定义（复用原有类型）
 */
export interface Resource {
  /** 资源名称 */
  name: string;
  /** 资源 URL */
  url: string;
  /** 关联的博客文章路径(可选) */
  post?: string;
  /** 资源描述(可选) */
  description?: string;
}

/**
 * 资源集合类型定义（复用原有类型）
 */
export interface ResourceCollection {
  /** 集合唯一标识 */
  id: string;
  /** 集合名称 */
  name: string;
  /** 集合描述 */
  description?: string;
  /** 资源列表 */
  resources: Resource[];
}

/**
 * 一级分类类型定义（复用原有类型）
 */
export interface ResourceCategory {
  /** 分类唯一标识 */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类描述 */
  description?: string;
  /** 资源集合列表 */
  collections: ResourceCollection[];
}

/**
 * Nuxt Content 文档类型（从 YAML 解析）
 * 用于 content/resource-collections/*.md 文件
 */
export interface ResourceCollectionDoc {
  /** 文档标题（从文件名或 frontmatter 获取） */
  title?: string;
  /** 一级分类 */
  category: string;
  /** 二级集合名称 */
  collection: string;
  /** 集合描述 */
  description?: string;
  /** 资源列表 */
  resources: Resource[];
  /** 文档路径（由 Nuxt Content 添加） */
  _path?: string;
  /** 文件名（用于生成 id） */
  _file?: string;
}

/**
 * 将 Content 文档数组转换为 ResourceCategory 数组
 */
export function transformToCategories(docs: ResourceCollectionDoc[]): ResourceCategory[] {
  // 按 category 分组
  const categoryMap = new Map<string, ResourceCategory>();

  for (const doc of docs) {
    const categoryId = doc.category.toLowerCase().replace(/\s+/g, '-');
    const collectionId = doc.collection.toLowerCase().replace(/\s+/g, '-');

    let category = categoryMap.get(categoryId);
    if (!category) {
      category = {
        id: categoryId,
        name: doc.category,
        collections: []
      };
      categoryMap.set(categoryId, category);
    }

    category.collections.push({
      id: collectionId,
      name: doc.collection,
      description: doc.description,
      resources: doc.resources
    });
  }

  return Array.from(categoryMap.values());
}
