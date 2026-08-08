import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";

export function TeamCtaSection() {
  return (
    <section className="relative px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <ScrollReveal variant="fade-up">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border border-[color:var(--color-line)] bg-surface/70 px-6 py-10 md:flex-row md:items-center md:px-10">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-accent">
              Work With Us
            </p>
            <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
              Speak with the right advisor
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Share your goals and we will connect you with the specialist best suited to your
              brief.
            </p>
          </div>
          <Link
            href="/contact"
            className="cursor-pointer shrink-0 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-[#dce0e6]"
          >
            Book a consultation
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
