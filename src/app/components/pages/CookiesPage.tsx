import type { SeoRoute } from "../../seo/routes";
import { LegalDocumentPage } from "./LegalDocumentPage";

export function CookiesPage({ route }: { route: SeoRoute }) {
  return <LegalDocumentPage route={route} type="cookies" />;
}
