"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollZoomProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollZoom({ children, className = "" }: ScrollZoomProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > [data-scroll-zoom]"),
    );
    if (sections.length === 0) return;
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.set(section, {
          transformOrigin: "50% 50%",
          force3D: true,
          willChange: "transform, opacity",
        });
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .fromTo(
            section,
            { scale: 0.9, opacity: 0.45 },
            { scale: 1, opacity: 1, duration: 0.42 },
          )
          .to(section, { scale: 0.88, opacity: 0.55, duration: 0.58 });
      });
    }, root);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);
  return (
    <div ref={rootRef} className={`relative z-10 overflow-x-clip ${className}`.trim()}>
      {children}
    </div>
  );
}
