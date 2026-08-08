import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import type { Property } from "@/lib/types/property";

interface ListingDetailOverviewProps {
  property: Property;
}

function formatStat(value: number, label: string) {
  if (value <= 0) return null;
  return { value: value.toLocaleString(), label };
}

export function ListingDetailOverview({ property }: ListingDetailOverviewProps) {
  const stats = [
    formatStat(property.beds, "Bedrooms"),
    formatStat(property.baths, "Bathrooms"),
    formatStat(property.sqft, "Square feet"),
  ].filter(Boolean) as { value: string; label: string }[];
  return (
    <section className="relative px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <ScrollReveal variant="slide-right">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Overview
            </p>
            <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
              A residence defined by quiet luxury
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {property.description}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal variant="slide-left" delay={100}>
          <div className="rounded-xl border border-[color:var(--color-line)] bg-surface/80 p-6 shadow-[0_8px_30px_rgba(26,26,28,0.04)] backdrop-blur-sm md:p-8">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-accent">
              At a glance
            </p>
            <dl className="space-y-0">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between border-b border-[color:var(--color-line)] py-4 last:border-b-0"
                >
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="font-display text-2xl text-text">{stat.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between border-b border-[color:var(--color-line)] py-4 last:border-b-0">
                <dt className="text-sm text-muted">Status</dt>
                <dd className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
                  {property.tag}
                </dd>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <dt className="text-sm text-muted">Location</dt>
                <dd className="max-w-[60%] text-right text-sm text-text">{property.location}</dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
