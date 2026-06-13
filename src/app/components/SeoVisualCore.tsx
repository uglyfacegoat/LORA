import type { ReactNode } from "react";
import { localizedPath, type Lang } from "../seo/site";

export function SeoOrbitBackground({ variant = "default" }: { variant?: "default" | "dense" | "soft" | "ambient" }) {
  // No orbits, no rules. Only ambient radial glow — same vocabulary as the landing.
  const intensity = variant === "dense" ? 0.55 : variant === "soft" ? 0.25 : variant === "ambient" ? 0.4 : 0.35;
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-[8rem] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--fg-1) ${intensity * 6}%, transparent), transparent 62%)`,
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute right-[-22rem] top-[42rem] h-[38rem] w-[38rem] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--surface-mid), transparent 65%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

// ---------- Tech labels ----------

export function SeoTechLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="uppercase"
      style={{ fontSize: "0.55rem", letterSpacing: "0.28em", fontWeight: 700, color: "var(--fg-4)" }}
    >
      {children}
    </span>
  );
}

export function SeoEyebrowRule({
  children,
  align = "left",
  rule = true,
}: {
  children: ReactNode;
  align?: "left" | "center";
  rule?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 uppercase ${align === "center" ? "justify-center" : ""}`}
      style={{ color: "var(--fg-4)" }}
    >
      {rule && (
        <span
          aria-hidden="true"
          className="inline-block"
          style={{
            width: "2.4rem",
            height: "1px",
            background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--fg-1) 35%, transparent))",
          }}
        />
      )}
      <span style={{ fontSize: "0.55rem", letterSpacing: "0.32em", fontWeight: 700 }}>{children}</span>
      {align === "center" && rule && (
        <span
          aria-hidden="true"
          className="inline-block"
          style={{
            width: "2.4rem",
            height: "1px",
            background: "linear-gradient(to left, transparent, color-mix(in srgb, var(--fg-1) 35%, transparent))",
          }}
        />
      )}
    </div>
  );
}

// ---------- Breadcrumbs (kept lean) ----------

export function SeoBreadcrumbs({ lang, items }: { lang: Lang; items: { label: string; path?: string }[] }) {
  return (
    <nav
      className="mb-12 flex flex-wrap items-center gap-2 uppercase"
      aria-label="Breadcrumbs"
      style={{ color: "var(--fg-4)", fontSize: "0.56rem", letterSpacing: "0.24em", fontWeight: 700 }}
    >
      <a href={localizedPath("/", lang)} style={{ color: "var(--fg-3)" }}>
        LORA
      </a>
      {items.map((item) => (
        <span key={`${item.label}-${item.path ?? "current"}`} className="flex items-center gap-2">
          <span style={{ color: "var(--fg-5)" }}>·</span>
          {item.path ? (
            <a href={localizedPath(item.path, lang)} style={{ color: "var(--fg-3)" }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: "var(--fg-2)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ---------- Hero ----------

export function SeoPageHero({
  eyebrow,
  title,
  summary,
  cta,
  aside,
  eyebrowRule = true,
  titleMarker = true,
  titleMaxWidth = "14ch",
}: {
  eyebrow: string;
  title: string;
  summary: string;
  cta?: ReactNode;
  aside?: ReactNode;
  eyebrowRule?: boolean;
  titleMarker?: boolean;
  titleMaxWidth?: string;
}) {
  return (
    <section className="relative pt-4">
      <SeoEyebrowRule rule={eyebrowRule}>{eyebrow}</SeoEyebrowRule>
      <h1
        className="relative mt-10 max-w-[14ch]"
        style={{
          maxWidth: titleMaxWidth,
          fontSize: "clamp(2.75rem, 5.4vw, 4.8rem)",
          lineHeight: 1.18,
          fontWeight: 900,
          letterSpacing: "0",
          color: "var(--fg-1)",
          textShadow: "0 0 80px var(--surface-strong)",
        }}
      >
        {titleMarker && (
          <span
            aria-hidden="true"
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 md:block"
            style={{
              width: "2px",
              height: "0.5em",
              background:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--fg-1) 60%, transparent), transparent)",
            }}
          />
        )}
        {title}
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <p
          className="max-w-xl"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65, color: "var(--fg-3)" }}
        >
          {summary}
        </p>
        {aside && <div className="lg:pl-10">{aside}</div>}
      </div>
      {cta && <div className="mt-12">{cta}</div>}
    </section>
  );
}

// ---------- Editorial section header ----------

export function SeoChapter({
  number: _number,
  label,
  title,
  children,
  align = "left",
  showLabel = true,
}: {
  number?: string;
  label: string;
  title: string;
  children: ReactNode;
  align?: "left" | "split";
  showLabel?: boolean;
}) {
  if (align === "split") {
    return (
      <section className="relative mt-32 md:mt-44">
        <div
          aria-hidden="true"
          className="mb-14 h-px"
          style={{
            background: "linear-gradient(to right, color-mix(in srgb, var(--fg-1) 12%, transparent), transparent 70%)",
          }}
        />
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <div className="md:sticky md:top-32 self-start">
            {showLabel && <SeoTechLabel>{label}</SeoTechLabel>}
            <h2
              className={`${showLabel ? "mt-5" : ""} max-w-md`}
              style={{
                fontSize: "clamp(1.7rem, 2.6vw, 2.4rem)",
                lineHeight: 1.05,
                fontWeight: 850,
                letterSpacing: "-0.035em",
                color: "var(--fg-1)",
              }}
            >
              {title}
            </h2>
          </div>
          <div>{children}</div>
        </div>
      </section>
    );
  }
  return (
    <section className={`relative ${showLabel ? "mt-28 md:mt-36" : "mt-24 md:mt-32"}`}>
      <div
        aria-hidden="true"
        className="mb-12 h-px"
        style={{
          background: "linear-gradient(to right, color-mix(in srgb, var(--fg-1) 12%, transparent), transparent 70%)",
        }}
      />
      {showLabel && <SeoTechLabel>{label}</SeoTechLabel>}
      <h2
        className={`${showLabel ? "mt-6" : ""} max-w-3xl`}
        style={{
          fontSize: showLabel ? "clamp(2rem, 4.4vw, 3.6rem)" : "clamp(1.8rem, 4vw, 3rem)",
          lineHeight: showLabel ? 1 : 1.1,
          fontWeight: showLabel ? 900 : 700,
          letterSpacing: showLabel ? "-0.045em" : "-0.03em",
          color: "var(--fg-1)",
        }}
      >
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
