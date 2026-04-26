import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";

import { useInView } from "./useInView";

function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
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
        transform: hovering
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "perspective(800px) rotateX(0) rotateY(0)",
        transition: "transform 0.3s ease-out",
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
      }}
    >
      {children}
    </div>
  );
}

export function WhyLora() {
  const [ref, inView] = useInView(0.08);
  const { t } = useI18n();
  const { theme } = useTheme();

  return (
    <section ref={ref} className="relative px-6 py-32 md:px-20 md:py-44">


      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <span
            className="uppercase tracking-[0.35em]"
            style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}
          >
            {t("why.eyebrow")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg-1)",
          }}
        >
          {t("why.title")}
          <br />
          <span style={{ color: "var(--fg-4)" }}>{t("why.titleAccent")}</span>
        </motion.h2>

        <div className="grid auto-rows-auto gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TiltCard
              className="relative h-full cursor-default overflow-hidden rounded-2xl p-8 md:col-span-2 md:p-10"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60"
                style={{ background: "radial-gradient(circle, var(--glow-soft), transparent 60%)" }}
              />

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z"
                        stroke="var(--icon-stroke)"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>

                  <span
                    className="uppercase tracking-[0.2em]"
                    style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--fg-4)" }}
                  >
                    {t("why.ap.label")}
                  </span>
                </div>

                <h3
                  className="mb-3"
                  style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-1)" }}
                >
                  {t("why.ap.title")}
                </h3>

                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 500, color: "var(--fg-3)" }}>
                  {t("why.ap.desc")}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {[t("why.step.attract"), t("why.step.convert"), t("why.step.close"), t("why.step.scale")].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span
                        className="uppercase"
                        style={{
                          fontSize: "0.66rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: "var(--fg-3)",
                        }}
                      >
                        {step}
                      </span>
                      {i < 3 && (
                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
                          <path d="M0 4H16M16 4L13 1M16 4L13 7" stroke="var(--line-mid)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TiltCard
              className="relative flex h-full cursor-default flex-col justify-between overflow-hidden rounded-2xl p-8"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div>
                <p
                  className="mb-6 uppercase tracking-[0.2em]"
                  style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--fg-4)" }}
                >
                  {t("why.roi")}
                </p>

                <p
                  style={{
                    fontSize: "4rem",
                    fontWeight: 900,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.9,
                    textShadow: "0 0 40px var(--shadow-soft)",
                    color: "var(--fg-1)",
                  }}
                >
                  11.2x
                </p>

                <p className="mt-2" style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--fg-4)" }}>
                  {t("why.roi.desc")}
                </p>
              </div>

              <div className="mt-8 flex h-12 items-end gap-1">
                {[20, 35, 28, 45, 38, 55, 48, 65, 58, 75, 68, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      background:
                        theme === "dark"
                          ? `rgba(255,255,255,${0.12 + i * 0.018})`
                          : `rgba(10,10,10,${0.08 + i * 0.022})`,
                    }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <TiltCard
              className="relative flex h-full cursor-default flex-col justify-center overflow-hidden rounded-2xl p-8"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                className="mb-5"
                style={{ opacity: 0.18, color: "var(--fg-4)" }}
                fill="currentColor"
              >
                <path d="M9 0L4.5 9H9V18H0V9L4.5 0H9ZM24 0L19.5 9H24V18H15V9L19.5 0H24Z" />
              </svg>

              <p className="mb-6 italic" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--fg-3)" }}>
                "{t("why.quote")}"
              </p>

              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--fg-2)" }}>{t("why.quoteAuthor")}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--fg-4)" }}>{t("why.quoteRole")}</p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <TiltCard
              className="h-full cursor-default rounded-2xl p-8"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1V15M1 8H15" stroke="var(--icon-stroke)" strokeWidth="1.5" />
                </svg>
              </div>

              <h4 className="mb-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--fg-2)" }}>
                {t("why.data.t")}
              </h4>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--fg-4)" }}>{t("why.data.s")}</p>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <TiltCard
              className="h-full cursor-default rounded-2xl p-8"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="var(--icon-stroke)" strokeWidth="1.5" />
                  <path d="M8 5V8L10 10" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <h4 className="mb-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--fg-2)" }}>
                {t("why.fast.t")}
              </h4>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--fg-4)" }}>{t("why.fast.s")}</p>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TiltCard
              className="h-full cursor-default rounded-2xl p-8"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14L8 2L14 14" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinejoin="round" />
                  <line x1="5" y1="9" x2="11" y2="9" stroke="var(--icon-stroke)" strokeWidth="1.5" />
                </svg>
              </div>

              <h4 className="mb-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--fg-2)" }}>
                {t("why.own.t")}
              </h4>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--fg-4)" }}>{t("why.own.s")}</p>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
