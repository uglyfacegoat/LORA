import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { useInView } from "./useInView";
import { useI18n } from "../i18n";
import caseCard from "../../assets/case-card.png";
import caseLaptop from "../../assets/case-laptop.png";
import casePhone from "../../assets/case-phone.png";

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

export function CasesSection({ variant = "home" }: { variant?: "home" | "page" }) {
  const [ref, inView] = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState("all");
  const { t } = useI18n();
  const isPage = variant === "page";

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
      image: casePhone,
      imageClass:
        "right-[-5.4rem] bottom-[-4.8rem] w-[21rem] rotate-[4deg] md:right-[-6.8rem] md:bottom-[-5rem] md:w-[24.8rem]",
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
      image: caseLaptop,
      imageClass:
        "right-[-7.2rem] bottom-[-6.5rem] w-[27rem] rotate-[5deg] md:right-[-8.2rem] md:bottom-[-7.4rem] md:w-[32.5rem]",
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
      image: caseCard,
      imageClass:
        "right-[-9.2rem] bottom-[-1.8rem] w-[19.2rem] rotate-[8deg] md:right-[-10.4rem] md:bottom-[-2rem] md:w-[23rem]",
    },
  ];

  const visibleCases =
    activeFilter === "all" || activeFilter === "analytics"
      ? cases
      : cases.filter((item) => item.category === activeFilter);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${isPage ? "px-0 pb-0 pt-4 md:pt-6" : "px-6 py-32 md:px-20 md:py-44"}`}
    >
      <div className="pointer-events-none absolute right-0 top-24 h-[34rem] w-[34rem] rounded-full bg-white/[0.025] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <ScrambleText
            as="span"
            text={t("results.eyebrow")}
            trigger={inView}
            className="uppercase tracking-[0.35em]"
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              color: "var(--fg-3)",
            }}
          />
        </motion.div>

        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-5xl"
            style={{
              fontSize: "clamp(2.1rem, 4.8vw, 4.25rem)",
              fontWeight: 850,
              lineHeight: 1.02,
              letterSpacing: "-0.05em",
              color: "var(--fg-1)",
            }}
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
              className="group relative min-h-[27rem] overflow-hidden rounded-2xl p-7 md:min-h-[29rem] md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--fg-1) 4%, transparent), var(--surface-soft) 45%, transparent)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/70" />
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute select-none object-contain opacity-85 transition duration-500 group-hover:opacity-100 ${item.imageClass}`}
              />

              <div className="relative z-10 flex h-full min-h-[23rem] flex-col md:min-h-[24.5rem]">
                <div className="mb-7 flex items-center justify-between">
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--fg-4)" }}>{item.id}</span>
                  <span
                    className="uppercase tracking-[0.12em]"
                    style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--fg-3)" }}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3
                  className="max-w-[17rem]"
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 850,
                    lineHeight: 1.18,
                    letterSpacing: "-0.035em",
                    color: "var(--fg-1)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-5 max-w-[17rem]"
                  style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--fg-3)" }}
                >
                  {item.text}
                </p>

                <div className="mt-auto grid max-w-[14rem] grid-cols-2 gap-8 pt-8">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p
                        style={{
                          fontSize: "1.65rem",
                          fontWeight: 850,
                          letterSpacing: "-0.04em",
                          color: "var(--fg-1)",
                          lineHeight: 1,
                        }}
                      >
                        <CountUp target={metric.value} animate={inView} />
                      </p>
                      <p
                        className="mt-2 uppercase tracking-[0.12em]"
                        style={{ fontSize: "0.56rem", fontWeight: 800, color: "var(--fg-4)" }}
                      >
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
                    <path
                      d="M2 11L11 2M11 2H4M11 2V9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-11 flex justify-center gap-5">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{
                background: item === 0 ? "var(--fg-1)" : "var(--fg-1)",
                opacity: item === 0 ? 1 : 0.16,
                boxShadow: item === 0 ? "0 0 18px color-mix(in srgb, var(--fg-1) 45%, transparent)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
