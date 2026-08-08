"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseSectionRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

export function useSectionReveal<T extends HTMLElement>(
  options: UseSectionRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    y = 36,
    duration = 0.9,
    stagger = 0.12,
    start = "top 82%",
    once = true,
  } = options;
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;
    if (reduceMotion) {
      gsap.set(targets, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }
    gsap.set(targets, { opacity: 0, y });
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start,
          once,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [duration, once, start, stagger, y]);
  return ref;
}
