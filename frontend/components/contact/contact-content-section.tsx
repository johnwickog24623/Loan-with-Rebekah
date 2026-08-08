import { ContactDetails } from "@/components/landing-page-section/contact/contact-details";
import { ContactForm } from "@/components/landing-page-section/contact/contact-form";
import { SectionHeading } from "@/components/shared-components/section-heading";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { contactInfo } from "@/lib/data/contact-info";

export function ContactContentSection() {
  return (
    <section className="relative px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-surface/80 p-6 md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <ScrollReveal variant="slide-right">
            <div>
              <SectionHeading
                eyebrow="Get In Touch"
                title="We are here to help"
                description="Send us a message or reach out directly. Our team responds within 24 hours."
                tone="cinematic"
                className="mb-8 lg:mb-10"
              />
              <ContactDetails />
              <div className="mt-6 rounded-xl border border-[color:var(--color-line)] bg-surface px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">Hours</p>
                <p className="mt-1 text-sm font-medium text-text">{contactInfo.hours}</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-left" delay={150}>
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-surface p-6 shadow-sm md:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <h3 className="relative mb-6 font-display text-lg text-text">Send us a message</h3>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
