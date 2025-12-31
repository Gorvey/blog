import type { ResourceCategory } from './index'

/**
 * 设计资源分类
 */
export const designCategory: ResourceCategory = {
  id: 'design',
  name: '设计资源',
  description: 'UI 设计、图标、设计系统等',
  collections: [
    {
      id: 'tools',
      name: '设计工具',
      description: 'UI/UX 设计工具',
      resources: [
        {
          name: 'Figma',
          url: 'https://figma.com',
          description: '协作设计工具'
        },
        {
          name: 'Framer',
          url: 'https://framer.com',
          description: '交互式设计工具'
        }
      ]
    },
    {
      id: 'icons',
      name: '图标库',
      description: '图标资源和库',
      resources: [
        {
          name: 'Iconify',
          url: 'https://iconify.design',
          description: '统一图标框架'
        },
        {
          name: 'Heroicons',
          url: 'https://heroicons.com',
          description: 'Tailwind CSS 图标库'
        },
        {
          name: 'Lucide',
          url: 'https://lucide.dev',
          description: '一致的开源图标'
        },
        {
          name: 'Simple Icons',
          url: 'https://simpleicons.org',
          description: '品牌 SVG 图标'
        }
      ]
    },
    {
      id: 'systems',
      name: '设计系统',
      description: 'UI 组件库和设计系统',
      resources: [
        {
          name: 'Shadcn UI',
          url: 'https://ui.shadcn.com',
          description: '可复用组件库'
        },
        {
          name: 'DaisyUI',
          url: 'https://daisyui.com',
          description: 'Tailwind CSS 组件库'
        }
      ]
    },
    {
      id: 'assets',
      name: '设计素材',
      description: '配色、插图等素材',
      resources: [
        {
          name: 'Coolors',
          url: 'https://coolors.co',
          description: '配色方案生成器'
        },
        {
          name: 'Undraw',
          url: 'https://undraw.co',
          description: '开源插图'
        }
      ]
    }
  ]
}
