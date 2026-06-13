import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import App from "./app/App";
import { buildMeta } from "./app/seo/meta";
import { indexableRoutes, resolveRoute } from "./app/seo/routes";
import { getLangFromPath, getPathWithoutLang, LANGS, localizedPath } from "./app/seo/site";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function getPrerenderEntries() {
  return indexableRoutes.flatMap((route) =>
    LANGS.map((lang) => ({
      lang,
      route,
      path: localizedPath(route.path, lang),
    })),
  );
}

export function buildHeadTags(pathname: string) {
  const lang = getLangFromPath(pathname) ?? "en";
  const route = resolveRoute(getPathWithoutLang(pathname));
  const meta = buildMeta(route, lang);
  const ogType = route.kind === "article" ? "article" : "website";

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    ...meta.alternates.map(
      (alternate) =>
        `<link rel="alternate" hreflang="${escapeHtml(alternate.lang)}" href="${escapeHtml(alternate.href)}" data-seo-alt="true" />`,
    ),
    `<meta property="og:site_name" content="LORA" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`,
  ].join("\n    ");
}

export function render(pathname: string) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const stream = new PassThrough();

    stream.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", reject);

    const { pipe } = renderToPipeableStream(<App initialPath={pathname} />, {
      onAllReady() {
        pipe(stream);
      },
      onError(error) {
        reject(error);
      },
    });
  });
}
