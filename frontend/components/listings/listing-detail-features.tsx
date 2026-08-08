import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import type { Property } from "@/lib/types/property";

interface ListingDetailFeaturesProps {
  property: Property;
}

export function ListingDetailFeatures({ property }: ListingDetailFeaturesProps) {
  return (
    <section className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Amenities
          </p>
          <h2 className="mb-10 font-display text-3xl tracking-tight text-text md:text-4xl">
            What makes this residence exceptional
          </h2>
          <ul className="grid grid-cols-1 overflow-hidden rounded-xl border-l border-t border-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {property.amenities.map((amenity, index) => (
              <li
                key={amenity}
                className="flex items-start gap-4 border-b border-r border-[color:var(--color-line)] bg-surface/40 px-5 py-6 transition-colors hover:bg-surface/80 md:px-6 md:py-7"
              >
                <span className="font-display text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5 text-sm text-text md:text-base">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
