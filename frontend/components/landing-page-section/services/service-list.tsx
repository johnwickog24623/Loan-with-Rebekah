import type { ServiceItem } from "@/lib/data/services";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import { ServiceCard } from "./service-card";

interface ServiceListProps {
  services: ServiceItem[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      {services.map((service, index) => (
        <ScrollReveal key={service.id} delay={index * 120} variant="fade-up">
          <ServiceCard service={service} step={index + 1} />
        </ScrollReveal>
      ))}
    </div>
  );
}
