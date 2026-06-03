import { useI18n } from "../i18n";
import { CONTACT_EMAIL, localizedPath, localize } from "../seo/site";
import type { SeoRoute } from "../seo/routes";
import { trackEvent } from "../analytics";
import { ContactSection } from "./ContactSection";
import { PricingSection } from "./PricingSection";
import { SeoShell } from "./SeoShell";
import { SeoCard, SeoCtaBlock, SeoHeroPanel, SeoPageHero, SeoSection } from "./SeoVisualBlocks";

export function SimplePage({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();

  return (
    <SeoShell route={route}>
      <div className="mx-auto max-w-6xl">
        <SeoPageHero
          eyebrow={route.slug === "audit" ? "Project intake" : route.slug === "thank-you" ? "Request received" : "LORA"}
          title={localize(route.h1, lang)}
          summary={localize(route.summary, lang)}
          aside={
            <SeoHeroPanel>
              <p className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}>
                {route.slug === "thank-you" ? "Next step" : "Page role"}
              </p>
              <p className="mt-6" style={{ fontSize: "1.25rem", lineHeight: 1.35, fontWeight: 800, color: "var(--fg-1)" }}>
                {getAsideCopy(route.slug)}
              </p>
              <div className="mt-8 h-px" style={{ background: "var(--surface-border)" }} />
              <p className="mt-5" style={{ fontSize: "0.86rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
                Canonical, hreflang and route metadata stay connected through the shared SEO layer.
              </p>
            </SeoHeroPanel>
          }
        />

        {route.slug === "pricing" && <div className="-mx-6 md:-mx-20"><PricingSection /></div>}
        {["contacts", "audit"].includes(route.slug) && <div className="-mx-6 md:-mx-20"><ContactSection /></div>}
        {["privacy", "cookies"].includes(route.slug) && <PolicyContent slug={route.slug} />}
        {route.slug === "thank-you" && (
          <SeoCtaBlock
            title="We will review the context"
            text="The request is recorded. The next useful step is to prepare the current site, funnel or product context before the call."
            href={localizedPath("/", lang)}
            label="Back to LORA"
          />
        )}
        {route.slug === "cases" && (
          <SeoSection label="Archive policy" title="Only verified work belongs here">
            <div className="grid gap-4 md:grid-cols-2">
              <SeoCard>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 850, color: "var(--fg-1)" }}>No invented proof</h2>
                <p className="mt-3" style={{ color: "var(--fg-3)", lineHeight: 1.7 }}>
                  LORA will publish case studies only when there is verified project data and permission to disclose it.
                </p>
              </SeoCard>
              <SeoCard>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 850, color: "var(--fg-1)" }}>Prepared structure</h2>
                <p className="mt-3" style={{ color: "var(--fg-3)", lineHeight: 1.7 }}>
                  The page is ready for future project pages, internal links and article references without fake metrics.
                </p>
              </SeoCard>
            </div>
          </SeoSection>
        )}
      </div>
    </SeoShell>
  );
}

function PolicyContent({ slug }: { slug: string }) {
  return (
    <div className="mt-16 grid gap-4 md:grid-cols-3">
      {[
        "We use contact form data only to respond to project requests and prepare a brief.",
        `You can contact us at ${CONTACT_EMAIL} to request changes or deletion of submitted data.`,
        slug === "cookies"
          ? "Analytics cookies and advertising tags are not hardcoded. They can be connected later through environment variables and consent logic."
          : "Analytics events are prepared as a technical layer, but real counters require explicit environment configuration.",
      ].map((item) => (
        <SeoCard key={item}>
          <p style={{ color: "var(--fg-3)", lineHeight: 1.7 }}>{item}</p>
        </SeoCard>
      ))}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={() => trackEvent("click_email", { location: slug })}
        className="md:col-span-3"
        style={{ color: "var(--fg-1)", fontWeight: 800 }}
      >
        {CONTACT_EMAIL}
      </a>
    </div>
  );
}

function getAsideCopy(slug: string) {
  if (slug === "audit") return "A strong landing entry for diagnostics, briefs and future paid traffic.";
  if (slug === "contacts") return "A direct path to the team, with form flow and analytics events ready.";
  if (slug === "pricing") return "Commercial context before the exact estimate: scope, product type and integrations.";
  if (slug === "thank-you") return "A clean finish after the lead form, intentionally kept out of search index.";
  if (slug === "cases") return "A future archive for verified work, not a place for invented numbers.";
  if (slug === "privacy") return "A practical policy page that still belongs to the LORA interface.";
  if (slug === "cookies") return "Prepared for analytics and ads without hardcoded counter IDs.";
  return "A support page inside the same SEO and visual system.";
}
