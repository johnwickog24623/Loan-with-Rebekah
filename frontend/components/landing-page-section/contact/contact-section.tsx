"use client";

import { SectionHeading } from "@/components/shared-components/section-heading";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const sectionRef = useSectionReveal<HTMLElement>({ stagger: 0.15 });
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-transparent px-6 py-8 md:px-12 md:py-16 lg:px-16"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[color:var(--color-line)] bg-surface/90 p-6 shadow-[0_24px_64px_rgba(26,26,28,0.06)] backdrop-blur-sm md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div data-reveal>
            <SectionHeading
              tone="cinematic"
              eyebrow="Contact Us"
              title="Ready to find your next property?"
              description="Reach out for a free consultation, property valuation, or to schedule a private viewing."
              className="mb-8 lg:mb-10"
            />
            <ContactDetails />
          </div>
          <div
            data-reveal
            className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <h3 className="relative mb-6 font-display text-xl text-text">Send us a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
