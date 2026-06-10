export type Lang = 'uz' | 'ru';

export const langs: Lang[] = ['uz', 'ru'];

export const defaultLang: Lang = 'uz';

/** Detect language from URL pathname. Anything starting with /ru/ or exactly /ru is Russian. */
export function getLang(pathname: string): Lang {
  if (pathname === '/ru' || pathname === '/ru/' || pathname.startsWith('/ru/')) return 'ru';
  return 'uz';
}

/** Prefix a path for the given locale. Uzbek paths stay at root, Russian get /ru prefix. */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'uz') return clean;
  if (clean === '/') return '/ru';
  return `/ru${clean}`;
}

/** Strip /ru prefix from a path to get the canonical Uzbek path. */
export function stripLocale(path: string): string {
  if (path === '/ru' || path === '/ru/') return '/';
  if (path.startsWith('/ru/')) return path.slice(3);
  return path;
}

export const htmlLang: Record<Lang, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
};

export const langLabels: Record<Lang, string> = {
  uz: 'Oʻzbekcha',
  ru: 'Русский',
};

export const langShort: Record<Lang, string> = {
  uz: 'UZ',
  ru: 'RU',
};

// ─────────────────────────────────────────────────────────────────────────────
// UI strings dictionary. Keep keys stable; add new locales as needed.
// ─────────────────────────────────────────────────────────────────────────────
export const t = {
  uz: {
    // Site shell
    skipToContent: 'Asosiy kontentga o‘tish',
    openMenu: 'Menyuni ochish',
    closeMenu: 'Menyuni yopish',
    homeAriaLabel: 'bosh sahifa',
    mainNavLabel: 'Asosiy navigatsiya',
    mobileNavLabel: 'Mobil navigatsiya',
    languageSwitcherLabel: 'Til',

    // Nav items
    navHome: 'Asosiy',
    navAnalyses: 'Tahlillar',
    navBlog: 'Blog',
    navMethod: 'Metod',
    navServices: 'Xizmatlar',
    navAbout: 'Haqimizda',

    // Footer
    footerInSite: 'Saytda',
    footerAllAnalyses: 'Barcha tahlillar',
    footerMethod: 'Metod',
    footerAbout: 'Haqimizda',
    footerFinalDecision: 'Yakuniy qaror sizniki.',
    footerTagline: 'Tekshirilgan faktlar. Ochiq fikrlar.',

    // Common labels
    breadcrumbHome: 'Asosiy',
    breadcrumbAnalyses: 'Tahlillar',
    breadcrumbBlog: 'Blog',
    backToBlog: '← Barcha maqolalar',
    backToAnalyses: '← Barcha tahlillar',
    citationLabel: 'Manba sifatida sitatalashda',
    relatedLinks: 'Tegishli linklar',
    faqHeading: 'Tez-tez so‘raladigan savollar',
    disclosurePrefix: 'Oshkor qilish',
    publishedLabel: 'Chop etilgan',
    updatedLabel: 'Yangilangan',

    // Analysis page
    legalNameLabel: 'Nomi',
    foundedLabel: 'Ish boshlagan',
    locationLabel: 'Manzil',
    factsTitle: 'Tekshirilgan faktlar',
    factsHelper: 'manbalar bilan',
    strengthsTitle: 'Kuchli tomonlari',
    weaknessesTitle: 'Zaif tomonlari',
    opinionTitle: 'Jamoa fikri',
    opinionFooter: 'Bu — Nisbiy.uz jamoasining subyektiv fikri. Yakuniy qaror sizniki.',
    fullAnalysisSuffix: 'haqida to‘liq tahlil',
    analysisCardSuffix: 'to‘liq tahlil va jamoa fikri',
    isTrustworthySuffix: 'ishonchlimi?',

    // Listing pages
    catalogEyebrow: 'Katalog',
    allAnalysesTitle: 'Barcha tahlillar',
    allAnalysesIntro: 'Har bir loyiha haqida tekshirilgan faktlar va jamoa fikri. Manbalar har doim ko‘rsatiladi.',
    blogEyebrow: 'Blog',
    blogTitle: 'Yo‘riqnomalar va maqolalar',
    blogIntro: 'Tahlillardan farqli o‘laroq, blog mavzular bo‘yicha tushuntirishlar, ro‘yxatlar va taqqoslashlardan iborat.',
    allFilter: 'Hammasi',
    emptyAnalyses: 'Hozircha kontent yo‘q. Tez orada birinchi tahlillar paydo bo‘ladi.',
    emptyBlog: 'Hozircha maqola yo‘q. Tez orada birinchi blog postlari paydo bo‘ladi.',

    // Ratings
    ratingRecommended: 'Tavsiya etiladi',
    ratingCaution: 'Neytral',
    ratingAvoid: 'Ogohlantirish',
    ratingUnrated: 'Baholanmagan',

    // CTA types
    ctaEditorial: 'Tavsiya',
    ctaPartner: 'Hamkor',
    ctaOwn: 'Bizning loyiha',
    ctaSponsored: 'Hamkorlik bilan',

    // Categories (analyses)
    catEdtech: 'Ta‘lim',
    catFintech: 'Moliya',
    catMarketplace: 'Marketplace',
    catMedia: 'Media',
    catGov: 'Davlat',
    catStartup: 'Startap',
    catService: 'Xizmat',
    catProduct: 'Mahsulot',
    catOther: 'Boshqa',

    // Categories (blog)
    blogCatYoriqnoma: 'Yo‘riqnoma',
    blogCatRoyxat: 'Ro‘yxat',
    blogCatTaqqoslash: 'Taqqoslash',
    blogCatYangiliklar: 'Yangiliklar',
    blogCatFikr: 'Fikr',

    // Criteria names
    critSite: 'Sayt sifati',
    critIdentity: 'Kompaniya aniqligi',
    critContact: 'Aloqa kanalalari',
    critPricing: 'Narxlar oshkorligi',
    critRefund: 'Qaytarish/kafolat',
    critQuality: 'Mahsulot sifati',
    critSupport: 'Qo‘llab-quvvatlash',
    critUx: 'App/sayt UX',
    critSocial: 'Ijtimoiy tarmoq',
    critHistory: 'Faoliyat tarixi',
    critGroupIdentity: 'Identitet va ishonch',
    critGroupOffer: 'Taklif va shartlar',
    critGroupQuality: 'Sifat',
    critGroupReputation: 'Reputatsiya',
  },
  ru: {
    skipToContent: 'Перейти к основному содержимому',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    homeAriaLabel: 'главная страница',
    mainNavLabel: 'Основная навигация',
    mobileNavLabel: 'Мобильная навигация',
    languageSwitcherLabel: 'Язык',

    navHome: 'Главная',
    navAnalyses: 'Обзоры',
    navBlog: 'Блог',
    navMethod: 'Метод',
    navServices: 'Услуги',
    navAbout: 'О нас',

    footerInSite: 'На сайте',
    footerAllAnalyses: 'Все обзоры',
    footerMethod: 'Метод',
    footerAbout: 'О нас',
    footerFinalDecision: 'Окончательное решение за вами.',
    footerTagline: 'Проверенные факты. Открытые мнения.',

    breadcrumbHome: 'Главная',
    breadcrumbAnalyses: 'Обзоры',
    breadcrumbBlog: 'Блог',
    backToBlog: '← Все статьи',
    backToAnalyses: '← Все обзоры',
    citationLabel: 'Для цитирования как источник',
    relatedLinks: 'Связанные ссылки',
    faqHeading: 'Часто задаваемые вопросы',
    disclosurePrefix: 'Раскрытие',
    publishedLabel: 'Опубликовано',
    updatedLabel: 'Обновлено',

    legalNameLabel: 'Название',
    foundedLabel: 'Запущен',
    locationLabel: 'Адрес',
    factsTitle: 'Проверенные факты',
    factsHelper: 'с указанием источников',
    strengthsTitle: 'Сильные стороны',
    weaknessesTitle: 'Слабые стороны',
    opinionTitle: 'Мнение команды',
    opinionFooter: 'Это субъективное мнение команды Nisbiy.uz. Окончательное решение за вами.',
    fullAnalysisSuffix: '— полный обзор',
    analysisCardSuffix: 'полный обзор и мнение команды',
    isTrustworthySuffix: 'надёжен ли?',

    catalogEyebrow: 'Каталог',
    allAnalysesTitle: 'Все обзоры',
    allAnalysesIntro: 'По каждому проекту — проверенные факты и мнение команды. Источники всегда указаны.',
    blogEyebrow: 'Блог',
    blogTitle: 'Руководства и статьи',
    blogIntro: 'В отличие от обзоров, блог содержит объяснения, списки и сравнения по темам.',
    allFilter: 'Все',
    emptyAnalyses: 'Пока обзоров нет. Скоро появятся первые материалы.',
    emptyBlog: 'Пока статей нет. Скоро появятся первые публикации.',

    ratingRecommended: 'Рекомендуется',
    ratingCaution: 'Нейтрально',
    ratingAvoid: 'Предупреждение',
    ratingUnrated: 'Без оценки',

    ctaEditorial: 'Рекомендация',
    ctaPartner: 'Партнёр',
    ctaOwn: 'Наш проект',
    ctaSponsored: 'На правах рекламы',

    catEdtech: 'Образование',
    catFintech: 'Финансы',
    catMarketplace: 'Маркетплейс',
    catMedia: 'Медиа',
    catGov: 'Госсектор',
    catStartup: 'Стартап',
    catService: 'Услуга',
    catProduct: 'Продукт',
    catOther: 'Другое',

    blogCatYoriqnoma: 'Руководство',
    blogCatRoyxat: 'Список',
    blogCatTaqqoslash: 'Сравнение',
    blogCatYangiliklar: 'Новости',
    blogCatFikr: 'Мнение',

    critSite: 'Качество сайта',
    critIdentity: 'Прозрачность компании',
    critContact: 'Каналы связи',
    critPricing: 'Прозрачность цен',
    critRefund: 'Возврат/гарантия',
    critQuality: 'Качество продукта',
    critSupport: 'Поддержка',
    critUx: 'UX приложения/сайта',
    critSocial: 'Соцсети',
    critHistory: 'История деятельности',
    critGroupIdentity: 'Идентичность и доверие',
    critGroupOffer: 'Предложение и условия',
    critGroupQuality: 'Качество',
    critGroupReputation: 'Репутация',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type TKey = keyof typeof t.uz;

/** Type-safe lookup helper for translation strings. */
export function tr(lang: Lang, key: TKey): string {
  return t[lang][key] ?? t.uz[key];
}

/** Date formatter respecting locale. */
export function formatDate(date: Date, lang: Lang): string {
  const localeTag = htmlLang[lang];
  return new Intl.DateTimeFormat(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(date: Date, lang: Lang): string {
  const localeTag = htmlLang[lang];
  return new Intl.DateTimeFormat(localeTag, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
