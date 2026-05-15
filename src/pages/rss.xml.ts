import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const [projects, blog] = await Promise.all([
    getCollection('projects', ({ data }) => !data.draft),
    getCollection('blog', ({ data }) => !data.draft),
  ]);

  const projectItems = projects.map((entry) => {
    const slug = entry.id.replace(/\.[^.]+$/, '');
    return {
      title: entry.data.title,
      description: entry.data.summary,
      link: `/tahlillar/${slug}`,
      pubDate: entry.data.updatedAt ?? entry.data.publishedAt,
      categories: ['tahlil', entry.data.category, ...entry.data.tags],
    };
  });

  const blogItems = blog.map((entry) => {
    const slug = entry.id.replace(/\.[^.]+$/, '');
    return {
      title: entry.data.title,
      description: entry.data.summary,
      link: `/blog/${slug}`,
      pubDate: entry.data.updatedAt ?? entry.data.publishedAt,
      categories: ['blog', entry.data.category, ...entry.data.tags],
    };
  });

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    customData: '<language>uz-uz</language>',
    items: [...projectItems, ...blogItems].sort(
      (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
    ),
  });
}
