/**
 * 资源项类型定义
 */
export interface Resource {
  /** 资源名称 */
  name: string
  /** 资源 URL */
  url: string
  /** 关联的博客文章路径(可选) */
  post?: string
  /** 资源描述(可选) */
  description?: string
}

/**
 * 资源集合类型定义
 */
export interface ResourceCollection {
  /** 集合唯一标识 */
  id: string
  /** 集合名称 */
  name: string
  /** 集合描述 */
  description?: string
  /** 资源列表 */
  resources: Resource[]
}

/**
 * 一级分类类型定义
 */
export interface ResourceCategory {
  /** 分类唯一标识 */
  id: string
  /** 分类名称 */
  name: string
  /** 分类描述 */
  description?: string
  /** 资源集合列表 */
  collections: ResourceCollection[]
}

/**
 * 导入所有一级分类
 */
import { frontendCategory } from './frontend'
import { backendCategory } from './backend'
import { toolsCategory } from './tools'
import { deploymentCategory } from './deployment'
import { designCategory } from './design'
import { learningCategory } from './learning'
import { communityCategory } from './community'

/**
 * 所有一级分类
 */
export const resourceCategories: ResourceCategory[] = [
  frontendCategory,
  backendCategory,
  toolsCategory,
  deploymentCategory,
  designCategory,
  learningCategory,
  communityCategory
]

/**
 * 获取所有资源集合（扁平化）
 */
export const getAllCollections = (): ResourceCollection[] => {
  return resourceCategories.flatMap(category => category.collections)
}
