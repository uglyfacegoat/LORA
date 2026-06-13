import { localize, type Lang } from "../seo/site";
import type { DetailRoute } from "../seo/routes";
import { SeoEyebrowRule } from "./SeoVisualCore";

export function SeoFaq({ route, lang }: { route: DetailRoute; lang: Lang }) {
  return (
    <div>
      {route.faq.map((item, index) => (
        <details
          key={localize(item.question, lang)}
          className="group"
          open={index === 0}
          style={{
            borderTop: index === 0 ? "none" : "1px solid color-mix(in srgb, var(--fg-1) 6%, transparent)",
            padding: "1.5rem 0",
          }}
        >
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
            <span
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                lineHeight: 1.2,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              {localize(item.question, lang)}
            </span>
            <span
              className="shrink-0 transition-transform group-open:rotate-45"
              style={{ color: "var(--fg-4)", fontSize: "1.4rem", lineHeight: 1 }}
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl" style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
            {localize(item.answer, lang)}
          </p>
        </details>
      ))}
    </div>
  );
}

// ---------- CTA buttons ----------

export function SeoCtaButton({
  href,
  label,
  variant = "primary",
  onClick,
}: {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}) {
  if (variant === "ghost") {
    return (
      <a
        href={href}
        onClick={onClick}
        className="inline-flex items-center gap-3 uppercase transition-all duration-300 hover:gap-4"
        style={{ color: "var(--fg-1)", fontSize: "0.62rem", letterSpacing: "0.3em", fontWeight: 700 }}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7H12M12 7L8 3M12 7L8 11"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex rounded-full px-8 py-4 uppercase transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
      style={{
        background: "var(--cta-bg)",
        color: "var(--cta-fg)",
        fontSize: "0.62rem",
        letterSpacing: "0.28em",
        fontWeight: 700,
        boxShadow: "0 0 60px -10px color-mix(in srgb, var(--fg-1) 25%, transparent)",
      }}
    >
      {label}
    </a>
  );
}

// ---------- CTA closing block — borderless, just glow + oversize copy ----------

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
    <section className="relative mt-36 px-0 py-24 text-center md:py-36">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--fg-1) 6%, transparent), transparent 62%)",
          filter: "blur(30px)",
        }}
      />
      <SeoEyebrowRule align="center">Next step</SeoEyebrowRule>
      <h2
        className="mx-auto mt-7 max-w-4xl"
        style={{
          fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
          lineHeight: 0.95,
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: "var(--fg-1)",
          textShadow: "0 0 80px var(--surface-strong)",
        }}
      >
        {title}
      </h2>
      <p className="mx-auto mt-7 max-w-xl" style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
        {text}
      </p>
      <div className="mt-10 flex justify-center">
        <SeoCtaButton href={href} label={label} onClick={onClick} />
      </div>
    </section>
  );
}
