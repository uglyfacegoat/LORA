export function SeoServiceBlueprint({
  title,
  text,
  items,
}: {
  title: string;
  text: string;
  items: { label: string; value: string; detail: string }[];
}) {
  return (
    <section className="relative mt-28 md:mt-40">
      <div
        aria-hidden="true"
        className="mb-12 h-px"
        style={{
          background: "linear-gradient(to right, color-mix(in srgb, var(--fg-1) 10%, transparent), transparent 74%)",
        }}
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-start">
        <div className="max-w-sm">
          <h2
            className=""
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              color: "var(--fg-1)",
            }}
          >
            {title}
          </h2>
          <p className="mt-6" style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "var(--fg-4)" }}>
            {text}
          </p>
        </div>

        <dl className="grid">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="grid gap-4 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:py-8"
              style={{ borderTop: index === 0 ? "none" : "1px solid color-mix(in srgb, var(--fg-1) 7%, transparent)" }}
            >
              <div>
                <dt className="sr-only">{item.label}</dt>
                <dd
                  style={{
                    fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
                    lineHeight: 1.08,
                    fontWeight: 850,
                    letterSpacing: "-0.035em",
                    color: "var(--fg-1)",
                  }}
                >
                  {item.value}
                </dd>
              </div>
              <dd style={{ fontSize: "0.96rem", lineHeight: 1.65, color: "var(--fg-3)" }}>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function SeoServiceSystem({
  title,
  accent,
  labels = ["Foundation", "Interface", "Handoff"],
  deliverables,
  process,
  result,
  processIntro,
}: {
  title: string;
  accent: string;
  labels?: string[];
  deliverables: string[];
  process?: string[];
  result?: string[];
  processIntro?: string;
}) {
  const layers = [
    { label: labels[0] ?? "Foundation", value: deliverables[0] },
    { label: labels[1] ?? "Interface", value: deliverables[1] },
    { label: labels[2] ?? "Handoff", value: deliverables[2] },
  ].filter((item) => item.value);
  const path = process ?? [];
  const outcomes = result ?? [];

  return (
    <section className="relative mt-24 md:mt-32">
      <div
        aria-hidden="true"
        className="mb-12 h-px"
        style={{ background: "linear-gradient(to right, var(--surface-border), transparent 72%)" }}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]">
        <div className="lg:sticky lg:top-32 self-start">
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--fg-1)",
            }}
          >
            {title}
            <br />
            <span style={{ color: "var(--fg-3)" }}>{accent}</span>
          </h2>
          {processIntro && (
            <p className="mt-8 max-w-sm" style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
              {processIntro}
            </p>
          )}
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            borderTop: "1px solid var(--surface-border)",
            borderBottom: "1px solid var(--surface-border)",
          }}
        >
          <div className="grid md:grid-cols-3">
            {layers.map((item, index) => (
              <div
                key={item.label}
                className={`min-h-[14rem] py-7 md:px-7 ${index === 0 ? "" : "border-t md:border-l md:border-t-0"}`}
                style={{ borderColor: "var(--surface-border)" }}
              >
                <span
                  className="uppercase"
                  style={{ fontSize: "0.52rem", letterSpacing: "0.22em", fontWeight: 800, color: "var(--fg-4)" }}
                >
                  {item.label}
                </span>
                <p
                  className="mt-7"
                  style={{ fontSize: "0.98rem", lineHeight: 1.6, fontWeight: 650, color: "var(--fg-2)" }}
                >
                  {item.value}
                </p>
                {path[index] && (
                  <p className="mt-7" style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--fg-4)" }}>
                    {path[index]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {outcomes.length > 0 && (
            <div className="grid gap-0 md:grid-cols-4" style={{ borderTop: "1px solid var(--surface-border)" }}>
              {outcomes.map((item, index) => (
                <div
                  key={item}
                  className={`py-5 md:px-5 ${index === 0 ? "" : "border-t md:border-l md:border-t-0"}`}
                  style={{ borderColor: "var(--surface-border)" }}
                >
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.55, color: "var(--fg-3)" }}>{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
