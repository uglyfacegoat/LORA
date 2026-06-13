import { buildAlternateLinks, type AlternateLink } from "./alternateLinks";
import { OG_IMAGE, SITE_NAME, SITE_URL, type Lang, absoluteUrl, localize } from "./site";
import type { SeoRoute } from "./routes";

export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  alternates: AlternateLink[];
  ogImage: string;
};

export function buildMeta(route: SeoRoute, lang: Lang): PageMeta {
  const canonical = absoluteUrl(route.path, lang);
  return {
    title: localize(route.title, lang),
    description: localize(route.description, lang),
    canonical,
    robots: route.noindex ? "noindex, nofollow" : "index, follow",
    alternates: buildAlternateLinks(route.path),
    ogImage: `${SITE_URL}${OG_IMAGE}`,
  };
}

export function setMetaTag(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith("link") ? document.createElement("link") : document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element!.setAttribute(key, value));
}

export function applyPageMeta(route: SeoRoute, lang: Lang) {
  const meta = buildMeta(route, lang);
  document.title = meta.title;
  setMetaTag('meta[name="description"]', { name: "description", content: meta.description });
  setMetaTag('meta[name="robots"]', { name: "robots", content: meta.robots });
  setMetaTag('link[rel="canonical"]', { rel: "canonical", href: meta.canonical });

  document.head.querySelectorAll('link[rel="alternate"][data-seo-alt="true"]').forEach((node) => node.remove());
  meta.alternates.forEach((alternate) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = alternate.lang;
    link.href = alternate.href;
    link.dataset.seoAlt = "true";
    document.head.appendChild(link);
  });

  setMetaTag('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
  setMetaTag('meta[property="og:title"]', { property: "og:title", content: meta.title });
  setMetaTag('meta[property="og:description"]', { property: "og:description", content: meta.description });
  setMetaTag('meta[property="og:url"]', { property: "og:url", content: meta.canonical });
  setMetaTag('meta[property="og:type"]', {
    property: "og:type",
    content: route.kind === "article" ? "article" : "website",
  });
  setMetaTag('meta[property="og:image"]', { property: "og:image", content: meta.ogImage });
  setMetaTag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
  setMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
  setMetaTag('meta[name="twitter:image"]', { name: "twitter:image", content: meta.ogImage });
}
