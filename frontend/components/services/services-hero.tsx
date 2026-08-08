import { ScrollReveal } from "@/components/shared-components/scroll-reveal";

export function ServicesHero() {
  return (
    <section className="relative px-6 pb-12 pt-28 md:px-12 md:pt-32 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-champagne">
            Our Services
          </p>
          <h1 className="font-display text-4xl tracking-tight text-text md:text-5xl lg:text-6xl">
            Everything you need in one place
          </h1>
          <p className="mt-4 text-base text-muted md:text-lg">
            Comprehensive real estate services for buyers, sellers, landlords, investors, and
            developers.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
