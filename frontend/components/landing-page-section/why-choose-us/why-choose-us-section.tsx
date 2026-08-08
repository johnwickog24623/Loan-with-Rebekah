"use client";

import { SectionHeading } from "@/components/shared-components/section-heading";
import { ScrollStack } from "@/components/shared-components/scroll-stack/scroll-stack";
import { ScrollStackItem } from "@/components/shared-components/scroll-stack/scroll-stack-item";
import { benefits } from "@/lib/data/benefits";
import { BenefitStackCard } from "./benefit-stack-card";

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="relative bg-transparent">
      <div className="px-6 pt-8 md:px-12 md:pt-16 lg:px-16">
        <div className="mx-auto mb-4 flex max-w-2xl justify-center md:mb-6">
          <SectionHeading
            tone="cinematic"
            title="Trusted Mortgage Brokerage Excellence"
            description="Combining market intelligence, personalized loan structuring, and 24/7 AI scheduling."
            align="center"
            className="mb-0"
          />
        </div>
      </div>
      <ScrollStack
        itemDistance={120}
        itemStackDistance={30}
        baseScale={0.92}
        itemScale={0.025}
        stackPosition="20%"
        scaleEndPosition="10%"
        blurAmount={0}
      >
        {benefits.map((benefit, index) => (
          <ScrollStackItem
            key={benefit.id}
            itemClassName="my-8 overflow-hidden rounded-[40px] border border-[color:var(--color-line)] bg-surface shadow-[0_24px_64px_rgba(26,26,28,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <BenefitStackCard benefit={benefit} index={index} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
