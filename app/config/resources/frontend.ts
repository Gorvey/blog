import type { ResourceCategory } from './index';

/**
 * 前端开发分类
 */
export const frontendCategory: ResourceCategory = {
  id: 'frontend',
  name: '前端开发',
  description: '前端框架、CSS、构建工具等',
  collections: [
    {
      id: 'frameworks',
      name: '前端框架',
      description: 'Vue、React、Nuxt 等前端框架资源',
      resources: [
        {
          name: 'Vue.js 官方文档',
          url: 'https://vuejs.org',
          description: 'Vue 3 渐进式 JavaScript 框架'
        },
        {
          name: 'Nuxt 官方文档',
          url: 'https://nuxt.com',
          description: '基于 Vue 的全栈框架'
        },
        {
          name: 'React 官方文档',
          url: 'https://react.dev',
          description: 'React 18+ 用户界面库'
        },
        {
          name: 'Next.js',
          url: 'https://nextjs.org',
          description: 'React 全栈框架'
        },
        {
          name: 'Svelte',
          url: 'https://svelte.dev',
          description: 'Cybernetically enhanced web apps'
        },
        {
          name: 'Angular',
          url: 'https://angular.io',
          description: 'Web 应用平台'
        },
        {
          name: 'Solid.js',
          url: 'https://solidjs.com',
          description: '用于构建用户界面的反应式库'
        },
        {
          name: 'Nuxt UI',
          url: 'https://ui.nuxt.com',
          description: 'Nuxt UI 组件库'
        },
        {
          name: 'Element Plus',
          url: 'https://element-plus.org',
          description: 'Vue 3 组件库'
        },
        {
          name: 'Ant Design Vue',
          url: 'https://antdv.com',
          description: '企业级 Vue 组件库'
        }
      ]
    },
    {
      id: 'css',
      name: 'CSS 框架',
      description: 'Tailwind、UnoCSS 等 CSS 工具和框架',
      resources: [
        {
          name: 'Tailwind CSS',
          url: 'https://tailwindcss.com',
          description: '实用优先的 CSS ss框架',
          post: '/resources/tailwind-css'
        },
        {
          name: 'UnoCSS',
          url: 'https://unocss.dev',
          description: '即时原子化 CSS 引擎'
        },
        {
          name: 'Bootstrap',
          url: 'https://getbootstrap.com',
          description: '流行的 CSS 框架'
        },
        {
          name: 'Bulma',
          url: 'https://bulma.io',
          description: '基于 Flexbox 的 CSS 框架'
        },
        {
          name: 'Sass',
          url: 'https://sass-lang.com',
          description: 'CSS 预处理器'
        },
        {
          name: 'PostCSS',
          url: 'https://postcss.org',
          description: 'CSS 转换工具'
        },
        {
          name: 'CSS Modules',
          url: 'https://github.com/css-modules/css-modules',
          description: 'CSS 模块化方案'
        },
        {
          name: 'Styled Components',
          url: 'https://styled-components.com',
          description: 'React CSS-in-JS 库'
        }
      ]
    },
    {
      id: 'testing',
      name: '测试工具',
      description: '单元测试、E2E 测试等工具',
      resources: [
        {
          name: 'Vitest',
          url: 'https://vitest.dev',
          description: '极速单元测试框架'
        },
        {
          name: 'Jest',
          url: 'https://jestjs.io',
          description: 'JavaScript 测试框架'
        },
        {
          name: 'Playwright',
          url: 'https://playwright.dev',
          description: '现代 E2E 测试框架'
        },
        {
          name: 'Cypress',
          url: 'https://cypress.io',
          description: '前端 E2E 测试工具'
        },
        {
          name: 'Testing Library',
          url: 'https://testing-library.com',
          description: '简单测试工具库'
        },
        {
          name: 'MSW',
          url: 'https://mswjs.io',
          description: 'API Mock 工具'
        },
        {
          name: 'Storybook',
          url: 'https://storybook.js.org',
          description: '组件开发环境'
        }
      ]
    },
    {
      id: 'monitoring',
      name: '监控分析',
      description: '性能监控、错误追踪等工具',
      resources: [
        {
          name: 'Sentry',
          url: 'https://sentry.io',
          description: '错误追踪平台'
        },
        {
          name: 'Vercel Analytics',
          url: 'https://vercel.com/analytics',
          description: 'Vercel 网站分析'
        },
        {
          name: 'Google Analytics',
          url: 'https://analytics.google.com',
          description: 'Google 网站分析'
        },
        {
          name: 'Lighthouse',
          url: 'https://developer.chrome.com/docs/lighthouse',
          description: '网站性能分析工具'
        },
        {
          name: 'WebPageTest',
          url: 'https://webpagetest.org',
          description: '网站性能测试'
        },
        {
          name: 'Datadog',
          url: 'https://datadoghq.com',
          description: '云监控平台'
        },
        {
          name: 'New Relic',
          url: 'https://newrelic.com',
          description: '全栈可观测性'
        }
      ]
    },
    {
      id: 'performance',
      name: '性能优化',
      description: '前端性能优化相关资源',
      resources: [
        {
          name: 'web.dev',
          url: 'https://web.dev',
          description: '现代 Web 开发指南'
        },
        {
          name: 'Core Web Vitals',
          url: 'https://web.dev/vitals',
          description: '核心 Web 性能指标'
        },
        {
          name: 'Lighthouse',
          url: 'https://developer.chrome.com/docs/lighthouse',
          description: '性能分析工具'
        },
        {
          name: 'PageSpeed Insights',
          url: 'https://pagespeed.web.dev',
          description: '页面性能分析'
        },
        {
          name: 'Bundlephobia',
          url: 'https://bundlephobia.com',
          description: 'npm 包大小分析'
        },
        {
          name: 'Webpack Bundle Analyzer',
          url: 'https://github.com/webpack-contrib/webpack-bundle-analyzer',
          description: 'Webpack 包分析器'
        },
        {
          name: 'Performance Calendar',
          url: 'https://calendar.perfplanet.com',
          description: '性能优化文章'
        }
      ]
    },
    {
      id: 'security',
      name: '安全',
      description: 'Web 安全相关资源和工具',
      resources: [
        {
          name: 'OWASP',
          url: 'https://owasp.org',
          description: 'Web 安全标准'
        },
        {
          name: 'Snyk',
          url: 'https://snyk.io',
          description: '安全漏洞扫描'
        },
        {
          name: 'Dependabot',
          url: 'https://github.com/dependabot',
          description: '依赖更新自动化'
        },
        {
          name: 'npm audit',
          url: 'https://docs.npmjs.com/cli/audit',
          description: 'npm 安全审计'
        },
        {
          name: 'Socket Security',
          url: 'https://socket.dev',
          description: 'npm 包安全检查'
        },
        {
          name: 'CSP Evaluator',
          url: 'https://csp-evaluator.withgoogle.com',
          description: 'CSP 策略评估'
        }
      ]
    }
  ]
};
