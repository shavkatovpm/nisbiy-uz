import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    customData: '<language>uz-uz</language>',
    items: projects
      .sort(
        (a, b) =>
          (b.data.updatedAt ?? b.data.publishedAt).valueOf() -
          (a.data.updatedAt ?? a.data.publishedAt).valueOf()
      )
      .map((entry) => {
        const slug = entry.id.replace(/\.[^.]+$/, '');
        return {
          title: entry.data.title,
          description: entry.data.summary,
          link: `/projects/${slug}`,
          pubDate: entry.data.updatedAt ?? entry.data.publishedAt,
          categories: [entry.data.category, ...entry.data.tags],
        };
      }),
  });
}
