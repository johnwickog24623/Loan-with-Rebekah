import { PageShell } from "@/components/shared-components/page-shell";
import { ServicesGrid } from "./services-grid";
import { ServicesHero } from "./services-hero";
import { ServicesProcessSection } from "./services-process-section";

export function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <div data-skip-scroll-zoom>
        <ServicesGrid />
      </div>
      <ServicesProcessSection />
    </PageShell>
  );
}
