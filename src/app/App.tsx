import { Footer } from "./components/Footer";
import { CursorGlow } from "./components/CursorGlow";
import { Preloader } from "./components/Preloader";
import { LanguageModal } from "./components/LanguageModal";
import { AppNavigation } from "./components/AppNavigation";
import { AppPageRenderer } from "./components/AppPageRenderer";
import { useCallback, useEffect, useState } from "react";
import { I18nProvider, useI18n } from "./i18n";
import { ThemeProvider } from "./theme";
import { getLangFromPath, getPathWithoutLang, localizedPath } from "./seo/site";
import { resolveRoute } from "./seo/routes";
import { appThemeCss } from "./appThemeCss";
import { isBrowser } from "./runtime/browser";
import { useBrowserPathname, useInternalLinkNavigation } from "./runtime/navigation";
import { hasPrerenderedRoot, markPreloaderComplete, shouldShowPreloader, touchLastActive } from "./runtime/preloader";

function AppInner({ initialPath }: { initialPath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(() => hasPrerenderedRoot() || !shouldShowPreloader());
  const [langOpen, setLangOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pathname, setPathname] = useState(() => initialPath ?? (isBrowser() ? window.location.pathname : "/en/"));
  const { lang } = useI18n();

  const handleLoaded = useCallback(() => {
    markPreloaderComplete();
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (shouldShowPreloader()) {
      setLoaded(false);
      return;
    }
    markPreloaderComplete();
  }, []);

  useEffect(() => {
    let lastTouch = 0;
    const touch = () => {
      const now = Date.now();
      if (now - lastTouch < 5000) return;
      lastTouch = now;
      touchLastActive();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (shouldShowPreloader()) {
          setLoaded(false);
          return;
        }
        touch();
      } else {
        touchLastActive();
      }
    };

    touch();
    window.addEventListener("pointerdown", touch, { passive: true });
    window.addEventListener("keydown", touch);
    window.addEventListener("scroll", touch, { passive: true });
    window.addEventListener("pagehide", touchLastActive);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pointerdown", touch);
      window.removeEventListener("keydown", touch);
      window.removeEventListener("scroll", touch);
      window.removeEventListener("pagehide", touchLastActive);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useBrowserPathname(setPathname);
  useInternalLinkNavigation();

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

  const route = resolveRoute(getPathWithoutLang(pathname));

  return (
    <div
      className="min-h-screen relative"
      style={{ fontFamily: "'Inter', sans-serif", background: "var(--app-bg)", color: "var(--fg-1)" }}
    >
      <style>{appThemeCss}</style>

      {!loaded && <Preloader onComplete={handleLoaded} />}

      <CursorGlow />

      <LanguageModal open={langOpen} onClose={() => setLangOpen(false)} />
      <AppNavigation
        loaded={loaded}
        mobileNavOpen={mobileNavOpen}
        pathname={pathname}
        scrolled={scrolled}
        onLanguageOpen={() => setLangOpen(true)}
        onMobileNavToggle={() => setMobileNavOpen((open) => !open)}
        onMobileNavClose={() => setMobileNavOpen(false)}
      />

      <div className="relative z-10" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
        <AppPageRenderer route={route} />
        <Footer />
      </div>
    </div>
  );
}

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <ThemeProvider>
      <I18nProvider initialPath={initialPath}>
        <AppInner initialPath={initialPath} />
      </I18nProvider>
    </ThemeProvider>
  );
}
