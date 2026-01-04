import type { ResourceCategory } from './index';

/**
 * 开发者社区分类
 */
export const communityCategory: ResourceCategory = {
  id: 'community',
  name: '开发者社区',
  description: '技术社区、论坛、资讯等',
  collections: [
    {
      id: 'international',
      name: '国际社区',
      description: '国外开发者社区',
      resources: [
        {
          name: 'GitHub',
          url: 'https://github.com',
          description: '代码托管平台'
        },
        {
          name: 'Stack Overflow',
          url: 'https://stackoverflow.com',
          description: '开发者问答社区'
        },
        {
          name: 'Dev.to',
          url: 'https://dev.to',
          description: '开发者社区'
        },
        {
          name: 'Reddit - r/webdev',
          url: 'https://reddit.com/r/webdev',
          description: 'Web 开发板块'
        },
        {
          name: 'Hacker News',
          url: 'https://news.ycombinator.com',
          description: '科技新闻社区'
        },
        {
          name: 'Twitter - Tech',
          url: 'https://x.com/i/streams',
          description: '技术圈推特'
        }
      ]
    },
    {
      id: 'chinese',
      name: '中文社区',
      description: '中文开发者社区',
      resources: [
        {
          name: '掘金',
          url: 'https://juejin.cn',
          description: '中文技术社区'
        },
        {
          name: '知乎',
          url: 'https://zhihu.com',
          description: '中文问答社区'
        },
        {
          name: 'V2EX',
          url: 'https://v2ex.com',
          description: '创意工作者社区'
        },
        {
          name: 'SegmentFault',
          url: 'https://segmentfault.com',
          description: '中文开发者社区'
        }
      ]
    }
  ]
};
