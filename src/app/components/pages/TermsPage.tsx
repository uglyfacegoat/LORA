import type { SeoRoute } from "../../seo/routes";
import { LegalDocumentPage } from "./LegalDocumentPage";

export function TermsPage({ route }: { route: SeoRoute }) {
  return <LegalDocumentPage route={route} type="terms" />;
}
