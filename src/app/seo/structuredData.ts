import { CONTACT_EMAIL, SITE_NAME, SITE_URL, type Lang, absoluteUrl, localize } from "./site";
import type { DetailRoute, SeoRoute } from "./routes";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      availableLanguage: ["English", "Russian", "Spanish", "Chinese"],
    },
    sameAs: [],
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/", lang),
    inLanguage: lang,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceJsonLd(route: DetailRoute, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: localize(route.h1, lang),
    description: localize(route.description, lang),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    url: absoluteUrl(route.path, lang),
  };
}

export function faqJsonLd(route: DetailRoute, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: route.faq.map((item) => ({
      "@type": "Question",
      name: localize(item.question, lang),
      acceptedAnswer: {
        "@type": "Answer",
        text: localize(item.answer, lang),
      },
    })),
  };
}

export function articleJsonLd(route: DetailRoute, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: localize(route.h1, lang),
    description: localize(route.description, lang),
    datePublished: route.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: absoluteUrl(route.path, lang),
  };
}

export function isDetailRoute(route: SeoRoute): route is DetailRoute {
  return ["service", "industry", "article"].includes(route.kind);
}
