import { SectionHeading } from "@/components/shared-components/section-heading";
import { neighborhoods } from "@/lib/data/neighborhoods";
import { NeighborhoodCard } from "./neighborhood-card";

export function NeighborhoodsSection() {
  return (
    <section
      id="neighborhoods"
      className="relative px-6 py-20 md:px-12 lg:px-16"
    >
      <SectionHeading
        eyebrow="Neighborhoods"
        title="Find your perfect community"
        description="Browse the areas we know best—from urban skylines to coastal retreats."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
        ))}
      </div>
    </section>
  );
}
