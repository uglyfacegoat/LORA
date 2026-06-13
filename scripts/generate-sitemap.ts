import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildAlternateLinks } from "../src/app/seo/alternateLinks";
import { indexableRoutes } from "../src/app/seo/routes";
import { LANGS, SITE_URL, localizedPath, type Lang } from "../src/app/seo/site";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function priorityValue(value: number) {
  return value === 1 ? "1.0" : String(value);
}

function alternateLinks(path: string) {
  return buildAlternateLinks(path)
    .map(
      ({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`,
    )
    .join("\n");
}

function urlEntry(route: (typeof indexableRoutes)[number], lang: Lang) {
  const loc = `${SITE_URL}${localizedPath(route.path, lang)}`;

  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(route.updatedAt ?? "2026-06-12")}</lastmod>
    <changefreq>${escapeXml(route.changeFrequency)}</changefreq>
    <priority>${priorityValue(route.priority)}</priority>
${alternateLinks(route.path)}
  </url>`;
}

const entries = indexableRoutes.flatMap((route) => LANGS.map((lang) => urlEntry(route, lang)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

const output = join(root, "public", "sitemap.xml");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, xml, "utf8");
console.log(`Generated ${output} from ${indexableRoutes.length} indexable routes (${entries.length} localized URLs).`);
