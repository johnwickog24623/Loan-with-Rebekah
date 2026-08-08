import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { statistics } from "@/lib/data/statistics";

export function AboutStatsSection() {
  return (
    <section className="relative border-y border-[color:var(--color-line)] bg-surface/85 px-6 py-10 backdrop-blur-sm md:px-12 md:py-12 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
        {statistics.map((stat, index) => (
          <ScrollReveal key={stat.id} delay={index * 80} variant="fade-up">
            <div className="text-center lg:text-left">
              <p className="font-display text-3xl tracking-tight text-text md:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted md:text-sm">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
