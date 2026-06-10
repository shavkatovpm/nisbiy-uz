export const site = {
  name: 'Nisbiy.uz',
  shortName: 'Nisbiy',
  url: 'https://nisbiy.uz',
  locale: 'uz_UZ',
  language: 'uz',
  description:
    "O'zbekistondagi loyihalar, kompaniyalar va xizmatlar haqida foydalanuvchi nuqtai nazaridan tekshirilgan faktlar va subyektiv tavsiyalar. Manba: saytlar, ijtimoiy tarmoqlar, mijoz fikrlari va ochiq yangiliklar.",
  descriptionRu:
    'Nisbiy.uz — проверенные факты и субъективные рекомендации о проектах, компаниях и сервисах Узбекистана с точки зрения пользователя. Источники: сайты, соцсети, отзывы клиентов и публикации.',
  tagline: 'Tekshirilgan faktlar. Ochiq fikrlar.',
  taglineRu: 'Проверенные факты. Открытые мнения.',
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

export const navRu = [
  { href: '/ru', label: 'Главная' },
  { href: '/ru/tahlillar', label: 'Обзоры' },
  { href: '/ru/blog', label: 'Блог' },
  { href: '/ru/metodologiya', label: 'Метод' },
  { href: '/ru/xizmatlar', label: 'Услуги' },
  { href: '/ru/about', label: 'О нас' },
] as const;

export const ratingLabels = {
  recommended: { label: 'Tavsiya etiladi', tone: 'fact', minScore: 80 },
  caution: { label: 'Neytral', tone: 'muted', minScore: 60 },
  avoid: { label: 'Ogohlantirish', tone: 'warn', minScore: 0 },
  unrated: { label: 'Baholanmagan', tone: 'muted', minScore: null },
} as const;

export const ratingLabelsRu = {
  recommended: { label: 'Рекомендуется', tone: 'fact', minScore: 80 },
  caution: { label: 'Нейтрально', tone: 'muted', minScore: 60 },
  avoid: { label: 'Предупреждение', tone: 'warn', minScore: 0 },
  unrated: { label: 'Без оценки', tone: 'muted', minScore: null },
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

export const criteriaLabelsRu = {
  site: { name: 'Качество сайта', group: 'Идентичность и доверие' },
  identity: { name: 'Прозрачность компании', group: 'Идентичность и доверие' },
  contact: { name: 'Каналы связи', group: 'Идентичность и доверие' },
  pricing: { name: 'Прозрачность цен', group: 'Предложение и условия' },
  refund: { name: 'Возврат/гарантия', group: 'Предложение и условия' },
  quality: { name: 'Качество продукта', group: 'Качество' },
  support: { name: 'Поддержка', group: 'Качество' },
  ux: { name: 'UX приложения/сайта', group: 'Качество' },
  social: { name: 'Соцсети', group: 'Репутация' },
  history: { name: 'История деятельности', group: 'Репутация' },
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

export const categoryLabelsRu = {
  edtech: 'Образование',
  fintech: 'Финансы',
  marketplace: 'Маркетплейс',
  media: 'Медиа',
  gov: 'Госсектор',
  startup: 'Стартап',
  service: 'Услуга',
  product: 'Продукт',
  other: 'Другое',
} as const;

export const blogCategoryLabels = {
  yoriqnoma: 'Yo‘riqnoma',
  royxat: 'Ro‘yxat',
  taqqoslash: 'Taqqoslash',
  yangiliklar: 'Yangiliklar',
  fikr: 'Fikr',
} as const;

export const blogCategoryLabelsRu = {
  yoriqnoma: 'Руководство',
  royxat: 'Список',
  taqqoslash: 'Сравнение',
  yangiliklar: 'Новости',
  fikr: 'Мнение',
} as const;

export const ctaTypeLabels = {
  editorial: { label: 'Tavsiya', tone: 'muted' },
  partner: { label: 'Hamkor', tone: 'accent' },
  own: { label: 'Bizning loyiha', tone: 'opinion' },
  sponsored: { label: 'Hamkorlik bilan', tone: 'opinion' },
} as const;

export const ctaTypeLabelsRu = {
  editorial: { label: 'Рекомендация', tone: 'muted' },
  partner: { label: 'Партнёр', tone: 'accent' },
  own: { label: 'Наш проект', tone: 'opinion' },
  sponsored: { label: 'На правах рекламы', tone: 'opinion' },
} as const;
