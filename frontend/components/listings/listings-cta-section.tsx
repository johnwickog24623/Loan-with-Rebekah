import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";

export function ListingsCtaSection() {
  return (
    <section className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16">
      <ScrollReveal variant="fade-up">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border border-[color:var(--color-line)] bg-surface/70 px-6 py-10 md:flex-row md:items-center md:px-10">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-accent">
              Private Access
            </p>
            <h2 className="font-display text-3xl tracking-tight text-text md:text-4xl">
              Looking for something off-market?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Tell us your criteria. We will prepare a discreet shortlist matched to your timeline.
            </p>
          </div>
          <Link
            href="/contact"
            className="cursor-pointer shrink-0 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-[#dce0e6]"
          >
            Request a shortlist
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
