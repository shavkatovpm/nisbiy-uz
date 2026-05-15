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
  { href: '/', label: 'Asosiy' },
  { href: '/tahlillar', label: 'Tahlillar' },
  { href: '/blog', label: 'Blog' },
  { href: '/metodologiya', label: 'Metod' },
  { href: '/xizmatlar', label: 'Xizmatlar' },
  { href: '/about', label: 'Haqimizda' },
] as const;

export const ratingLabels = {
  recommended: { label: 'Tavsiya etiladi', tone: 'fact', minScore: 80 },
  caution: { label: 'Ehtiyot bo‘ling', tone: 'opinion', minScore: 60 },
  avoid: { label: 'Tavsiya etilmaydi', tone: 'warn', minScore: 0 },
  unrated: { label: 'Baholanmagan', tone: 'muted', minScore: null },
} as const;

export const criteriaLabels = {
  site: { name: 'Sayt sifati', group: 'Identitet va ishonch' },
  identity: { name: 'Kompaniya aniqligi', group: 'Identitet va ishonch' },
  contact: { name: 'Aloqa kanalalari', group: 'Identitet va ishonch' },
  pricing: { name: 'Narxlar oshkorligi', group: 'Taklif va shartlar' },
  refund: { name: 'Qaytarish/kafolat', group: 'Taklif va shartlar' },
  quality: { name: 'Mahsulot sifati', group: 'Sifat' },
  support: { name: 'Qo‘llab-quvvatlash', group: 'Sifat' },
  ux: { name: 'App/sayt UX', group: 'Sifat' },
  social: { name: 'Ijtimoiy tarmoq', group: 'Reputatsiya' },
  history: { name: 'Faoliyat tarixi', group: 'Reputatsiya' },
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

export const blogCategoryLabels = {
  yoriqnoma: 'Yo‘riqnoma',
  royxat: 'Ro‘yxat',
  taqqoslash: 'Taqqoslash',
  yangiliklar: 'Yangiliklar',
  fikr: 'Fikr',
} as const;

export const ctaTypeLabels = {
  editorial: { label: 'Tavsiya', tone: 'muted' },
  partner: { label: 'Hamkor', tone: 'accent' },
  own: { label: 'Bizning loyiha', tone: 'opinion' },
  sponsored: { label: 'Hamkorlik bilan', tone: 'opinion' },
} as const;
