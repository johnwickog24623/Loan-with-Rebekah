import { SectionHeading } from "@/components/shared-components/section-heading";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { services } from "@/lib/data/services";
import { ServiceList } from "./service-list";

export function ServicesSection() {
  return (
    <section id="services" className="relative px-6 py-20 md:px-12 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto mb-14 flex max-w-2xl justify-center">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything you need in one place"
            description="From your first viewing to portfolio growth, we cover every step of the real estate journey."
            align="center"
            className="mb-0"
          />
        </div>
      </ScrollReveal>
      <ServiceList services={services} />
    </section>
  );
}
