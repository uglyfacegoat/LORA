import { industryRoutes, mainRoutes, serviceRoutes } from "../seo/routes";
import { localizedPath, localize, type Lang } from "../seo/site";

export type NavGroup = {
  label: string;
  path?: string;
  items?: { label: string; path: string; note?: string }[];
};

const SERVICE_SLUGS = [
  "websites",
  "landing-pages",
  "corporate-websites",
  "ecommerce",
  "ux-ui-design",
  "website-redesign",
  "seo-optimization",
  "crm-integration",
  "business-automation",
  "website-support",
];

const INDUSTRY_SLUGS = [
  "clinic",
  "restaurant",
  "beauty-salon",
  "construction-company",
  "online-school",
  "expert",
  "b2b-company",
  "service-business",
  "legal-company",
  "real-estate",
];

function routeBySlug(slug: string) {
  const route = mainRoutes.find((item) => item.slug === slug);
  if (!route) throw new Error(`Missing main route: ${slug}`);
  return route;
}

function mainPath(slug: string) {
  return routeBySlug(slug).path;
}

function allLabel(lang: Lang, type: "services" | "industries") {
  if (type === "services") {
    return lang === "ru"
      ? "Все услуги"
      : lang === "es"
        ? "Todos los servicios"
        : lang === "zh"
          ? "所有服务"
          : "All services";
  }
  return lang === "ru"
    ? "Все ниши"
    : lang === "es"
      ? "Todas las industrias"
      : lang === "zh"
        ? "所有行业"
        : "All industries";
}

export function getMenuLabel(lang: Lang) {
  return lang === "ru" ? "Меню" : lang === "es" ? "Menu" : lang === "zh" ? "菜单" : "Menu";
}

export function buildGroups(lang: Lang): NavGroup[] {
  const serviceItems = [
    {
      label: localize(routeBySlug("services").h1, lang),
      path: "/services",
      note: allLabel(lang, "services"),
    },
    ...SERVICE_SLUGS.map((slug) => {
      const route = serviceRoutes.find((item) => item.slug === slug);
      if (!route) throw new Error(`Missing service route: ${slug}`);
      return { label: localize(route.h1, lang), path: route.path };
    }),
  ];

  const industryItems = [
    {
      label: localize(routeBySlug("industries").h1, lang),
      path: "/industries",
      note: allLabel(lang, "industries"),
    },
    ...INDUSTRY_SLUGS.map((slug) => {
      const route = industryRoutes.find((item) => item.slug === slug);
      if (!route) throw new Error(`Missing industry route: ${slug}`);
      return { label: localize(route.h1, lang), path: route.path };
    }),
  ];

  return [
    {
      label: localize(routeBySlug("services").h1, lang),
      path: "/services",
      items: serviceItems,
    },
    {
      label: localize(routeBySlug("industries").h1, lang),
      path: "/industries",
      items: industryItems,
    },
    {
      label: lang === "ru" ? "Ресурсы" : lang === "es" ? "Recursos" : lang === "zh" ? "资源" : "Resources",
      path: "/blog",
      items: [
        { label: localize(routeBySlug("blog").h1, lang), path: "/blog" },
        { label: localize(routeBySlug("cases").h1, lang), path: "/cases" },
        { label: localize(routeBySlug("history").h1, lang), path: "/history" },
      ],
    },
    { label: localize(routeBySlug("pricing").h1, lang), path: mainPath("pricing") },
    { label: localize(routeBySlug("audit").h1, lang), path: mainPath("audit") },
    { label: localize(routeBySlug("contacts").h1, lang), path: mainPath("contacts") },
  ];
}

export function navHref(path: string, lang: Lang) {
  if (path.includes("#")) {
    const [base, hash] = path.split("#");
    return `${localizedPath(base || "/", lang)}#${hash}`;
  }
  return localizedPath(path, lang);
}

export function isActive(pathname: string, path?: string) {
  if (!path) return false;
  const cleanPath = path.split("#")[0];
  if (cleanPath === "/") return pathname === "/";
  return pathname === cleanPath || pathname.startsWith(`${cleanPath}/`);
}
