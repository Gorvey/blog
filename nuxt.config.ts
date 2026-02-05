// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content', 'nuxt-og-image', 'nuxt-studio'],

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
