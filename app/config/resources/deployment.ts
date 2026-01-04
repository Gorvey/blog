import type { ResourceCategory } from './index';

/**
 * 部署运维分类
 */
export const deploymentCategory: ResourceCategory = {
  id: 'deployment',
  name: '部署运维',
  description: '部署平台、容器、CI/CD 等',
  collections: [
    {
      id: 'platform',
      name: '部署平台',
      description: '应用部署和托管服务',
      resources: [
        {
          name: 'Vercel',
          url: 'https://vercel.com',
          description: '前端应用托管平台'
        },
        {
          name: 'Netlify',
          url: 'https://netlify.com',
          description: '现代化部署平台'
        },
        {
          name: 'Cloudflare Pages',
          url: 'https://pages.cloudflare.com',
          description: 'Cloudflare JAMstack 平台'
        },
        {
          name: 'Railway',
          url: 'https://railway.app',
          description: '全栈应用部署'
        },
        {
          name: 'Fly.io',
          url: 'https://fly.io',
          description: '边缘计算平台'
        },
        {
          name: 'GitHub Pages',
          url: 'https://pages.github.com',
          description: '免费静态网站托管'
        },
        {
          name: 'AWS Amplify',
          url: 'https://aws.amazon.com/amplify',
          description: 'AWS 全栈部署服务'
        },
        {
          name: 'Firebase',
          url: 'https://firebase.google.com',
          description: 'Google 后端服务'
        }
      ]
    },
    {
      id: 'container',
      name: '容器',
      description: '容器化和容器编排',
      resources: [
        {
          name: 'Docker Hub',
          url: 'https://hub.docker.com',
          description: '容器镜像仓库'
        },
        {
          name: 'Docker',
          url: 'https://docker.com',
          description: '容器化平台'
        },
        {
          name: 'Kubernetes',
          url: 'https://kubernetes.io',
          description: '容器编排系统'
        }
      ]
    }
  ]
};
