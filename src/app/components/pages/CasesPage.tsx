import type { SeoRoute } from "../../seo/routes";
import { CasesSection } from "../CasesSection";
import { SeoShell } from "../SeoShell";

export function CasesPage({ route }: { route: SeoRoute }) {
  return (
    <SeoShell route={route}>
      <CasesSection variant="page" />
    </SeoShell>
  );
}
