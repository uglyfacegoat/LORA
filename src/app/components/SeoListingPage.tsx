import { useI18n } from "../i18n";
import { localizedPath, localize } from "../seo/site";
import { articleRoutes, industryRoutes, serviceRoutes, type SeoRoute } from "../seo/routes";
import { SeoShell } from "./SeoShell";
import { SeoCard, SeoCtaBlock, SeoHeroPanel, SeoPageHero } from "./SeoVisualBlocks";
import { trackEvent } from "../analytics";

function getItems(route: SeoRoute) {
  if (route.slug === "services") return serviceRoutes;
  if (route.slug === "industries") return industryRoutes;
  if (route.slug === "blog") return articleRoutes;
  return [];
}

export function SeoListingPage({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  const items = getItems(route);

  return (
    <SeoShell route={route}>
      <div className="mx-auto max-w-6xl">
        <SeoPageHero
          eyebrow={route.slug === "blog" ? "LORA JOURNAL" : route.slug === "industries" ? "LORA INDUSTRIES" : "LORA SERVICES"}
          title={localize(route.h1, lang)}
          summary={localize(route.summary, lang)}
          aside={
            <SeoHeroPanel>
              <p className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}>
                Navigation map
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Stat label="Pages" value={String(items.length)} />
                <Stat label="Languages" value="4" />
              </div>
              <p className="mt-8" style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
                Each card opens a real indexable page with canonical, hreflang, JSON-LD and internal links.
              </p>
            </SeoHeroPanel>
          }
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {items.map((item) => (
            <a
              key={item.path}
              href={localizedPath(item.path, lang)}
              className={`group block ${item.kind === "article" ? "lg:col-span-12" : "lg:col-span-6"}`}
            >
              <SeoCard>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-4 uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", color: "var(--fg-4)", fontWeight: 800 }}>
                      {item.kind} / {String(items.indexOf(item) + 1).padStart(2, "0")}
                    </p>
                    <h2 style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.8rem)", lineHeight: 1.08, fontWeight: 850, letterSpacing: "-0.025em", color: "var(--fg-1)" }}>
                      {localize(item.h1, lang)}
                    </h2>
                    <p className="mt-4 max-w-xl" style={{ fontSize: "0.9rem", lineHeight: 1.68, color: "var(--fg-3)" }}>
                      {localize(item.description, lang)}
                    </p>
                  </div>
                  <svg className="mt-1 shrink-0 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </SeoCard>
            </a>
          ))}
        </div>

        <SeoCtaBlock
          title="Start with a focused brief"
          text="Tell us what you are building, and LORA will map the page, funnel and integrations before production starts."
          href={localizedPath("/audit", lang)}
          label="Open brief"
          onClick={() => trackEvent("open_brief", { location: `${route.slug}_listing` })}
        />
      </div>
    </SeoShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}>
      <p style={{ fontSize: "1.9rem", lineHeight: 1, fontWeight: 900, color: "var(--fg-1)" }}>{value}</p>
      <p className="mt-2 uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.2em", fontWeight: 800, color: "var(--fg-4)" }}>{label}</p>
    </div>
  );
}
