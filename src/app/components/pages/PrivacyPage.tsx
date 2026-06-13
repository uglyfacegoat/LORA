import type { SeoRoute } from "../../seo/routes";
import { LegalDocumentPage } from "./LegalDocumentPage";

export function PrivacyPage({ route }: { route: SeoRoute }) {
  return <LegalDocumentPage route={route} type="privacy" />;
}
