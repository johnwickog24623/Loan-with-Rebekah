import { ListingsHero } from "./listings-hero";
import { ListingsMasonrySection } from "./listings-masonry-section";
import { ListingsCtaSection } from "./listings-cta-section";
import { PageShell } from "@/components/shared-components/page-shell";

export function ListingsPage() {
  return (
    <PageShell>
      <ListingsHero />
      <ListingsMasonrySection />
      <ListingsCtaSection />
    </PageShell>
  );
}
