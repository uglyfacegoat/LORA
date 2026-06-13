import { SeoTechLabel } from "./SeoVisualCore";

export type SeoListItem = {
  index: number;
  label?: string;
  title: string;
  description?: string;
  href?: string;
};

export function SeoNumberedList({ items }: { items: SeoListItem[] }) {
  return (
    <ol className="relative">
      {items.map((item, idx) => (
        <li key={item.title} className="relative">
          {idx > 0 && (
            <div
              className="pointer-events-none mx-auto h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, var(--fg-1) 8%, transparent), transparent)",
              }}
            />
          )}
          <SeoListRow {...item} />
        </li>
      ))}
    </ol>
  );
}

function SeoListRow({ index, label, title, description, href }: SeoListItem) {
  const content = (
    <div className="group relative grid items-baseline gap-5 py-8 md:grid-cols-[7rem_minmax(0,1fr)_auto] md:gap-10 md:py-12">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--fg-1) 60%, transparent), transparent)",
          marginLeft: "-1.25rem",
        }}
      />
      <div className="flex items-baseline gap-4">
        <span
          style={{
            fontSize: "clamp(2.2rem, 3vw, 2.8rem)",
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "var(--fg-4)",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        {label && (
          <span className="hidden md:inline">
            <SeoTechLabel>{label}</SeoTechLabel>
          </span>
        )}
      </div>
      <div>
        <h3
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
            lineHeight: 1.02,
            fontWeight: 850,
            letterSpacing: "-0.035em",
            color: "var(--fg-2)",
            transition: "color 0.4s ease, transform 0.4s ease",
          }}
          className="group-hover:text-[color:var(--fg-1)] md:group-hover:translate-x-2"
        >
          {title}
        </h3>
        {description && (
          <p className="mt-3 max-w-2xl" style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "var(--fg-4)" }}>
            {description}
          </p>
        )}
      </div>
      <span
        className="hidden self-center uppercase opacity-50 transition-all duration-500 group-hover:opacity-100 md:flex md:items-center md:gap-3"
        style={{ fontSize: "0.55rem", letterSpacing: "0.28em", fontWeight: 700, color: "var(--fg-2)" }}
      >
        Open
        <svg
          className="transition-transform duration-500 group-hover:translate-x-1"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 7H12M12 7L8 3M12 7L8 11"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

// ---------- Editorial quote / manifesto stack ----------

export function SeoStatement({ lines }: { lines: { text: string; emphasis?: boolean }[] }) {
  return (
    <div className="relative max-w-4xl">
      <div
        className="pointer-events-none absolute -inset-12 -z-10"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, color-mix(in srgb, var(--fg-1) 5%, transparent), transparent 62%)",
        }}
      />
      <div className="space-y-3">
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              fontSize: line.emphasis ? "clamp(1.8rem, 3.5vw, 2.8rem)" : "clamp(1.15rem, 2vw, 1.7rem)",
              fontWeight: line.emphasis ? 900 : 500,
              lineHeight: 1.18,
              letterSpacing: line.emphasis ? "-0.04em" : "-0.02em",
              color: line.emphasis ? "var(--fg-1)" : "color-mix(in srgb, var(--fg-1) 55%, transparent)",
              textShadow: line.emphasis ? "0 0 60px color-mix(in srgb, var(--fg-1) 25%, transparent)" : "none",
            }}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
