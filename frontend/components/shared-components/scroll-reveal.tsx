"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-in"
  | "fade-down"
  | "slide-left"
  | "slide-right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: ScrollRevealVariant;
  threshold?: number;
  once?: boolean;
}

const hiddenClasses: Record<ScrollRevealVariant, string> = {
  "fade-up": "translate-y-10 opacity-0",
  "fade-in": "opacity-0",
  "fade-down": "-translate-y-10 opacity-0",
  "slide-left": "-translate-x-10 opacity-0",
  "slide-right": "translate-x-10 opacity-0",
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 700,
  variant = "fade-up",
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);
  return (
    <div
      ref={ref}
      className={`transform transition-all ease-out will-change-transform ${
        visible ? "translate-x-0 translate-y-0 opacity-100" : hiddenClasses[variant]
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
