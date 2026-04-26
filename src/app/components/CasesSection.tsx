import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useEffect, useRef, useState } from "react";

import { ScrambleText } from "./ScrambleText";
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
      const p = Math.min((now - t0) / 2200, 1);
      const e = 1 - Math.pow(1 - p, 4);
      const cur = num * e;
      setVal(`${prefix}${hasDot ? cur.toFixed(1) : Math.round(cur)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [animate, target]);

  return <>{val}</>;
}

export function CasesSection() {
  const [ref, inView] = useInView(0.1);
  const [activeCase, setActiveCase] = useState(0);
  const { t } = useI18n();

  const cases = [
    {
      client: t("results.case1.client"),
      tag: t("results.case1.tag"),
      hero: { value: "+340%", label: t("results.case1.heroLabel") },
      secondary: [
        { value: "$2.4M", label: t("results.case1.secondary1") },
        { value: "-52%", label: t("results.case1.secondary2") },
      ],
      quote: t("results.case1.quote"),
      timeline: t("results.case1.timeline"),
    },
    {
      client: t("results.case2.client"),
      tag: t("results.case2.tag"),
      hero: { value: "+95%", label: t("results.case2.heroLabel") },
      secondary: [
        { value: "+180%", label: t("results.case2.secondary1") },
        { value: "$890K", label: t("results.case2.secondary2") },
      ],
      quote: t("results.case2.quote"),
      timeline: t("results.case2.timeline"),
    },
    {
      client: t("results.case3.client"),
      tag: t("results.case3.tag"),
      hero: { value: "12x", label: t("results.case3.heroLabel") },
      secondary: [
        { value: "+210%", label: t("results.case3.secondary1") },
        { value: "$5.1M", label: t("results.case3.secondary2") },
      ],
      quote: t("results.case3.quote"),
      timeline: t("results.case3.timeline"),
    },
  ];

  const c = cases[activeCase];

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
          <ScrambleText
            as="span"
            text={t("results.eyebrow")}
            trigger={inView}
            className="uppercase tracking-[0.35em]"
            style={{ fontSize: "0.65rem", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "var(--fg-3)" }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)", marginBottom: "4rem" }}
        >
          {t("results.title")}
          <br />
          <span style={{ color: "var(--fg-3)" }}>{t("results.titleAccent")}</span>
        </motion.h2>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="flex gap-2 mb-8 flex-wrap">
          {cases.map((cs, i) => (
            <button
              key={cs.client}
              onClick={() => setActiveCase(i)}
              className="px-4 sm:px-5 py-2.5 transition-all duration-500 cursor-pointer uppercase tracking-[0.15em] rounded-lg"
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                border: `1px solid ${i === activeCase ? "var(--accent-border)" : "var(--surface-border)"}`,
                color: i === activeCase ? "var(--fg-1)" : "var(--fg-4)",
                background: i === activeCase ? "var(--surface-mid)" : "var(--surface-soft)",
              }}
            >
              {cs.client}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
          style={{ border: "1px solid var(--surface-border)", background: "var(--surface-soft)" }}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 pointer-events-none" style={{ background: "radial-gradient(circle, var(--glow-soft), transparent 55%)" }} />

          <div className="p-8 md:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="px-3 py-1.5 rounded-lg uppercase tracking-[0.2em]" style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--fg-4)", background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}>
                  {c.tag}
                </span>
                <span className="uppercase tracking-[0.1em]" style={{ fontSize: "0.55rem", color: "var(--fg-5)" }}>
                  {c.timeline} {t("results.engagement")}
                </span>
              </div>
            </div>

            <div className="mb-10">
              <p
                style={{
                  fontSize: "clamp(3.4rem, 15vw, 10rem)",
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: "-0.06em",
                  color: "var(--fg-1)",
                  textShadow: "0 0 100px var(--shadow-soft)",
                }}
              >
                <CountUp target={c.hero.value} animate={inView} />
              </p>
              <p className="uppercase tracking-[0.3em] mt-4" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--fg-4)" }}>
                {c.hero.label}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8" style={{ borderTop: "1px solid var(--surface-border)" }}>
              {c.secondary.map((m) => (
                <div key={m.label} className="p-5 rounded-xl" style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}>
                  <p style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>
                    <CountUp target={m.value} animate={inView} />
                  </p>
                  <p className="uppercase tracking-[0.12em] mt-1" style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--fg-4)" }}>
                    {m.label}
                  </p>
                </div>
              ))}

              <div className="flex items-center p-5 rounded-xl" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
                <div>
                  <svg width="16" height="12" viewBox="0 0 16 12" className="mb-3" fill="currentColor" style={{ color: "var(--fg-4)", opacity: 0.6 }}>
                    <path d="M6 0L3 6H6V12H0V6L3 0H6ZM16 0L13 6H16V12H10V6L13 0H16Z" />
                  </svg>
                  <p className="italic" style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--fg-3)" }}>
                    {c.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
