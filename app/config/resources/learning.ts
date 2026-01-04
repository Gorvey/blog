import type { ResourceCategory } from './index';

/**
 * 学习资源分类
 */
export const learningCategory: ResourceCategory = {
  id: 'learning',
  name: '学习资源',
  description: '学习平台、教程、文档等',
  collections: [
    {
      id: 'docs',
      name: '官方文档',
      description: '核心技术官方文档',
      resources: [
        {
          name: 'MDN Web Docs',
          url: 'https://developer.mozilla.org',
          description: 'Web 开发权威文档'
        },
        {
          name: 'TypeScript',
          url: 'https://www.typescriptlang.org',
          description: 'TypeScript 官方文档'
        },
        {
          name: 'JavaScript.info',
          url: 'https://javascript.info',
          description: '现代 JavaScript 教程'
        },
        {
          name: 'ECMAScript 规范',
          url: 'https://tc39.es/ecma262',
          description: 'JavaScript 语言规范'
        },
        {
          name: 'CSS-Tricks',
          url: 'https://css-tricks.com',
          description: '前端开发技巧'
        },
        {
          name: 'web.dev',
          url: 'https://web.dev',
          description: '现代 Web 开发指南'
        }
      ]
    },
    {
      id: 'platforms',
      name: '学习平台',
      description: '在线学习平台和课程',
      resources: [
        {
          name: 'freeCodeCamp',
          url: 'https://freecodecamp.org',
          description: '免费编程学习平台'
        },
        {
          name: 'Frontend Masters',
          url: 'https://frontendmasters.com',
          description: '高级前端课程'
        },
        {
          name: 'Egghead.io',
          url: 'https://egghead.io',
          description: '视频教程平台'
        },
        {
          name: 'LeetCode',
          url: 'https://leetcode.cn',
          description: '算法刷题平台'
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI 工具',
      description: '人工智能相关工具和服务',
      resources: [
        {
          name: 'Claude',
          url: 'https://claude.ai',
          description: 'Anthropic AI 助手'
        },
        {
          name: 'ChatGPT',
          url: 'https://chat.openai.com',
          description: 'OpenAI 对话系统'
        },
        {
          name: 'GitHub Copilot',
          url: 'https://github.com/features/copilot',
          description: 'AI 编程助手'
        },
        {
          name: 'Cursor',
          url: 'https://cursor.sh',
          description: 'AI 代码编辑器'
        },
        {
          name: 'Model Context Protocol',
          url: 'https://modelcontextprotocol.io',
          description: 'AI 应用连接标准'
        },
        {
          name: 'Hugging Face',
          url: 'https://huggingface.co',
          description: 'AI 模型社区'
        },
        {
          name: 'Ollama',
          url: 'https://ollama.ai',
          description: '本地运行大模型'
        },
        {
          name: 'LangChain',
          url: 'https://js.langchain.com',
          description: 'LLM 应用开发框架'
        },
        {
          name: 'Vercel AI SDK',
          url: 'https://sdk.vercel.ai',
          description: '构建 AI 应用的工具包'
        },
        {
          name: 'Stability AI',
          url: 'https://stability.ai',
          description: '开放 AI 模型'
        }
      ]
    },
    {
      id: 'blogs',
      name: '技术博客',
      description: '优质个人和团队技术博客',
      resources: [
        {
          name: 'Dan Abramov',
          url: 'https://overreacted.io',
          description: 'React 核心开发者博客'
        },
        {
          name: 'Addy Osmani',
          url: 'https://addyosmani.com/blog',
          description: 'Chrome 工程师博客'
        },
        {
          name: 'Kent C. Dodds',
          url: 'https://kentcdodds.com/blog',
          description: 'React 测试专家博客'
        },
        {
          name: 'CSS-Tricks',
          url: 'https://css-tricks.com',
          description: 'CSS 技巧博客'
        },
        {
          name: 'Smashing Magazine',
          url: 'https://smashingmagazine.com',
          description: 'Web 设计杂志'
        },
        {
          name: 'JavaScript Weekly',
          url: 'https://javascriptweekly.com',
          description: 'JavaScript 周刊'
        },
        {
          name: 'Frontend Focus',
          url: 'https://frontendfoc.us',
          description: '前端周刊'
        },
        {
          name: '阮一峰博客',
          url: 'https://ruanyifeng.com/blog',
          description: '知名技术博客'
        },
        {
          name: '张鑫旭博客',
          url: 'https://zhangxinxu.com',
          description: '前端技术博客'
        }
      ]
    }
  ]
};
