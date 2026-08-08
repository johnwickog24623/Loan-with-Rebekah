"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroClouds } from "./hero-clouds";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "/mortgage-hero.png";

interface HeroSectionProps {
  isIntroFinished?: boolean;
}

export function HeroSection({ isIntroFinished = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgCloudRef = useRef<HTMLDivElement>(null);
  const mgCloudRef = useRef<HTMLDivElement>(null);
  const fgCloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (bgImageRef.current && !reduceMotion) {
      gsap.to(bgImageRef.current, {
        scale: 1.05,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    const targets = [
      brandRef.current,
      titleRef.current,
      copyRef.current,
      ctaRef.current,
    ];
    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    if (!isIntroFinished) {
      gsap.set(targets, { opacity: 0, y: 24 });
      return;
    }
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (bgImageRef.current) {
        intro.fromTo(bgImageRef.current, { scale: 1.08 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0);
      }
      intro
        .fromTo(brandRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75 }, 0.2)
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.45"
        )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.4"
        );
      if (fgCloudRef.current && mgCloudRef.current && bgCloudRef.current) {
        const cloudTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        cloudTimeline
          .to(fgCloudRef.current, { y: -200, scale: 1.2, opacity: 0.1, ease: "none" }, 0)
          .to(mgCloudRef.current, { y: -120, scale: 1.1, opacity: 0.35, ease: "none" }, 0)
          .to(bgCloudRef.current, { y: -60, scale: 1.05, opacity: 0.8, ease: "none" }, 0);
      }
    }, section);
    return () => ctx.revert();
  }, [isIntroFinished]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden">
      <div ref={bgImageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={HERO_IMAGE}
          alt="Loans With Rebekah Mortgage Financing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/65 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />
      </div>

      <div className="relative z-30 flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-28 text-center md:px-12 md:pb-24 lg:px-16">
        <div className="max-w-4xl space-y-4">
          <p
            ref={brandRef}
            className="font-display text-xl tracking-widest text-accent uppercase font-medium opacity-0 md:text-2xl"
          >
            Loans With Rebekah
          </p>
          <h1
            ref={titleRef}
            className="font-script text-4xl font-normal leading-[1.2] tracking-wide text-text opacity-0 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Your Trusted Mortgage Brokerage.
          </h1>
          <p
            ref={copyRef}
            className="mx-auto max-w-2xl text-base text-text/90 opacity-0 md:text-lg leading-relaxed font-medium"
          >
            Personalized home purchase financing, rate optimization, and seamless refinancing. Guided directly by Rebekah and backed by 24/7 AI Voice Assistant scheduling.
          </p>
          <div
            ref={ctaRef}
            className="flex flex-wrap justify-center gap-4 opacity-0 pt-4"
          >
            <Link
              href="#booking"
              className="cursor-pointer rounded-xl bg-accent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-jet shadow-lg"
            >
              Book Call with Rebekah
            </Link>
            <Link
              href="#calculator"
              className="cursor-pointer rounded-xl border border-line bg-surface/80 px-8 py-3.5 font-semibold text-text shadow-sm backdrop-blur-sm transition-colors hover:border-accent/35 hover:bg-surface"
            >
              Calculate Payment
            </Link>
          </div>
        </div>
      </div>
      <HeroClouds bgRef={bgCloudRef} mgRef={mgCloudRef} fgRef={fgCloudRef} />
    </section>
  );
}
