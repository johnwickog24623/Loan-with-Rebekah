import { PageShell } from "@/components/shared-components/page-shell";
import { TeamCtaSection } from "./team-cta-section";
import { TeamGridSection } from "./team-grid-section";
import { TeamHero } from "./team-hero";

export function TeamPage() {
  return (
    <PageShell>
      <TeamHero />
      <TeamGridSection />
      <TeamCtaSection />
    </PageShell>
  );
}
