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
 * 用于 content/resource-collections/*.yml 文件
 * 这个类型需要与 content.config.ts 中 resourceCollections 的 schema 匹配
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
}

/**
 * 将 Content 文档数组转换为 ResourceCategory 数组
 * 接受任意类型的文档数组，使用类型守卫确保类型安全
 */
export function transformToCategories(docs: unknown[]): ResourceCategory[] {
  // 按 category 分组
  const categoryMap = new Map<string, ResourceCategory>();

  for (const doc of docs) {
    // 类型守卫：确保 doc 符合 ResourceCollectionDoc 的基本结构
    if (
      !doc ||
      typeof doc !== 'object' ||
      !('category' in doc) ||
      !('collection' in doc) ||
      !('resources' in doc) ||
      typeof doc.category !== 'string' ||
      typeof doc.collection !== 'string' ||
      !Array.isArray(doc.resources)
    ) {
      continue;
    }

    const validDoc = doc as ResourceCollectionDoc;
    const categoryId = validDoc.category.toLowerCase().replace(/\s+/g, '-');
    const collectionId = validDoc.collection.toLowerCase().replace(/\s+/g, '-');

    let category = categoryMap.get(categoryId);
    if (!category) {
      category = {
        id: categoryId,
        name: validDoc.category,
        collections: []
      };
      categoryMap.set(categoryId, category);
    }

    category.collections.push({
      id: collectionId,
      name: validDoc.collection,
      description: validDoc.description,
      resources: validDoc.resources
    });
  }

  return Array.from(categoryMap.values());
}
