import { PageShell } from "@/components/shared-components/page-shell";
import { AboutCtaSection } from "./about-cta-section";
import { AboutHero } from "./about-hero";
import { AboutMarketsSection } from "./about-markets-section";
import { AboutStatsSection } from "./about-stats-section";
import { MissionSection } from "./mission-section";
import { TeamSection } from "./team-section";
import { ValuesSection } from "./values-section";

export function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <MissionSection />
      <AboutStatsSection />
      <ValuesSection />
      <TeamSection />
      <AboutMarketsSection />
      <AboutCtaSection />
    </PageShell>
  );
}
