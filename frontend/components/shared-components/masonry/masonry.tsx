"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { buildMasonryGrid, getInitialPosition, getMasonryContainerHeight } from "./masonry-layout";
import type { MasonryAnimateFrom, MasonryItem } from "./masonry-types";
import { preloadImages, useMeasure, useMedia } from "./useMasonryLayout";

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: MasonryAnimateFrom;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

export function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)", "(min-width:400px)"],
    [5, 4, 3, 2],
    1,
  );
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);
  const grid = useMemo(() => buildMasonryGrid(width, columns, items), [columns, items, width]);
  const containerHeight = getMasonryContainerHeight(grid);
  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);
  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const start = getInitialPosition(item, containerRef.current, animateFrom);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus ? { filter: "blur(10px)" } : {}),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus ? { filter: "blur(0px)" } : {}),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, containerRef]);
  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: "power2.out" });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement | null;
      if (overlay) gsap.to(overlay, { opacity: 0.35, duration: 0.3 });
    }
  };
  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: "power2.out" });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement | null;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };
  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight || 480 }}>
      {grid.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          data-key={item.id}
          className="absolute box-border cursor-pointer overflow-hidden rounded-xl border border-[color:var(--color-line)] shadow-[0_8px_24px_rgba(26,26,28,0.06)]"
          style={{ willChange: "transform, width, height, opacity" }}
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {colorShiftOnHover ? (
              <div className="color-overlay pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/40 to-transparent opacity-0" />
            ) : null}
            {(item.title || item.subtitle) && (
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                {item.subtitle ? (
                  <span className="mb-2 inline-block rounded-md bg-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent shadow-sm backdrop-blur-sm">
                    {item.subtitle}
                  </span>
                ) : null}
                {item.title ? (
                  <p className="font-display text-lg font-medium text-white drop-shadow-sm md:text-xl">{item.title}</p>
                ) : null}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
