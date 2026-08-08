import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { teamMembers } from "@/lib/data/team";
import { TeamMemberCard } from "./team-member-card";

export function TeamGridSection() {
  return (
    <section className="relative px-6 py-6 md:px-12 md:py-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
        {teamMembers.map((member, index) => (
          <ScrollReveal key={member.id} delay={index * 80} variant="fade-up">
            <TeamMemberCard member={member} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
