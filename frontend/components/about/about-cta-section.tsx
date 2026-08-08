import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { aboutCta } from "@/lib/data/about";

export function AboutCtaSection() {
  return (
    <section className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16">
      <ScrollReveal variant="fade-up">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[1.5rem] border border-[color:var(--color-line)] bg-surface/90 px-6 py-10 shadow-[0_20px_48px_rgba(26,26,28,0.06)] backdrop-blur-sm md:flex-row md:items-center md:px-10 md:py-12">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-champagne">
              {aboutCta.eyebrow}
            </p>
            <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
              {aboutCta.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {aboutCta.description}
            </p>
          </div>
          <Link
            href={aboutCta.href}
            className="cursor-pointer shrink-0 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-jet"
          >
            {aboutCta.buttonLabel}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
