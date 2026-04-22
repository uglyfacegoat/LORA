import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { ScrambleText } from "./ScrambleText";
import { useI18n } from "../i18n";

const cases = [
  {
    client: "E-Commerce Platform",
    tag: "RETAIL",
    hero: { value: "+340%", label: "CONVERSION RATE" },
    secondary: [
      { value: "$2.4M", label: "Revenue Growth" },
      { value: "-52%", label: "CAC Reduction" },
    ],
    quote: "They found $2.4M we didn't know we were losing.",
    timeline: "12 weeks",
  },
  {
    client: "SaaS Product",
    tag: "TECHNOLOGY",
    hero: { value: "+95%", label: "TRIAL → PAID" },
    secondary: [
      { value: "+180%", label: "Lead Quality" },
      { value: "$890K", label: "MRR Growth" },
    ],
    quote: "Our trial-to-paid rate nearly doubled in 6 weeks.",
    timeline: "6 weeks",
  },
  {
    client: "FinTech Startup",
    tag: "FINANCE",
    hero: { value: "12×", label: "QUALIFIED LEADS" },
    secondary: [
      { value: "+210%", label: "Conversion Rate" },
      { value: "$5.1M", label: "Pipeline Value" },
    ],
    quote: "LORA turned our funnel into a pipeline machine.",
    timeline: "8 weeks",
  },
];

function CountUp({ target, animate }: { target: string; animate: boolean }) {
  const [val, setVal] = useState(target);
  const started = useRef(false);
  useEffect(() => {
    if (!animate || started.current) return;
    started.current = true;
    const match = target.match(/([+\-$]*)(\d+\.?\d*)(.*)/);
    if (!match) return;
    const prefix = match[1], num = parseFloat(match[2]), suffix = match[3];
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
  const c = cases[activeCase];

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">
      <SectionLabel word="RESULTS" index="08" label="Case Studies" side="left" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-white/20" />
          <ScrambleText
            as="span"
            text={t("results.eyebrow")}
            trigger={inView}
            className="text-white/40 uppercase tracking-[0.35em]"
            style={{ fontSize: "0.65rem", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white mb-16"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          Real outcomes.<br />
          <span className="text-white/30">Not promises.</span>
        </motion.h2>

        {/* Case tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {cases.map((cs, i) => (
            <button
              key={cs.client}
              onClick={() => setActiveCase(i)}
              className="px-5 py-2.5 transition-all duration-500 cursor-pointer uppercase tracking-[0.15em] rounded-lg"
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                border: `1px solid ${i === activeCase ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`,
                color: i === activeCase ? "white" : "rgba(255,255,255,0.25)",
                background: i === activeCase ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.01)",
              }}
            >
              {cs.client}
            </button>
          ))}
        </motion.div>

        {/* Case showcase */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}
        >
          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.035), transparent 55%)" }} />

          <div className="p-8 md:p-12">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1.5 rounded-lg text-white/25 uppercase tracking-[0.2em]" style={{ fontSize: "0.5rem", fontWeight: 700, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {c.tag}
                </span>
                <span className="text-white/15 uppercase tracking-[0.1em]" style={{ fontSize: "0.55rem" }}>
                  {c.timeline} engagement
                </span>
              </div>
            </div>

            {/* Hero metric */}
            <div className="mb-10">
              <p
                style={{
                  fontSize: "clamp(4.5rem, 15vw, 10rem)",
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: "-0.06em",
                  color: "white",
                  textShadow: "0 0 100px rgba(255,255,255,0.1)",
                }}
              >
                <CountUp target={c.hero.value} animate={inView} />
              </p>
              <p className="text-white/25 uppercase tracking-[0.3em] mt-4" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                {c.hero.label}
              </p>
            </div>

            {/* Secondary + quote */}
            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/[0.06]">
              {c.secondary.map((m) => (
                <div key={m.label} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p className="text-white" style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                    <CountUp target={m.value} animate={inView} />
                  </p>
                  <p className="text-white/20 uppercase tracking-[0.12em] mt-1" style={{ fontSize: "0.6rem", fontWeight: 600 }}>
                    {m.label}
                  </p>
                </div>
              ))}
              <div className="flex items-center p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <div>
                  <svg width="16" height="12" viewBox="0 0 16 12" className="mb-3 opacity-20" fill="white">
                    <path d="M6 0L3 6H6V12H0V6L3 0H6ZM16 0L13 6H16V12H10V6L13 0H16Z" />
                  </svg>
                  <p className="text-white/30 italic" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
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