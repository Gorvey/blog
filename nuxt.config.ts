// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content', 'nuxt-og-image', 'nuxt-studio'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    // Vercel serverless 环境配置
    database: {
      type: 'sqlite',
      filename: '/tmp/contents.sqlite'
    },
    // 使用 Node.js 内置的 node:sqlite 模块 (需要 Node v22.5.0+)
    experimental: {
      sqliteConnector: 'native'
    },
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  compatibilityDate: '2024-09-19',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  icon: {
    provider: 'iconify'
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'Gorvey',
      repo: 'blog',
      branch: 'main'
    },
    i18n: {
      defaultLocale: 'zh'
    }
  }
});
