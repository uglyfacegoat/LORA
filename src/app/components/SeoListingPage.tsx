import { useI18n } from "../i18n";
import { listingCopy } from "../data/listingPage";
import { localizedPath, localize } from "../seo/site";
import { industryRoutes, serviceRoutes, type SeoRoute } from "../seo/routes";
import { trackEvent } from "../analytics";
import { ArticlesSection } from "./ArticlesSection";
import { SeoShell } from "./SeoShell";
import { SeoCtaBlock, SeoNumberedList, SeoPageHero, SeoTechLabel } from "./SeoVisualBlocks";

export function SeoListingPage({ route }: { route: SeoRoute }) {
  return (
    <SeoShell route={route}>
      <div className="mx-auto max-w-6xl">
        {route.slug === "services" && <ServicesListing route={route} />}
        {route.slug === "industries" && <IndustriesListing route={route} />}
        {route.slug === "blog" && <BlogListing />}
      </div>
    </SeoShell>
  );
}

/* ------------------------------------------------------------------ */
/* Services — the most distinctive composition. Editorial index.       */
/* ------------------------------------------------------------------ */

function ServicesListing({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  const copy = listingCopy[lang];
  const items = serviceRoutes.map((item, i) => ({
    index: i + 1,
    label: copy.serviceLabel,
    title: localize(item.h1, lang),
    description: localize(item.summary, lang),
    href: localizedPath(item.path, lang),
  }));

  return (
    <>
      <SeoPageHero
        eyebrow={`LORA · INDEX / SERVICES · ${serviceRoutes.length.toString().padStart(2, "0")}`}
        title={localize(route.h1, lang)}
        summary={localize(route.summary, lang)}
        eyebrowRule={false}
        titleMarker={false}
      />

      <section className="relative mt-28 md:mt-40">
        <div
          className="pointer-events-none absolute -inset-x-12 -inset-y-20 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, color-mix(in srgb, var(--fg-1) 5%, transparent), transparent 70%)",
          }}
        />
        <div className="mb-10 flex items-baseline justify-between">
          <SeoTechLabel>{copy.catalog}</SeoTechLabel>
          <span
            className="hidden md:inline"
            style={{ fontSize: "0.55rem", letterSpacing: "0.28em", fontWeight: 700, color: "var(--fg-5)" }}
          >
            01 — {serviceRoutes.length.toString().padStart(2, "0")}
          </span>
        </div>
        <SeoNumberedList items={items} />
      </section>

      <SeoCtaBlock
        title={copy.servicesCtaTitle}
        text={copy.servicesCtaText}
        href={localizedPath("/audit", lang)}
        label={copy.openBrief}
        onClick={() => trackEvent("open_brief", { location: "services_listing" })}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Industries — same DNA as services but reads as a directional map.   */
/* ------------------------------------------------------------------ */

function IndustriesListing({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  const copy = listingCopy[lang];
  const items = industryRoutes.map((item) => ({
    title: localize(item.h1, lang),
    description: localize(item.description, lang),
    href: localizedPath(item.path, lang),
  }));

  return (
    <>
      <SeoPageHero
        eyebrow={copy.industriesEyebrow}
        title={localize(route.h1, lang)}
        summary={localize(route.summary, lang)}
        eyebrowRule={false}
        titleMarker={false}
      />

      <section className="relative mt-32 md:mt-44">
        <div
          className="pointer-events-none absolute -inset-x-20 -inset-y-32 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, color-mix(in srgb, var(--fg-1) 5%, transparent), transparent 70%)",
          }}
        />
        <div className="mb-16">
          <SeoTechLabel>{copy.industriesMap}</SeoTechLabel>
        </div>

        <div className="relative grid gap-2">
          {items.map((item, i) => {
            const offset = i % 2 === 0;
            return (
              <a
                key={item.title}
                href={item.href}
                className="group relative block"
                style={{
                  paddingTop: "1.6rem",
                  paddingBottom: "1.6rem",
                }}
              >
                <div
                  className={`flex flex-col md:flex-row md:items-baseline md:gap-10 ${offset ? "md:justify-start md:pl-0" : "md:justify-end md:pr-0 md:text-right"}`}
                >
                  {!offset && (
                    <p
                      className="hidden max-w-xs shrink-0 md:block"
                      style={{ fontSize: "0.86rem", lineHeight: 1.55, color: "var(--fg-4)", marginLeft: 0 }}
                    >
                      {item.description}
                    </p>
                  )}
                  <h3
                    className="relative"
                    style={{
                      fontSize: "clamp(1.9rem, 5.5vw, 4.4rem)",
                      lineHeight: 1.12,
                      fontWeight: 900,
                      letterSpacing: "0",
                      color: "var(--fg-3)",
                      transition: "color 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    <span className="group-hover:text-[color:var(--fg-1)] group-hover:[text-shadow:0_0_60px_color-mix(in_srgb,var(--fg-1)_25%,transparent)]">
                      {item.title}
                    </span>
                  </h3>
                  {offset && (
                    <p
                      className="hidden max-w-xs shrink-0 md:block"
                      style={{ fontSize: "0.86rem", lineHeight: 1.55, color: "var(--fg-4)" }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
                <p
                  className="mt-3 max-w-md md:hidden"
                  style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--fg-4)" }}
                >
                  {item.description}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <SeoCtaBlock
        title={copy.industriesCtaTitle}
        text={copy.industriesCtaText}
        href={localizedPath("/audit", lang)}
        label={copy.discussPage}
        onClick={() => trackEvent("open_brief", { location: "industries_listing" })}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Blog — editorial column, no card grids.                             */
/* ------------------------------------------------------------------ */

function BlogListing() {
  return <ArticlesSection variant="page" />;
}
