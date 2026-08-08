"use client";

import { ScrollStack } from "@/components/shared-components/scroll-stack/scroll-stack";
import { ScrollStackItem } from "@/components/shared-components/scroll-stack/scroll-stack-item";
import { services } from "@/lib/data/services";
import { servicePageDetails } from "@/lib/data/services-page";
import { ServiceStackCard } from "./service-stack-card";

export function ServicesGrid() {
  return (
    <section className="relative px-3 sm:px-4 md:px-0">
      <ScrollStack
        itemDistance={140}
        itemStackDistance={32}
        baseScale={0.92}
        itemScale={0.025}
        stackPosition="18%"
        scaleEndPosition="8%"
        blurAmount={0}
      >
        {services.map((service, index) => {
          const details = servicePageDetails[service.id];
          return (
            <ScrollStackItem
              key={service.id}
              itemClassName="my-6 overflow-hidden rounded-[1.75rem] border border-[color:var(--color-line)] bg-surface shadow-[0_24px_64px_rgba(26,26,28,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] sm:my-8 sm:rounded-[2rem] md:rounded-[2.5rem]"
            >
              <ServiceStackCard
                index={index}
                title={service.title}
                icon={service.icon}
                description={details.longDescription}
                features={details.features}
              />
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
