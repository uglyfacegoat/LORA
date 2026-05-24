import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { useInView } from "./useInView";
import { useI18n } from "../i18n";

function CountUp({ target, animate }: { target: string; animate: boolean }) {
  const [val, setVal] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (!animate || started.current) return;
    started.current = true;
    const match = target.match(/([+\-$]*)(\d+\.?\d*)(.*)/);
    if (!match) return;
    const prefix = match[1];
    const num = parseFloat(match[2]);
    const suffix = match[3];
    const hasDot = match[2].includes(".");
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1800, 1);
      const e = 1 - Math.pow(1 - p, 4);
      const cur = num * e;
      setVal(`${prefix}${hasDot ? cur.toFixed(1) : Math.round(cur)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [animate, target]);

  return <>{val}</>;
}

function PhoneVisual() {
  return (
    <div className="pointer-events-none absolute -bottom-16 right-5 h-[23rem] w-[12rem] rotate-[8deg] rounded-[2.2rem] border border-white/15 bg-[#090909] shadow-[0_0_70px_rgba(255,255,255,0.08)]">
      <div className="absolute inset-[0.45rem] rounded-[1.8rem] border border-white/8 bg-gradient-to-br from-white/12 via-white/[0.025] to-transparent" />
      <div className="absolute right-7 top-14 h-24 w-24 rounded-[1.7rem] border border-white/10 bg-black">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute h-8 w-8 rounded-full border border-white/15 bg-[radial-gradient(circle_at_36%_34%,rgba(255,255,255,0.45),rgba(255,255,255,0.08)_28%,#030303_62%)]"
            style={{ left: i === 1 ? 48 : 12, top: i === 2 ? 48 : 12 }}
          />
        ))}
      </div>
      <div className="absolute bottom-16 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border border-white/5 bg-white/[0.025]" />
    </div>
  );
}

function LaptopVisual() {
  return (
    <div className="pointer-events-none absolute -bottom-14 right-[-1.5rem] h-[18rem] w-[25rem] rotate-[9deg] rounded-2xl border border-white/12 bg-[#080808] shadow-[0_0_70px_rgba(255,255,255,0.08)]">
      <div className="absolute inset-4 rounded-xl border border-white/8 bg-gradient-to-br from-white/10 via-white/[0.025] to-transparent p-4">
        <div className="mb-4 flex gap-2">
          <span className="h-2 w-12 rounded-full bg-white/10" />
          <span className="h-2 w-20 rounded-full bg-white/5" />
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
          <div className="space-y-2">
            {[42, 72, 54, 88].map((w) => (
              <div key={w} className="h-3 rounded-full bg-white/8" style={{ width: `${w}%` }} />
            ))}
            <svg viewBox="0 0 180 70" className="mt-5 h-16 w-full text-white/18">
              <path d="M0 54 C22 35 36 62 58 42 C81 21 94 48 116 31 C139 13 154 39 180 16" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <div className="flex items-center justify-center rounded-xl border border-white/8 bg-white/[0.025]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 text-sm font-black text-white/70">45%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardVisual() {
  return (
    <div className="pointer-events-none absolute -right-14 bottom-10 h-40 w-72 rotate-[12deg] rounded-2xl border border-white/14 bg-gradient-to-br from-white/18 via-white/[0.05] to-white/[0.015] shadow-[0_0_70px_rgba(255,255,255,0.08)]">
      <div className="absolute left-7 top-9 h-9 w-12 rounded-lg border border-white/18 bg-white/14" />
      <svg viewBox="0 0 260 120" className="absolute inset-x-5 bottom-4 h-20 text-white/12">
        <path d="M0 70 C44 30 70 96 108 52 C146 10 174 90 214 42 C236 18 248 28 260 20" fill="none" stroke="currentColor" />
        <path d="M0 94 C46 54 76 116 116 72 C152 34 184 110 224 62 C242 41 252 48 260 42" fill="none" stroke="currentColor" />
      </svg>
      <div className="absolute bottom-7 right-8 text-lg font-black tracking-widest text-white/15">7291</div>
    </div>
  );
}

export function CasesSection() {
  const [ref, inView] = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState("all");
  const { t } = useI18n();

  const filters = useMemo(
    () => [
      { key: "all", label: t("results.filter.all") },
      { key: "ecommerce", label: t("results.filter.ecommerce") },
      { key: "saas", label: t("results.filter.saas") },
      { key: "fintech", label: t("results.filter.fintech") },
      { key: "analytics", label: t("results.filter.analytics") },
    ],
    [t],
  );

  const cases = [
    {
      id: "01",
      category: "ecommerce",
      tag: t("results.case1.tag"),
      title: t("results.case1.client"),
      text: t("results.case1.result"),
      metrics: [
        { value: "+187%", label: t("results.case1.secondary1") },
        { value: "2.4x", label: "ROI" },
      ],
      visual: <PhoneVisual />,
    },
    {
      id: "02",
      category: "saas",
      tag: t("results.case2.tag"),
      title: t("results.case2.client"),
      text: t("results.case2.result"),
      metrics: [
        { value: "+156%", label: t("results.case2.heroLabel") },
        { value: "-32%", label: "CPL" },
      ],
      visual: <LaptopVisual />,
    },
    {
      id: "03",
      category: "fintech",
      tag: t("results.case3.tag"),
      title: t("results.case3.client"),
      text: t("results.case3.result"),
      metrics: [
        { value: "+233%", label: t("results.case3.heroLabel") },
        { value: "-27%", label: "CAC" },
      ],
      visual: <CardVisual />,
    },
  ];

  const visibleCases = activeFilter === "all" || activeFilter === "analytics"
    ? cases
    : cases.filter((item) => item.category === activeFilter);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 md:px-20 md:py-44">
      <div className="pointer-events-none absolute right-0 top-24 h-[34rem] w-[34rem] rounded-full bg-white/[0.025] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-6 flex items-center gap-4">
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <ScrambleText
            as="span"
            text={t("results.eyebrow")}
            trigger={inView}
            className="uppercase tracking-[0.35em]"
            style={{ fontSize: "0.65rem", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "var(--fg-3)" }}
          />
        </motion.div>

        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-5xl"
            style={{ fontSize: "clamp(2.1rem, 4.8vw, 4.25rem)", fontWeight: 850, lineHeight: 1.02, letterSpacing: "-0.05em", color: "var(--fg-1)" }}
          >
            {t("results.title")}
            <br />
            <span style={{ color: "var(--fg-3)" }}>{t("results.titleAccent")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-lg"
            style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--fg-3)" }}
          >
            {t("results.sub")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {filters.map((filter) => {
            const active = filter.key === activeFilter;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className="rounded-xl px-6 py-4 uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 850,
                  background: active ? "var(--fg-1)" : "var(--surface-soft)",
                  color: active ? "var(--app-bg)" : "var(--fg-3)",
                  border: `1px solid ${active ? "var(--fg-1)" : "var(--surface-border)"}`,
                  boxShadow: active ? "0 0 34px var(--shadow-soft)" : "none",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {visibleCases.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.62, delay: 0.36 + index * 0.08 }}
              className="group relative min-h-[24rem] overflow-hidden rounded-2xl p-7"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.055] via-transparent to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent" />
              {item.visual}

              <div className="relative z-10 flex h-full min-h-[20.5rem] flex-col">
                <div className="mb-7 flex items-center justify-between">
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--fg-4)" }}>{item.id}</span>
                  <span className="uppercase tracking-[0.12em]" style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--fg-3)" }}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="max-w-[17rem]" style={{ fontSize: "1.45rem", fontWeight: 850, lineHeight: 1.18, letterSpacing: "-0.035em", color: "var(--fg-1)" }}>
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[18rem]" style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--fg-3)" }}>
                  {item.text}
                </p>

                <div className="mt-auto grid max-w-[14rem] grid-cols-2 gap-8 pt-8">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p style={{ fontSize: "1.65rem", fontWeight: 850, letterSpacing: "-0.04em", color: "var(--fg-1)", lineHeight: 1 }}>
                        <CountUp target={metric.value} animate={inView} />
                      </p>
                      <p className="mt-2 uppercase tracking-[0.12em]" style={{ fontSize: "0.56rem", fontWeight: 800, color: "var(--fg-4)" }}>
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-8 flex w-fit items-center gap-3 uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: "0.62rem", fontWeight: 850, color: "var(--fg-3)" }}
                >
                  {t("results.viewCase")}
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M2 11L11 2M11 2H4M11 2V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {cases.map((item) => (
            <span
              key={item.id}
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{
                background: visibleCases.some((visible) => visible.id === item.id) ? "var(--fg-1)" : "var(--surface-strong)",
                opacity: visibleCases.some((visible) => visible.id === item.id) ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
