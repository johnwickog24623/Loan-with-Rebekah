"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared-components/section-heading";
import { properties } from "@/lib/data/properties";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import { BounceCards } from "./bounce-cards";

const FEATURED_COUNT = 8;

export function FeaturedPropertiesSection() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const featured = properties.slice(0, FEATURED_COUNT);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? featured[3] : featured[activeIndex];
  return (
    <section
      ref={sectionRef}
      id="featured-properties"
      className="relative px-6 py-8 md:px-12 md:py-16 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div data-reveal>
          <SectionHeading
            tone="cinematic"
            eyebrow="Featured Properties"
            title="Handpicked homes and investments"
            description="Explore our curated selection of premium listings across top markets."
            align="center"
            className="mb-10 md:mb-12"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full sm:overflow-visible">
            <BounceCards
              images={featured.map((property) => property.image)}
              alts={featured.map((property) => property.title)}
              hrefs={featured.map((property) => `/listings/${property.slug}`)}
              containerWidth={980}
              containerHeight={500}
              animationDelay={0.12}
              animationStagger={0.07}
              enableHover
              onHoverIndex={setActiveIndex}
            />
          </div>
          <div className="mt-8 max-w-md text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              {active.tag}
            </p>
            <h3 className="mt-2 font-display text-2xl text-text md:text-3xl">
              {active.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{active.location}</p>
            <p className="mt-3 text-lg font-semibold text-text">{active.price}</p>
            <Link
              href="/listings"
              className="mt-5 inline-block cursor-pointer text-sm font-medium text-accent transition-colors hover:text-jet"
            >
              View all listings &rarr;
            </Link>
          </div>
          <p className="mt-6 text-center text-xs text-muted md:hidden">
            Tap a card to open its listing
          </p>
          <p className="mt-6 hidden text-center text-xs text-muted md:block">
            Hover to preview · Click a card to open its listing
          </p>
        </div>
      </div>
    </section>
  );
}
