import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projectToMarkdown } from '../../../lib/markdown';

export async function getStaticPaths() {
  const projects = await getCollection('projects', ({ data }) => !data.draft && data.lang === 'ru');
  return projects.map((p) => ({
    params: { slug: p.id.replace(/^(uz|ru)\//, '').replace(/\.[^.]+$/, '') },
    props: { entry: p },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as Awaited<ReturnType<typeof getCollection<'projects'>>>[number];
  const body = projectToMarkdown(entry, 'ru');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
