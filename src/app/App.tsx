import { HeroSection } from "./components/HeroSection";
import { StorySection } from "./components/StorySection";
import { Manifesto } from "./components/Manifesto";
import { PainSection } from "./components/PainSection";
import { WhyLora } from "./components/WhyLora";
import { LiveSystem } from "./components/LiveSystem";
import { ProcessSection } from "./components/ProcessSection";
import { Comparison } from "./components/Comparison";
import { CasesSection } from "./components/CasesSection";
import { CtaBreak } from "./components/CtaBreak";
import { ContactSection } from "./components/ContactSection";
import { PricingSection } from "./components/PricingSection";
import { ArticlesSection } from "./components/ArticlesSection";
import { Footer } from "./components/Footer";
import { CursorGlow } from "./components/CursorGlow";
import { Preloader } from "./components/Preloader";
import { LanguageModal } from "./components/LanguageModal";
import { NotFoundPage } from "./components/NotFoundPage";
import { SeoDetailPage } from "./components/SeoDetailPage";
import { SeoHead } from "./components/SeoHead";
import { SeoListingPage } from "./components/SeoListingPage";
import { SimplePage } from "./components/SimplePage";
import { DesktopNavigation, MobileNavigation } from "./components/SiteNavigation";
import { useEffect, useState, useCallback } from "react";
import logoSmallDark from "../assets/logo-small-dark.svg";
import logoSmallLight from "../assets/logo-small-light.svg";
import { I18nProvider, useI18n, LANGS } from "./i18n";
import { ThemeProvider, useTheme } from "./theme";
import { getLangFromPath, getPathWithoutLang, localizedPath } from "./seo/site";
import { isDetailRoute } from "./seo/structuredData";
import { resolveRoute } from "./seo/routes";
import { trackEvent } from "./analytics";

function AppInner() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const { lang, t } = useI18n();
  const { theme, toggle } = useTheme();

  const handleLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    const urlLang = getLangFromPath(pathname);
    if (urlLang) return;
    const target = localizedPath(getPathWithoutLang(pathname), lang);
    window.history.replaceState(null, "", `${target}${window.location.search}${window.location.hash}`);
    setPathname(window.location.pathname);
  }, [lang, pathname]);

  const currentLang = LANGS.find((l) => l.code === lang)!;
  const navLogo = theme === "dark" ? logoSmallDark : logoSmallLight;
  const route = resolveRoute(getPathWithoutLang(pathname));

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'Inter', sans-serif", background: "var(--app-bg)", color: "var(--fg-1)" }}>
      <style>{`
        :root, [data-theme="dark"] {
          --app-bg: #000;
          --fg-1: #fff;
          --fg-2: rgba(255,255,255,0.7);
          --fg-3: rgba(255,255,255,0.45);
          --fg-4: rgba(255,255,255,0.25);
          --fg-5: rgba(255,255,255,0.15);
          --surface-soft: rgba(255,255,255,0.02);
          --surface-mid: rgba(255,255,255,0.04);
          --surface-strong: rgba(255,255,255,0.08);
          --surface-border: rgba(255,255,255,0.06);
          --accent-soft: rgba(255,255,255,0.08);
          --accent-strong: rgba(255,255,255,0.15);
          --accent-border: rgba(255,255,255,0.2);
          --line-soft: rgba(255,255,255,0.2);
          --line-mid: rgba(255,255,255,0.12);
          --line-strong: rgba(255,255,255,0.4);
          --glow-soft: rgba(255,255,255,0.04);
          --glow-mid: rgba(255,255,255,0.08);
          --shadow-soft: rgba(255,255,255,0.1);
          --button-shadow: rgba(255,255,255,0.2);
          --icon-stroke: rgba(255,255,255,0.4);
          --icon-stroke-soft: rgba(255,255,255,0.12);
          --terminal-live: rgba(120,255,150,0.6);
          --terminal-live-glow: rgba(120,255,150,0.3);
          --modal-bg: rgba(12,12,12,0.9);
          --modal-border: rgba(255,255,255,0.08);
          --cta-bg: #fff;
          --cta-fg: #000;
          --nav-bg-scrolled: rgba(0,0,0,0.75);
          --nav-border: rgba(255,255,255,0.04);
        }
        [data-theme="light"] {
          --color-white: oklch(0.18 0 0);
          --color-black: oklch(0.97 0.005 90);
          --app-bg: #f5f3ef;
          --fg-1: #0a0a0a;
          --fg-2: rgba(10,10,10,0.7);
          --fg-3: rgba(10,10,10,0.52);
          --fg-4: rgba(10,10,10,0.34);
          --fg-5: rgba(10,10,10,0.2);
          --surface-soft: rgba(10,10,10,0.008);
          --surface-mid: rgba(10,10,10,0.018);
          --surface-strong: rgba(10,10,10,0.04);
          --surface-border: rgba(10,10,10,0.12);
          --accent-soft: rgba(10,10,10,0.02);
          --accent-strong: rgba(10,10,10,0.07);
          --accent-border: rgba(10,10,10,0.24);
          --line-soft: rgba(10,10,10,0.24);
          --line-mid: rgba(10,10,10,0.16);
          --line-strong: rgba(10,10,10,0.38);
          --glow-soft: rgba(10,10,10,0.022);
          --glow-mid: rgba(10,10,10,0.05);
          --shadow-soft: rgba(10,10,10,0.06);
          --button-shadow: rgba(10,10,10,0.14);
          --icon-stroke: rgba(10,10,10,0.5);
          --icon-stroke-soft: rgba(10,10,10,0.22);
          --terminal-live: rgba(18,122,66,0.7);
          --terminal-live-glow: rgba(18,122,66,0.24);
          --modal-bg: rgba(245,243,239,0.94);
          --modal-border: rgba(10,10,10,0.08);
          --cta-bg: #0a0a0a;
          --cta-fg: #f5f3ef;
          --nav-bg-scrolled: rgba(245,243,239,0.8);
          --nav-border: rgba(10,10,10,0.06);
        }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        html, body {
          overflow-x: clip;
          background: var(--app-bg);
          scrollbar-width: thin;
          scrollbar-color: var(--line-strong) var(--surface-soft);
        }
        html { scroll-behavior: auto; }
        *::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        *::-webkit-scrollbar-track {
          background: var(--surface-soft);
        }
        *::-webkit-scrollbar-thumb {
          background: var(--line-strong);
          border-radius: 999px;
          border: 2px solid var(--app-bg);
        }
        *::-webkit-scrollbar-thumb:hover {
          background: var(--fg-3);
        }
        ::selection { background: rgba(125,125,125,0.25); color: var(--fg-1); }
        @media (max-width: 480px) {
          html {
            font-size: 15px;
          }
        }
      `}</style>

      {!loaded && <Preloader onComplete={handleLoaded} />}

      <CursorGlow />

      <LanguageModal open={langOpen} onClose={() => setLangOpen(false)} />
      <MobileNavigation open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} pathname={getPathWithoutLang(pathname)} />

      {/* Nav */}
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
          <span className="truncate" style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>LORA</span>
          <div className="hidden md:block w-px h-4" style={{ background: "var(--surface-border)" }} />
          <span className="hidden md:block uppercase tracking-[0.2em]" style={{ fontSize: "0.5rem", fontWeight: 600, color: "var(--fg-4)" }}>
            {t("nav.tagline")}
          </span>
        </a>

        <DesktopNavigation pathname={getPathWithoutLang(pathname)} />

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 lg:hidden"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)", color: "var(--fg-3)" }}
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

          {/* Language button */}
          <button
            onClick={() => setLangOpen(true)}
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
            <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", fontWeight: 700 }}>{currentLang.flag}</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="relative w-9 h-9 rounded-lg transition-all duration-400 flex items-center justify-center"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)", color: "var(--fg-3)" }}
            aria-label={t("nav.themeAria")}
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.5 8.5C10.7 8.8 9.9 9 9 9C6.2 9 4 6.8 4 4C4 3.1 4.2 2.3 4.5 1.5C2.5 2.3 1 4.3 1 6.7C1 9.9 3.6 12.5 6.8 12.5C9.2 12.5 11.2 11 12 9C11.8 9 11.7 9 11.5 8.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1" />
                <path d="M7 1V2M7 12V13M1 7H2M12 7H13M2.8 2.8L3.5 3.5M10.5 10.5L11.2 11.2M2.8 11.2L3.5 10.5M10.5 3.5L11.2 2.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <a
            href={localizedPath("/contacts", lang)}
            onClick={() => {
              trackEvent("click_cta", { location: "nav" });
            }}
            className="group px-3 sm:px-4 md:px-6 py-2.5 uppercase tracking-[0.18em] transition-all duration-500 cursor-pointer rounded-lg whitespace-nowrap text-center"
            style={{ fontSize: "0.6rem", fontWeight: 600, background: "var(--surface-strong)", border: "1px solid var(--surface-border)", color: "var(--fg-2)" }}
          >
            {t("nav.cta")}
          </a>
        </div>
      </nav>

      <div className="relative z-10" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
        <SeoHead route={route} />
        {route.kind === "home" ? (
          <>
            <HeroSection />

            {/* Divider */}
            <div className="max-w-6xl mx-auto px-6 md:px-20">
              <div className="relative h-px">
                <div className="absolute inset-0" style={{ background: "var(--surface-border)" }} />
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-8" style={{ background: "radial-gradient(ellipse, var(--surface-mid), transparent)" }} />
              </div>
            </div>

            <Manifesto />
            <PainSection />
            <WhyLora />
            <LiveSystem />
            <div id="process"><ProcessSection /></div>
            <div id="results"><Comparison /></div>
            {/* <div id="results"><CasesSection /></div> */}
            {/* <ArticlesSection /> */}
            <PricingSection />
            {/* <StorySection /> */}
            <CtaBreak />
            <ContactSection />
          </>
        ) : route.kind === "listing" ? (
          <SeoListingPage route={route} />
        ) : isDetailRoute(route) ? (
          <SeoDetailPage route={route} />
        ) : route.kind === "not-found" ? (
          <NotFoundPage route={route} />
        ) : (
          <SimplePage route={route} />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppInner />
      </I18nProvider>
    </ThemeProvider>
  );
}
