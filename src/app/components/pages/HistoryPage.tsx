import type { SeoRoute } from "../../seo/routes";
import { SeoShell } from "../SeoShell";
import { StorySection } from "../StorySection";

export function HistoryPage({ route }: { route: SeoRoute }) {
  return (
    <SeoShell route={route}>
      <StorySection variant="page" />
    </SeoShell>
  );
}
