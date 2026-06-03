import type { ReactNode } from "react";
import { localizedPath, localize, type Lang } from "../seo/site";
import type { DetailRoute, SeoRoute } from "../seo/routes";

export function SeoOrbitBackground({ variant = "default" }: { variant?: "default" | "dense" }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-24 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full"
        style={{
          border: "1px solid var(--surface-border)",
          opacity: variant === "dense" ? 0.6 : 0.38,
        }}
      />
      <div
        className="absolute right-[-14rem] top-12 h-[44rem] w-[44rem] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--glow-mid), transparent 62%)",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute left-[-18rem] top-[34rem] h-[42rem] w-[42rem] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--surface-mid), transparent 66%)",
        }}
      />
      <div className="absolute left-0 right-0 top-[28rem] h-px" style={{ background: "var(--surface-border)" }} />
    </div>
  );
}

export function SeoBreadcrumbs({
  lang,
  items,
}: {
  lang: Lang;
  items: { label: string; path?: string }[];
}) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 uppercase" aria-label="Breadcrumbs" style={{ color: "var(--fg-4)", fontSize: "0.58rem", letterSpacing: "0.18em", fontWeight: 700 }}>
      <a href={localizedPath("/", lang)} style={{ color: "var(--fg-3)" }}>LORA</a>
      {items.map((item) => (
        <span key={`${item.label}-${item.path ?? "current"}`} className="flex items-center gap-2">
          <span style={{ color: "var(--fg-5)" }}>/</span>
          {item.path ? (
            <a href={localizedPath(item.path, lang)} style={{ color: "var(--fg-3)" }}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SeoPageHero({
  eyebrow,
  title,
  summary,
  cta,
  aside,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  cta?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
        <div>
          <div className="mb-5 flex items-center gap-4 uppercase" style={{ color: "var(--fg-3)" }}>
            <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.3em", fontWeight: 700 }}>{eyebrow}</span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2.65rem, 6vw, 5.85rem)",
              lineHeight: 0.96,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              color: "var(--fg-1)",
            }}
          >
            {title}
          </h1>
          <p className="mt-7 max-w-2xl" style={{ fontSize: "1rem", lineHeight: 1.82, color: "var(--fg-3)" }}>
            {summary}
          </p>
          {cta && <div className="mt-9">{cta}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
  );
}

export function SeoHeroPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 md:p-8" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full" style={{ background: "radial-gradient(circle, var(--glow-soft), transparent 64%)" }} />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--line-soft), transparent)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

export function SeoSection({
  label,
  title,
  children,
  className = "",
}: {
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-24 ${className}`}>
      <div className="mb-7 flex items-center gap-4">
        <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
        <span className="uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.26em", fontWeight: 800, color: "var(--fg-4)" }}>
          {label}
        </span>
      </div>
      <h2 className="mb-8 max-w-3xl" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.35rem)", lineHeight: 1.04, fontWeight: 850, letterSpacing: "-0.035em", color: "var(--fg-1)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SeoCard({
  children,
  className = "",
  index,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${className}`}
      style={{
        background: "var(--surface-soft)",
        border: "1px solid var(--surface-border)",
        boxShadow: "0 30px 90px -70px var(--fg-1)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--line-soft), transparent)" }} />
      {typeof index === "number" && (
        <span className="mb-8 block uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.22em", fontWeight: 800, color: "var(--fg-5)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      {children}
    </div>
  );
}

export function SeoFeatureList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item} className="flex gap-4 rounded-xl p-4" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: index % 2 === 0 ? "var(--fg-2)" : "var(--fg-4)" }} />
          <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "var(--fg-3)" }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

export function SeoProcessTimeline({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <SeoCard key={item} index={index}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "var(--fg-3)" }}>{item}</p>
        </SeoCard>
      ))}
    </div>
  );
}

export function SeoFaq({ route, lang }: { route: DetailRoute; lang: Lang }) {
  return (
    <div className="grid gap-3">
      {route.faq.map((item, index) => (
        <details key={localize(item.question, lang)} className="group rounded-2xl p-5" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }} open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--fg-1)" }}>{localize(item.question, lang)}</span>
            <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: "var(--fg-4)", fontSize: "1.4rem", lineHeight: 1 }}>+</span>
          </summary>
          <p className="mt-3" style={{ fontSize: "0.92rem", lineHeight: 1.72, color: "var(--fg-3)" }}>{localize(item.answer, lang)}</p>
        </details>
      ))}
    </div>
  );
}

export function RelatedLinks({ routes, lang }: { routes: SeoRoute[]; lang: Lang }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {routes.map((item) => (
        <a
          key={item.path}
          href={localizedPath(item.path, lang)}
          className="group flex items-center justify-between gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
          style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)", color: "var(--fg-2)" }}
        >
          <span style={{ fontWeight: 800 }}>{localize(item.h1, lang)}</span>
          <svg className="shrink-0 transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ))}
    </div>
  );
}

export function SeoCtaBlock({
  title,
  text,
  href,
  label,
  onClick,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <section className="relative mt-24 overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12 md:py-16" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, var(--glow-mid), transparent 62%)" }} />
      <div className="relative">
        <h2 style={{ fontSize: "clamp(2rem, 4.2vw, 4rem)", lineHeight: 1.04, fontWeight: 850, letterSpacing: "-0.035em", color: "var(--fg-1)" }}>
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl" style={{ color: "var(--fg-3)", lineHeight: 1.75 }}>{text}</p>
        <a
          href={href}
          onClick={onClick}
          className="mt-8 inline-flex rounded-xl px-7 py-4 uppercase transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--cta-bg)", color: "var(--cta-fg)", fontSize: "0.62rem", letterSpacing: "0.22em", fontWeight: 800 }}
        >
          {label}
        </a>
      </div>
    </section>
  );
}
