import { type Lang, localize } from "./site";
import { routeUpdatedAt } from "./routeUpdatedAt";
import { text, type DetailRoute, type SeoRoute } from "./routeTypes";

export type { ChangeFrequency, DetailRoute, RouteKind, SeoRoute } from "./routeTypes";

export { mainRoutes } from "./mainRoutes";
import { mainRoutes } from "./mainRoutes";

export { serviceRoutes } from "./serviceRoutes";
import { serviceRoutes } from "./serviceRoutes";

export { industryRoutes } from "./industryRoutes";
import { industryRoutes } from "./industryRoutes";

export { articleRoutes } from "./articleRoutes";
import { articleRoutes } from "./articleRoutes";

function withRouteUpdatedAt<T extends SeoRoute | DetailRoute>(route: T) {
  const routeDate = "date" in route ? route.date : undefined;
  const updatedAt = route.updatedAt ?? routeDate ?? routeUpdatedAt[route.slug];
  if (!updatedAt) {
    throw new Error(`Missing updatedAt for SEO route: ${route.slug}`);
  }
  return {
    ...route,
    updatedAt,
  };
}

export const allRoutes = [...mainRoutes, ...serviceRoutes, ...industryRoutes, ...articleRoutes].map(withRouteUpdatedAt);
export const indexableRoutes = allRoutes.filter((route) => !route.noindex);

export function findRoute(path: string): SeoRoute | DetailRoute | null {
  return allRoutes.find((route) => route.path === path) ?? null;
}

export function resolveRoute(path: string) {
  return (
    findRoute(path) ?? {
      kind: "not-found" as const,
      path,
      slug: "not-found",
      title: text(
        "Page not found | LORA",
        "Страница не найдена | LORA",
        "Pagina no encontrada | LORA",
        "页面未找到 | LORA",
      ),
      description: text(
        "The requested page does not exist.",
        "Запрошенная страница не существует.",
        "La pagina solicitada no existe.",
        "请求的页面不存在。",
      ),
      h1: text("Page not found", "Страница не найдена", "Pagina no encontrada", "页面未找到"),
      summary: text(
        "Use the navigation links to continue.",
        "Перейдите на главную или в раздел услуг.",
        "Usa la navegacion para continuar.",
        "请使用导航继续。",
      ),
      changeFrequency: "yearly" as const,
      priority: 0,
      noindex: true,
    }
  );
}

export function routeLabel(route: SeoRoute, lang: Lang) {
  return localize(route.h1, lang);
}
