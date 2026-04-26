import { motion } from "motion/react";
import { useState } from "react";
import { useInView } from "./useInView";
import { SectionLabel } from "./SectionLabel";
import { useI18n } from "../i18n";
import articlesData from "../../data/articles.json";

type Article = {
  id: string;
  date: string;
  tag: { en: string; ru: string; es: string; zh: string };
  title: { en: string; ru: string; es: string; zh: string };
  excerpt: { en: string; ru: string; es: string; zh: string };
  readTime: { en: string; ru: string; es: string; zh: string };
};

const articles = articlesData as Article[];

function formatDate(dateStr: string, lang: string) {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = { en: "en-US", ru: "ru-RU", es: "es-ES", zh: "zh-CN" };
  return new Intl.DateTimeFormat(localeMap[lang] || "en-US", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function isNew(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 1000 * 60 * 60 * 24 * 14;
}

export function ArticlesSection() {
  const [ref, inView] = useInView(0.06);
  const { t, lang } = useI18n();
  const [hovered, setHovered] = useState(null as string | null);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20 overflow-hidden">
      <SectionLabel word={t("articles.eyebrow")} index="08" label="Journal" side="right" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "var(--line-soft)" }} />
          <span className="uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}>
            {t("articles.eyebrow")}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--fg-1)" }}
          >
            {t("articles.title")}
            <br />
            <span style={{ color: "var(--fg-3)" }}>{t("articles.titleAccent")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--fg-3)", maxWidth: "40ch" }}
          >
            {t("articles.desc")}
          </motion.p>
        </div>

        {/* Articles list */}
        <div className="flex flex-col gap-0">
          {articles.map((article, i) => {
            const isLast = i === articles.length - 1;
            const isHovered = hovered === article.id;
            const newest = i === 0;

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setHovered(article.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative"
              >
                {/* Top border */}
                <div style={{ height: "1px", background: "var(--surface-border)" }} />

                <div
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 transition-all duration-300 cursor-pointer"
                  style={{ opacity: hovered && !isHovered ? 0.4 : 1 }}
                >
                  {/* Left: date + tag */}
                  <div className="flex md:flex-col gap-3 md:gap-1.5 md:w-36 shrink-0">
                    <span
                      className="uppercase tracking-[0.18em]"
                      style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-4)" }}
                    >
                      {formatDate(article.date, lang)}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md w-fit uppercase tracking-[0.12em]"
                      style={{ fontSize: "0.5rem", fontWeight: 700, background: "var(--surface-strong)", color: "var(--fg-2)", border: "1px solid var(--surface-border)" }}
                    >
                      {article.tag[lang]}
                    </span>
                  </div>

                  {/* Center: title + excerpt */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <h3
                        className="transition-colors duration-300"
                        style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em", color: isHovered ? "var(--fg-1)" : "var(--fg-2)" }}
                      >
                        {article.title[lang]}
                      </h3>
                      {isNew(article.date) && (
                        <span
                          className="shrink-0 mt-1 px-2 py-0.5 rounded-full uppercase tracking-[0.15em]"
                          style={{ fontSize: "0.45rem", fontWeight: 800, background: "var(--fg-1)", color: "var(--app-bg)" }}
                        >
                          {t("articles.new")}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--fg-4)", maxWidth: "70ch" }}>
                      {article.excerpt[lang]}
                    </p>
                  </div>

                  {/* Right: read time + arrow */}
                  <div className="flex items-center gap-4 md:w-28 shrink-0 md:justify-end">
                    <span style={{ fontSize: "0.62rem", color: "var(--fg-4)", fontWeight: 500 }}>
                      {article.readTime[lang]}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isHovered ? "var(--fg-1)" : "var(--surface-strong)",
                        border: "1px solid var(--surface-border)",
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5"
                          stroke={isHovered ? "var(--app-bg)" : "var(--fg-2)"}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom border on last */}
                {isLast && <div style={{ height: "1px", background: "var(--surface-border)" }} />}
              </motion.article>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10"
          style={{ fontSize: "0.72rem", color: "var(--fg-4)", fontStyle: "italic" }}
        >
          {lang === "ru" && "Новые статьи выходят каждые 2–3 недели."}
          {lang === "en" && "New articles drop every 2–3 weeks."}
          {lang === "es" && "Nuevos artículos cada 2–3 semanas."}
          {lang === "zh" && "每隔2-3周发布新文章。"}
        </motion.p>
      </div>
    </section>
  );
}
