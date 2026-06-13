import { useI18n } from "../i18n";
import { localizedPath, localize } from "../seo/site";
import type { DetailRoute } from "../seo/routes";
import { articleJsonLd, faqJsonLd, serviceJsonLd } from "../seo/structuredData";
import { detailCopy } from "../content/seoDetailContent";
import { trackEvent } from "../analytics";
import { JsonLd } from "./JsonLd";
import { SeoArticleDetail } from "./SeoArticleDetail";
import { SeoShell } from "./SeoShell";
import {
  SeoBreadcrumbs,
  SeoChapter,
  SeoCtaBlock,
  SeoCtaButton,
  SeoFaq,
  SeoIndustryLedger,
  SeoIndustryRunway,
  SeoPageHero,
  SeoServiceBlueprint,
  SeoServiceSystem,
} from "./SeoVisualBlocks";

export function SeoDetailPage({ route }: { route: DetailRoute }) {
  const { lang } = useI18n();
  const copy = detailCopy[lang];
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
              label:
                route.kind === "industry"
                  ? copy.industriesCrumb
                  : route.kind === "article"
                    ? copy.blogCrumb
                    : copy.servicesCrumb,
              path: route.kind === "industry" ? "/industries" : route.kind === "article" ? "/blog" : "/services",
            },
            { label: localize(route.h1, lang) },
          ]}
        />

        {route.kind === "article" ? <SeoArticleDetail route={route} /> : <ServiceOrIndustryDetail route={route} />}
      </article>
    </SeoShell>
  );
}

/* ------------------------------------------------------------------ */
/* Shared service/industry template — typographic chapters, no boxes.  */
/* ------------------------------------------------------------------ */

function ServiceOrIndustryDetail({ route }: { route: DetailRoute }) {
  const { lang } = useI18n();
  const copy = detailCopy[lang];
  const isIndustry = route.kind === "industry";

  return (
    <>
      <SeoPageHero
        eyebrow={`${route.eyebrow ? localize(route.eyebrow, lang) : isIndustry ? "Industry" : "Service"} · ${route.slug.toUpperCase()}`}
        title={localize(route.h1, lang)}
        summary={localize(route.summary, lang)}
        cta={
          <div className="flex flex-wrap items-center gap-8">
            <SeoCtaButton
              href={localizedPath("/audit", lang)}
              label={localize(route.cta, lang)}
              onClick={() => trackEvent(isIndustry ? "click_cta" : "service_page_cta_click", { page: route.slug })}
            />
            <SeoCtaButton
              href={localizedPath(isIndustry ? "/industries" : "/services", lang)}
              label={isIndustry ? copy.allIndustries : copy.allServices}
              variant="ghost"
            />
          </div>
        }
        eyebrowRule={false}
        titleMarker={false}
        titleMaxWidth={isIndustry ? "24ch" : undefined}
      />

      {isIndustry ? (
        <SeoIndustryLedger
          title={copy.industryLedgerTitle}
          text={copy.industryLedgerText}
          problemLabel={copy.industryProblemLabel}
          responseLabel={copy.industryResponseLabel}
          problems={route.problems.map((item) => localize(item, lang))}
          deliverables={route.deliverables.map((item) => localize(item, lang))}
        />
      ) : (
        <SeoServiceBlueprint
          title={copy.blueprintTitle}
          text={copy.blueprintText}
          items={[
            { label: copy.metaFormat, value: copy.metaService, detail: copy.blueprintFormatDetail },
            { label: copy.metaSprint, value: copy.metaSprintValue, detail: copy.blueprintSprintDetail },
            { label: copy.metaTeam, value: copy.metaTeamValue, detail: copy.blueprintTeamDetail },
            { label: copy.metaHandoff, value: copy.metaHandoffValue, detail: copy.blueprintHandoffDetail },
          ]}
        />
      )}

      {isIndustry ? (
        <>
          <SeoIndustryRunway
            title={copy.industryRunwayTitle}
            text={copy.industryRunwayText}
            processLabel={copy.rhythmLabel}
            connectionsLabel={copy.connectionsLabel}
            process={route.process.map((item) => localize(item, lang))}
            integrations={route.integrations.map((item) => localize(item, lang))}
          />
        </>
      ) : (
        <>
          <SeoServiceSystem
            title={copy.systemTitle}
            accent={copy.systemAccent}
            labels={copy.systemLayers}
            processIntro={copy.workIntro}
            deliverables={route.deliverables.map((item) => localize(item, lang))}
            process={route.process.map((item) => localize(item, lang))}
            result={[copy.specificValue, copy.crmBound, copy.structuredSeo, copy.maintainedSystem]}
          />
        </>
      )}

      <SeoChapter number={isIndustry ? "06" : "02"} label="FAQ" title={copy.faqTitle} showLabel={isIndustry}>
        <SeoFaq route={route} lang={lang} />
      </SeoChapter>

      <SeoCtaBlock
        title={copy.bottomTitle}
        text={copy.bottomText}
        href={localizedPath("/audit", lang)}
        label={localize(route.cta, lang)}
        onClick={() =>
          trackEvent(isIndustry ? "click_cta" : "service_page_cta_click", { page: route.slug, location: "bottom_cta" })
        }
      />
    </>
  );
}
