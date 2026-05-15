import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string().min(50).max(280),
    category: z.enum([
      'edtech',
      'fintech',
      'marketplace',
      'media',
      'gov',
      'startup',
      'service',
      'product',
      'other',
    ]),
    rating: z.enum(['recommended', 'mixed', 'caution', 'avoid', 'unrated']).default('unrated'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    ogImage: z.string().optional(),
    website: z.string().url().optional(),
    legalName: z.string().optional(),
    founded: z.string().optional(),
    location: z.string().optional(),

    facts: z
      .array(
        z.object({
          claim: z.string(),
          source: z.string().url().optional(),
          sourceLabel: z.string().optional(),
          verifiedAt: z.coerce.date().optional(),
        })
      )
      .default([]),

    strengths: z.array(z.string()).default([]),
    weaknesses: z.array(z.string()).default([]),

    opinion: z.string().optional(),

    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),

    disclosure: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
