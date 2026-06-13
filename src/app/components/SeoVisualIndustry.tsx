import { SeoTechLabel } from "./SeoVisualCore";

export function SeoIndustryLedger({
  title,
  text,
  problemLabel,
  responseLabel,
  problems,
  deliverables,
}: {
  title: string;
  text: string;
  problemLabel: string;
  responseLabel: string;
  problems: string[];
  deliverables: string[];
}) {
  const rows = problems.slice(0, 3).map((problem, index) => ({
    problem,
    response: deliverables[index] ?? deliverables[deliverables.length - 1] ?? "",
  }));

  return (
    <section className="relative mt-28 md:mt-40">
      <div
        aria-hidden="true"
        className="mb-12 h-px"
        style={{ background: "linear-gradient(to right, var(--surface-border), transparent 72%)" }}
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
        <div className="lg:sticky lg:top-32 self-start">
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--fg-1)",
            }}
          >
            {title}
          </h2>
          <p className="mt-7 max-w-sm" style={{ fontSize: "0.95rem", lineHeight: 1.72, color: "var(--fg-3)" }}>
            {text}
          </p>
        </div>

        <div>
          <div
            className="hidden grid-cols-[minmax(0,0.42fr)_4rem_minmax(0,0.58fr)] gap-6 pb-5 uppercase md:grid"
            style={{ fontSize: "0.54rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}
          >
            <span>{problemLabel}</span>
            <span aria-hidden="true" />
            <span>{responseLabel}</span>
          </div>
          <div style={{ borderTop: "1px solid var(--surface-border)" }}>
            {rows.map((row) => (
              <div
                key={row.problem}
                className="grid gap-5 py-8 md:grid-cols-[minmax(0,0.42fr)_4rem_minmax(0,0.58fr)] md:gap-6 md:py-9"
                style={{ borderBottom: "1px solid var(--surface-border)" }}
              >
                <p style={{ fontSize: "0.96rem", lineHeight: 1.65, color: "var(--fg-3)", fontWeight: 550 }}>
                  {row.problem}
                </p>
                <div className="hidden items-center justify-center md:flex">
                  <span
                    aria-hidden="true"
                    style={{
                      width: "2.1rem",
                      height: "1px",
                      background: "linear-gradient(to right, var(--fg-5), var(--fg-3))",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "clamp(1.05rem, 1.55vw, 1.28rem)",
                    lineHeight: 1.45,
                    color: "var(--fg-1)",
                    fontWeight: 750,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {row.response}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeoIndustryRunway({
  title,
  text,
  processLabel,
  connectionsLabel,
  process,
  integrations,
}: {
  title: string;
  text: string;
  processLabel: string;
  connectionsLabel: string;
  process: string[];
  integrations: string[];
}) {
  const steps = process.slice(0, 4);

  return (
    <section className="relative mt-24 md:mt-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
        <div>
          <SeoTechLabel>{processLabel}</SeoTechLabel>
          <h2
            className="mt-5 max-w-lg"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--fg-1)",
            }}
          >
            {title}
          </h2>
          <p className="mt-7 max-w-md" style={{ fontSize: "0.95rem", lineHeight: 1.72, color: "var(--fg-3)" }}>
            {text}
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 hidden w-px md:block"
            style={{ background: "linear-gradient(to bottom, transparent, var(--surface-border), transparent)" }}
          />
          <ol className="grid">
            {steps.map((item, index) => (
              <li
                key={item}
                className="grid gap-5 py-7 md:grid-cols-[4rem_minmax(0,1fr)] md:pl-8"
                style={{
                  borderTop: index === 0 ? "1px solid var(--surface-border)" : "1px solid var(--surface-border)",
                }}
              >
                <span
                  className="uppercase"
                  style={{ fontSize: "0.52rem", letterSpacing: "0.22em", fontWeight: 800, color: "var(--fg-5)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontSize: "clamp(1rem, 1.45vw, 1.18rem)",
                    lineHeight: 1.55,
                    color: "var(--fg-2)",
                    fontWeight: 680,
                  }}
                >
                  {item}
                </p>
              </li>
            ))}
          </ol>

          {integrations.length > 0 && (
            <div className="mt-9 md:pl-8">
              <SeoTechLabel>{connectionsLabel}</SeoTechLabel>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {integrations.map((item) => (
                  <span
                    key={item}
                    style={{ fontSize: "0.9rem", lineHeight: 1.55, color: "var(--fg-3)", fontWeight: 600 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
