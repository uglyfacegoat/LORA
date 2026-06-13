import { trackEvent } from "../analytics";
import { articleContent, detailCopy, formatArticleDate } from "../content/seoDetailContent";
import { useI18n } from "../i18n";
import { localizedPath, localize } from "../seo/site";
import type { DetailRoute } from "../seo/routes";
import { SeoCtaBlock, SeoCtaButton, SeoPageHero } from "./SeoVisualBlocks";

export function SeoArticleDetail({ route }: { route: DetailRoute }) {
  const { lang } = useI18n();
  const copy = detailCopy[lang];
  const article = articleContent[route.slug]?.[lang] ?? articleContent[route.slug]?.en;

  if (!article) return null;

  return (
    <>
      <SeoPageHero
        eyebrow={`${article.kicker} · ${formatArticleDate(route.date, lang)} · ${article.readTime}`}
        title={localize(route.h1, lang)}
        summary={article.intro}
        cta={
          <div className="flex flex-wrap items-center gap-8">
            <SeoCtaButton
              href={localizedPath("/audit", lang)}
              label={localize(route.cta, lang)}
              onClick={() => trackEvent("click_cta", { page: route.slug })}
            />
            <SeoCtaButton href={localizedPath("/blog", lang)} label={copy.backToBlog} variant="ghost" />
          </div>
        }
        eyebrowRule={false}
        titleMarker={false}
      />

      <div className="mt-20 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="py-2">
            <p
              className="uppercase"
              style={{ fontSize: "0.58rem", letterSpacing: "0.26em", fontWeight: 850, color: "var(--fg-4)" }}
            >
              {copy.articleCore}
            </p>
            <p
              className="mt-6 max-w-md"
              style={{
                fontSize: "clamp(1.35rem, 2.45vw, 2.3rem)",
                lineHeight: 1.08,
                fontWeight: 900,
                color: "var(--fg-1)",
              }}
            >
              {article.thesis}
            </p>
          </div>

          <div className="mt-12">
            <p
              className="uppercase"
              style={{ fontSize: "0.58rem", letterSpacing: "0.26em", fontWeight: 850, color: "var(--fg-4)" }}
            >
              {copy.articleCheck}
            </p>
            <ul className="mt-6 grid gap-4">
              {article.checklist.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-4"
                  style={{ color: "var(--fg-4)", fontSize: "0.86rem", lineHeight: 1.55, fontWeight: 650 }}
                >
                  <span
                    className="uppercase"
                    style={{ fontSize: "0.54rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-5)" }}
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="mb-14 py-2">
            <p
              className="max-w-2xl"
              style={{
                fontSize: "clamp(0.98rem, 1.28vw, 1.18rem)",
                lineHeight: 1.72,
                fontWeight: 600,
                color: "var(--fg-4)",
              }}
            >
              {article.lead}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 space-y-20 md:mt-32 md:space-y-28">
        {article.sections.map((section, index) => (
          <section key={section.title} className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="relative min-h-36">
              <div className="flex items-start gap-6 lg:block">
                <p
                  className="hidden uppercase lg:block"
                  style={{ fontSize: "0.56rem", letterSpacing: "0.28em", fontWeight: 850, color: "var(--fg-5)" }}
                >
                  {copy.articleMove}
                </p>
                <span
                  className="block shrink-0 lg:mt-6"
                  style={{
                    fontSize: "clamp(3.8rem, 9vw, 8.2rem)",
                    lineHeight: 0.82,
                    fontWeight: 900,
                    color: "var(--fg-5)",
                  }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <p
                  className="max-w-xs lg:mt-8"
                  style={{ fontSize: "0.9rem", lineHeight: 1.62, fontWeight: 700, color: "var(--fg-4)" }}
                >
                  {article.checklist[index % article.checklist.length]}
                </p>
              </div>
            </div>
            <div>
              <h2
                className="max-w-3xl"
                style={{
                  fontSize: "clamp(1.85rem, 3.25vw, 3.15rem)",
                  lineHeight: 1.04,
                  fontWeight: 900,
                  color: "var(--fg-1)",
                }}
              >
                {section.title}
              </h2>
              <div className="mt-8 max-w-2xl space-y-5">
                {section.body.map((paragraph) => (
                  <p key={paragraph} style={{ fontSize: "1rem", lineHeight: 1.82, color: "var(--fg-3)" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <blockquote className="mt-20 border-t py-10 md:mt-28 md:py-14" style={{ borderColor: "var(--surface-border)" }}>
        <p
          className="max-w-4xl"
          style={{ fontSize: "clamp(1.75rem, 4vw, 4.1rem)", lineHeight: 1.03, fontWeight: 900, color: "var(--fg-1)" }}
        >
          {article.pullquote}
        </p>
      </blockquote>

      <SeoCtaBlock
        title={copy.articleCtaTitle}
        text={copy.articleCtaText}
        href={localizedPath("/audit", lang)}
        label={localize(route.cta, lang)}
        onClick={() => trackEvent("click_cta", { page: route.slug, location: "bottom_cta" })}
      />
    </>
  );
}
