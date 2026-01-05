/*
 * @Author: zengzhe
 * @Date: 2026-01-01 00:45:43
 * @LastEditors: Gorvey 2324850628@qq.com
 * @LastEditTime: 2026-01-05 10:04:54
 * @Description:
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  compatibilityDate: '2024-09-19',
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

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

  llms: {
    domain: 'https://docs-template.nuxt.dev/',
    title: 'Nuxt Docs Template',
    description: 'A template for building documentation with Nuxt UI and Nuxt Content.',
    full: {
      title: 'Nuxt Docs Template - Full Documentation',
      description: 'This is the full documentation for the Nuxt Docs Template.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'blog',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/getting-started%' }]
      },
      {
        title: 'Essentials',
        contentCollection: 'blog',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/essentials%' }]
      }
    ]
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
