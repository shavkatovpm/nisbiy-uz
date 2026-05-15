export const site = {
  name: 'Nisbiy.uz',
  shortName: 'Nisbiy',
  url: 'https://nisbiy.uz',
  locale: 'uz_UZ',
  language: 'uz',
  description:
    "O'zbekistondagi loyihalar, kompaniyalar va xizmatlar haqida foydalanuvchi nuqtai nazaridan tekshirilgan faktlar va subyektiv tavsiyalar. Manba: saytlar, ijtimoiy tarmoqlar, mijoz fikrlari va ochiq yangiliklar.",
  tagline: 'Tekshirilgan faktlar. Ochiq fikrlar.',
  twitter: '@nisbiyuz',
  ogImage: '/og-default.png',
  publisher: {
    '@type': 'Organization',
    name: 'Nisbiy.uz',
    url: 'https://nisbiy.uz',
    logo: 'https://nisbiy.uz/favicon.svg',
  },
} as const;

export const nav = [
  { href: '/', label: 'Bosh sahifa' },
  { href: '/tahlillar', label: 'Tahlillar' },
  { href: '/metodologiya', label: 'Metodologiya' },
  { href: '/about', label: 'Biz haqimizda' },
] as const;

export const ratingLabels = {
  recommended: { label: 'Tavsiya etiladi', tone: 'fact' },
  mixed: { label: 'Aralash', tone: 'opinion' },
  caution: { label: 'Ehtiyot bo‘ling', tone: 'warn' },
  avoid: { label: 'Tavsiya etilmaydi', tone: 'warn' },
  unrated: { label: 'Baholanmagan', tone: 'muted' },
} as const;

export const categoryLabels = {
  edtech: 'Ta‘lim',
  fintech: 'Moliya',
  marketplace: 'Marketplace',
  media: 'Media',
  gov: 'Davlat',
  startup: 'Startap',
  service: 'Xizmat',
  product: 'Mahsulot',
  other: 'Boshqa',
} as const;
