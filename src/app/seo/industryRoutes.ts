import { serviceBase } from "./serviceRoutes";
import { text, type DetailRoute } from "./routeTypes";

const industryDefs = [
  ["beauty-salon", "Website for a beauty salon", "Сайт для салона красоты", "Sitio para salon de belleza", "美业网站"],
  ["restaurant", "Website for a restaurant", "Сайт для ресторана", "Sitio para restaurante", "餐厅网站"],
  [
    "construction-company",
    "Website for a construction company",
    "Сайт для строительной компании",
    "Sitio para constructora",
    "建筑公司网站",
  ],
  ["clinic", "Website for a clinic", "Сайт для клиники", "Sitio para clinica", "诊所网站"],
  [
    "online-school",
    "Website for an online school",
    "Сайт для онлайн-школы",
    "Sitio para escuela online",
    "在线学校网站",
  ],
  ["expert", "Website for an expert", "Сайт для эксперта", "Sitio para experto", "专家个人网站"],
  ["b2b-company", "Website for a B2B company", "Сайт для B2B-компании", "Sitio para empresa B2B", "B2B 公司网站"],
  ["service-business", "Website for a service business", "Сайт для сервиса", "Sitio para servicio", "服务型企业网站"],
  [
    "legal-company",
    "Website for a legal company",
    "Сайт для юридической компании",
    "Sitio para firma legal",
    "法律公司网站",
  ],
  ["real-estate", "Website for real estate", "Сайт для недвижимости", "Sitio inmobiliario", "房地产网站"],
] as const;

const industryOverrides: Record<
  string,
  Partial<Pick<DetailRoute, "problems" | "deliverables" | "integrations" | "faq" | "related">>
> = {
  "beauty-salon": {
    problems: [
      text(
        "Visitors need to understand services, masters, location and booking path quickly.",
        "Посетителю нужно быстро понять услуги, мастеров, локацию и путь записи.",
      ),
      text(
        "Social traffic often lands without a clear service structure.",
        "Трафик из соцсетей часто попадает на страницу без понятной структуры услуг.",
        "El trafico social suele llegar sin una estructura clara de servicios.",
        "社交流量常常落到缺少清晰服务结构的页面。",
      ),
      text(
        "Bookings can be lost between messengers, calls and forms.",
        "Записи теряются между мессенджерами, звонками и формами.",
      ),
    ],
    deliverables: [
      text(
        "Service menu, booking CTA, trust blocks and contact path.",
        "Меню услуг, CTA записи, блоки доверия и путь к контакту.",
      ),
      text(
        "Landing structure for ads, local search and repeat visits.",
        "Структура под рекламу, локальный поиск и повторные визиты.",
      ),
    ],
    integrations: [
      text(
        "Online booking, CRM, messengers, maps and analytics events.",
        "Онлайн-запись, CRM, мессенджеры, карты и события аналитики.",
      ),
    ],
    related: ["landing-pages", "ux-ui-design", "crm-integration", "seo-optimization"],
  },
  restaurant: {
    problems: [
      text(
        "Guests look for menu, atmosphere, location and booking in seconds.",
        "Гости за секунды ищут меню, атмосферу, локацию и бронирование.",
      ),
      text(
        "Delivery, table booking and events often live in separate channels.",
        "Доставка, бронь столов и мероприятия часто живут в разных каналах.",
      ),
      text(
        "A generic page cannot show why this place is worth visiting.",
        "Обычная страница не объясняет, почему место стоит посетить.",
      ),
    ],
    deliverables: [
      text(
        "Menu-first structure, location block, booking CTA and event sections.",
        "Структура с меню, локацией, CTA брони и блоками событий.",
      ),
      text(
        "Mobile-first landing page for search, maps and ad traffic.",
        "Mobile-first посадочная страница для поиска, карт и рекламы.",
      ),
    ],
    integrations: [
      text(
        "Booking tools, delivery links, maps, messengers and analytics.",
        "Бронирование, доставка, карты, мессенджеры и аналитика.",
      ),
    ],
    related: ["landing-pages", "websites", "seo-optimization", "crm-integration"],
  },
  clinic: {
    problems: [
      text(
        "Patients need clarity, trust and a safe appointment path.",
        "Пациентам нужны ясность, доверие и безопасный путь записи.",
      ),
      text(
        "Services, doctors and documents are often hard to scan on mobile.",
        "Услуги, врачи и документы часто плохо считываются на мобильном.",
      ),
      text(
        "Ad traffic needs careful copy without medical overpromises.",
        "Рекламному трафику нужен аккуратный текст без медицинских сверхобещаний.",
        "El trafico publicitario necesita copy cuidadoso sin promesas medicas excesivas.",
        "广告流量需要谨慎文案，避免医疗过度承诺。",
      ),
    ],
    deliverables: [
      text(
        "Service hierarchy, specialist blocks, FAQ and appointment flow.",
        "Иерархия услуг, блоки специалистов, FAQ и путь записи.",
      ),
      text(
        "Accessible mobile layout with neutral, compliant language.",
        "Доступная мобильная структура с нейтральными формулировками.",
      ),
    ],
    integrations: [
      text(
        "Appointment systems, CRM, call tracking, maps and analytics.",
        "Системы записи, CRM, коллтрекинг, карты и аналитика.",
      ),
    ],
    related: ["websites", "ux-ui-design", "crm-integration", "seo-optimization"],
  },
  "online-school": {
    problems: [
      text(
        "Potential students need to compare program, format and support.",
        "Потенциальным студентам нужно сравнить программу, формат и поддержку.",
      ),
      text(
        "Webinars, applications and payments are often disconnected.",
        "Вебинары, заявки и оплаты часто разъединены.",
      ),
      text(
        "Course pages can become too long without clear decision points.",
        "Страницы курсов становятся длинными без понятных точек решения.",
        "Las paginas de cursos pueden hacerse demasiado largas sin puntos claros de decision.",
        "课程页面可能过长，缺少清晰决策点。",
      ),
    ],
    deliverables: [
      text(
        "Program structure, lesson format, application flow and FAQ.",
        "Структура программы, формат занятий, заявка и FAQ.",
      ),
      text(
        "Landing and CRM logic for cohorts, consultations and payments.",
        "Лендинг и CRM-логика для потоков, консультаций и оплат.",
      ),
    ],
    integrations: [
      text(
        "LMS, payment tools, CRM, webinars, email and analytics.",
        "LMS, платежи, CRM, вебинары, email и аналитика.",
      ),
    ],
    related: ["landing-pages", "crm-integration", "business-automation", "ux-ui-design"],
  },
  "real-estate": {
    problems: [
      text(
        "Users need fast filtering, clear object data and a trusted contact path.",
        "Пользователю нужны быстрые фильтры, понятные данные объекта и доверительный контакт.",
      ),
      text(
        "Listings, ads and CRM often lose source context.",
        "Объявления, реклама и CRM часто теряют контекст источника.",
      ),
      text(
        "Object pages need enough detail without becoming cluttered.",
        "Страницам объектов нужна детализация без перегруза.",
        "Las paginas de propiedades necesitan detalle suficiente sin saturarse.",
        "房源页面需要足够细节，但不能杂乱。",
      ),
    ],
    deliverables: [
      text(
        "Catalog, object pages, lead forms and consultation CTA.",
        "Каталог, страницы объектов, формы заявки и CTA консультации.",
      ),
      text(
        "SEO-ready landing paths for property types and locations.",
        "SEO-структура под типы объектов и локации.",
        "Rutas landing SEO-ready para tipos de propiedad y ubicaciones.",
        "面向房产类型和位置的 SEO-ready 落地路径。",
      ),
    ],
    integrations: [
      text(
        "CRM, catalog feeds, maps, call tracking and analytics events.",
        "CRM, фиды каталога, карты, коллтрекинг и события аналитики.",
      ),
    ],
    related: ["websites", "ecommerce", "crm-integration", "seo-optimization"],
  },
};

export const industryRoutes: DetailRoute[] = industryDefs.map(([slug, en, ru, es, zh]) => ({
  kind: "industry",
  path: `/industries/${slug}`,
  slug,
  title: text(`${en} | LORA`, `${ru} | LORA`, `${es} | LORA`, `${zh} | LORA`),
  description: text(
    `${en} prepared for leads, trust, clear services and future ad traffic.`,
    `${ru}: структура для заявок, доверия, понятных услуг и будущего рекламного трафика.`,
    `${es} preparado para leads, confianza y publicidad.`,
    `${zh} 面向线索、信任和广告流量的网站。`,
  ),
  h1: text(en, ru, es, zh),
  summary: text(
    "A practical industry page with offer, trust blocks, FAQ and links to relevant services.",
    "Практичная страница ниши: оффер, блоки доверия, FAQ и ссылки на подходящие услуги.",
    "Pagina practica por industria.",
    "实用行业页面。",
  ),
  eyebrow: text("Industry", "Ниша", "Industria", "行业"),
  changeFrequency: "monthly",
  priority: 0.78,
  related: industryOverrides[slug]?.related ?? ["websites", "landing-pages", "ux-ui-design", "seo-optimization"],
  cta: text("Discuss this industry page", "Обсудить страницу для ниши", "Hablar de esta pagina", "讨论行业页面"),
  problems: [
    text(
      "Users need trust signals before leaving a request.",
      "Пользователю нужны понятные сигналы доверия до заявки.",
      "Los usuarios necesitan senales de confianza antes de dejar una solicitud.",
      "用户在提交请求前需要清晰的信任信号。",
    ),
    text(
      "Services, prices and process are often hidden or scattered.",
      "Услуги, цены и процесс часто спрятаны или разрознены.",
      "Servicios, precios y proceso suelen estar ocultos o dispersos.",
      "服务、价格和流程常常被隐藏或分散。",
    ),
    text(
      "Ad traffic needs a page that matches the search intent.",
      "Рекламному трафику нужна страница, совпадающая с намерением запроса.",
      "El trafico publicitario necesita una pagina que coincida con la intencion de busqueda.",
      "广告流量需要与搜索意图匹配的页面。",
    ),
  ],
  deliverables: [
    text(
      "Clear offer, service blocks, FAQ and contact path.",
      "Понятный оффер, блоки услуг, FAQ и путь к контакту.",
      "Oferta clara, bloques de servicio, FAQ y ruta de contacto.",
      "清晰报价、服务模块、FAQ 和联系路径。",
    ),
    text(
      "Structure for local/industry SEO without fake reviews or numbers.",
      "Структура для нишевого SEO без фейковых отзывов и цифр.",
      "Estructura para SEO local o de industria sin resenas ni numeros falsos.",
      "面向本地/行业 SEO 的结构，不使用虚假评价或数字。",
    ),
  ],
  integrations: serviceBase.integrations,
  process: serviceBase.process,
  faq: serviceBase.faq,
  ...industryOverrides[slug],
}));
