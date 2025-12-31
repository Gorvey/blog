import type { ResourceCategory } from './index'

/**
 * 后端开发分类
 */
export const backendCategory: ResourceCategory = {
  id: 'backend',
  name: '后端开发',
  description: '后端框架、数据库、API 等',
  collections: [
    {
      id: 'databases',
      name: '数据库',
      description: 'SQL、NoSQL 数据库和工具',
      resources: [
        {
          name: 'PostgreSQL',
          url: 'https://postgresql.org',
          description: '开源关系数据库'
        },
        {
          name: 'MySQL',
          url: 'https://mysql.com',
          description: '流行的关系数据库'
        },
        {
          name: 'MongoDB',
          url: 'https://mongodb.com',
          description: '文档数据库'
        },
        {
          name: 'Redis',
          url: 'https://redis.io',
          description: '内存数据结构存储'
        },
        {
          name: 'Prisma',
          url: 'https://prisma.io',
          description: '现代化数据库 ORM'
        },
        {
          name: 'Drizzle ORM',
          url: 'https://orm.drizzle.team',
          description: '类型安全的 ORM'
        },
        {
          name: 'Turso',
          url: 'https://turso.tech',
          description: '基于 libSQL 的边缘数据库'
        },
        {
          name: 'PlanetScale',
          url: 'https://planetscale.com',
          description: '兼容 MySQL 的无服务器数据库'
        },
        {
          name: 'Supabase',
          url: 'https://supabase.com',
          description: '开源 Firebase 替代品'
        },
        {
          name: 'Neon',
          url: 'https://neon.tech',
          description: '无服务器 PostgreSQL'
        }
      ]
    },
    {
      id: 'api',
      name: 'API 服务',
      description: 'RESTful、GraphQL API 工具',
      resources: [
        {
          name: 'Postman',
          url: 'https://postman.com',
          description: 'API 开发平台'
        },
        {
          name: 'GraphQL',
          url: 'https://graphql.org',
          description: 'API 查询语言'
        },
        {
          name: 'Apollo GraphQL',
          url: 'https://apollographql.com',
          description: 'GraphQL 平台'
        },
        {
          name: 'tRPC',
          url: 'https://trpc.io',
          description: '端到端类型安全 API'
        },
        {
          name: 'OpenAPI',
          url: 'https://openapis.org',
          description: 'API 规范标准'
        },
        {
          name: 'Swagger',
          url: 'https://swagger.io',
          description: 'API 文档工具'
        },
        {
          name: 'REST APIs',
          url: 'https://restfulapi.net',
          description: 'REST API 指南'
        },
        {
          name: 'Insomnia',
          url: 'https://insomnia.rest',
          description: 'API 测试客户端'
        }
      ]
    }
  ]
}
