import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

export function ProcessSection() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);
  const { t } = useI18n();

  const steps = [1, 2, 3, 4, 5].map((i) => ({
    num: String(i).padStart(2, "0"),
    title: t(`process.s${i}.title`),
    desc: t(`process.s${i}.desc`),
    duration: t(`process.s${i}.duration`),
  }));

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">
      <SectionLabel word={t("label.process")} index="06" label="The Method" side="left" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
          <span className="uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}>
            {t("process.eyebrow")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)", marginBottom: "1.5rem" }}
        >
          {t("process.title")}
          <br />
          <span style={{ color: "var(--fg-3)" }}>{t("process.titleAccent")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-lg mb-16"
          style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--fg-4)" }}
        >
          {t("process.sub")}
        </motion.p>

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
                    border: `1px solid ${isActive ? "var(--accent-border)" : "var(--surface-border)"}`,
                    background: isActive ? "var(--surface-mid)" : "var(--surface-soft)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.05em", color: isActive ? "var(--fg-2)" : "var(--fg-5)" }}>
                      {step.num}
                    </span>
                    <span style={{ fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.1em", color: isActive ? "var(--fg-4)" : "var(--fg-5)" }}>
                      {step.duration}
                    </span>
                  </div>
                  <p className="uppercase tracking-[0.1em]" style={{ fontSize: "0.72rem", fontWeight: 700, color: isActive ? "var(--fg-1)" : "var(--fg-4)" }}>
                    {step.title}
                  </p>
                  <div className="mt-4 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--surface-border)" }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: isActive ? "100%" : "0%", background: "var(--line-strong)" }} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden relative"
            style={{ border: "1px solid var(--surface-border)", background: "var(--surface-soft)" }}
          >
            <div className="absolute -top-16 -left-16 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle, var(--glow-soft), transparent 60%)" }} />

            <div className="p-10 md:p-14 flex items-start gap-14">
              <p className="shrink-0 select-none" style={{ fontSize: "8rem", fontWeight: 900, lineHeight: 0.8, letterSpacing: "-0.06em", color: "var(--glow-mid)" }}>
                {steps[active].num}
              </p>
              <div>
                <h3 className="uppercase tracking-[0.1em] mb-4" style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--fg-1)" }}>
                  {steps[active].title}
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: 520, color: "var(--fg-3)" }}>
                  {steps[active].desc}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg" style={{ border: "1px solid var(--surface-border)", background: "var(--surface-mid)" }}>
                    <span className="uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-3)" }}>
                      {t("process.duration")}: {steps[active].duration}
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-lg" style={{ border: "1px solid var(--surface-border)", background: "var(--surface-mid)" }}>
                    <span className="uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-3)" }}>
                      {t("process.step")} {active + 1} {t("process.of")} {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:hidden space-y-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <div
                key={step.num}
                onClick={() => setActive(i)}
                className="py-5 px-5 cursor-pointer transition-all duration-500 rounded-xl"
                style={{
                  border: `1px solid ${isActive ? "var(--accent-border)" : "var(--surface-border)"}`,
                  background: isActive ? "var(--surface-mid)" : "transparent",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "0.6rem", fontWeight: 800, color: isActive ? "var(--fg-2)" : "var(--fg-5)" }}>{step.num}</span>
                    <h4 className="uppercase tracking-[0.1em]" style={{ fontSize: "0.8rem", fontWeight: 700, color: isActive ? "var(--fg-1)" : "var(--fg-4)" }}>{step.title}</h4>
                  </div>
                  <span style={{ fontSize: "0.5rem", color: "var(--fg-5)" }}>{step.duration}</span>
                </div>
                {isActive && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 ml-10" style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--fg-3)" }}>
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
