import { PageShell } from "@/components/shared-components/page-shell";
import type { Property } from "@/lib/types/property";
import { ListingDetailCta } from "./listing-detail-cta";
import { ListingDetailFeatures } from "./listing-detail-features";
import { ListingDetailGallery } from "./listing-detail-gallery";
import { ListingDetailHero } from "./listing-detail-hero";
import { ListingDetailOverview } from "./listing-detail-overview";
import { ListingRelated } from "./listing-related";

interface ListingDetailPageProps {
  property: Property;
  related: Property[];
}

export function ListingDetailPage({ property, related }: ListingDetailPageProps) {
  return (
    <PageShell>
      <ListingDetailHero property={property} />
      <ListingDetailOverview property={property} />
      <ListingDetailFeatures property={property} />
      <ListingDetailGallery property={property} />
      <ListingDetailCta property={property} />
      <ListingRelated properties={related} />
    </PageShell>
  );
}
