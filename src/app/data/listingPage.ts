import type { Lang } from "../seo/site";

export type ListingPageCopy = {
  serviceLabel: string;
  servicesStatement: [string, string, string];
  catalog: string;
  servicesCtaTitle: string;
  servicesCtaText: string;
  openBrief: string;
  industriesEyebrow: string;
  industriesMap: string;
  industriesCtaTitle: string;
  industriesCtaText: string;
  discussPage: string;
  articleLabel: string;
  blogEyebrow: string;
  blogStatement: [string, string, string];
  archive: string;
  empty: string;
  emptyBlog: string;
  blogCtaTitle: string;
  blogCtaText: string;
};

export const listingCopy: Record<Lang, ListingPageCopy> = {
  en: {
    serviceLabel: "Service",
    servicesStatement: ["Ten ways", "to turn a page", "into a system."],
    catalog: "The catalog",
    servicesCtaTitle: "Pick a service. Start with a brief.",
    servicesCtaText:
      "Every service begins with the same disciplined intake — scope, channels, integrations — before any design is produced.",
    openBrief: "Open brief",
    industriesEyebrow: "LORA · DIRECTIONS",
    industriesMap: "Industries — alphabetical map",
    industriesCtaTitle: "Map your business to a working page.",
    industriesCtaText:
      "Pick the closest direction — or request a custom industry page. The production system stays the same.",
    discussPage: "Discuss the page",
    articleLabel: "Article",
    blogEyebrow: "LORA · FIELD NOTES",
    blogStatement: ["Notes from production.", "No keyword stuffing.", "Written to help."],
    archive: "The archive",
    empty: "Empty",
    emptyBlog: "First field notes are in preparation. They will appear here when ready.",
    blogCtaTitle: "Turn a note into a project.",
    blogCtaText:
      "If a note describes a real situation you have — request an audit. LORA will respond with structure, not generic advice.",
  },
  es: {
    serviceLabel: "Servicio",
    servicesStatement: ["Diez formas", "de convertir una pagina", "en un sistema."],
    catalog: "Catalogo",
    servicesCtaTitle: "Elige un servicio. Empieza con un brief.",
    servicesCtaText:
      "Cada servicio empieza con el mismo intake disciplinado: alcance, canales e integraciones antes del diseno.",
    openBrief: "Abrir brief",
    industriesEyebrow: "LORA · DIRECCIONES",
    industriesMap: "Industrias — mapa alfabetico",
    industriesCtaTitle: "Convierte tu negocio en una pagina funcional.",
    industriesCtaText:
      "Elige la direccion mas cercana o solicita una pagina de industria personalizada. El sistema de produccion se mantiene.",
    discussPage: "Discutir pagina",
    articleLabel: "Articulo",
    blogEyebrow: "LORA · NOTAS DE CAMPO",
    blogStatement: ["Notas de produccion.", "Sin relleno SEO.", "Escrito para ayudar."],
    archive: "Archivo",
    empty: "Vacio",
    emptyBlog: "Las primeras notas estan en preparacion. Apareceran aqui cuando esten listas.",
    blogCtaTitle: "Convierte una nota en proyecto.",
    blogCtaText:
      "Si una nota describe una situacion real, solicita una auditoria. LORA respondera con estructura, no consejos genericos.",
  },
  ru: {
    serviceLabel: "Услуга",
    servicesStatement: ["Десять способов", "превратить страницу", "в систему."],
    catalog: "Каталог",
    servicesCtaTitle: "Выберите услугу. Начните с брифа.",
    servicesCtaText:
      "Каждая услуга начинается с дисциплинированного intake: объем, каналы, интеграции — до любого дизайна.",
    openBrief: "Открыть бриф",
    industriesEyebrow: "LORA · НАПРАВЛЕНИЯ",
    industriesMap: "Ниши — карта направлений",
    industriesCtaTitle: "Превратите бизнес в рабочую страницу.",
    industriesCtaText:
      "Выберите ближайшее направление или запросите кастомную страницу ниши. Производственная система остается той же.",
    discussPage: "Обсудить страницу",
    articleLabel: "Статья",
    blogEyebrow: "LORA · FIELD NOTES",
    blogStatement: ["Заметки из производства.", "Без SEO-воды.", "Написано, чтобы помогать."],
    archive: "Архив",
    empty: "Пусто",
    emptyBlog: "Первые заметки готовятся. Они появятся здесь, когда будут готовы.",
    blogCtaTitle: "Превратите заметку в проект.",
    blogCtaText:
      "Если заметка описывает вашу реальную ситуацию — запросите аудит. LORA ответит структурой, а не общим советом.",
  },
  zh: {
    serviceLabel: "服务",
    servicesStatement: ["十种方式", "把页面变成", "一个系统。"],
    catalog: "目录",
    servicesCtaTitle: "选择服务。从 brief 开始。",
    servicesCtaText: "每项服务都从同样清晰的 intake 开始：范围、渠道和集成先于任何设计。",
    openBrief: "打开 brief",
    industriesEyebrow: "LORA · 方向",
    industriesMap: "行业 — 方向地图",
    industriesCtaTitle: "把业务映射成可工作的页面。",
    industriesCtaText: "选择最接近的方向，或请求定制行业页面。生产系统保持一致。",
    discussPage: "讨论页面",
    articleLabel: "文章",
    blogEyebrow: "LORA · 现场笔记",
    blogStatement: ["来自生产的笔记。", "没有关键词堆砌。", "为帮助而写。"],
    archive: "归档",
    empty: "空",
    emptyBlog: "第一批笔记正在准备中，完成后会显示在这里。",
    blogCtaTitle: "把一篇笔记变成项目。",
    blogCtaText: "如果笔记描述了你的真实情况，请请求审计。LORA 会用结构回应，而不是泛泛建议。",
  },
};
