import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import type { Property } from "@/lib/types/property";

interface ListingDetailCtaProps {
  property: Property;
}

export function ListingDetailCta({ property }: ListingDetailCtaProps) {
  return (
    <section className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16">
      <ScrollReveal variant="fade-up">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-2xl border border-[color:var(--color-line)] bg-surface/90 p-6 shadow-[0_12px_40px_rgba(26,26,28,0.05)] backdrop-blur-sm md:flex-row md:items-center md:p-10">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-accent">
              Private Viewing
            </p>
            <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
              Experience {property.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Schedule a discreet tour. Our advisors will prepare access, context, and next-step
              counsel tailored to your brief.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?property=${encodeURIComponent(property.title)}`}
              className="cursor-pointer rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-jet"
            >
              Book a viewing
            </Link>
            <Link
              href="/listings"
              className="cursor-pointer rounded-lg border border-[color:var(--color-line)] bg-surface/80 px-8 py-3.5 text-sm font-medium text-text shadow-[0_4px_16px_rgba(26,26,28,0.04)] transition-colors hover:border-accent/35 hover:bg-surface"
            >
              More listings
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
