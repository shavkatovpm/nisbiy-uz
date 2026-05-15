import { site } from './site';

const ratingToScore: Record<string, number> = {
  recommended: 4.5,
  mixed: 3,
  caution: 2,
  avoid: 1,
};

export function projectJsonLd(args: {
  title: string;
  summary: string;
  url: string;
  rating: string;
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  legalName?: string;
  website?: string;
  founded?: string;
  location?: string;
  faq: { q: string; a: string }[];
}) {
  const {
    title,
    summary,
    url,
    rating,
    publishedAt,
    updatedAt,
    legalName,
    website,
    founded,
    location,
    faq,
  } = args;

  const subject: Record<string, unknown> = {
    '@type': 'Organization',
    name: legalName ?? title,
    url: website,
    address: location,
    foundingDate: founded,
  };

  const review: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: title,
    url,
    inLanguage: 'uz-UZ',
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt ?? publishedAt).toISOString(),
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: site.publisher,
    itemReviewed: subject,
    reviewBody: summary,
  };

  if (rating in ratingToScore) {
    review.reviewRating = {
      '@type': 'Rating',
      ratingValue: ratingToScore[rating],
      bestRating: 5,
      worstRating: 1,
    };
  }

  const out: Record<string, unknown>[] = [review];

  if (faq.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return out;
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
