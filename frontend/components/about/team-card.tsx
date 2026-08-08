import Image from "next/image";
import type { TeamMember } from "@/lib/types/about";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group">
      <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-surface-raised">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
      </div>
      <h3 className="font-display text-xl text-text md:text-2xl">{member.name}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-champagne">
        {member.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          className="mt-4 inline-block cursor-pointer text-sm text-accent underline-offset-4 transition-colors hover:text-jet hover:underline"
        >
          Contact {member.name.split(" ")[0]}
        </a>
      ) : null}
    </article>
  );
}
