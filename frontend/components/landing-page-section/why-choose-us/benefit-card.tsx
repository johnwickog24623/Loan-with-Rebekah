import type { Benefit } from "@/lib/types/benefit";

interface BenefitCardProps {
  benefit: Benefit;
  step: number;
  align?: "left" | "right";
}

export function BenefitCard({ benefit, step, align = "left" }: BenefitCardProps) {
  const alignClass = align === "right" ? "text-right" : "text-left";
  const dividerClass =
    align === "right"
      ? "bg-gradient-to-l from-accent/35 to-transparent"
      : "bg-gradient-to-r from-accent/35 to-transparent";
  return (
    <article
      className={`rounded-2xl border border-[color:var(--color-line)] bg-surface p-5 transition-transform duration-300 hover:-translate-y-0.5 ${alignClass}`}
    >
      <div className={`mb-2 flex items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <span className="text-xs font-medium tracking-[0.2em] text-accent">0{step}</span>
        <div className={`h-px flex-1 ${dividerClass}`} />
      </div>
      <h3 className="font-display text-xl text-text">{benefit.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
    </article>
  );
}
