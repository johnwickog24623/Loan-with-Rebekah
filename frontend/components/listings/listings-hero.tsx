import { ScrollReveal } from "@/components/shared-components/scroll-reveal";

export function ListingsHero() {
  return (
    <section className="relative px-6 pb-8 pt-28 md:px-12 md:pb-10 md:pt-32 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-accent md:text-sm">
            Listings
          </p>
          <h1 className="font-display text-4xl tracking-tight text-text md:text-5xl lg:text-6xl">
            Available properties
          </h1>
          <p className="mt-5 text-base text-muted md:text-lg">
            A curated selection of residences and holdings available for private viewing.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
