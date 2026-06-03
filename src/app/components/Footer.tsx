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

  return (
    <footer className="relative mt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-20 relative">
        <div className="h-px" style={{ background: "var(--surface-border)" }} />

        <div className="py-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={smallLogo} alt="LORA" className="w-8 h-8 object-contain" />
                <p style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>LORA</p>
                <div className="hidden sm:flex h-8 items-center gap-3 pl-1">
                  <div className="h-full w-px" style={{ background: "var(--surface-border)" }} />
                  <span className="uppercase tracking-[0.2em]" style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--fg-4)", lineHeight: 1 }}>
                    Since 2026
                  </span>
                </div>
              </div>
              <p className="uppercase tracking-[0.2em] flex items-center gap-2" style={{ fontSize: "0.6rem", color: "var(--fg-4)" }}>
                <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6 }}>
                  <path d="M8 0C8 0 8.8 5.2 8 8C7.2 5.2 8 0 8 0ZM16 8C16 8 10.8 8.8 8 8C10.8 7.2 16 8 16 8ZM8 16C8 16 7.2 10.8 8 8C8.8 10.8 8 16 8 16ZM0 8C0 8 5.2 7.2 8 8C5.2 8.8 0 8 0 8Z" />
                </svg>
                {t("footer.tagline")}
              </p>
              <p className="mt-4 max-w-xs" style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--fg-4)" }}>
                {t("footer.desc")}
              </p>
            </div>

            <div className="grid w-full gap-10 sm:grid-cols-2 lg:w-auto lg:grid-cols-4">
              <FooterGroup
                title={localize(mainRoute("services").h1, lang)}
                links={footerServiceSlugs.map((slug) => {
                  const route = serviceRoutes.find((item) => item.slug === slug)!;
                  return { label: localize(route.h1, lang), href: localizedPath(route.path, lang) };
                })}
              />
              <FooterGroup
                title={localize(mainRoute("industries").h1, lang)}
                links={footerIndustrySlugs.map((slug) => {
                  const route = industryRoutes.find((item) => item.slug === slug)!;
                  return { label: localize(route.h1, lang), href: localizedPath(route.path, lang) };
                })}
              />
              <FooterGroup
                title={lang === "ru" ? "Компания" : lang === "es" ? "Compania" : lang === "zh" ? "公司" : "Company"}
                links={[
                  { label: localize(mainRoute("cases").h1, lang), href: localizedPath("/cases", lang) },
                  { label: localize(mainRoute("pricing").h1, lang), href: localizedPath("/pricing", lang) },
                  { label: localize(mainRoute("audit").h1, lang), href: localizedPath("/audit", lang) },
                  { label: localize(mainRoute("contacts").h1, lang), href: localizedPath("/contacts", lang) },
                  { label: localize(mainRoute("blog").h1, lang), href: localizedPath("/blog", lang) },
                ]}
              />
              <div>
                <p className="uppercase tracking-[0.25em] mb-4" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-4)" }}>
                  {lang === "ru" ? "Документы" : lang === "es" ? "Documentos" : lang === "zh" ? "文档" : "Documents"}
                </p>
                <div className="flex flex-col gap-2">
                  <a href={localizedPath("/privacy", lang)} className="transition-colors duration-400" style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>{localize(mainRoute("privacy").h1, lang)}</a>
                  <a href={localizedPath("/cookies", lang)} className="transition-colors duration-400" style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>{localize(mainRoute("cookies").h1, lang)}</a>
                  <a href="mailto:support@loragroup.space" onClick={() => trackEvent("click_email", { location: "footer" })} className="transition-colors duration-400 pt-2" style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>
                    support@loragroup.space
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--surface-border)" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-5)" }}>
              &copy; 2026 LORA. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-4">
              <a href={localizedPath("/privacy", lang)} className="transition-colors" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-5)" }}>{t("footer.privacy")}</a>
              <span style={{ color: "var(--fg-5)" }}>&middot;</span>
              <a href={localizedPath("/cookies", lang)} className="transition-colors" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-5)" }}>{t("footer.terms")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="uppercase tracking-[0.25em] mb-4" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-4)" }}>{title}</p>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors duration-400" style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
