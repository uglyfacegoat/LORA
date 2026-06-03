import { trackEvent } from "../analytics";
import { useI18n } from "../i18n";
import { serviceRoutes, industryRoutes, mainRoutes } from "../seo/routes";
import { localizedPath, localize, type Lang } from "../seo/site";

type NavGroup = {
  label: string;
  path?: string;
  items?: { label: string; path: string; note?: string }[];
};

const SERVICE_SLUGS = [
  "websites",
  "landing-pages",
  "corporate-websites",
  "ecommerce",
  "ux-ui-design",
  "website-redesign",
  "seo-optimization",
  "crm-integration",
  "business-automation",
  "website-support",
];

const INDUSTRY_SLUGS = [
  "clinic",
  "restaurant",
  "beauty-salon",
  "construction-company",
  "online-school",
  "expert",
  "b2b-company",
  "service-business",
  "legal-company",
  "real-estate",
];

function mainPath(slug: string) {
  return mainRoutes.find((route) => route.slug === slug)?.path ?? "/";
}

function buildGroups(lang: Lang): NavGroup[] {
  const serviceItems = [
    { label: localize(mainRoutes.find((route) => route.slug === "services")!.h1, lang), path: "/services", note: "All services" },
    ...SERVICE_SLUGS.map((slug) => {
      const route = serviceRoutes.find((item) => item.slug === slug)!;
      return { label: localize(route.h1, lang), path: route.path };
    }),
  ];

  const industryItems = [
    { label: localize(mainRoutes.find((route) => route.slug === "industries")!.h1, lang), path: "/industries", note: "All industries" },
    ...INDUSTRY_SLUGS.map((slug) => {
      const route = industryRoutes.find((item) => item.slug === slug)!;
      return { label: localize(route.h1, lang), path: route.path };
    }),
  ];

  return [
    { label: localize(mainRoutes.find((route) => route.slug === "services")!.h1, lang), path: "/services", items: serviceItems },
    { label: localize(mainRoutes.find((route) => route.slug === "industries")!.h1, lang), path: "/industries", items: industryItems },
    {
      label: lang === "ru" ? "Ресурсы" : lang === "es" ? "Recursos" : lang === "zh" ? "资源" : "Resources",
      path: "/blog",
      items: [
        { label: localize(mainRoutes.find((route) => route.slug === "blog")!.h1, lang), path: "/blog" },
        { label: localize(mainRoutes.find((route) => route.slug === "cases")!.h1, lang), path: "/cases" },
        { label: lang === "ru" ? "Подход" : lang === "es" ? "Enfoque" : lang === "zh" ? "方法" : "Approach", path: "/#process" },
      ],
    },
    { label: localize(mainRoutes.find((route) => route.slug === "pricing")!.h1, lang), path: mainPath("pricing") },
    { label: localize(mainRoutes.find((route) => route.slug === "audit")!.h1, lang), path: mainPath("audit") },
    { label: localize(mainRoutes.find((route) => route.slug === "contacts")!.h1, lang), path: mainPath("contacts") },
  ];
}

function navHref(path: string, lang: Lang) {
  if (path.includes("#")) {
    const [base, hash] = path.split("#");
    return `${localizedPath(base || "/", lang)}#${hash}`;
  }
  return localizedPath(path, lang);
}

function isActive(pathname: string, path?: string) {
  if (!path) return false;
  const cleanPath = path.split("#")[0];
  if (cleanPath === "/") return pathname === "/";
  return pathname === cleanPath || pathname.startsWith(`${cleanPath}/`);
}

export function DesktopNavigation({ pathname }: { pathname: string }) {
  const { lang } = useI18n();
  const groups = buildGroups(lang);

  return (
    <div className="hidden items-center gap-1 lg:flex">
      {groups.map((group) => {
        const active = isActive(pathname, group.path) || group.items?.some((item) => isActive(pathname, item.path));
        if (!group.items) {
          return (
            <a
              key={group.label}
              href={navHref(group.path!, lang)}
              className="rounded-lg px-3 py-2 uppercase transition-all duration-300"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.16em",
                fontWeight: 800,
                color: active ? "var(--fg-1)" : "var(--fg-4)",
                background: active ? "var(--surface-soft)" : "transparent",
                border: active ? "1px solid var(--surface-border)" : "1px solid transparent",
              }}
            >
              {group.label}
            </a>
          );
        }

        return (
          <div key={group.label} className="group relative">
            <a
              href={navHref(group.path!, lang)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 uppercase transition-all duration-300"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.16em",
                fontWeight: 800,
                color: active ? "var(--fg-1)" : "var(--fg-4)",
                background: active ? "var(--surface-soft)" : "transparent",
                border: active ? "1px solid var(--surface-border)" : "1px solid transparent",
              }}
            >
              {group.label}
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div
              className="invisible absolute left-0 top-full z-[60] w-[min(720px,calc(100vw-3rem))] pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
            >
              <div
                className="overflow-hidden rounded-2xl p-3"
                style={{
                  background: "linear-gradient(145deg, var(--modal-bg), var(--surface-soft))",
                  border: "1px solid var(--modal-border)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  boxShadow: "0 28px 90px rgba(0,0,0,0.28), inset 0 1px 0 var(--surface-border)",
                }}
              >
                <div className="mb-2 flex items-center justify-between px-2">
                  <span className="uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}>
                    {group.label}
                  </span>
                  <span style={{ fontSize: "0.5rem", letterSpacing: "0.18em", color: "var(--fg-5)" }}>
                    {group.items.length} links
                  </span>
                </div>
                <div className="grid gap-1 md:grid-cols-2">
                  {group.items.map((item) => (
                    <a
                      key={item.path}
                      href={navHref(item.path, lang)}
                      className="group/link flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors duration-200"
                      style={{
                        background: isActive(pathname, item.path) ? "var(--surface-mid)" : "transparent",
                        color: isActive(pathname, item.path) ? "var(--fg-1)" : "var(--fg-3)",
                      }}
                    >
                      <span className="min-w-0">
                        <span className="block truncate" style={{ fontSize: "0.84rem", fontWeight: 750 }}>{item.label}</span>
                        {item.note && (
                          <span className="mt-1 block uppercase" style={{ fontSize: "0.48rem", letterSpacing: "0.18em", color: "var(--fg-5)", fontWeight: 800 }}>
                            {item.note}
                          </span>
                        )}
                      </span>
                      <svg className="shrink-0 opacity-50 transition-transform group-hover/link:translate-x-1" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MobileNavigation({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const { lang } = useI18n();
  const groups = buildGroups(lang);
  if (!open) return null;

  return (
    <div className="fixed inset-x-3 top-[76px] z-[65] max-h-[calc(100dvh-92px)] overflow-y-auto rounded-2xl p-4 lg:hidden" style={{ background: "var(--modal-bg)", border: "1px solid var(--modal-border)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }}>
      <div className="mb-4 flex items-center justify-between">
        <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}>Navigation</span>
        <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 uppercase" style={{ fontSize: "0.52rem", letterSpacing: "0.18em", color: "var(--fg-3)", border: "1px solid var(--surface-border)" }}>
          Close
        </button>
      </div>
      <div className="grid gap-3">
        {groups.map((group) => (
          <section key={group.label} className="rounded-2xl p-3" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
            <a
              href={group.path ? navHref(group.path, lang) : group.items ? navHref(group.items[0].path, lang) : localizedPath("/", lang)}
              onClick={onClose}
              className="mb-2 flex items-center justify-between rounded-xl px-2 py-2"
              style={{ color: isActive(pathname, group.path) ? "var(--fg-1)" : "var(--fg-2)" }}
            >
              <span className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 800 }}>{group.label}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {group.items && (
              <div className="grid gap-1">
                {group.items.map((item) => (
                  <a
                    key={item.path}
                    href={navHref(item.path, lang)}
                    onClick={() => {
                      trackEvent("click_cta", { location: "mobile_nav", target: item.path });
                      onClose();
                    }}
                    className="rounded-xl px-3 py-2"
                    style={{
                      color: isActive(pathname, item.path) ? "var(--fg-1)" : "var(--fg-3)",
                      background: isActive(pathname, item.path) ? "var(--surface-mid)" : "transparent",
                      fontSize: "0.86rem",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
