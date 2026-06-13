import type { StandaloneProductView } from "../data/pricing";

export function StandaloneProductsGrid({ title, products }: { title: string; products: StandaloneProductView[] }) {
  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center justify-between gap-6">
        <span
          className="uppercase"
          style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 800, color: "var(--fg-4)" }}
        >
          {title}
        </span>
        <div className="h-px flex-1" style={{ background: "var(--surface-border)" }} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl p-6"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className="uppercase"
                style={{ fontSize: "0.58rem", letterSpacing: "0.2em", fontWeight: 800, color: "var(--fg-3)" }}
              >
                {item.label}
              </span>
              <span
                className="rounded-md px-2 py-1 uppercase"
                style={{
                  fontSize: "0.48rem",
                  letterSpacing: "0.14em",
                  fontWeight: 800,
                  background: "var(--surface-strong)",
                  color: "var(--fg-3)",
                  border: "1px solid var(--surface-border)",
                }}
              >
                {item.badge}
              </span>
            </div>
            <div
              className="mt-5"
              style={{
                fontSize: "clamp(1.55rem, 3vw, 2rem)",
                fontWeight: 850,
                letterSpacing: "-0.03em",
                color: "var(--fg-1)",
                lineHeight: 1,
              }}
            >
              {item.price}
            </div>
            <div className="my-5 h-px" style={{ background: "var(--surface-border)" }} />
            <ul className="grid gap-2.5">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--fg-3)" }}>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginTop: "0.25em", flexShrink: 0 }}>
      <path
        d="M2 5L4.2 7.5L8 2.5"
        stroke="var(--fg-2)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
