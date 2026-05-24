import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";
import quoteCardThreads from "../../assets/quote-card-threads.svg";

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

        <div className="grid auto-rows-auto gap-4 md:grid-cols-[repeat(24,minmax(0,1fr))]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-8"
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
            className="md:col-span-7"
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

                <div className="flex flex-col">
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--fg-4)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{t("why.roi.prefix")}</span>
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
                </div>

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
            className="md:col-span-9"
          >
            <TiltCard
              className="relative flex h-full cursor-default flex-col justify-center overflow-hidden rounded-2xl p-8"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <img
                src={quoteCardThreads}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-8 h-[72%] w-[72%] max-w-none opacity-80"
              />

              <div className="relative z-10 -translate-y-3">
              <svg
                width="32"
                height="24"
                viewBox="0 0 24 18"
                className="mb-6"
                style={{ opacity: 0.34, color: "var(--fg-3)" }}
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
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-7"
          >
            <TiltCard
              className="relative h-full min-h-[16.25rem] cursor-default overflow-hidden rounded-2xl"
              style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
            >
              <div className="relative z-10 p-8">
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
                <p className="max-w-[18rem]" style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--fg-4)" }}>
                  {t("why.data.s")}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] overflow-hidden">
                <div
                  className="absolute inset-x-0 bottom-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 12%, rgba(255,255,255,0.1) 88%, transparent 100%)" }}
                />

                <svg
                  viewBox="0 0 480 150"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="whyDataArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                      <stop offset="58%" stopColor="#ffffff" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="whyDataDot" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="42%" stopColor="#ffffff" stopOpacity="0.92" />
                      <stop offset="72%" stopColor="#ffffff" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <path
                    d="M0 118 L28 120 L58 108 L92 92 L128 116 L164 124 L198 112 L230 118 L264 104 L296 108 L332 82 L364 64 L398 78 L438 56 L480 62 L480 150 L0 150 Z"
                    fill="url(#whyDataArea)"
                  />
                  <path
                    d="M0 118 L28 120 L58 108 L92 92 L128 116 L164 124 L198 112 L230 118 L264 104 L296 108 L332 82 L364 64 L398 78 L438 56 L480 62"
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.55 }}
                  >
                    <motion.circle
                      cx="348"
                      cy="72"
                      r="11"
                      fill="url(#whyDataDot)"
                    />
                    <motion.circle
                      cx="348"
                      cy="72"
                      r="4.3"
                      fill="rgba(255,255,255,0.18)"
                      stroke="rgba(255,255,255,0.62)"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx="348"
                      cy="72"
                      r="2.4"
                      fill="#ffffff"
                    />
                  </motion.g>
                </svg>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="md:col-span-9"
          >
            <TiltCard
              className="relative h-full min-h-[16.25rem] cursor-default overflow-hidden rounded-2xl p-8"
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

              <div className="pointer-events-none absolute inset-x-8 bottom-8 h-14 overflow-hidden">
                <div
                  className="absolute inset-x-0 bottom-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 14%, rgba(255,255,255,0.08) 86%, rgba(255,255,255,0.02) 100%)",
                  }}
                />
                {[0.16, 0.37, 0.58, 0.82].map((position, index) => (
                  <div
                    key={index}
                    className="absolute bottom-0 w-px"
                    style={{
                      left: `${position * 100}%`,
                      height: index === 2 ? "12px" : index % 2 === 0 ? "8px" : "6px",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03))",
                      opacity: index === 2 ? 0.9 : 0.6,
                    }}
                  />
                ))}
                <div
                  className="absolute bottom-0 h-6"
                  style={{
                    left: "0%",
                    width: "100%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.006) 58%, rgba(255,255,255,0.016) 100%)",
                    maskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
                  }}
                />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-8"
          >
            <TiltCard
              className="relative h-full min-h-[16.25rem] cursor-default overflow-hidden rounded-2xl p-8"
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

              <div className="pointer-events-none absolute inset-x-8 bottom-1 h-24 overflow-hidden">
                {[
                  {
                    bottom: "0px",
                    opacity: 0.34,
                    border: "rgba(255,255,255,0.11)",
                    fill: "rgba(255,255,255,0.012)",
                  },
                  {
                    bottom: "16px",
                    opacity: 0.5,
                    border: "rgba(255,255,255,0.145)",
                    fill: "rgba(255,255,255,0.016)",
                  },
                  {
                    bottom: "32px",
                    opacity: 0.92,
                    border: "rgba(255,255,255,0.28)",
                    fill: "rgba(255,255,255,0.022)",
                  },
                ].map((sheet, index) => (
                  <svg
                    key={index}
                    viewBox="0 0 520 120"
                    preserveAspectRatio="none"
                    className="absolute left-0 right-0"
                    style={{
                      bottom: sheet.bottom,
                      height: "64px",
                      opacity: sheet.opacity,
                      filter: index === 2 ? "drop-shadow(0 10px 26px rgba(0,0,0,0.16))" : "none",
                    }}
                    aria-hidden="true"
                  >
                    <path
                      d="M69 104H432C443 104 453 100 461 92L498 56C507 47 501 34 489 34H117C106 34 95 38 87 46L50 82C41 91 47 104 59 104H69Z"
                      fill={sheet.fill}
                      stroke={sheet.border}
                      strokeWidth="1.2"
                    />
                  </svg>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
