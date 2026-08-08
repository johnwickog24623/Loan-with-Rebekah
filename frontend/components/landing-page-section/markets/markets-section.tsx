"use client";

import { useEffect, useState } from "react";
import { neighborhoods } from "@/lib/data/neighborhoods";
import { InfiniteMenu } from "./infinite-menu";
import type { MenuItem } from "./infinite-menu-types";

const marketItems: MenuItem[] = neighborhoods.map((neighborhood) => ({
  image: neighborhood.image,
  link: "/listings",
  title: neighborhood.name,
  description: `${neighborhood.description} ${neighborhood.listings} active listings.`,
}));

export function MarketsSection() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const syncScale = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(1.15);
        return;
      }
      if (width < 1024) {
        setScale(1.05);
        return;
      }
      setScale(1);
    };
    syncScale();
    window.addEventListener("resize", syncScale);
    return () => window.removeEventListener("resize", syncScale);
  }, []);
  return (
    <section
      id="markets"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-3 py-10 sm:px-6 md:px-10 lg:px-12"
    >
      <div className="relative mx-auto h-[min(92svh,900px)] w-full max-w-7xl">
        <InfiniteMenu items={marketItems} scale={scale} />
      </div>
    </section>
  );
}
