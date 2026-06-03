import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const siteUrl = (process.env.VITE_SITE_URL || "https://loragroup.space").replace(/\/$/, "");
const langs = ["en", "es", "ru", "zh"];
const today = new Date().toISOString().slice(0, 10);

const main = [
  ["/", "weekly", "1.0"],
  ["/services", "weekly", "0.9"],
  ["/industries", "monthly", "0.85"],
  ["/blog", "weekly", "0.7"],
  ["/pricing", "monthly", "0.75"],
  ["/cases", "monthly", "0.55"],
  ["/contacts", "monthly", "0.7"],
  ["/audit", "monthly", "0.8"],
  ["/privacy", "yearly", "0.35"],
  ["/cookies", "yearly", "0.3"],
];

const services = [
  "websites",
  "landing-pages",
  "corporate-websites",
  "ecommerce",
  "ux-ui-design",
  "website-redesign",
  "seo-optimization",
  "crm-integration",
  "business-automation",
  "website-support",
].map((slug) => [`/services/${slug}`, "monthly", "0.82"]);

const industries = [
  "beauty-salon",
  "restaurant",
  "construction-company",
  "clinic",
  "online-school",
  "expert",
  "b2b-company",
  "service-business",
  "legal-company",
  "real-estate",
].map((slug) => [`/industries/${slug}`, "monthly", "0.78"]);

const articles = [["/blog/why-landing-pages-fail", "yearly", "0.55"]];

function localized(path, lang) {
  return path === "/" ? `/${lang}/` : `/${lang}${path}/`;
}

function urlEntry([path, changefreq, priority]) {
  const links = langs
    .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}${localized(path, lang)}" />`)
    .join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${localized(path, "en")}" />`;

  return langs
    .map((lang) => `  <url>
    <loc>${siteUrl}${localized(path, lang)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${links}
${xDefault}
  </url>`)
    .join("\n");
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...main, ...services, ...industries, ...articles].map(urlEntry).join("\n")}
</urlset>
`;

const output = join(root, "public", "sitemap.xml");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, xml, "utf8");
console.log(`Generated ${output}`);
