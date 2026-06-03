import { useI18n } from "../i18n";
import { absoluteUrl, localize } from "../seo/site";
import { breadcrumbJsonLd, organizationJsonLd, websiteJsonLd } from "../seo/structuredData";
import type { SeoRoute } from "../seo/routes";
import { JsonLd } from "./JsonLd";
import { SeoOrbitBackground } from "./SeoVisualBlocks";

export function SeoShell({ route, children }: { route: SeoRoute; children: React.ReactNode }) {
  const { lang } = useI18n();
  const crumbs = [
    { name: "LORA", url: absoluteUrl("/", lang) },
    { name: localize(route.h1, lang), url: absoluteUrl(route.path, lang) },
  ];

  return (
    <main className="relative z-10 overflow-hidden px-6 pb-28 pt-32 md:px-20 md:pb-36 md:pt-40">
      <SeoOrbitBackground variant={route.kind === "listing" ? "dense" : "default"} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd(lang)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {children}
    </main>
  );
}
