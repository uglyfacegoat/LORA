import { trackEvent } from "../analytics";
import logoSmallDark from "../../assets/logo-small-dark.svg";
import logoSmallLight from "../../assets/logo-small-light.svg";
import { LANGS, useI18n } from "../i18n";
import { getPathWithoutLang, localizedPath } from "../seo/site";
import { useTheme } from "../theme";
import { DesktopNavigation, MobileNavigation } from "./SiteNavigation";

type AppNavigationProps = {
  loaded: boolean;
  mobileNavOpen: boolean;
  pathname: string;
  scrolled: boolean;
  onLanguageOpen: () => void;
  onMobileNavToggle: () => void;
  onMobileNavClose: () => void;
};

export function AppNavigation({
  loaded,
  mobileNavOpen,
  pathname,
  scrolled,
  onLanguageOpen,
  onMobileNavToggle,
  onMobileNavClose,
}: AppNavigationProps) {
  const { lang, t } = useI18n();
  const { theme, toggle } = useTheme();
  const currentLang = LANGS.find((item) => item.code === lang)!;
  const pathWithoutLang = getPathWithoutLang(pathname);
  const navLogo = theme === "dark" ? logoSmallDark : logoSmallLight;

  return (
    <>
      <MobileNavigation open={mobileNavOpen} onClose={onMobileNavClose} pathname={pathWithoutLang} />

      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 transition-all duration-700"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
          paddingTop: scrolled ? "0.85rem" : "1.5rem",
          paddingBottom: scrolled ? "0.85rem" : "1.5rem",
          borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
          opacity: loaded ? 1 : 0,
          transition: "all 0.7s ease",
        }}
      >
        <a href={localizedPath("/", lang)} className="flex items-center gap-2 sm:gap-4 min-w-0" aria-label="LORA home">
          <img src={navLogo} alt="LORA" className="w-6 h-6 object-contain" />
          <span
            className="truncate"
            style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)" }}
          >
            LORA
          </span>
          <div className="hidden md:block w-px h-4" style={{ background: "var(--surface-border)" }} />
          <span
            className="hidden md:block uppercase tracking-[0.2em]"
            style={{ fontSize: "0.5rem", fontWeight: 600, color: "var(--fg-4)" }}
          >
            {t("nav.tagline")}
          </span>
        </a>

        <DesktopNavigation pathname={pathWithoutLang} />

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            type="button"
            onClick={onMobileNavToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 lg:hidden"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--surface-border)",
              color: "var(--fg-3)",
            }}
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNavOpen}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              {mobileNavOpen ? (
                <path d="M3 3L12 12M12 3L3 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2 4H13M2 7.5H13M2 11H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <button
            onClick={onLanguageOpen}
            data-lang-trigger="true"
            className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-400"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--surface-border)",
              color: "var(--fg-3)",
            }}
            aria-label={t("nav.languageAria")}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
              <path d="M1 7H13M7 1C9 3.5 9 10.5 7 13M7 1C5 3.5 5 10.5 7 13" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", fontWeight: 700 }}>
              {currentLang.flag}
            </span>
          </button>

          <button
            onClick={toggle}
            className="relative w-9 h-9 rounded-lg transition-all duration-400 flex items-center justify-center"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--surface-border)",
              color: "var(--fg-3)",
            }}
            aria-label={t("nav.themeAria")}
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11.5 8.5C10.7 8.8 9.9 9 9 9C6.2 9 4 6.8 4 4C4 3.1 4.2 2.3 4.5 1.5C2.5 2.3 1 4.3 1 6.7C1 9.9 3.6 12.5 6.8 12.5C9.2 12.5 11.2 11 12 9C11.8 9 11.7 9 11.5 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1" />
                <path
                  d="M7 1V2M7 12V13M1 7H2M12 7H13M2.8 2.8L3.5 3.5M10.5 10.5L11.2 11.2M2.8 11.2L3.5 10.5M10.5 3.5L11.2 2.8"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <a
            href={localizedPath("/contacts", lang)}
            onClick={() => {
              trackEvent("click_cta", { location: "nav" });
            }}
            className="group px-3 sm:px-4 md:px-6 py-2.5 uppercase tracking-[0.18em] transition-all duration-500 cursor-pointer rounded-lg whitespace-nowrap text-center"
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              background: "var(--surface-strong)",
              border: "1px solid var(--surface-border)",
              color: "var(--fg-2)",
            }}
          >
            {t("nav.cta")}
          </a>
        </div>
      </nav>
    </>
  );
}
