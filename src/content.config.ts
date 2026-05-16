import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const criterionScore = z.number().min(0).max(10);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** Language of this entry. Files live under `src/content/projects/{uz|ru}/`. */
    lang: z.enum(['uz', 'ru']).default('uz'),
    title: z.string(),
    slug: z.string().optional(),
    /** Fokus savol — har tahlil shu savolga javob beradi. AEO uchun H1 va title. */
    focusQuestion: z.string().optional(),
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
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    ogImage: z.string().optional(),
    website: z.string().url().optional(),
    legalName: z.string().optional(),
    founded: z.string().optional(),
    location: z.string().optional(),

    // 100-ballik mezon — 10 ta mezon, har biri 0-10.
    // Bironta mezon yozilmagan bo'lsa, hisoblashda 5 (neytral) ishlatiladi.
    criteria: z
      .object({
        site: criterionScore.optional(),
        identity: criterionScore.optional(),
        contact: criterionScore.optional(),
        pricing: criterionScore.optional(),
        refund: criterionScore.optional(),
        quality: criterionScore.optional(),
        support: criterionScore.optional(),
        ux: criterionScore.optional(),
        social: criterionScore.optional(),
        history: criterionScore.optional(),
      })
      .optional(),

    rating: z.enum(['recommended', 'caution', 'avoid', 'unrated']).optional(),

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

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    /** Language of this entry. Files live under `src/content/blog/{uz|ru}/`. */
    lang: z.enum(['uz', 'ru']).default('uz'),
    title: z.string(),
    slug: z.string().optional(),
    /** Fokus savol — maqola shu savolga javob beradi. AEO uchun H1 va title. */
    focusQuestion: z.string().optional(),
    summary: z.string().min(50).max(280),
    category: z.enum([
      'yoriqnoma', // Guide / How-to
      'royxat', // Listicle
      'taqqoslash', // Comparison
      'yangiliklar', // News
      'fikr', // Opinion / editorial
    ]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    ogImage: z.string().optional(),

    /** Maqola ichidagi CTA kartalar. Har CTA o'z disclosure type'iga ega. */
    ctas: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          description: z.string().optional(),
          type: z
            .enum(['editorial', 'partner', 'own', 'sponsored'])
            .default('editorial'),
          // editorial — oddiy tavsiya, badge yo'q
          // partner — "Hamkor" badge (to'lovsiz hamkorlik)
          // own — "Bizning loyiha" badge (CoI ochiq)
          // sponsored — "Hamkorlik bilan" badge (pullik joylash)
        })
      )
      .default([]),

    /** Tahlillar bilan bog'liqlik — slug ro'yxati */
    relatedAnalyses: z.array(z.string()).default([]),

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

export const collections = { projects, blog };
