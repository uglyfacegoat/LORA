import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

const steps = [
  { num: "01", title: "AUDIT", desc: "Full diagnostic of funnels, UX, traffic, and data. We document every friction point and revenue leak in your system.", duration: "1–2 WKS" },
  { num: "02", title: "STRATEGY", desc: "Data-driven roadmap with clear KPIs, conversion benchmarks, and a prioritized action plan.", duration: "1 WK" },
  { num: "03", title: "BUILD", desc: "Design, develop, deploy — precise, fast, and obsessively tested before launch.", duration: "2–4 WKS" },
  { num: "04", title: "OPTIMIZE", desc: "Continuous A/B testing, iteration loops, and performance compounding.", duration: "ONGOING" },
  { num: "05", title: "SCALE", desc: "Systematize winning patterns and scale across all channels for compound growth.", duration: "ONGOING" },
];

export function ProcessSection() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);
  const { t } = useI18n();

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">
      <SectionLabel word="PROCESS" index="06" label="The Method" side="left" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-white/20" />
          <span className="text-white/40 uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{t("process.eyebrow")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white mb-6"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          Five steps.<br />
          <span className="text-white/30">Zero guesswork.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/25 max-w-lg mb-16"
          style={{ fontSize: "0.92rem", lineHeight: 1.7 }}
        >
          A repeatable, proven workflow. Every step is designed to build on the previous one.
        </motion.p>

        {/* Desktop: horizontal nav + detail */}
        <div className="hidden md:block">
          <div className="flex items-stretch gap-2 mb-6">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={step.num}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  onClick={() => setActive(i)}
                  className="flex-1 cursor-pointer text-left transition-all duration-500 rounded-xl p-5 group"
                  style={{
                    border: `1px solid ${isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)"}`,
                    background: isActive ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.008)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="transition-colors duration-500"
                      style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.05em", color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.1)" }}
                    >
                      {step.num}
                    </span>
                    <span
                      className="transition-colors duration-500"
                      style={{ fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.1em", color: isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)" }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p
                    className="uppercase tracking-[0.1em] transition-colors duration-500"
                    style={{ fontSize: "0.72rem", fontWeight: 700, color: isActive ? "white" : "rgba(255,255,255,0.2)" }}
                  >
                    {step.title}
                  </p>
                  {/* Active line */}
                  <div className="mt-4 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: isActive ? "100%" : "0%", background: "rgba(255,255,255,0.4)" }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden relative"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            {/* Corner glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 60%)" }} />

            <div className="p-10 md:p-14 flex items-start gap-14">
              {/* Big number */}
              <p
                className="shrink-0 select-none"
                style={{
                  fontSize: "8rem",
                  fontWeight: 900,
                  lineHeight: 0.8,
                  letterSpacing: "-0.06em",
                  color: "rgba(255,255,255,0.04)",
                }}
              >
                {steps[active].num}
              </p>
              <div>
                <h3 className="text-white uppercase tracking-[0.1em] mb-4" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                  {steps[active].title}
                </h3>
                <p className="text-white/35" style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: 520 }}>
                  {steps[active].desc}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                    <span className="text-white/30 uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", fontWeight: 700 }}>
                      Duration: {steps[active].duration}
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                    <span className="text-white/30 uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", fontWeight: 700 }}>
                      Step {active + 1} of {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <div
                key={step.num}
                onClick={() => setActive(i)}
                className="py-5 px-5 cursor-pointer transition-all duration-500 rounded-xl"
                style={{
                  border: `1px solid ${isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}`,
                  background: isActive ? "rgba(255,255,255,0.025)" : "transparent",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "0.6rem", fontWeight: 800, color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)" }}>{step.num}</span>
                    <h4 className="uppercase tracking-[0.1em]" style={{ fontSize: "0.8rem", fontWeight: 700, color: isActive ? "white" : "rgba(255,255,255,0.25)" }}>{step.title}</h4>
                  </div>
                  <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.15)" }}>{step.duration}</span>
                </div>
                {isActive && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/30 mt-3 ml-10" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
                    {step.desc}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
