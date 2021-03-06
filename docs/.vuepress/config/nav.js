module.exports = [
  { text: '首页', link: '/' },
  {
    text: '前端',
    // link: '/note/fe/',
    items: [
      { text: '建立自己的知识体系', link: '/pages/b315f9/' },
      {
        text: '知识体系',
        items: [
          { text: 'JavaScript进阶', link: '/pages/901f35/' },
          { text: 'HTML', link: '/pages/ec8bc2/' },
          { text: 'CSS进阶', link: '/pages/ec8bc5/' },
        ],
      },
      {
        text: '笔记',
        items: [
          {
            text: '《JavaScript高级程序设计》读书笔记',
            link: '/pages/5bd01e/',
          },
        ],
      },
      {
        text: '数据结构和算法',
        link: '/pages/11a306/',
      },
    ],
  },
  {
    text: '框架和库',
    items: [
      {
        text: 'vue3.x学习笔记',
        link: "/pages/a60864/"
      },
      {
        text: '源码分析',
        link: '/pages/08f8ee/',
        items: [
          {
            text: 'underscore源码分析',
            link: '/pages/122adc/',
          },
        ],
      },
    ],
  },
  {
    text: '资源',
    link: '/resource/',
  },
  {
    text: '更多',
    items: [
      {
        text: '面试',
        link: '/pages/faf75f/',
      },
      {
        text: '博客建设',
        link: '/pages/16e149/',
      },
    ],
  },
  { text: '留言板', link: '/messageBoard/' },
  { text: '关于', link: '/about/' },
  {
    text: '索引',
    items: [
      {
        text: '分类',
        link: '/categories/',
      },
      {
        text: '标签',
        link: '/tags/',
      },
      {
        text: '归档',
        link: '/archives/',
      },
    ],
  },
];
