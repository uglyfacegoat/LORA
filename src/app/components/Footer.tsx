import logoSmallDark from "../../assets/logo-small-dark.svg";
import logoSmallLight from "../../assets/logo-small-light.svg";
import { useTheme } from "../theme";
import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";
import { localizedPath, localize } from "../seo/site";
import { industryRoutes, mainRoutes, serviceRoutes } from "../seo/routes";

const footerServiceSlugs = ["websites", "landing-pages", "ecommerce", "crm-integration", "seo-optimization"];
const footerIndustrySlugs = ["clinic", "restaurant", "construction-company", "online-school", "real-estate"];

function mainRoute(slug: string) {
  return mainRoutes.find((route) => route.slug === slug)!;
}

export function Footer() {
  const { theme } = useTheme();
  const { lang, t } = useI18n();
  const smallLogo = theme === "dark" ? logoSmallDark : logoSmallLight;
  const documentsTitle =
    lang === "ru" ? "Документы" : lang === "es" ? "Documentos" : lang === "zh" ? "文档" : "Documents";
  const companyTitle = lang === "ru" ? "Компания" : lang === "es" ? "Compania" : lang === "zh" ? "公司" : "Company";
  const emailLabel = lang === "ru" ? "Написать" : lang === "es" ? "Escribir" : lang === "zh" ? "联系" : "Email";
  const cookiesLabel = lang === "ru" ? "COOKIE" : lang === "es" ? "COOKIES" : lang === "zh" ? "COOKIE" : "COOKIES";

  const services = footerServiceSlugs.map((slug) => {
    const route = serviceRoutes.find((item) => item.slug === slug)!;
    return { label: localize(route.h1, lang), href: localizedPath(route.path, lang) };
  });

  const industries = footerIndustrySlugs.map((slug) => {
    const route = industryRoutes.find((item) => item.slug === slug)!;
    return { label: localize(route.h1, lang), href: localizedPath(route.path, lang) };
  });

  const company = [
    { label: localize(mainRoute("cases").h1, lang), href: localizedPath("/cases", lang) },
    { label: localize(mainRoute("pricing").h1, lang), href: localizedPath("/pricing", lang) },
    { label: localize(mainRoute("audit").h1, lang), href: localizedPath("/audit", lang) },
    { label: localize(mainRoute("contacts").h1, lang), href: localizedPath("/contacts", lang) },
    { label: localize(mainRoute("blog").h1, lang), href: localizedPath("/blog", lang) },
  ];

  const documents = [
    { label: localize(mainRoute("privacy").h1, lang), href: localizedPath("/privacy", lang) },
    { label: localize(mainRoute("cookies").h1, lang), href: localizedPath("/cookies", lang) },
    { label: localize(mainRoute("terms").h1, lang), href: localizedPath("/terms", lang) },
  ];

  return (
    <footer className="relative mt-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="border-t py-10 md:py-12" style={{ borderColor: "var(--surface-border)" }}>
          <div
            className="grid gap-6 border-b pb-8 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.36fr)] md:items-end"
            style={{ borderColor: "var(--surface-border)" }}
          >
            <div className="min-w-0">
              <a href={localizedPath("/", lang)} className="inline-flex items-center gap-3" aria-label="LORA home">
                <img src={smallLogo} alt="LORA" className="h-7 w-7 object-contain" />
                <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--fg-1)", lineHeight: 1 }}>LORA</span>
                <span className="hidden h-6 w-px sm:block" style={{ background: "var(--surface-border)" }} />
                <span
                  className="hidden uppercase sm:inline"
                  style={{ fontSize: "0.5rem", letterSpacing: "0.18em", fontWeight: 800, color: "var(--fg-5)" }}
                >
                  Since 2026
                </span>
              </a>
              <p
                className="mt-5 max-w-[30rem]"
                style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "var(--fg-3)", fontWeight: 650 }}
              >
                {t("footer.desc")}
              </p>
            </div>

            <div className="md:text-right">
              <p
                className="uppercase"
                style={{ fontSize: "0.52rem", letterSpacing: "0.18em", fontWeight: 850, color: "var(--fg-5)" }}
              >
                {t("footer.tagline")}
              </p>
              <a
                href="mailto:support@loragroup.space"
                onClick={() => trackEvent("click_email", { location: "footer_top" })}
                className="mt-3 inline-flex transition-opacity hover:opacity-75"
                style={{ color: "var(--fg-1)", fontSize: "0.82rem", fontWeight: 800 }}
              >
                support@loragroup.space
              </a>
            </div>
          </div>

          <div className="grid gap-8 py-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
            <div className="grid gap-7 sm:grid-cols-2">
              <FooterGroup title={localize(mainRoute("services").h1, lang)} links={services} />
              <FooterGroup title={localize(mainRoute("industries").h1, lang)} links={industries} />
            </div>

            <div
              className="grid gap-7 border-t pt-7 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
              style={{ borderColor: "var(--surface-border)" }}
            >
              <FooterGroup title={companyTitle} links={company} compact />
              <FooterGroup title={documentsTitle} links={documents} compact />
            </div>
          </div>

          <div
            className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between"
            style={{ borderColor: "var(--surface-border)" }}
          >
            <p
              className="uppercase"
              style={{ fontSize: "0.56rem", letterSpacing: "0.14em", color: "var(--fg-5)", fontWeight: 750 }}
            >
              &copy; 2026 LORA. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 uppercase">
              <a
                href={localizedPath("/privacy", lang)}
                className="transition-opacity hover:opacity-80"
                style={bottomLinkStyle}
              >
                {t("footer.privacy")}
              </a>
              <span style={{ color: "var(--fg-5)" }}>·</span>
              <a
                href={localizedPath("/cookies", lang)}
                className="transition-opacity hover:opacity-80"
                style={bottomLinkStyle}
              >
                {cookiesLabel}
              </a>
              <span style={{ color: "var(--fg-5)" }}>·</span>
              <a
                href={localizedPath("/terms", lang)}
                className="transition-opacity hover:opacity-80"
                style={bottomLinkStyle}
              >
                {t("footer.terms")}
              </a>
              <span className="hidden sm:inline" style={{ color: "var(--fg-5)" }}>
                ·
              </span>
              <a
                href="mailto:support@loragroup.space"
                onClick={() => trackEvent("click_email", { location: "footer_bottom" })}
                className="transition-opacity hover:opacity-80"
                style={bottomLinkStyle}
              >
                {emailLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
  compact = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  compact?: boolean;
}) {
  return (
    <section className="min-w-0">
      <p
        className="uppercase"
        style={{ fontSize: "0.54rem", letterSpacing: "0.2em", fontWeight: 850, color: "var(--fg-4)" }}
      >
        {title}
      </p>
      <div className={compact ? "mt-5 flex flex-col gap-2.5" : "mt-5 flex flex-col gap-3"}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--fg-2)" }}
          >
            <span
              style={{ fontSize: compact ? "0.84rem" : "0.92rem", lineHeight: 1.35, fontWeight: compact ? 700 : 740 }}
            >
              {link.label}
            </span>
            <span
              className="opacity-0 transition-opacity group-hover:opacity-60"
              aria-hidden="true"
              style={{ color: "var(--fg-4)" }}
            >
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

const bottomLinkStyle = {
  fontSize: "0.56rem",
  letterSpacing: "0.14em",
  color: "var(--fg-4)",
  fontWeight: 800,
};
