import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

const icons = [
  (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" key="a">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="16" x2="10" y2="19" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" key="b">
      <path d="M3 6H17M3 10H13M3 14H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" key="c">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1" />
      <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1" />
      <line x1="8" y1="8" x2="8" y2="18" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" key="d">
      <path d="M4 10C4 6.7 6.7 4 10 4C12.5 4 14.6 5.5 15.5 7.7M16 10C16 13.3 13.3 16 10 16C7.5 16 5.4 14.5 4.5 12.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M15.5 4V7.7H11.8M4.5 16V12.3H8.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" key="e">
      <path d="M2 18L8 10L12 13L18 2" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="18" cy="2" r="2" fill="currentColor" />
    </svg>
  ),
];

const durations = ["1-2w", "3-5d", "3-4w", "2-3w", "∞"];

export function SolutionSection() {
  const [ref, inView] = useInView(0.08);
  const [active, setActive] = useState(0);
  const { t } = useI18n();

  const phases = [0, 1, 2, 3, 4].map((i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: t(`sol.p${i + 1}.title`),
    head: t(`sol.p${i + 1}.head`),
    desc: t(`sol.p${i + 1}.desc`),
    icon: icons[i],
    duration: durations[i],
  }));

  return (
    <section ref={ref} className="relative py-28 md:py-36 px-6 md:px-20">
      <SectionLabel word="SOLUTION" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-white/20" />
          <span className="text-white/40 uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {t("sol.eyebrow")}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--fg-1)",
              maxWidth: "24ch",
            }}
          >
            {t("sol.title")} <span style={{ color: "var(--fg-3)" }}>{t("sol.titleAccent")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex px-4 py-2.5 rounded-xl max-w-sm"
            style={{
              fontSize: "0.72rem",
              lineHeight: 1.55,
              color: "var(--fg-2)",
              background: "var(--surface-soft)",
              border: "1px solid var(--surface-border)",
            }}
          >
            {t("sol.fastNote")}
          </motion.p>
        </div>

        <div className="hidden md:block">
          <div className="relative mb-8">
            <div className="absolute top-[22px] h-px" style={{ left: "10%", width: "80%", background: "var(--surface-border)" }} />
            <div
              className="absolute top-[22px] h-px transition-all duration-700"
              style={{
                left: "10%",
                width: `${(active / (phases.length - 1)) * 80}%`,
                background: "var(--fg-1)",
                opacity: 0.3,
              }}
            />

            <div className="grid grid-cols-5 gap-2 relative">
              {phases.map((p, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <button
                    key={p.num}
                    onClick={() => setActive(i)}
                    className="flex flex-col items-center gap-3 cursor-pointer group pt-0"
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400 relative z-10"
                      style={{
                        background: isActive ? "var(--fg-1)" : "var(--app-bg)",
                        border: `1px solid ${isActive ? "var(--fg-1)" : isPast ? "var(--accent-border)" : "var(--surface-border)"}`,
                        color: isActive ? "var(--app-bg)" : isPast ? "var(--fg-2)" : "var(--fg-4)",
                        boxShadow: isActive ? "0 0 30px var(--surface-strong)" : "none",
                      }}
                    >
                      {p.icon}
                    </div>
                    <div className="text-center">
                      <p
                        className="uppercase tracking-[0.15em] transition-colors duration-300"
                        style={{ fontSize: "0.6rem", fontWeight: 700, color: isActive ? "var(--fg-1)" : "var(--fg-4)" }}
                      >
                        {p.title}
                      </p>
                      <p
                        className="transition-colors duration-300 mt-0.5"
                        style={{ fontSize: "0.52rem", letterSpacing: "0.15em", color: "var(--fg-4)" }}
                      >
                        {p.duration}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-8 md:p-10 grid grid-cols-[170px_1fr_auto] gap-8 items-center relative overflow-hidden"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <div
              className="absolute -top-20 -right-20 w-60 h-60 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--surface-mid), transparent 60%)" }}
            />

            <div className="relative flex flex-col items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "var(--surface-mid)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--fg-2)",
                  boxShadow: "0 20px 50px -30px var(--surface-strong)",
                }}
              >
                {phases[active].icon}
              </div>
              <div>
                <p className="uppercase tracking-[0.18em]" style={{ fontSize: "0.52rem", fontWeight: 700, color: "var(--fg-4)" }}>
                  Current phase
                </p>
                <p className="uppercase tracking-[0.12em] mt-1" style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--fg-1)" }}>
                  {phases[active].title}
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--fg-4)", marginTop: 4 }}>{phases[active].duration}</p>
              </div>
            </div>

            <div className="relative">
              <p className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-4)" }}>
                {phases[active].title} · {phases[active].duration}
              </p>
              <h3 className="mb-3" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>
                {phases[active].head}
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "56ch" }}>
                {phases[active].desc}
              </p>
            </div>

            <div className="hidden lg:flex flex-col gap-2 relative">
              <button
                onClick={() => setActive((p) => Math.max(0, p - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity"
                style={{ border: "1px solid var(--surface-border)", color: "var(--fg-3)", opacity: active === 0 ? 0.3 : 1 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6 1L2 5L6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </button>
              <button
                onClick={() => setActive((p) => Math.min(phases.length - 1, p + 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity"
                style={{ border: "1px solid var(--surface-border)", color: "var(--fg-3)", opacity: active === phases.length - 1 ? 0.3 : 1 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M4 1L8 5L4 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="md:hidden space-y-2">
          {phases.map((p, i) => {
            const isActive = i === active;
            return (
              <div
                key={p.num}
                onClick={() => setActive(i)}
                className="py-4 px-4 cursor-pointer transition-all duration-400 rounded-xl"
                style={{
                  border: `1px solid ${isActive ? "var(--accent-border)" : "var(--surface-border)"}`,
                  background: isActive ? "var(--surface-mid)" : "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: isActive ? "var(--fg-1)" : "var(--surface-soft)",
                      color: isActive ? "var(--app-bg)" : "var(--fg-4)",
                    }}
                  >
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <p className="uppercase tracking-[0.12em]" style={{ fontSize: "0.7rem", fontWeight: 700, color: isActive ? "var(--fg-1)" : "var(--fg-3)" }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--fg-3)", marginTop: 2 }}>{p.head}</p>
                  </div>
                  <span style={{ fontSize: "0.5rem", color: "var(--fg-4)", letterSpacing: "0.15em" }}>{p.duration}</span>
                </div>
                {isActive && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 ml-11" style={{ fontSize: "0.78rem", lineHeight: 1.65, color: "var(--fg-3)" }}>
                    {p.desc}
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
