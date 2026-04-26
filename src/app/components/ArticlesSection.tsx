import { motion } from "motion/react";
import { useState } from "react";
import { useInView } from "./useInView";

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

function ArticleCard({ article, index, inView, lang, t, featured = false }: {
  article: Article;
  index: number;
  inView: boolean;
  lang: string;
  t: (k: string) => string;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{
        background: hovered ? "var(--surface-strong)" : "var(--surface-soft)",
        border: "1px solid var(--surface-border)",
        transition: "background 0.4s ease, border-color 0.4s ease",
        borderColor: hovered ? "var(--accent-border)" : "var(--surface-border)",
      }}
    >
      <div className={`relative flex flex-col justify-between h-full ${featured ? "p-8 md:p-10 min-h-[280px]" : "p-6 md:p-8 min-h-[220px]"}`}>
        {/* Top row: tag + NEW + date */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded-lg uppercase tracking-[0.14em]"
              style={{ fontSize: "0.48rem", fontWeight: 700, background: "var(--surface-strong)", color: "var(--fg-3)", border: "1px solid var(--surface-border)" }}
            >
              {article.tag[lang]}
            </span>
            {isNew(article.date) && (
              <span
                className="px-2 py-0.5 rounded-full uppercase tracking-[0.15em]"
                style={{ fontSize: "0.43rem", fontWeight: 800, background: "var(--fg-1)", color: "var(--app-bg)" }}
              >
                {t("articles.new")}
              </span>
            )}
          </div>
          <span className="uppercase tracking-[0.18em]" style={{ fontSize: "0.5rem", fontWeight: 600, color: "var(--fg-4)" }}>
            {formatDate(article.date, lang)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="transition-colors duration-400"
          style={{
            fontSize: featured ? "clamp(1.25rem, 2.5vw, 1.9rem)" : "clamp(1rem, 1.8vw, 1.3rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            color: hovered ? "var(--fg-1)" : "var(--fg-2)",
            marginBottom: "0.75rem",
            maxWidth: featured ? "55ch" : "38ch",
          }}
        >
          {article.title[lang]}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: "0.78rem",
          lineHeight: 1.65,
          color: hovered ? "var(--fg-3)" : "var(--fg-4)",
          maxWidth: featured ? "65ch" : "42ch",
          transition: "color 0.4s ease",
          flex: 1,
        }}>
          {article.excerpt[lang]}
        </p>

        {/* Bottom row: read time + arrow */}
        <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: "1px solid var(--surface-border)" }}>
          <span style={{ fontSize: "0.58rem", color: "var(--fg-4)", fontWeight: 500, letterSpacing: "0.05em" }}>
            {article.readTime[lang]}
          </span>
          <div
            className="flex items-center gap-2 transition-all duration-300"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
          >
            <span style={{ fontSize: "0.55rem", fontWeight: 600, color: hovered ? "var(--fg-2)" : "var(--fg-4)", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s" }}>
              {t("articles.read")}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: hovered ? "var(--fg-1)" : "var(--surface-strong)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5"
                  stroke={hovered ? "var(--app-bg)" : "var(--fg-3)"}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ArticlesSection() {
  const [ref, inView] = useInView(0.06);
  const { t, lang } = useI18n();

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-20 overflow-hidden">


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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
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

        {/* Featured card */}
        {featured && (
          <div className="mb-4">
            <ArticleCard article={featured} index={0} inView={inView} lang={lang} t={t} featured />
          </div>
        )}

        {/* Rest: 2-column grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i + 1} inView={inView} lang={lang} t={t} />
            ))}
          </div>
        )}

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
