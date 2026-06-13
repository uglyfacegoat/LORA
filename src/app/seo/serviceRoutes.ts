import { text, type DetailRoute } from "./routeTypes";

export const serviceBase = {
  problems: [
    text(
      "The offer is unclear and users leave before requesting a brief.",
      "Оффер не считывается, и пользователи уходят до заявки.",
      "La oferta no se entiende y los usuarios se van antes de enviar una solicitud.",
      "报价不清晰，用户在提交 brief 前就离开。",
    ),
    text(
      "Traffic arrives, but the page does not explain value or next steps.",
      "Трафик приходит, но страница не объясняет ценность и следующий шаг.",
      "El trafico llega, pero la pagina no explica valor ni siguiente paso.",
      "流量到达页面，但页面没有解释价值和下一步。",
    ),
    text(
      "Analytics, forms and CRM are disconnected.",
      "Аналитика, формы и CRM работают разрозненно.",
      "Analitica, formularios y CRM estan desconectados.",
      "分析、表单和 CRM 彼此割裂。",
    ),
  ],
  deliverables: [
    text(
      "Positioning, page structure and conversion-focused copy.",
      "Позиционирование, структура страницы и конверсионный текст.",
      "Posicionamiento, estructura de pagina y copy orientado a conversion.",
      "定位、页面结构和面向转化的文案。",
    ),
    text(
      "Responsive UI, accessible markup and real CTA links.",
      "Адаптивный интерфейс, доступная разметка и реальные CTA-ссылки.",
      "Interfaz responsive, marcado accesible y enlaces CTA reales.",
      "响应式界面、可访问标记和真实 CTA 链接。",
    ),
    text(
      "Lead form, CRM handoff and analytics events prepared for launch.",
      "Форма заявки, передача в CRM и события аналитики под запуск.",
      "Formulario de lead, entrega a CRM y eventos analiticos listos para lanzamiento.",
      "线索表单、CRM 交接和上线前准备好的分析事件。",
    ),
  ],
  integrations: [
    text(
      "CRM, email, messengers, analytics, payment or catalog systems when needed.",
      "CRM, email, мессенджеры, аналитика, платежи или каталог при необходимости.",
      "CRM, email, mensajeria, analitica, pagos o catalogo cuando sea necesario.",
      "根据需要连接 CRM、邮件、即时通讯、分析、支付或目录系统。",
    ),
    text(
      "Yandex Metrica, Google Analytics and ad pixels can be connected through env variables.",
      "Яндекс Метрика, Google Analytics и пиксели можно подключить через env-переменные.",
      "Yandex Metrica, Google Analytics y pixeles publicitarios pueden conectarse mediante variables de entorno.",
      "Yandex Metrica、Google Analytics 和广告像素可通过环境变量连接。",
    ),
  ],
  process: [
    text(
      "Brief and audit of the current funnel.",
      "Бриф и аудит текущей воронки.",
      "Brief y auditoria del embudo actual.",
      "brief 和当前漏斗审计。",
    ),
    text(
      "Prototype, content map and technical scope.",
      "Прототип, карта контента и техническое задание.",
      "Prototipo, mapa de contenido y alcance tecnico.",
      "原型、内容地图和技术范围。",
    ),
    text(
      "Design, development, integration and launch checklist.",
      "Дизайн, разработка, интеграции и чеклист запуска.",
      "Diseno, desarrollo, integraciones y checklist de lanzamiento.",
      "设计、开发、集成和上线清单。",
    ),
  ],
  faq: [
    {
      question: text(
        "Can we start from an audit?",
        "Можно начать с аудита?",
        "Podemos empezar con una auditoria?",
        "可以从审计开始吗？",
      ),
      answer: text(
        "Yes. Audit helps define scope before design or development starts.",
        "Да. Аудит помогает определить объем работ до дизайна и разработки.",
        "Si. La auditoria ayuda a definir el alcance antes de diseno o desarrollo.",
        "可以。审计有助于在设计或开发前确定范围。",
      ),
    },
    {
      question: text(
        "Do you guarantee top positions?",
        "Вы гарантируете топ-1?",
        "Garantizan primeras posiciones?",
        "你们保证排名第一吗？",
      ),
      answer: text(
        "No. We prepare a technically strong, useful page without false ranking promises.",
        "Нет. Мы готовим технически сильную и полезную страницу без ложных обещаний по позициям.",
        "No. Preparamos una pagina tecnicamente fuerte y util sin promesas falsas de ranking.",
        "不保证。我们做技术扎实且有用的页面，不做虚假的排名承诺。",
      ),
    },
    {
      question: text(
        "Can you work with existing content?",
        "Можно работать с текущими материалами?",
        "Pueden trabajar con contenido existente?",
        "可以使用现有内容吗？",
      ),
      answer: text(
        "Yes. We can keep useful content, rewrite weak sections and show what is missing before production.",
        "Да. Мы оставляем полезное, переписываем слабые места и показываем, чего не хватает до запуска.",
        "Si. Conservamos lo util, reescribimos partes debiles y mostramos lo que falta antes de producir.",
        "可以。我们保留有用内容，重写薄弱部分，并在制作前说明缺少什么。",
      ),
    },
    {
      question: text(
        "What happens after launch?",
        "Что происходит после запуска?",
        "Que pasa despues del lanzamiento?",
        "上线后会怎样？",
      ),
      answer: text(
        "The page is handed over with forms, analytics events and a clear support logic, so it is not just a static layout.",
        "Страница передается с формами, событиями аналитики и понятной логикой поддержки, а не просто как статичная верстка.",
        "La pagina se entrega con formularios, eventos analiticos y logica de soporte clara.",
        "页面会连同表单、分析事件和清晰维护逻辑一起交付。",
      ),
    },
  ],
};

const serviceSummaries: Partial<Record<(typeof serviceDefs)[number][0], ReturnType<typeof text>>> = {
  "corporate-websites": text(
    "A corporate website that explains the company, builds trust and leads visitors to a clear request.",
    "Корпоративный сайт, который объясняет компанию, собирает доверие и ведет посетителя к заявке без лишнего шума.",
    "Un sitio corporativo que explica la empresa, crea confianza y lleva al visitante a una solicitud clara.",
    "一个解释公司、建立信任并引导访客提交请求的企业网站。",
  ),
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

const serviceOverrides: Record<
  string,
  Partial<Pick<DetailRoute, "problems" | "deliverables" | "integrations" | "process" | "faq" | "related">>
> = {
  websites: {
    problems: [
      text(
        "The site explains the company, but does not guide visitors to a concrete request.",
        "Сайт рассказывает о компании, но не ведет посетителя к понятной заявке.",
      ),
      text(
        "Pages are disconnected from CRM, analytics and advertising traffic.",
        "Страницы не связаны с CRM, аналитикой и рекламным трафиком.",
      ),
      text(
        "The structure does not support services, cases and future content growth.",
        "Структура не поддерживает услуги, кейсы и будущий рост контента.",
      ),
    ],
    deliverables: [
      text(
        "Multi-page architecture for services, trust blocks, contacts and future content.",
        "Многостраничная архитектура для услуг, доверия, контактов и будущего контента.",
      ),
      text(
        "Responsive UI with semantic sections, internal links and conversion paths.",
        "Адаптивный интерфейс с семантическими секциями, перелинковкой и путями конверсии.",
      ),
      text(
        "Lead form, analytics events and deployment checklist.",
        "Форма заявки, события аналитики и чеклист запуска.",
      ),
    ],
    related: ["landing-pages", "corporate-websites", "seo-optimization", "crm-integration"],
  },
  "landing-pages": {
    problems: [
      text(
        "Paid traffic lands on a page that does not match the ad promise.",
        "Платный трафик попадает на страницу, которая не совпадает с обещанием объявления.",
      ),
      text(
        "The first screen has no clear offer or next action.",
        "На первом экране нет ясного оффера и следующего действия.",
        "La primera pantalla no tiene oferta clara ni siguiente accion.",
        "首屏没有清晰报价或下一步行动。",
      ),
      text(
        "Forms and CTA clicks are not measured cleanly.",
        "Формы и клики по CTA не измеряются корректно.",
        "Los formularios y clics CTA no se miden limpiamente.",
        "表单和 CTA 点击没有被清晰衡量。",
      ),
    ],
    deliverables: [
      text(
        "Single-purpose landing structure with offer, objections, FAQ and CTA.",
        "Одноцелевая структура лендинга: оффер, возражения, FAQ и CTA.",
      ),
      text(
        "Fast responsive layout with visible content and real links.",
        "Быстрая адаптивная верстка с видимым контентом и реальными ссылками.",
        "Layout responsive rapido con contenido visible y enlaces reales.",
        "快速响应式布局，包含可见内容和真实链接。",
      ),
      text(
        "Analytics events for CTA clicks and lead submission.",
        "События аналитики для CTA и отправки заявки.",
        "Eventos analiticos para clics CTA y envio de leads.",
        "用于 CTA 点击和线索提交的分析事件。",
      ),
    ],
    related: ["websites", "ux-ui-design", "seo-optimization", "business-automation"],
  },
  ecommerce: {
    problems: [
      text(
        "Product discovery, checkout and support flows are separated.",
        "Поиск товаров, оформление и поддержка живут раздельно.",
      ),
      text(
        "Catalog pages do not explain value or remove purchase doubts.",
        "Каталог не объясняет ценность и не снимает сомнения перед покупкой.",
        "Las paginas de catalogo no explican valor ni eliminan dudas de compra.",
        "目录页面没有解释价值，也没有消除购买疑虑。",
      ),
      text(
        "Orders do not reliably reach CRM or operations.",
        "Заказы ненадежно доходят до CRM или операционных процессов.",
        "Los pedidos no llegan de forma fiable a CRM u operaciones.",
        "订单无法可靠进入 CRM 或运营流程。",
      ),
    ],
    deliverables: [
      text(
        "Catalog, product, cart and lead/order flow structure.",
        "Структура каталога, карточек, корзины и заявки/заказа.",
      ),
      text(
        "Integration plan for payments, CRM, notifications and analytics.",
        "План интеграций платежей, CRM, уведомлений и аналитики.",
      ),
      text(
        "SEO-ready category and product page patterns.",
        "SEO-готовые шаблоны категорий и товаров.",
        "Patrones SEO-ready para categorias y productos.",
        "面向 SEO 的分类页和产品页模式。",
      ),
    ],
    related: ["websites", "crm-integration", "business-automation", "seo-optimization"],
  },
  "ux-ui-design": {
    problems: [
      text(
        "The interface looks modern, but users do not understand the path.",
        "Интерфейс выглядит современно, но пользователь не понимает путь.",
      ),
      text(
        "Forms, pricing and navigation create unnecessary friction.",
        "Формы, цены и навигация создают лишнее трение.",
      ),
      text(
        "Design decisions are not tied to funnel behavior.",
        "Дизайн-решения не связаны с поведением воронки.",
        "Las decisiones de diseno no estan conectadas al comportamiento del embudo.",
        "设计决策没有与漏斗行为连接。",
      ),
    ],
    deliverables: [
      text(
        "User flow, wireframes and visual system for the key screens.",
        "Пользовательский путь, вайрфреймы и визуальная система ключевых экранов.",
      ),
      text(
        "Responsive components and states for forms, cards and CTA blocks.",
        "Адаптивные компоненты и состояния форм, карточек и CTA.",
      ),
      text(
        "Handoff notes for development and analytics events.",
        "Передача в разработку и заметки по аналитическим событиям.",
        "Notas de handoff para desarrollo y eventos analiticos.",
        "面向开发和分析事件的交接说明。",
      ),
    ],
    related: ["website-redesign", "landing-pages", "websites", "seo-optimization"],
  },
  "seo-optimization": {
    problems: [
      text(
        "The site has content, but search engines cannot read the structure clearly.",
        "На сайте есть контент, но поисковик плохо считывает структуру.",
      ),
      text(
        "Important pages have weak metadata, links or technical signals.",
        "У важных страниц слабые метаданные, ссылки или технические сигналы.",
      ),
      text(
        "SEO changes are not connected to conversion and analytics.",
        "SEO-правки не связаны с конверсией и аналитикой.",
        "Los cambios SEO no estan conectados con conversion y analitica.",
        "SEO 修改没有与转化和分析连接。",
      ),
    ],
    deliverables: [
      text(
        "Technical SEO audit, metadata map, sitemap and structured data plan.",
        "Технический SEO-аудит, карта метаданных, sitemap и structured data.",
      ),
      text(
        "Page structure improvements without hidden keyword spam.",
        "Улучшение структуры страниц без скрытого SEO-спама.",
        "Mejoras de estructura sin spam oculto de palabras clave.",
        "改进页面结构，不做隐藏关键词堆砌。",
      ),
      text(
        "Internal linking and analytics-ready landing paths.",
        "Перелинковка и посадочные пути, готовые к аналитике.",
      ),
    ],
    related: ["websites", "landing-pages", "website-redesign", "business-automation"],
  },
  "crm-integration": {
    problems: [
      text(
        "Leads arrive from forms, calls and messengers without one clear pipeline.",
        "Лиды приходят из форм, звонков и мессенджеров без единой воронки.",
      ),
      text(
        "Managers lose context between website request and first response.",
        "Контекст теряется между заявкой на сайте и первым ответом менеджера.",
        "Los managers pierden contexto entre la solicitud web y la primera respuesta.",
        "从网站请求到首次回复之间，销售人员会丢失上下文。",
      ),
      text(
        "Analytics cannot connect traffic source to sales work.",
        "Аналитика не связывает источник трафика с работой продаж.",
        "La analitica no conecta fuente de trafico con trabajo comercial.",
        "分析无法把流量来源与销售工作连接起来。",
      ),
    ],
    deliverables: [
      text("Lead capture, field mapping and CRM pipeline logic.", "Захват заявок, маппинг полей и логика воронки CRM."),
      text(
        "Notifications, tags, statuses and basic automation rules.",
        "Уведомления, теги, статусы и базовые правила автоматизации.",
      ),
      text(
        "Event layer prepared for ads and reporting.",
        "Слой событий для рекламы и отчетности.",
        "Capa de eventos preparada para publicidad y reporting.",
        "为广告和报告准备的事件层。",
      ),
    ],
    related: ["business-automation", "websites", "landing-pages", "website-support"],
  },
};

export const serviceRoutes: DetailRoute[] = serviceDefs.map(([slug, en, ru, es, zh]) => ({
  kind: "service",
  path: `/services/${slug}`,
  slug,
  title: text(`${en} | LORA`, `${ru} | LORA`, `${es} | LORA`, `${zh} | LORA`),
  description: text(
    `${en} by LORA: strategy, UX, development, integrations and analytics prepared for growth.`,
    `${ru} от LORA: стратегия, UX, разработка, интеграции и аналитика без лишних обещаний.`,
    `${es} por LORA: estrategia, UX, desarrollo, integraciones y analitica.`,
    `${zh} by LORA：策略、UX、开发、集成与分析。`,
  ),
  h1: text(en, ru, es, zh),
  summary:
    serviceSummaries[slug] ??
    text(
      `A practical service page for ${en.toLowerCase()}: clear offer, working structure and connected request flow.`,
      `${ru}: понятный оффер, рабочая структура и путь к заявке без лишней сложности.`,
      `Pagina practica para ${es}: oferta clara, estructura y solicitud conectada.`,
      `${zh}：清晰报价、页面结构和请求路径。`,
    ),
  eyebrow: text("Service", "Услуга", "Servicio", "服务"),
  changeFrequency: "monthly",
  priority: 0.82,
  related:
    serviceOverrides[slug]?.related ??
    serviceDefs
      .filter((item) => item[0] !== slug)
      .slice(0, 4)
      .map((item) => item[0]),
  cta: text("Discuss this service", "Обсудить услугу", "Hablar del servicio", "讨论服务"),
  ...serviceBase,
  ...serviceOverrides[slug],
}));
