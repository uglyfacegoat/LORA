import { useI18n } from "../../i18n";
import { CONTACT_EMAIL } from "../../config/contact";
import { localize } from "../../seo/site";
import type { SeoRoute } from "../../seo/routes";
import { getDoc, legalUi } from "../../content/legalDocuments";
import { SeoShell } from "../SeoShell";

export function LegalDocumentPage({ route, type }: { route: SeoRoute; type: "privacy" | "cookies" | "terms" }) {
  const { lang } = useI18n();
  const doc = getDoc(type, lang);

  return (
    <SeoShell route={route}>
      <article className="mx-auto max-w-4xl">
        <header className="pt-4">
          <p
            className="uppercase"
            style={{ fontSize: "0.58rem", letterSpacing: "0.26em", fontWeight: 800, color: "var(--fg-4)" }}
          >
            {doc.label}
          </p>
          <h1
            className="mt-8"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5.7rem)",
              lineHeight: 0.94,
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: "var(--fg-1)",
            }}
          >
            {localize(route.h1, lang)}
          </h1>
          <p className="mt-8 max-w-2xl" style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--fg-3)" }}>
            {localize(route.summary, lang)}
          </p>

          <dl
            className="mt-12 grid gap-6 border-y py-6 sm:grid-cols-3"
            style={{ borderColor: "var(--surface-border)" }}
          >
            <LegalMeta label={legalUi[lang].version} value={doc.updated} />
            <LegalMeta label={legalUi[lang].effective} value={doc.effective} />
            <LegalMeta label={legalUi[lang].contact} value={CONTACT_EMAIL} />
          </dl>
        </header>

        <section className="mt-12">
          <div className="grid gap-5">
            {doc.intro.map((paragraph) => (
              <p key={paragraph} style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--fg-2)" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <nav
          className="mt-16 border-y py-7"
          style={{ borderColor: "var(--surface-border)" }}
          aria-label={legalUi[lang].contentsAria}
        >
          <p
            className="uppercase"
            style={{ fontSize: "0.58rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}
          >
            {legalUi[lang].contents}
          </p>
          <ol className="mt-6 grid gap-3">
            {doc.blocks.map((block, index) => (
              <li key={block.title}>
                <a
                  href={`#section-${index + 1}`}
                  className="grid grid-cols-[2.5rem_1fr] gap-4"
                  style={{ color: "var(--fg-2)" }}
                >
                  <span style={{ color: "var(--fg-5)", fontWeight: 850 }}>{String(index + 1).padStart(2, "0")}</span>
                  <span style={{ fontWeight: 750 }}>{block.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-16">
          {doc.blocks.map((block, index) => (
            <section key={block.title} id={`section-${index + 1}`} className={index === 0 ? "" : "mt-16"}>
              <div className="grid gap-6 md:grid-cols-[4rem_1fr]">
                <p
                  aria-hidden="true"
                  style={{
                    fontSize: "1.6rem",
                    lineHeight: 1,
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "var(--fg-5)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h2
                    style={{
                      fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
                      lineHeight: 1.12,
                      fontWeight: 850,
                      letterSpacing: "-0.035em",
                      color: "var(--fg-1)",
                    }}
                  >
                    {block.title}
                  </h2>
                  <div className="mt-6 grid gap-5">
                    {block.body.map((paragraph) => (
                      <p key={paragraph} style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--fg-3)" }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {block.items && (
                    <ul className="mt-6 grid gap-3">
                      {block.items.map((item) => (
                        <li key={item} className="grid grid-cols-[1.4rem_1fr] gap-3">
                          <span aria-hidden="true" style={{ color: "var(--fg-5)" }}>
                            —
                          </span>
                          <span style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "var(--fg-2)", fontWeight: 600 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t pt-8" style={{ borderColor: "var(--surface-border)" }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-3)" }}>{doc.note}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-block"
            style={{ color: "var(--fg-1)", fontWeight: 800 }}
          >
            {CONTACT_EMAIL}
          </a>
        </footer>
      </article>
    </SeoShell>
  );
}

function LegalMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        className="uppercase"
        style={{ fontSize: "0.52rem", letterSpacing: "0.22em", fontWeight: 800, color: "var(--fg-5)" }}
      >
        {label}
      </dt>
      <dd className="mt-2" style={{ fontSize: "0.9rem", lineHeight: 1.45, color: "var(--fg-2)", fontWeight: 750 }}>
        {value}
      </dd>
    </div>
  );
}
