import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { aboutMission } from "@/lib/data/about";

export function MissionSection() {
  return (
    <section className="relative px-6 py-16 md:px-12 md:py-20 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-champagne md:text-sm">
            {aboutMission.eyebrow}
          </p>
          <h2 className="font-display text-3xl leading-[1.12] tracking-tight text-text md:text-4xl lg:text-[2.75rem]">
            {aboutMission.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text/80 md:text-lg">
            {aboutMission.lead}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            {aboutMission.body}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
