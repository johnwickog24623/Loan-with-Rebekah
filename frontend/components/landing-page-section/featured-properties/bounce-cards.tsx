"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BounceCardFace, DEFAULT_BOUNCE_TRANSFORMS } from "./bounce-card-face";
import { pushBounceSiblings, resetBounceSiblings } from "./bounce-card-hover";

gsap.registerPlugin(ScrollTrigger);

interface BounceCardsProps {
  className?: string;
  images?: string[];
  alts?: string[];
  hrefs?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  onHoverIndex?: (index: number | null) => void;
}

export function BounceCards({
  className = "",
  images = [],
  alts = [],
  hrefs = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.12,
  animationStagger = 0.09,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = DEFAULT_BOUNCE_TRANSFORMS,
  enableHover = false,
  onHoverIndex,
}: BounceCardsProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  useEffect(() => {
    const desktop = desktopRef.current;
    const mobile = mobileRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const root = isDesktop ? desktop : mobile;
    if (!root) return;
    const inners = root.querySelectorAll<HTMLElement>(".card-inner");
    if (inners.length === 0) return;
    if (reduceMotion) {
      gsap.set(inners, { scale: 1 });
      hasAnimatedRef.current = true;
      return;
    }
    gsap.set(inners, { scale: 0 });
    const ctx = gsap.context(() => {
      const tween = gsap.to(inners, {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
        paused: true,
        onComplete: () => {
          hasAnimatedRef.current = true;
        },
      });
      ScrollTrigger.create({
        trigger: root,
        start: "top 78%",
        once: true,
        onEnter: () => {
          if (!hasAnimatedRef.current) tween.play(0);
        },
      });
    }, root);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [animationDelay, animationStagger, easeType, images.length]);
  const pushSiblings = (hoveredIdx: number) => {
    pushBounceSiblings({
      desktopRef,
      imagesLength: images.length,
      hoveredIdx,
      transformStyles,
      enableHover,
      hasAnimated: hasAnimatedRef.current,
      onHoverIndex,
    });
  };
  const resetSiblings = () => {
    resetBounceSiblings({
      desktopRef,
      imagesLength: images.length,
      transformStyles,
      enableHover,
      hasAnimated: hasAnimatedRef.current,
      onHoverIndex,
    });
  };
  return (
    <>
      <div
        ref={mobileRef}
        className={`mx-auto flex w-full max-w-[280px] flex-col items-center gap-4 md:hidden ${className}`}
      >
        {images.map((src, idx) => {
          const href = hrefs[idx];
          const label = alts[idx] ?? `Property ${idx + 1}`;
          const face = <BounceCardFace src={src} alt={label} className="aspect-[4/3] w-full" />;
          if (!href) {
            return (
              <button
                key={`mobile-${src}-${idx}`}
                type="button"
                className="card w-full cursor-pointer border-0 bg-transparent p-0"
                onClick={() => onHoverIndex?.(idx)}
                aria-label={label}
              >
                {face}
              </button>
            );
          }
          return (
            <Link
              key={`mobile-${src}-${idx}`}
              href={href}
              className="card block w-full cursor-pointer"
              onClick={() => onHoverIndex?.(idx)}
              aria-label={`View ${label}`}
            >
              {face}
            </Link>
          );
        })}
      </div>
      <div
        ref={desktopRef}
        className={`relative mx-auto hidden items-center justify-center md:flex ${className}`}
        style={{ width: containerWidth, height: containerHeight }}
      >
        {images.map((src, idx) => {
          const href = hrefs[idx];
          const label = alts[idx] ?? `Property ${idx + 1}`;
          const face = (
            <BounceCardFace
              src={src}
              alt={label}
              className="aspect-square w-[250px] cursor-pointer md:w-[280px] md:rounded-[30px] md:border-[5px] md:border-surface"
            />
          );
          if (!href) {
            return (
              <div
                key={`desktop-${src}-${idx}`}
                className={`card card-${idx} absolute`}
                style={{ transform: transformStyles[idx] || "none" }}
                onMouseEnter={() => pushSiblings(idx)}
                onMouseLeave={resetSiblings}
              >
                {face}
              </div>
            );
          }
          return (
            <Link
              key={`desktop-${src}-${idx}`}
              href={href}
              className={`card card-${idx} absolute cursor-pointer`}
              style={{ transform: transformStyles[idx] || "none" }}
              onMouseEnter={() => pushSiblings(idx)}
              onMouseLeave={resetSiblings}
              aria-label={`View ${label}`}
            >
              {face}
            </Link>
          );
        })}
      </div>
    </>
  );
}
