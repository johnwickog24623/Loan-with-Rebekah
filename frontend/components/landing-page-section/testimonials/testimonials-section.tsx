"use client";

import { SectionHeading } from "@/components/shared-components/section-heading";
import { testimonials } from "@/lib/data/testimonials";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { TestimonialCarousel } from "./testimonial-carousel";

export function TestimonialsSection() {
  const sectionRef = useSectionReveal<HTMLElement>();
  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-transparent px-6 py-8 md:px-12 md:py-16 lg:px-16"
    >
      <div data-reveal className="mx-auto mb-6 flex max-w-2xl justify-center md:mb-12">
        <SectionHeading
          tone="cinematic"
          title="What our clients say"
          description="Real stories from clients who financed their homes with Loans with Rebekah."
          align="center"
          className="mb-0"
        />
      </div>
      <div data-reveal className="mx-auto max-w-6xl">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
