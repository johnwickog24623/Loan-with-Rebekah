import type { Benefit } from "@/lib/types/benefit";

interface BenefitStackCardProps {
  benefit: Benefit;
  index: number;
}

export function BenefitStackCard({ benefit, index }: BenefitStackCardProps) {
  return (
    <article className="relative isolate flex min-h-[17rem] flex-col justify-center overflow-hidden px-8 py-10 sm:min-h-[18rem] sm:px-12 sm:py-12 md:min-h-[20rem] md:px-16 md:py-14 lg:px-20 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-ink to-surface-raised" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,153,126,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[39px] border border-[color:var(--color-line)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent sm:inset-x-14 md:inset-x-16" />
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="mb-8 flex items-center gap-5 md:mb-10 md:gap-6">
          <span className="font-display text-sm tracking-[0.3em] text-accent md:text-base">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/30 via-champagne/25 to-transparent" />
        </div>
        <h3 className="font-display text-[1.85rem] leading-[1.12] tracking-tight text-text sm:text-4xl md:text-[2.75rem] lg:text-5xl">
          {benefit.title}
        </h3>
        <p className="mt-5 max-w-2xl text-sm leading-[1.75] text-muted sm:text-[0.95rem] md:mt-6 md:text-base md:leading-[1.8]">
          {benefit.description}
        </p>
      </div>
    </article>
  );
}
