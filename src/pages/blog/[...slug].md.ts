import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogToMarkdown } from '../../lib/markdown';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'uz');
  return posts.map((p) => ({
    params: { slug: p.id.replace(/^(uz|ru)\//, '').replace(/\.[^.]+$/, '') },
    props: { entry: p },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as Awaited<ReturnType<typeof getCollection<'blog'>>>[number];
  const body = blogToMarkdown(entry, 'uz');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
