import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { aboutMarkets } from "@/lib/data/about";

export function AboutMarketsSection() {
  return (
    <section className="relative px-6 py-16 md:px-12 md:py-20 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-champagne md:text-sm">
            Markets
          </p>
          <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl lg:text-5xl">
            Where we operate
          </h2>
          <p className="mt-4 text-sm text-muted md:text-base">
            Focused coverage across landmark districts and private residential enclaves.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <div className="mx-auto grid max-w-5xl grid-cols-1 border-l border-t border-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {aboutMarkets.map((market) => (
            <div
              key={market.id}
              className="border-b border-r border-[color:var(--color-line)] bg-surface/50 px-6 py-8 transition-colors hover:bg-surface md:px-8 md:py-10"
            >
              <p className="font-display text-xl text-text md:text-2xl">{market.name}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                {market.focus}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
