import type { CollectionEntry } from 'astro:content';
import { categoryLabels, categoryLabelsRu, blogCategoryLabels, blogCategoryLabelsRu, ratingLabels, ratingLabelsRu, site } from './site';
import { resolveRating } from './rating';
import type { Lang } from './i18n';

/**
 * Strip MDX/JSX-flavored bits from body text so the output is portable Markdown
 * that an LLM can read without HTML noise. Keeps headings, lists, tables and
 * inline emphasis untouched.
 */
function cleanBody(raw: string): string {
  return raw
    // Remove import/export statements at file top
    .replace(/^(?:import|export)\s[^\n]*\n/gm, '')
    // Remove self-closing JSX components: <Foo ... />
    .replace(/<([A-Z][A-Za-z0-9]*)\b[^>]*\/>/g, '')
    // Remove opening+closing JSX components but keep inner content
    .replace(/<([A-Z][A-Za-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1>/g, '$2')
    // Collapse 3+ blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function fmtDate(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

const L = {
  uz: {
    summary: 'Qisqacha',
    aboutProject: 'Loyiha haqida',
    legalName: 'Nomi',
    founded: 'Ish boshlagan',
    location: 'Manzil',
    website: 'Sayt',
    rating: 'Reyting',
    score: 'Umumiy ball',
    facts: 'Tekshirilgan faktlar',
    strengths: 'Kuchli tomonlari',
    weaknesses: 'Zaif tomonlari',
    opinion: 'Jamoa fikri',
    opinionFooter: 'Bu — Nisbiy.uz jamoasining subyektiv fikri. Yakuniy qaror sizniki.',
    faq: 'Tez-tez so‘raladigan savollar',
    disclosure: 'Oshkor qilish',
    source: 'Manba',
    verified: 'Tekshirilgan',
    published: 'Chop etilgan',
    updated: 'Yangilangan',
    category: 'Kategoriya',
    canonical: 'Kanonik manzil',
    article: 'Maqola matni',
    citation: 'Sitatalashda',
  },
  ru: {
    summary: 'Кратко',
    aboutProject: 'О проекте',
    legalName: 'Название',
    founded: 'Запущен',
    location: 'Адрес',
    website: 'Сайт',
    rating: 'Рейтинг',
    score: 'Общий балл',
    facts: 'Проверенные факты',
    strengths: 'Сильные стороны',
    weaknesses: 'Слабые стороны',
    opinion: 'Мнение команды',
    opinionFooter: 'Это субъективное мнение команды Nisbiy.uz. Окончательное решение за вами.',
    faq: 'Часто задаваемые вопросы',
    disclosure: 'Раскрытие',
    source: 'Источник',
    verified: 'Проверено',
    published: 'Опубликовано',
    updated: 'Обновлено',
    category: 'Категория',
    canonical: 'Канонический URL',
    article: 'Текст статьи',
    citation: 'Для цитирования',
  },
} as const;

export function projectToMarkdown(entry: CollectionEntry<'projects'>, lang: Lang): string {
  const d = entry.data;
  const t = L[lang];
  const slug = entry.id.replace(/^(uz|ru)\//, '').replace(/\.[^.]+$/, '');
  const canonical = lang === 'ru' ? `${site.url}/ru/tahlillar/${slug}` : `${site.url}/tahlillar/${slug}`;
  const catLabels = lang === 'ru' ? categoryLabelsRu : categoryLabels;
  const ratLabels = lang === 'ru' ? ratingLabelsRu : ratingLabels;

  const { bucket, score } = resolveRating({ criteria: d.criteria, manual: d.rating });
  const dateToShow = d.updatedAt ?? d.publishedAt;
  const dateLabel = d.updatedAt ? t.updated : t.published;
  const focus = d.focusQuestion ?? d.title;

  const parts: string[] = [];

  parts.push(`# ${focus}`);
  parts.push('');
  parts.push(`> ${d.summary}`);
  parts.push('');

  // Meta block
  const meta: string[] = [];
  meta.push(`- **${t.canonical}**: ${canonical}`);
  meta.push(`- **${t.category}**: ${catLabels[d.category]}`);
  meta.push(`- **${dateLabel}**: ${fmtDate(dateToShow, lang)}`);
  meta.push(`- **${t.rating}**: ${ratLabels[bucket].label}${score !== null ? ` — ${score}/100` : ''}`);
  if (d.legalName) meta.push(`- **${t.legalName}**: ${d.legalName}`);
  if (d.founded) meta.push(`- **${t.founded}**: ${d.founded}`);
  if (d.location) meta.push(`- **${t.location}**: ${d.location}`);
  if (d.website) meta.push(`- **${t.website}**: ${d.website}`);
  parts.push(meta.join('\n'));
  parts.push('');

  // Body content
  if (entry.body && entry.body.trim().length > 0) {
    parts.push(`## ${t.article}`);
    parts.push('');
    parts.push(cleanBody(entry.body));
    parts.push('');
  }

  // Facts
  if (d.facts.length > 0) {
    parts.push(`## ${t.facts}`);
    parts.push('');
    for (const f of d.facts) {
      const refs: string[] = [];
      if (f.source) refs.push(`[${f.sourceLabel ?? t.source}](${f.source})`);
      else if (f.sourceLabel) refs.push(f.sourceLabel);
      if (f.verifiedAt) refs.push(`${t.verified}: ${fmtDate(f.verifiedAt, lang)}`);
      const trail = refs.length ? ` _(${refs.join(' · ')})_` : '';
      parts.push(`- ${f.claim}${trail}`);
    }
    parts.push('');
  }

  // Strengths
  if (d.strengths.length > 0) {
    parts.push(`## ${t.strengths}`);
    parts.push('');
    for (const s of d.strengths) parts.push(`- ${s}`);
    parts.push('');
  }

  // Weaknesses
  if (d.weaknesses.length > 0) {
    parts.push(`## ${t.weaknesses}`);
    parts.push('');
    for (const s of d.weaknesses) parts.push(`- ${s}`);
    parts.push('');
  }

  // Opinion
  if (d.opinion) {
    parts.push(`## ${t.opinion}`);
    parts.push('');
    parts.push(d.opinion.trim());
    parts.push('');
    parts.push(`_${t.opinionFooter}_`);
    parts.push('');
  }

  // FAQ
  if (d.faq.length > 0) {
    parts.push(`## ${t.faq}`);
    parts.push('');
    for (const f of d.faq) {
      parts.push(`### ${f.q}`);
      parts.push('');
      parts.push(f.a);
      parts.push('');
    }
  }

  // Disclosure
  if (d.disclosure) {
    parts.push(`## ${t.disclosure}`);
    parts.push('');
    parts.push(d.disclosure);
    parts.push('');
  }

  parts.push('---');
  parts.push(`${t.citation}: ${canonical}`);

  return parts.join('\n') + '\n';
}

export function blogToMarkdown(entry: CollectionEntry<'blog'>, lang: Lang): string {
  const d = entry.data;
  const t = L[lang];
  const slug = entry.id.replace(/^(uz|ru)\//, '').replace(/\.[^.]+$/, '');
  const canonical = lang === 'ru' ? `${site.url}/ru/blog/${slug}` : `${site.url}/blog/${slug}`;
  const catLabels = lang === 'ru' ? blogCategoryLabelsRu : blogCategoryLabels;

  const dateToShow = d.updatedAt ?? d.publishedAt;
  const dateLabel = d.updatedAt ? t.updated : t.published;
  const focus = d.focusQuestion ?? d.title;

  const parts: string[] = [];

  parts.push(`# ${focus}`);
  parts.push('');
  parts.push(`> ${d.summary}`);
  parts.push('');

  const meta: string[] = [];
  meta.push(`- **${t.canonical}**: ${canonical}`);
  meta.push(`- **${t.category}**: ${catLabels[d.category]}`);
  meta.push(`- **${dateLabel}**: ${fmtDate(dateToShow, lang)}`);
  parts.push(meta.join('\n'));
  parts.push('');

  if (entry.body && entry.body.trim().length > 0) {
    parts.push(cleanBody(entry.body));
    parts.push('');
  }

  if (d.faq.length > 0) {
    parts.push(`## ${t.faq}`);
    parts.push('');
    for (const f of d.faq) {
      parts.push(`### ${f.q}`);
      parts.push('');
      parts.push(f.a);
      parts.push('');
    }
  }

  if (d.disclosure) {
    parts.push(`## ${t.disclosure}`);
    parts.push('');
    parts.push(d.disclosure);
    parts.push('');
  }

  parts.push('---');
  parts.push(`${t.citation}: ${canonical}`);

  return parts.join('\n') + '\n';
}
