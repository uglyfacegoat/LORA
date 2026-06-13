import { allRoutes, indexableRoutes, type SeoRoute } from "../src/app/seo/routes";
import { LANGS, localizedPath, localize } from "../src/app/seo/site";

type SeoIssue = {
  route: string;
  message: string;
};

function addIssue(issues: SeoIssue[], route: SeoRoute, message: string) {
  issues.push({ route: route.path, message });
}

function hasValidDate(value: string | undefined) {
  if (!value) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return !Number.isNaN(new Date(`${value}T00:00:00.000Z`).getTime());
}

function validateRouteShape(route: SeoRoute, issues: SeoIssue[]) {
  if (!route.path.startsWith("/")) {
    addIssue(issues, route, "path must start with /");
  }

  if (route.path !== "/" && route.path.endsWith("/")) {
    addIssue(issues, route, "path must not end with /; localizedPath adds trailing slashes");
  }

  if (!route.slug.trim()) {
    addIssue(issues, route, "slug is empty");
  }

  if (!hasValidDate(route.updatedAt)) {
    addIssue(issues, route, "updatedAt must use YYYY-MM-DD");
  }

  for (const lang of LANGS) {
    const title = localize(route.title, lang).trim();
    const description = localize(route.description, lang).trim();
    const h1 = localize(route.h1, lang).trim();
    const summary = localize(route.summary, lang).trim();

    if (!title) addIssue(issues, route, `title is empty for ${lang}`);
    if (!description) addIssue(issues, route, `description is empty for ${lang}`);
    if (!h1) addIssue(issues, route, `h1 is empty for ${lang}`);
    if (!summary) addIssue(issues, route, `summary is empty for ${lang}`);
  }
}

function validateUniqueValues(routes: SeoRoute[], issues: SeoIssue[]) {
  const paths = new Map<string, SeoRoute>();
  const slugs = new Map<string, SeoRoute>();
  const localizedPaths = new Map<string, SeoRoute>();

  for (const route of routes) {
    const existingPath = paths.get(route.path);
    if (existingPath) {
      addIssue(issues, route, `duplicates path already used by ${existingPath.slug}`);
    }
    paths.set(route.path, route);

    const existingSlug = slugs.get(route.slug);
    if (existingSlug) {
      addIssue(issues, route, `duplicates slug already used by ${existingSlug.path}`);
    }
    slugs.set(route.slug, route);

    for (const lang of LANGS) {
      const path = localizedPath(route.path, lang);
      const existingLocalizedPath = localizedPaths.get(path);
      if (existingLocalizedPath) {
        addIssue(issues, route, `duplicates localized path ${path} already used by ${existingLocalizedPath.slug}`);
      }
      localizedPaths.set(path, route);
    }
  }
}

function validateIndexableRoutes(routes: SeoRoute[], issues: SeoIssue[]) {
  for (const route of routes) {
    if (route.noindex) {
      addIssue(issues, route, "noindex route is present in indexableRoutes");
    }
  }
}

const issues: SeoIssue[] = [];

allRoutes.forEach((route) => validateRouteShape(route, issues));
validateUniqueValues(allRoutes, issues);
validateIndexableRoutes(indexableRoutes, issues);

if (issues.length > 0) {
  console.error("SEO route validation failed:");
  issues.forEach((issue) => console.error(`- ${issue.route}: ${issue.message}`));
  process.exit(1);
}

console.log(`Validated ${allRoutes.length} SEO routes (${indexableRoutes.length} indexable).`);
