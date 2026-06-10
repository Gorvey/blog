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
      primary: 'blue',
      neutral: 'zinc'
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
    },
    card: {
      slots: {
        root: 'flex flex-col rounded-lg border border-default/70 bg-default/80 shadow-xs backdrop-blur transition-colors dark:border-white/10 dark:bg-[#2a2c31]/95',
        header: 'px-4 py-3 sm:px-4 border-b border-default/50 dark:border-white/8',
        body: 'flex-1 px-4 py-3 sm:px-4',
        footer: 'px-4 py-2.5 sm:px-4 border-t border-default/50 dark:border-white/8'
      }
    },
    header: {
      slots: {
        root: 'sticky top-0 z-50 border-b-0 bg-transparent !h-auto',
        container: 'h-[68px] max-w-none px-3 sm:px-4 lg:px-5'
      }
    },
    button: {
      slots: {
        base: 'cursor-pointer rounded-md font-medium transition-colors'
      }
    },
    input: {
      slots: {
        root: 'rounded-md',
        base: 'rounded-md bg-default/80 backdrop-blur ring-default/80 dark:bg-[#2d2f36]/90 dark:ring-white/10'
      }
    },
    badge: {
      slots: {
        base: 'rounded-md font-medium'
      }
    }
  },
  theme: {
    radius: 0.6,
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
    title: '目录'
  }
});
