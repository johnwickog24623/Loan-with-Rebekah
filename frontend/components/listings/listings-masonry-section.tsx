"use client";

import { useMemo } from "react";
import { Masonry } from "@/components/shared-components/masonry/masonry";
import { toMasonryListings } from "@/lib/utils/property";

export function ListingsMasonrySection() {
  const items = useMemo(() => toMasonryListings(), []);
  return (
    <section className="relative px-6 pb-10 md:px-12 md:pb-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Masonry
          items={items}
          animateFrom="bottom"
          blurToFocus
          scaleOnHover
          hoverScale={0.97}
          colorShiftOnHover
          stagger={0.06}
        />
      </div>
    </section>
  );
}
