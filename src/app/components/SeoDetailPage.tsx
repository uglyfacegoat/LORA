import { useI18n } from "../i18n";
import { localizedPath, localize } from "../seo/site";
import { findRoute, serviceRoutes, type DetailRoute } from "../seo/routes";
import { articleJsonLd, faqJsonLd, serviceJsonLd } from "../seo/structuredData";
import { trackEvent } from "../analytics";
import { JsonLd } from "./JsonLd";
import { SeoShell } from "./SeoShell";
import {
  RelatedLinks,
  SeoBreadcrumbs,
  SeoCard,
  SeoCtaBlock,
  SeoFaq,
  SeoFeatureList,
  SeoHeroPanel,
  SeoPageHero,
  SeoProcessTimeline,
  SeoSection,
} from "./SeoVisualBlocks";

export function SeoDetailPage({ route }: { route: DetailRoute }) {
  const { lang } = useI18n();
  const related = route.related
    .map((slug) => serviceRoutes.find((service) => service.slug === slug) ?? findRoute(`/services/${slug}`))
    .filter(Boolean) as DetailRoute[];

  return (
    <SeoShell route={route}>
      <JsonLd data={serviceJsonLd(route, lang)} />
      <JsonLd data={faqJsonLd(route, lang)} />
      {route.kind === "article" && <JsonLd data={articleJsonLd(route, lang)} />}

      <article className="mx-auto max-w-6xl">
        <SeoBreadcrumbs
          lang={lang}
          items={[
            {
              label: route.kind === "industry" ? "Industries" : route.kind === "article" ? "Blog" : "Services",
              path: route.kind === "industry" ? "/industries" : route.kind === "article" ? "/blog" : "/services",
            },
            { label: localize(route.h1, lang) },
          ]}
        />

        <SeoPageHero
          eyebrow={route.eyebrow ? localize(route.eyebrow, lang) : "LORA"}
          title={localize(route.h1, lang)}
          summary={localize(route.summary, lang)}
          cta={
            <a
              href={localizedPath("/audit", lang)}
              onClick={() => trackEvent(route.kind === "service" ? "service_page_cta_click" : "click_cta", { page: route.slug })}
              className="inline-flex rounded-xl px-7 py-4 uppercase transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--cta-bg)", color: "var(--cta-fg)", fontSize: "0.62rem", letterSpacing: "0.22em", fontWeight: 800 }}
            >
              {localize(route.cta, lang)}
            </a>
          }
          aside={
            <SeoHeroPanel>
              <p className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}>
                Page system
              </p>
              <div className="mt-8 space-y-4">
                {[
                  ["SEO", "canonical + hreflang"],
                  ["UX", route.kind === "industry" ? "industry landing path" : "service conversion path"],
                  ["CRM", "lead handoff ready"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-6 border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: "var(--surface-border)" }}>
                    <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", fontWeight: 800, color: "var(--fg-4)" }}>{label}</span>
                    <span style={{ fontSize: "0.88rem", color: "var(--fg-2)", textAlign: "right" }}>{value}</span>
                  </div>
                ))}
              </div>
            </SeoHeroPanel>
          }
        />

        <SeoSection label="Friction map" title="Where the page has to remove doubt">
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <SeoFeatureList items={route.problems.map((item) => localize(item, lang))} />
            <SeoCard>
              <p className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}>LORA response</p>
              <h3 className="mt-5" style={{ fontSize: "1.6rem", lineHeight: 1.12, fontWeight: 850, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>
                Structure before decoration.
              </h3>
              <p className="mt-4" style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
                We map the offer, decision path, technical handoff and analytics layer before adding visual effects.
              </p>
            </SeoCard>
          </div>
        </SeoSection>

        <SeoSection label="Build scope" title="What goes into the project">
          <div className="grid gap-4 md:grid-cols-2">
            {route.deliverables.map((item, index) => (
              <SeoCard key={localize(item, lang)} index={index}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--fg-3)" }}>{localize(item, lang)}</p>
              </SeoCard>
            ))}
          </div>
        </SeoSection>

        <SeoSection label="Work rhythm" title="From brief to launch">
          <SeoProcessTimeline items={route.process.map((item) => localize(item, lang))} />
        </SeoSection>

        <SeoSection label="Connections" title="Systems that can connect to the page">
          <SeoFeatureList items={route.integrations.map((item) => localize(item, lang))} />
        </SeoSection>

        <SeoSection label="FAQ" title="Questions before the first call">
          <SeoFaq route={route} lang={lang} />
        </SeoSection>

        <SeoSection label="Internal links" title="Related directions">
          <RelatedLinks routes={related} lang={lang} />
        </SeoSection>

        <SeoCtaBlock
          title="Turn the page into a working funnel"
          text="Start with a brief. We will check the offer, traffic context, conversion path and technical integrations before production."
          href={localizedPath("/audit", lang)}
          label={localize(route.cta, lang)}
          onClick={() => trackEvent(route.kind === "service" ? "service_page_cta_click" : "click_cta", { page: route.slug, location: "bottom_cta" })}
        />
      </article>
    </SeoShell>
  );
}
