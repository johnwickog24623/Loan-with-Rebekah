import { SectionHeading } from "@/components/shared-components/section-heading";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { aboutValues } from "@/lib/data/about";

export function ValuesSection() {
  return (
    <section className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto mb-10 flex max-w-2xl justify-center md:mb-12">
          <SectionHeading
            eyebrow="Our Approach"
            title="How we counsel every client"
            description="Principles that shape valuations, negotiations, and long-term advisory—without noise."
            align="center"
            tone="cinematic"
            className="mb-0"
          />
        </div>
      </ScrollReveal>
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-10 sm:grid-cols-2">
        {aboutValues.map((value, index) => (
          <ScrollReveal key={value.id} delay={index * 80} variant="fade-up">
            <article className="border-t border-[color:var(--color-line)] pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-text md:text-2xl">{value.title}</h3>
              </div>
              <p className="mt-3 max-w-md pl-10 text-sm leading-relaxed text-muted md:text-base">
                {value.description}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
