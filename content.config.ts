import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    blog: defineCollection({
      type: 'page',
      source: {
        include: 'blog/**',
        exclude: ['blog/index.md']
      },
      schema: z.object({
        date: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        links: z
          .array(
            z.object({
              label: z.string(),
              icon: z.string(),
              to: z.string(),
              target: z.string().optional()
            })
          )
          .optional()
      })
    }),

    resourceCollections: defineCollection({
      type: 'data',
      source: 'resource-collections/**/*.{md,yml}',
      schema: z.object({
        title: z.string().optional(),
        category: z.string(),
        collection: z.string(),
        description: z.string().optional(),
        resources: z.array(
          z.object({
            name: z.string(),
            url: z.string().url(),
            post: z.string().optional(),
            description: z.string().optional()
          })
        )
      })
    })
  }
});
