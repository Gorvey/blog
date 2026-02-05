/*
 * @Author: zengzhe
 * @Date: 2025-11-06 15:26:42
 * @LastEditors: Gorvey gorvey76@outlook.com
 * @LastEditTime: 2026-02-05 15:45:49
 * @Description:
 */
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    icons: {
      light: 'i-lucide-sun',
      dark: 'i-lucide-moon',
      system: 'i-lucide-monitor'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  theme: {
    radius: 0.5,
    blackAsPrimary: false
  },
  seo: {
    siteName: 'cooool.fun'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/Gorvey',
        target: '_blank',
        'aria-label': 'GitHub'
      }
    ]
  },
  toc: {
    title: 'Table of Contents'
  }
});
