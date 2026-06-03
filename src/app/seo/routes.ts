import { type Lang, type LocalizedText, localize } from "./site";

export type RouteKind = "home" | "listing" | "service" | "industry" | "article" | "simple" | "not-found";
export type ChangeFrequency = "weekly" | "monthly" | "yearly";

export type SeoRoute = {
  kind: RouteKind;
  path: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  h1: LocalizedText;
  summary: LocalizedText;
  eyebrow?: LocalizedText;
  changeFrequency: ChangeFrequency;
  priority: number;
  noindex?: boolean;
};

export type DetailRoute = SeoRoute & {
  kind: "service" | "industry" | "article";
  problems: LocalizedText[];
  deliverables: LocalizedText[];
  integrations: LocalizedText[];
  process: LocalizedText[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  related: string[];
  cta: LocalizedText;
  date?: string;
};

const agency = {
  en: "LORA builds websites, digital products, CRM integrations and conversion systems for growing companies.",
  es: "LORA crea sitios web, productos digitales, integraciones CRM y sistemas de conversion para empresas en crecimiento.",
  ru: "LORA проектирует сайты, цифровые продукты, CRM-интеграции и системы конверсии для компаний, которым нужен управляемый рост.",
  zh: "LORA 为成长型公司构建网站、数字产品、CRM 集成和转化系统。",
};

function text(en: string, ru: string, es = en, zh = en): LocalizedText {
  return { en, es, ru, zh };
}

export const mainRoutes: SeoRoute[] = [
  {
    kind: "home",
    path: "/",
    slug: "home",
    title: text("LORA | Revenue engineering agency", "LORA | Агентство системного роста", "LORA | Agencia de revenue engineering", "LORA | 收入工程 агентство"),
    description: agency,
    h1: text("Revenue engineering agency", "Агентство системного роста", "Agencia de revenue engineering", "收入工程 агентство"),
    summary: agency,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    kind: "listing",
    path: "/services",
    slug: "services",
    title: text("Services | LORA", "Услуги | LORA", "Servicios | LORA", "服务 | LORA"),
    description: text("Website, UX/UI, SEO, CRM and automation services by LORA.", "Услуги LORA: сайты, UX/UI, SEO, CRM, автоматизация и поддержка.", "Servicios de sitios web, UX/UI, SEO, CRM y automatizacion de LORA.", "LORA 网站、UX/UI、SEO、CRM 和自动化服务。"),
    h1: text("Services", "Услуги", "Servicios", "服务"),
    summary: text("Commercial pages for core LORA services with clear scope, process and CTA.", "Коммерческие страницы ключевых услуг LORA с понятным составом работ, процессом и CTA.", "Paginas comerciales de servicios clave de LORA.", "LORA 主要服务页面。"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    kind: "listing",
    path: "/industries",
    slug: "industries",
    title: text("Industry website solutions | LORA", "Сайты для ниш и отраслей | LORA", "Soluciones por industria | LORA", "行业网站解决方案 | LORA"),
    description: text("Landing pages for restaurants, clinics, beauty, B2B, real estate and other industries.", "Посадочные страницы под салоны, рестораны, клиники, B2B, недвижимость и другие ниши.", "Paginas para restaurantes, clinicas, belleza, B2B e inmobiliaria.", "餐厅、诊所、美业、B2B、房地产等行业页面。"),
    h1: text("Industry solutions", "Решения для ниш", "Soluciones por industria", "行业解决方案"),
    summary: text("Neutral, useful industry pages prepared for SEO and future ad campaigns.", "Нейтральные полезные страницы ниш, подготовленные для SEO и будущей рекламы.", "Paginas por industria preparadas para SEO y publicidad.", "为 SEO 和广告准备的行业页面。"),
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    kind: "listing",
    path: "/blog",
    slug: "blog",
    title: text("Blog | LORA", "Блог | LORA", "Blog | LORA", "博客 | LORA"),
    description: text("Notes about conversion, CRM, website systems and revenue architecture.", "Материалы о конверсии, CRM, сайтах и архитектуре роста.", "Notas sobre conversion, CRM, sitios web y arquitectura de ingresos.", "关于转化、CRM、网站系统和增长架构的文章。"),
    h1: text("Blog", "Блог", "Blog", "博客"),
    summary: text("Articles that connect strategy, product and implementation.", "Статьи на стыке стратегии, продукта и реализации.", "Articulos sobre estrategia, producto e implementacion.", "连接战略、产品与执行的文章。"),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    kind: "simple",
    path: "/pricing",
    slug: "pricing",
    title: text("Pricing | LORA", "Цены | LORA", "Precios | LORA", "价格 | LORA"),
    description: text("Starting points and project formats for websites, apps, CRM and automation.", "Ориентиры по стоимости сайтов, приложений, CRM и автоматизации.", "Rangos de precio para sitios, apps, CRM y automatizacion.", "网站、应用、CRM 和自动化项目价格参考。"),
    h1: text("Pricing", "Цены", "Precios", "价格"),
    summary: text("Use pricing as a starting point, then request a brief for a scoped estimate.", "Цены — ориентир. Точная оценка появляется после брифа и разбора задачи.", "Los precios son una referencia inicial.", "价格为初步参考。"),
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    kind: "simple",
    path: "/cases",
    slug: "cases",
    title: text("Cases | LORA", "Кейсы | LORA", "Casos | LORA", "案例 | LORA"),
    description: text("A structured place for future verified LORA case studies.", "Раздел для будущих подтвержденных кейсов LORA без выдуманных результатов.", "Seccion para futuros casos verificados de LORA.", "用于未来已验证案例的页面。"),
    h1: text("Cases", "Кейсы", "Casos", "案例"),
    summary: text("We do not publish fake cases. This page is ready for verified work descriptions.", "Мы не публикуем фейковые кейсы. Страница подготовлена под реальные подтвержденные проекты.", "No publicamos casos inventados.", "不发布虚假案例。"),
    changeFrequency: "monthly",
    priority: 0.55,
  },
  {
    kind: "simple",
    path: "/contacts",
    slug: "contacts",
    title: text("Contacts | LORA", "Контакты | LORA", "Contacto | LORA", "联系 | LORA"),
    description: text("Contact LORA and schedule a project brief.", "Связаться с LORA и назначить бриф по проекту.", "Contacta con LORA y agenda un briefing.", "联系 LORA 并安排项目沟通。"),
    h1: text("Contacts", "Контакты", "Contacto", "联系"),
    summary: text("Email, brief form and project intake information.", "Email, форма брифа и данные для первичного обращения.", "Email y formulario de briefing.", "邮箱与项目表单。"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    kind: "simple",
    path: "/audit",
    slug: "audit",
    title: text("Website audit and brief | LORA", "Аудит сайта и бриф | LORA", "Auditoria y brief | LORA", "网站审计与需求沟通 | LORA"),
    description: text("Request a website, funnel or CRM audit before starting a project.", "Запросить аудит сайта, воронки или CRM перед стартом проекта.", "Solicita una auditoria de sitio, embudo o CRM.", "申请网站、漏斗或 CRM 审计。"),
    h1: text("Website audit and brief", "Аудит сайта и бриф", "Auditoria y brief", "网站审计与需求沟通"),
    summary: text("A focused entry point for diagnostics and ad campaign traffic.", "Точка входа для диагностики и будущего рекламного трафика.", "Punto de entrada para diagnostico y trafico publicitario.", "诊断与广告流量入口。"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    kind: "simple",
    path: "/privacy",
    slug: "privacy",
    title: text("Privacy policy | LORA", "Политика конфиденциальности | LORA", "Politica de privacidad | LORA", "隐私政策 | LORA"),
    description: text("How LORA processes contact form data and analytics events.", "Как LORA обрабатывает данные форм и аналитические события.", "Como LORA procesa formularios y eventos analiticos.", "LORA 如何处理表单和分析事件。"),
    h1: text("Privacy policy", "Политика конфиденциальности", "Politica de privacidad", "隐私政策"),
    summary: text("Basic policy for contact requests, lead forms and analytics preparation.", "Базовая политика для заявок, формы брифа и будущей аналитики.", "Politica base para formularios y analitica.", "表单和分析的基础政策。"),
    changeFrequency: "yearly",
    priority: 0.35,
  },
  {
    kind: "simple",
    path: "/cookies",
    slug: "cookies",
    title: text("Cookie notice | LORA", "Cookie notice | LORA", "Aviso de cookies | LORA", "Cookie 说明 | LORA"),
    description: text("Cookie and analytics notice for future advertising measurement.", "Уведомление о cookie и аналитике для будущей рекламы.", "Aviso de cookies y analitica.", "Cookie 与分析说明。"),
    h1: text("Cookie notice", "Cookie и аналитика", "Aviso de cookies", "Cookie 说明"),
    summary: text("Prepared for future Yandex Metrica and Google Analytics connection.", "Подготовлено под будущее подключение Яндекс Метрики и Google Analytics.", "Preparado para Yandex Metrica y Google Analytics.", "为未来分析工具接入准备。"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    kind: "simple",
    path: "/thank-you",
    slug: "thank-you",
    title: text("Thank you | LORA", "Спасибо | LORA", "Gracias | LORA", "谢谢 | LORA"),
    description: text("Confirmation page after sending a request to LORA.", "Страница подтверждения после отправки заявки в LORA.", "Pagina de confirmacion despues de enviar una solicitud.", "提交请求后的确认页面。"),
    h1: text("Thank you", "Спасибо", "Gracias", "谢谢"),
    summary: text("We received the request and will review the project context.", "Заявка получена, команда изучит контекст проекта.", "Recibimos la solicitud.", "我们已收到请求。"),
    changeFrequency: "yearly",
    priority: 0.2,
    noindex: true,
  },
];

const serviceBase = {
  problems: [
    text("The offer is unclear and users leave before requesting a brief.", "Оффер не считывается, и пользователи уходят до заявки."),
    text("Traffic arrives, but the page does not explain value or next steps.", "Трафик приходит, но страница не объясняет ценность и следующий шаг."),
    text("Analytics, forms and CRM are disconnected.", "Аналитика, формы и CRM работают разрозненно."),
  ],
  deliverables: [
    text("Positioning, page structure and conversion-focused copy.", "Позиционирование, структура страницы и конверсионный текст."),
    text("Responsive UI, accessible markup and real CTA links.", "Адаптивный интерфейс, доступная разметка и реальные CTA-ссылки."),
    text("Lead form, CRM handoff and analytics events prepared for launch.", "Форма заявки, передача в CRM и события аналитики под запуск."),
  ],
  integrations: [
    text("CRM, email, messengers, analytics, payment or catalog systems when needed.", "CRM, email, мессенджеры, аналитика, платежи или каталог при необходимости."),
    text("Yandex Metrica, Google Analytics and ad pixels can be connected through env variables.", "Яндекс Метрика, Google Analytics и пиксели можно подключить через env-переменные."),
  ],
  process: [
    text("Brief and audit of the current funnel.", "Бриф и аудит текущей воронки."),
    text("Prototype, content map and technical scope.", "Прототип, карта контента и техническое задание."),
    text("Design, development, integration and launch checklist.", "Дизайн, разработка, интеграции и чеклист запуска."),
  ],
  faq: [
    {
      question: text("Can we start from an audit?", "Можно начать с аудита?"),
      answer: text("Yes. Audit helps define scope before design or development starts.", "Да. Аудит помогает определить объем работ до дизайна и разработки."),
    },
    {
      question: text("Do you guarantee top positions?", "Вы гарантируете топ-1?"),
      answer: text("No. We prepare a technically strong, useful page without false ranking promises.", "Нет. Мы готовим технически сильную и полезную страницу без ложных обещаний по позициям."),
    },
  ],
};

const serviceDefs = [
  ["websites", "Website development", "Разработка сайтов", "Sitios web", "网站开发"],
  ["landing-pages", "Landing page development", "Разработка лендингов", "Landing pages", "落地页开发"],
  ["corporate-websites", "Corporate websites", "Корпоративные сайты", "Sitios corporativos", "企业网站"],
  ["ecommerce", "E-commerce websites", "Интернет-магазины", "E-commerce", "电商网站"],
  ["ux-ui-design", "UX/UI design", "UX/UI дизайн", "UX/UI", "UX/UI 设计"],
  ["website-redesign", "Website redesign", "Редизайн сайта", "Rediseño web", "网站改版"],
  ["seo-optimization", "SEO optimization", "SEO-оптимизация", "SEO", "SEO 优化"],
  ["crm-integration", "CRM integration", "CRM-интеграция", "CRM", "CRM 集成"],
  ["business-automation", "Business automation", "Автоматизация бизнеса", "Automatizacion", "业务自动化"],
  ["website-support", "Website support", "Техническая поддержка сайта", "Soporte web", "网站支持"],
] as const;

const serviceOverrides: Record<string, Partial<Pick<DetailRoute, "problems" | "deliverables" | "integrations" | "process" | "faq" | "related">>> = {
  websites: {
    problems: [
      text("The site explains the company, but does not guide visitors to a concrete request.", "Сайт рассказывает о компании, но не ведет посетителя к понятной заявке."),
      text("Pages are disconnected from CRM, analytics and advertising traffic.", "Страницы не связаны с CRM, аналитикой и рекламным трафиком."),
      text("The structure does not support services, cases and future content growth.", "Структура не поддерживает услуги, кейсы и будущий рост контента."),
    ],
    deliverables: [
      text("Multi-page architecture for services, trust blocks, contacts and future content.", "Многостраничная архитектура для услуг, доверия, контактов и будущего контента."),
      text("Responsive UI with semantic sections, internal links and conversion paths.", "Адаптивный интерфейс с семантическими секциями, перелинковкой и путями конверсии."),
      text("Lead form, analytics events and deployment checklist.", "Форма заявки, события аналитики и чеклист запуска."),
    ],
    related: ["landing-pages", "corporate-websites", "seo-optimization", "crm-integration"],
  },
  "landing-pages": {
    problems: [
      text("Paid traffic lands on a page that does not match the ad promise.", "Платный трафик попадает на страницу, которая не совпадает с обещанием объявления."),
      text("The first screen has no clear offer or next action.", "На первом экране нет ясного оффера и следующего действия."),
      text("Forms and CTA clicks are not measured cleanly.", "Формы и клики по CTA не измеряются корректно."),
    ],
    deliverables: [
      text("Single-purpose landing structure with offer, objections, FAQ and CTA.", "Одноцелевая структура лендинга: оффер, возражения, FAQ и CTA."),
      text("Fast responsive layout with visible content and real links.", "Быстрая адаптивная верстка с видимым контентом и реальными ссылками."),
      text("Analytics events for CTA clicks and lead submission.", "События аналитики для CTA и отправки заявки."),
    ],
    related: ["websites", "ux-ui-design", "seo-optimization", "business-automation"],
  },
  ecommerce: {
    problems: [
      text("Product discovery, checkout and support flows are separated.", "Поиск товаров, оформление и поддержка живут раздельно."),
      text("Catalog pages do not explain value or remove purchase doubts.", "Каталог не объясняет ценность и не снимает сомнения перед покупкой."),
      text("Orders do not reliably reach CRM or operations.", "Заказы ненадежно доходят до CRM или операционных процессов."),
    ],
    deliverables: [
      text("Catalog, product, cart and lead/order flow structure.", "Структура каталога, карточек, корзины и заявки/заказа."),
      text("Integration plan for payments, CRM, notifications and analytics.", "План интеграций платежей, CRM, уведомлений и аналитики."),
      text("SEO-ready category and product page patterns.", "SEO-готовые шаблоны категорий и товаров."),
    ],
    related: ["websites", "crm-integration", "business-automation", "seo-optimization"],
  },
  "ux-ui-design": {
    problems: [
      text("The interface looks modern, but users do not understand the path.", "Интерфейс выглядит современно, но пользователь не понимает путь."),
      text("Forms, pricing and navigation create unnecessary friction.", "Формы, цены и навигация создают лишнее трение."),
      text("Design decisions are not tied to funnel behavior.", "Дизайн-решения не связаны с поведением воронки."),
    ],
    deliverables: [
      text("User flow, wireframes and visual system for the key screens.", "Пользовательский путь, вайрфреймы и визуальная система ключевых экранов."),
      text("Responsive components and states for forms, cards and CTA blocks.", "Адаптивные компоненты и состояния форм, карточек и CTA."),
      text("Handoff notes for development and analytics events.", "Передача в разработку и заметки по аналитическим событиям."),
    ],
    related: ["website-redesign", "landing-pages", "websites", "seo-optimization"],
  },
  "seo-optimization": {
    problems: [
      text("The site has content, but search engines cannot read the structure clearly.", "На сайте есть контент, но поисковик плохо считывает структуру."),
      text("Important pages have weak metadata, links or technical signals.", "У важных страниц слабые метаданные, ссылки или технические сигналы."),
      text("SEO changes are not connected to conversion and analytics.", "SEO-правки не связаны с конверсией и аналитикой."),
    ],
    deliverables: [
      text("Technical SEO audit, metadata map, sitemap and structured data plan.", "Технический SEO-аудит, карта метаданных, sitemap и structured data."),
      text("Page structure improvements without hidden keyword spam.", "Улучшение структуры страниц без скрытого SEO-спама."),
      text("Internal linking and analytics-ready landing paths.", "Перелинковка и посадочные пути, готовые к аналитике."),
    ],
    related: ["websites", "landing-pages", "website-redesign", "business-automation"],
  },
  "crm-integration": {
    problems: [
      text("Leads arrive from forms, calls and messengers without one clear pipeline.", "Лиды приходят из форм, звонков и мессенджеров без единой воронки."),
      text("Managers lose context between website request and first response.", "Контекст теряется между заявкой на сайте и первым ответом менеджера."),
      text("Analytics cannot connect traffic source to sales work.", "Аналитика не связывает источник трафика с работой продаж."),
    ],
    deliverables: [
      text("Lead capture, field mapping and CRM pipeline logic.", "Захват заявок, маппинг полей и логика воронки CRM."),
      text("Notifications, tags, statuses and basic automation rules.", "Уведомления, теги, статусы и базовые правила автоматизации."),
      text("Event layer prepared for ads and reporting.", "Слой событий для рекламы и отчетности."),
    ],
    related: ["business-automation", "websites", "landing-pages", "website-support"],
  },
};

export const serviceRoutes: DetailRoute[] = serviceDefs.map(([slug, en, ru, es, zh]) => ({
  kind: "service",
  path: `/services/${slug}`,
  slug,
  title: text(`${en} | LORA`, `${ru} | LORA`, `${es} | LORA`, `${zh} | LORA`),
  description: text(`${en} by LORA: strategy, UX, development, integrations and analytics prepared for growth.`, `${ru} от LORA: стратегия, UX, разработка, интеграции и аналитика без лишних обещаний.`, `${es} por LORA: estrategia, UX, desarrollo, integraciones y analitica.`, `${zh} by LORA：策略、UX、开发、集成与分析。`),
  h1: text(en, ru, es, zh),
  summary: text(`A structured commercial page for ${en.toLowerCase()} with clear scope, FAQ and CTA.`, `Страница услуги «${ru}» с понятной структурой, FAQ, CTA и внутренними ссылками.`, `Pagina comercial para ${es}.`, `${zh} 服务页面。`),
  eyebrow: text("Service", "Услуга", "Servicio", "服务"),
  changeFrequency: "monthly",
  priority: 0.82,
  related: serviceOverrides[slug]?.related ?? serviceDefs.filter((item) => item[0] !== slug).slice(0, 4).map((item) => item[0]),
  cta: text("Discuss this service", "Обсудить услугу", "Hablar del servicio", "讨论服务"),
  ...serviceBase,
  ...serviceOverrides[slug],
}));

const industryDefs = [
  ["beauty-salon", "Website for a beauty salon", "Сайт для салона красоты", "Sitio para salon de belleza", "美业网站"],
  ["restaurant", "Website for a restaurant", "Сайт для ресторана", "Sitio para restaurante", "餐厅网站"],
  ["construction-company", "Website for a construction company", "Сайт для строительной компании", "Sitio para constructora", "建筑公司网站"],
  ["clinic", "Website for a clinic", "Сайт для клиники", "Sitio para clinica", "诊所网站"],
  ["online-school", "Website for an online school", "Сайт для онлайн-школы", "Sitio para escuela online", "在线学校网站"],
  ["expert", "Website for an expert", "Сайт для эксперта", "Sitio para experto", "专家个人网站"],
  ["b2b-company", "Website for a B2B company", "Сайт для B2B-компании", "Sitio para empresa B2B", "B2B 公司网站"],
  ["service-business", "Website for a service business", "Сайт для сервиса", "Sitio para servicio", "服务型企业网站"],
  ["legal-company", "Website for a legal company", "Сайт для юридической компании", "Sitio para firma legal", "法律公司网站"],
  ["real-estate", "Website for real estate", "Сайт для недвижимости", "Sitio inmobiliario", "房地产网站"],
] as const;

const industryOverrides: Record<string, Partial<Pick<DetailRoute, "problems" | "deliverables" | "integrations" | "faq" | "related">>> = {
  "beauty-salon": {
    problems: [
      text("Visitors need to understand services, masters, location and booking path quickly.", "Посетителю нужно быстро понять услуги, мастеров, локацию и путь записи."),
      text("Social traffic often lands without a clear service structure.", "Трафик из соцсетей часто попадает на страницу без понятной структуры услуг."),
      text("Bookings can be lost between messengers, calls and forms.", "Записи теряются между мессенджерами, звонками и формами."),
    ],
    deliverables: [
      text("Service menu, booking CTA, trust blocks and contact path.", "Меню услуг, CTA записи, блоки доверия и путь к контакту."),
      text("Landing structure for ads, local search and repeat visits.", "Структура под рекламу, локальный поиск и повторные визиты."),
    ],
    integrations: [
      text("Online booking, CRM, messengers, maps and analytics events.", "Онлайн-запись, CRM, мессенджеры, карты и события аналитики."),
    ],
    related: ["landing-pages", "ux-ui-design", "crm-integration", "seo-optimization"],
  },
  restaurant: {
    problems: [
      text("Guests look for menu, atmosphere, location and booking in seconds.", "Гости за секунды ищут меню, атмосферу, локацию и бронирование."),
      text("Delivery, table booking and events often live in separate channels.", "Доставка, бронь столов и мероприятия часто живут в разных каналах."),
      text("A generic page cannot show why this place is worth visiting.", "Обычная страница не объясняет, почему место стоит посетить."),
    ],
    deliverables: [
      text("Menu-first structure, location block, booking CTA and event sections.", "Структура с меню, локацией, CTA брони и блоками событий."),
      text("Mobile-first landing page for search, maps and ad traffic.", "Mobile-first посадочная страница для поиска, карт и рекламы."),
    ],
    integrations: [
      text("Booking tools, delivery links, maps, messengers and analytics.", "Бронирование, доставка, карты, мессенджеры и аналитика."),
    ],
    related: ["landing-pages", "websites", "seo-optimization", "crm-integration"],
  },
  clinic: {
    problems: [
      text("Patients need clarity, trust and a safe appointment path.", "Пациентам нужны ясность, доверие и безопасный путь записи."),
      text("Services, doctors and documents are often hard to scan on mobile.", "Услуги, врачи и документы часто плохо считываются на мобильном."),
      text("Ad traffic needs careful copy without medical overpromises.", "Рекламному трафику нужен аккуратный текст без медицинских сверхобещаний."),
    ],
    deliverables: [
      text("Service hierarchy, specialist blocks, FAQ and appointment flow.", "Иерархия услуг, блоки специалистов, FAQ и путь записи."),
      text("Accessible mobile layout with neutral, compliant language.", "Доступная мобильная структура с нейтральными формулировками."),
    ],
    integrations: [
      text("Appointment systems, CRM, call tracking, maps and analytics.", "Системы записи, CRM, коллтрекинг, карты и аналитика."),
    ],
    related: ["websites", "ux-ui-design", "crm-integration", "seo-optimization"],
  },
  "online-school": {
    problems: [
      text("Potential students need to compare program, format and support.", "Потенциальным студентам нужно сравнить программу, формат и поддержку."),
      text("Webinars, applications and payments are often disconnected.", "Вебинары, заявки и оплаты часто разъединены."),
      text("Course pages can become too long without clear decision points.", "Страницы курсов становятся длинными без понятных точек решения."),
    ],
    deliverables: [
      text("Program structure, lesson format, application flow and FAQ.", "Структура программы, формат занятий, заявка и FAQ."),
      text("Landing and CRM logic for cohorts, consultations and payments.", "Лендинг и CRM-логика для потоков, консультаций и оплат."),
    ],
    integrations: [
      text("LMS, payment tools, CRM, webinars, email and analytics.", "LMS, платежи, CRM, вебинары, email и аналитика."),
    ],
    related: ["landing-pages", "crm-integration", "business-automation", "ux-ui-design"],
  },
  "real-estate": {
    problems: [
      text("Users need fast filtering, clear object data and a trusted contact path.", "Пользователю нужны быстрые фильтры, понятные данные объекта и доверительный контакт."),
      text("Listings, ads and CRM often lose source context.", "Объявления, реклама и CRM часто теряют контекст источника."),
      text("Object pages need enough detail without becoming cluttered.", "Страницам объектов нужна детализация без перегруза."),
    ],
    deliverables: [
      text("Catalog, object pages, lead forms and consultation CTA.", "Каталог, страницы объектов, формы заявки и CTA консультации."),
      text("SEO-ready landing paths for property types and locations.", "SEO-структура под типы объектов и локации."),
    ],
    integrations: [
      text("CRM, catalog feeds, maps, call tracking and analytics events.", "CRM, фиды каталога, карты, коллтрекинг и события аналитики."),
    ],
    related: ["websites", "ecommerce", "crm-integration", "seo-optimization"],
  },
};

export const industryRoutes: DetailRoute[] = industryDefs.map(([slug, en, ru, es, zh]) => ({
  kind: "industry",
  path: `/industries/${slug}`,
  slug,
  title: text(`${en} | LORA`, `${ru} | LORA`, `${es} | LORA`, `${zh} | LORA`),
  description: text(`${en} prepared for leads, trust, clear services and future ad traffic.`, `${ru}: структура для заявок, доверия, понятных услуг и будущего рекламного трафика.`, `${es} preparado para leads, confianza y publicidad.`, `${zh} 面向线索、信任和广告流量的网站。`),
  h1: text(en, ru, es, zh),
  summary: text("A practical industry page with offer, trust blocks, FAQ and links to relevant services.", "Практичная страница ниши: оффер, блоки доверия, FAQ и ссылки на подходящие услуги.", "Pagina practica por industria.", "实用行业页面。"),
  eyebrow: text("Industry", "Ниша", "Industria", "行业"),
  changeFrequency: "monthly",
  priority: 0.78,
  related: industryOverrides[slug]?.related ?? ["websites", "landing-pages", "ux-ui-design", "seo-optimization"],
  cta: text("Discuss this industry page", "Обсудить страницу для ниши", "Hablar de esta pagina", "讨论行业页面"),
  problems: [
    text("Users need trust signals before leaving a request.", "Пользователю нужны понятные сигналы доверия до заявки."),
    text("Services, prices and process are often hidden or scattered.", "Услуги, цены и процесс часто спрятаны или разрознены."),
    text("Ad traffic needs a page that matches the search intent.", "Рекламному трафику нужна страница, совпадающая с намерением запроса."),
  ],
  deliverables: [
    text("Clear offer, service blocks, FAQ and contact path.", "Понятный оффер, блоки услуг, FAQ и путь к контакту."),
    text("Structure for local/industry SEO without fake reviews or numbers.", "Структура для нишевого SEO без фейковых отзывов и цифр."),
  ],
  integrations: serviceBase.integrations,
  process: serviceBase.process,
  faq: serviceBase.faq,
  ...industryOverrides[slug],
}));

export const articleRoutes: DetailRoute[] = [
  {
    kind: "article",
    path: "/blog/why-landing-pages-fail",
    slug: "why-landing-pages-fail",
    title: text("Why landing pages fail before users scroll | LORA", "Почему лендинги проигрывают до первого скролла | LORA"),
    description: text("A practical note about first-screen conversion, offer clarity and CTA structure.", "Практическая заметка о первом экране, ясности оффера и структуре CTA."),
    h1: text("Why landing pages fail before users scroll", "Почему лендинги проигрывают до первого скролла"),
    summary: text("The first screen has to explain value, audience and next step quickly.", "Первый экран должен быстро объяснить ценность, аудиторию и следующий шаг."),
    eyebrow: text("Article", "Статья", "Articulo", "文章"),
    changeFrequency: "yearly",
    priority: 0.55,
    date: "2026-04-10",
    related: ["landing-pages", "ux-ui-design", "seo-optimization"],
    cta: text("Request a landing page audit", "Запросить аудит лендинга"),
    problems: serviceBase.problems,
    deliverables: serviceBase.deliverables,
    integrations: serviceBase.integrations,
    process: serviceBase.process,
    faq: serviceBase.faq,
  },
];

export const allRoutes = [...mainRoutes, ...serviceRoutes, ...industryRoutes, ...articleRoutes];
export const indexableRoutes = allRoutes.filter((route) => !route.noindex);

export function findRoute(path: string): SeoRoute | DetailRoute | null {
  return allRoutes.find((route) => route.path === path) ?? null;
}

export function resolveRoute(path: string) {
  return findRoute(path) ?? {
    kind: "not-found" as const,
    path,
    slug: "not-found",
    title: text("Page not found | LORA", "Страница не найдена | LORA"),
    description: text("The requested page does not exist.", "Запрошенная страница не существует."),
    h1: text("Page not found", "Страница не найдена"),
    summary: text("Use the navigation links to continue.", "Перейдите на главную или в раздел услуг."),
    changeFrequency: "yearly" as const,
    priority: 0,
    noindex: true,
  };
}

export function routeLabel(route: SeoRoute, lang: Lang) {
  return localize(route.h1, lang);
}
