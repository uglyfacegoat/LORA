import { lazy, Suspense } from "react";
import { isDetailRoute } from "../seo/structuredData";
import type { SeoRoute } from "../seo/routes";
import { SeoHead } from "./SeoHead";

const HomePage = lazy(() => import("./pages/HomePage"));
const SeoListingPage = lazy(() => import("./SeoListingPage").then((module) => ({ default: module.SeoListingPage })));
const SeoDetailPage = lazy(() => import("./SeoDetailPage").then((module) => ({ default: module.SeoDetailPage })));
const NotFoundPage = lazy(() => import("./NotFoundPage").then((module) => ({ default: module.NotFoundPage })));
const AuditPage = lazy(() => import("./pages/AuditPage").then((module) => ({ default: module.AuditPage })));
const PricingPage = lazy(() => import("./pages/PricingPage").then((module) => ({ default: module.PricingPage })));
const CasesPage = lazy(() => import("./pages/CasesPage").then((module) => ({ default: module.CasesPage })));
const HistoryPage = lazy(() => import("./pages/HistoryPage").then((module) => ({ default: module.HistoryPage })));
const ContactsPage = lazy(() => import("./pages/ContactsPage").then((module) => ({ default: module.ContactsPage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then((module) => ({ default: module.PrivacyPage })));
const CookiesPage = lazy(() => import("./pages/CookiesPage").then((module) => ({ default: module.CookiesPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then((module) => ({ default: module.TermsPage })));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage").then((module) => ({ default: module.ThankYouPage })));

type AppPageRendererProps = {
  route: SeoRoute;
};

export function AppPageRenderer({ route }: AppPageRendererProps) {
  return (
    <>
      <SeoHead route={route} />
      <Suspense fallback={null}>
        {route.kind === "home" ? (
          <HomePage />
        ) : route.kind === "listing" ? (
          <SeoListingPage route={route} />
        ) : isDetailRoute(route) ? (
          <SeoDetailPage route={route} />
        ) : route.kind === "not-found" ? (
          <NotFoundPage route={route} />
        ) : route.slug === "audit" ? (
          <AuditPage route={route} />
        ) : route.slug === "pricing" ? (
          <PricingPage route={route} />
        ) : route.slug === "cases" ? (
          <CasesPage route={route} />
        ) : route.slug === "history" ? (
          <HistoryPage route={route} />
        ) : route.slug === "contacts" ? (
          <ContactsPage route={route} />
        ) : route.slug === "privacy" ? (
          <PrivacyPage route={route} />
        ) : route.slug === "cookies" ? (
          <CookiesPage route={route} />
        ) : route.slug === "terms" ? (
          <TermsPage route={route} />
        ) : route.slug === "thank-you" ? (
          <ThankYouPage route={route} />
        ) : null}
      </Suspense>
    </>
  );
}
