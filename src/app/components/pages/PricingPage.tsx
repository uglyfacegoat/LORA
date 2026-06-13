import type { SeoRoute } from "../../seo/routes";
import { PricingSection } from "../PricingSection";
import { SeoShell } from "../SeoShell";

export function PricingPage({ route }: { route: SeoRoute }) {
  return (
    <SeoShell route={route}>
      <div className="-mx-6 md:-mx-20">
        <PricingSection variant="page" />
      </div>
    </SeoShell>
  );
}
