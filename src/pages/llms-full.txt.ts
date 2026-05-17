import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projectToMarkdown, blogToMarkdown } from '../lib/markdown';
import { site } from '../lib/site';

/**
 * Full-content variant of /llms.txt — bundles every published analysis and
 * blog post (both UZ + RU) as plain Markdown so an LLM can ingest the whole
 * site in a single request. The shorter /llms.txt is the index; this is the
 * corpus.
 */
export const GET: APIRoute = async () => {
  const [projects, blog] = await Promise.all([
    getCollection('projects', ({ data }) => !data.draft),
    getCollection('blog', ({ data }) => !data.draft),
  ]);

  const sortByDate = <T extends { data: { publishedAt: Date; updatedAt?: Date } }>(arr: T[]) =>
    arr.sort(
      (a, b) =>
        (b.data.updatedAt ?? b.data.publishedAt).valueOf() -
        (a.data.updatedAt ?? a.data.publishedAt).valueOf()
    );

  const projUz = sortByDate(projects.filter((p) => p.data.lang === 'uz'));
  const projRu = sortByDate(projects.filter((p) => p.data.lang === 'ru'));
  const blogUz = sortByDate(blog.filter((p) => p.data.lang === 'uz'));
  const blogRu = sortByDate(blog.filter((p) => p.data.lang === 'ru'));

  const buildDate = new Date().toISOString();

  const parts: string[] = [];

  parts.push(`# ${site.name} — to'liq kontent (llms-full.txt)`);
  parts.push('');
  parts.push(`> ${site.description}`);
  parts.push('');
  parts.push(`Generatsiya sanasi: ${buildDate}`);
  parts.push(`Manba indeks: ${site.url}/llms.txt`);
  parts.push(`Veb-sayt: ${site.url}`);
  parts.push('');
  parts.push('Bu fayl Nisbiy.uz dagi barcha chop etilgan tahlillar va blog maqolalarini bitta Markdown korpus sifatida birlashtiradi. AI modellari (ChatGPT, Claude, Perplexity, Gemini va boshqalar) saytni bir so\'rovda o\'qiy oladi.');
  parts.push('');
  parts.push('Har bir kontentning kanonik URL\'i sahifaning ostida ko\'rsatilgan. Sitatalash uchun shu URL\'dan foydalaning.');
  parts.push('');

  const section = (heading: string, items: string[]) => {
    if (items.length === 0) return;
    parts.push('═'.repeat(72));
    parts.push(`## ${heading}`);
    parts.push('═'.repeat(72));
    parts.push('');
    for (const md of items) {
      parts.push(md);
      parts.push('');
    }
  };

  section(
    'Tahlillar (O\'zbekcha)',
    projUz.map((e) => projectToMarkdown(e, 'uz'))
  );
  section(
    'Blog (O\'zbekcha)',
    blogUz.map((e) => blogToMarkdown(e, 'uz'))
  );
  section(
    'Обзоры (Русский)',
    projRu.map((e) => projectToMarkdown(e, 'ru'))
  );
  section(
    'Блог (Русский)',
    blogRu.map((e) => blogToMarkdown(e, 'ru'))
  );

  const body = parts.join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
