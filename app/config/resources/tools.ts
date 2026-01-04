import type { ResourceCategory } from './index';

/**
 * 开发工具分类
 */
export const toolsCategory: ResourceCategory = {
  id: 'tools',
  name: '开发工具',
  description: 'IDE、构建工具、包管理器等',
  collections: [
    {
      id: 'ide',
      name: 'IDE 编辑器',
      description: '代码编辑器和开发环境',
      resources: [
        {
          name: 'VS Code',
          url: 'https://code.visualstudio.com',
          description: '微软开源代码编辑器'
        },
        {
          name: 'WebStorm',
          url: 'https://www.jetbrains.com/webstorm',
          description: 'JetBrains 专业前端 IDE'
        },
        {
          name: 'Chrome DevTools',
          url: 'https://developer.chrome.com/docs/devtools',
          description: 'Chrome 开发者工具'
        }
      ]
    },
    {
      id: 'build',
      name: '构建工具',
      description: '前端构建和打包工具',
      resources: [
        {
          name: 'Vite',
          url: 'https://vitejs.dev',
          description: '下一代前端构建工具'
        },
        {
          name: 'Webpack',
          url: 'https://webpack.js.org',
          description: '模块打包工具'
        },
        {
          name: 'esbuild',
          url: 'https://esbuild.github.io',
          description: '极速 JavaScript 打包器'
        },
        {
          name: 'Rspack',
          url: 'https://rspack.dev',
          description: 'Rust 驱动的打包工具'
        },
        {
          name: 'TurboPack',
          url: 'https://turbo.build/pack',
          description: 'Webpack 下一代'
        }
      ]
    },
    {
      id: 'package',
      name: '包管理',
      description: 'npm registry、monorepo 等工具',
      resources: [
        {
          name: 'npm',
          url: 'https://npmjs.com',
          description: 'Node.js 包注册表'
        },
        {
          name: 'pnpm',
          url: 'https://pnpm.io',
          description: '快速包管理器'
        },
        {
          name: 'Yarn',
          url: 'https://yarnpkg.com',
          description: '依赖管理工具'
        },
        {
          name: 'jsDelivr',
          url: 'https://jsdelivr.com',
          description: '免费 CDN 加速'
        },
        {
          name: 'unpkg',
          url: 'https://unpkg.com',
          description: 'npm 包 CDN'
        },
        {
          name: 'esm.sh',
          url: 'https://esm.sh',
          description: 'ES 模块 CDN'
        },
        {
          name: 'Turborepo',
          url: 'https://turbo.build/repo',
          description: '高性能构建系统'
        },
        {
          name: 'Nx',
          url: 'https://nx.dev',
          description: '智能 Monorepo 工具'
        },
        {
          name: 'Lerna',
          url: 'https://lerna.js.org',
          description: '多包管理工具'
        },
        {
          name: 'Changesets',
          url: 'https://github.com/changesets/changesets',
          description: '版本管理工具'
        }
      ]
    },
    {
      id: 'quality',
      name: '代码质量',
      description: '代码检查和格式化工具',
      resources: [
        {
          name: 'ESLint',
          url: 'https://eslint.org',
          description: 'JavaScript 代码检查工具'
        },
        {
          name: 'Prettier',
          url: 'https://prettier.io',
          description: '代码格式化工具'
        },
        {
          name: 'Biome',
          url: 'https://biomejs.dev',
          description: '快速 JavaScript 工具链'
        },
        {
          name: 'Git',
          url: 'https://git-scm.com',
          description: '分布式版本控制系统'
        },
        {
          name: 'GitHub',
          url: 'https://github.com',
          description: '代码托管平台'
        }
      ]
    }
  ]
};
