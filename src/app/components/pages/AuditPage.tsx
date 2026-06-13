import { useI18n } from "../../i18n";
import { auditCopy } from "../../data/auditPage";
import type { SeoRoute } from "../../seo/routes";
import { trackEvent } from "../../analytics";
import { ContactSection } from "../ContactSection";
import { SeoShell } from "../SeoShell";
import { SeoCtaButton } from "../SeoVisualBlocks";

export function AuditPage({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  const copy = auditCopy[lang];

  return (
    <SeoShell route={route}>
      <div className="mx-auto max-w-6xl">
        <section className="relative pt-4">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
            <div>
              <p
                className="uppercase"
                style={{ fontSize: "0.58rem", letterSpacing: "0.3em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {copy.eyebrow}
              </p>
              <h1
                className="mt-8 max-w-4xl"
                style={{
                  fontSize: "clamp(3rem, 7.2vw, 6.8rem)",
                  lineHeight: 0.98,
                  fontWeight: 900,
                  color: "var(--fg-1)",
                }}
              >
                {copy.title}
              </h1>
              <p
                className="mt-8 max-w-2xl"
                style={{
                  fontSize: "clamp(1rem, 1.35vw, 1.22rem)",
                  lineHeight: 1.72,
                  fontWeight: 600,
                  color: "var(--fg-3)",
                }}
              >
                {copy.lead}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <SeoCtaButton
                  href="#brief"
                  label={copy.cta}
                  onClick={() => trackEvent("click_cta", { location: "audit_hero" })}
                />
                <a
                  href="#logic"
                  className="group flex items-center gap-4 uppercase"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.24em", fontWeight: 900, color: "var(--fg-2)" }}
                >
                  {copy.readLogic}
                  <span
                    className="transition-transform duration-300 group-hover:translate-y-1"
                    style={{ fontSize: "1.25rem", lineHeight: 1 }}
                  >
                    ↓
                  </span>
                </a>
              </div>
            </div>

            <aside className="border-y py-8" style={{ borderColor: "var(--surface-border)" }}>
              <p
                className="uppercase"
                style={{ fontSize: "0.56rem", letterSpacing: "0.28em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {copy.sideLabel}
              </p>
              <div className="mt-7 grid gap-6">
                {copy.sideItems.map((item, index) => (
                  <div key={item.label} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span
                      style={{ fontSize: "0.56rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-5)" }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <p style={{ fontSize: "1rem", lineHeight: 1.25, fontWeight: 850, color: "var(--fg-1)" }}>
                        {item.label}
                      </p>
                      <p className="mt-2" style={{ fontSize: "0.82rem", lineHeight: 1.55, color: "var(--fg-4)" }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="logic" className="mt-28 md:mt-40">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p
                className="uppercase"
                style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {copy.logicLabel}
              </p>
              <h2
                className="mt-6 max-w-md"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                  lineHeight: 1.02,
                  fontWeight: 900,
                  color: "var(--fg-1)",
                }}
              >
                {copy.logicTitle}
              </h2>
            </div>
            <div className="grid gap-10">
              {copy.logicItems.map((item, index) => (
                <article key={item.title} className="grid gap-7 md:grid-cols-[6rem_1fr]">
                  <span
                    style={{
                      fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
                      lineHeight: 0.85,
                      fontWeight: 900,
                      color: "var(--fg-5)",
                    }}
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(1.55rem, 2.7vw, 2.5rem)",
                        lineHeight: 1.05,
                        fontWeight: 900,
                        color: "var(--fg-1)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-5 max-w-2xl"
                      style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--fg-3)" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-28 md:mt-40">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <p
              style={{ fontSize: "clamp(2rem, 5.8vw, 5rem)", lineHeight: 0.98, fontWeight: 900, color: "var(--fg-1)" }}
            >
              {copy.outcomeTitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.outcomes.map((item) => (
                <div key={item} className="border-t pt-5" style={{ borderColor: "var(--surface-border)" }}>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.65, fontWeight: 700, color: "var(--fg-3)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <blockquote className="mt-28 border-y py-10 md:mt-40 md:py-14" style={{ borderColor: "var(--surface-border)" }}>
          <p
            className="max-w-5xl"
            style={{
              fontSize: "clamp(1.8rem, 4.4vw, 4.4rem)",
              lineHeight: 1.02,
              fontWeight: 900,
              color: "var(--fg-1)",
            }}
          >
            {copy.quote}
          </p>
        </blockquote>

        <section id="brief" className="mt-20 md:mt-28">
          <ContactSection />
        </section>
      </div>
    </SeoShell>
  );
}
