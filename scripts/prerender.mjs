import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const serverEntry = await import(pathToFileURL(join(dist, "server", "entry-server.js")).href);

function outputPath(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  return clean ? join(dist, clean, "index.html") : join(dist, "index.html");
}

function withPrerenderedHtml(pathname, appHtml, headTags) {
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${pathname.split("/").filter(Boolean)[0] || "en"}">`)
    .replace(/<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/, headTags)
    .replace("<!--app-html-->", appHtml);
}

const entries = serverEntry.getPrerenderEntries();

for (const entry of entries) {
  const appHtml = (await serverEntry.render(entry.path)).replaceAll("\u0000", "");
  const headTags = serverEntry.buildHeadTags(entry.path);
  const html = withPrerenderedHtml(entry.path, appHtml, headTags);
  const file = outputPath(entry.path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, "utf8");
}

console.log(`Prerendered ${entries.length} localized pages into ${dist}`);
rmSync(join(dist, "server"), { recursive: true, force: true });
