import Link from "next/link";
import { SectionHeading } from "@/components/shared-components/section-heading";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { aboutTeam } from "@/lib/data/about";
import { TeamCard } from "./team-card";

export function TeamSection() {
  return (
    <section className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto mb-10 flex max-w-2xl justify-center md:mb-12">
          <SectionHeading
            eyebrow="Leadership"
            title="Advisors behind every transaction"
            description="Experienced counsel for acquisitions, disposals, and portfolio strategy—available with discretion."
            align="center"
            tone="cinematic"
            className="mb-0"
          />
        </div>
      </ScrollReveal>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        {aboutTeam.map((member, index) => (
          <ScrollReveal key={member.id} delay={index * 100} variant="fade-up">
            <TeamCard member={member} />
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={200}>
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/team"
            className="cursor-pointer rounded-lg border border-[color:var(--color-line)] bg-surface px-8 py-3.5 text-sm font-medium text-text shadow-[0_8px_24px_rgba(26,26,28,0.05)] transition-colors hover:border-accent/35 hover:bg-surface-raised"
          >
            See all team members
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
