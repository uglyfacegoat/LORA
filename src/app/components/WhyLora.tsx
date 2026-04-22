import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: hovering ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : "perspective(800px) rotateX(0) rotateY(0)",
        transition: "transform 0.3s ease-out",
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
    >
      {children}
    </div>
  );
}

export function WhyLora() {
  const [ref, inView] = useInView(0.08);
  const { t } = useI18n();

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20">
      <SectionLabel word="ADVANTAGE" index="03" label="Why LORA" side="right" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-white/40 uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{t("why.eyebrow")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white mb-16"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          {t("why.title")}<br />
          <span className="text-white/30">{t("why.titleAccent")}</span>
        </motion.h2>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Large feature card */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <TiltCard
              className="md:col-span-2 rounded-2xl p-8 md:p-10 relative overflow-hidden h-full cursor-default"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" /></svg>
                  </div>
                  <span className="text-white/20 uppercase tracking-[0.2em]" style={{ fontSize: "0.5rem", fontWeight: 700 }}>{t("why.ap.label")}</span>
                </div>
                <h3 className="text-white mb-3" style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {t("why.ap.title")}
                </h3>
                <p className="text-white/30" style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 500 }}>
                  {t("why.ap.desc")}
                </p>
                {/* Mini visual */}
                <div className="mt-8 flex items-center gap-2">
                  {[t("why.step.attract"), t("why.step.convert"), t("why.step.close"), t("why.step.scale")].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="text-white/35" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{step}</span>
                      </div>
                      {i < 3 && <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M0 4H10M10 4L7 1M10 4L7 7" stroke="rgba(255,255,255,0.12)" strokeWidth="1" /></svg>}
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Stat card */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <TiltCard
              className="rounded-2xl p-8 relative overflow-hidden h-full cursor-default flex flex-col justify-between"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <p className="text-white/15 uppercase tracking-[0.2em] mb-6" style={{ fontSize: "0.5rem", fontWeight: 700 }}>{t("why.roi")}</p>
                <p className="text-white" style={{ fontSize: "4rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, textShadow: "0 0 40px rgba(255,255,255,0.06)" }}>
                  11.2×
                </p>
                <p className="text-white/25 mt-2" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                  {t("why.roi.desc")}
                </p>
              </div>
              <div className="mt-8 flex items-end gap-1 h-12">
                {[20, 35, 28, 45, 38, 55, 48, 65, 58, 75, 68, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ background: `rgba(255,255,255,${0.05 + i * 0.02})` }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Quote card */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            <TiltCard
              className="rounded-2xl p-8 relative overflow-hidden h-full cursor-default flex flex-col justify-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <svg width="24" height="18" viewBox="0 0 24 18" className="mb-5 opacity-15" fill="white">
                <path d="M9 0L4.5 9H9V18H0V9L4.5 0H9ZM24 0L19.5 9H24V18H15V9L19.5 0H24Z" />
              </svg>
              <p className="text-white/40 italic mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                "{t("why.quote")}"
              </p>
              <div>
                <p className="text-white/50" style={{ fontSize: "0.8rem", fontWeight: 700 }}>Sarah Chen</p>
                <p className="text-white/20" style={{ fontSize: "0.7rem" }}>VP Growth, Nexus Commerce</p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Three small cards */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
            <TiltCard
              className="rounded-2xl p-8 cursor-default h-full"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1V15M1 8H15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" /></svg>
              </div>
              <h4 className="text-white/80 mb-2" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{t("why.data.t")}</h4>
              <p className="text-white/25" style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>
                {t("why.data.s")}
              </p>
            </TiltCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }}>
            <TiltCard
              className="rounded-2xl p-8 cursor-default h-full"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" /><path d="M8 5V8L10 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <h4 className="text-white/80 mb-2" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{t("why.fast.t")}</h4>
              <p className="text-white/25" style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>
                {t("why.fast.s")}
              </p>
            </TiltCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}>
            <TiltCard
              className="rounded-2xl p-8 cursor-default h-full"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L8 2L14 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" /><line x1="5" y1="9" x2="11" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" /></svg>
              </div>
              <h4 className="text-white/80 mb-2" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{t("why.own.t")}</h4>
              <p className="text-white/25" style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>
                {t("why.own.s")}
              </p>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
