"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clientProof } from "@/lib/data/client-proof";
import { ProofComparison } from "./proof-comparison";
import { SectionHeading } from "@/components/shared-components/section-heading";

gsap.registerPlugin(ScrollTrigger);

export function ClientProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const savingsRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const savingsEl = savingsRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = section.querySelectorAll<HTMLElement>("[data-proof-reveal]");
    if (reduceMotion) {
      gsap.set(revealTargets, { opacity: 1, y: 0 });
      if (savingsEl) {
        savingsEl.textContent = `${clientProof.savings.prefix}${clientProof.savings.amount}`;
      }
      return;
    }
    gsap.set(revealTargets, { opacity: 0, y: 28 });
    const ctx = gsap.context(() => {
      gsap.to(revealTargets, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
      if (savingsEl) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: clientProof.savings.amount,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.35,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
          onUpdate: () => {
            savingsEl.textContent = `${clientProof.savings.prefix}${Math.round(counter.value)}`;
          },
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,153,126,0.07),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/20 to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div data-proof-reveal className="mx-auto mb-12 flex max-w-3xl justify-center sm:mb-16">
          <SectionHeading
            tone="cinematic"
            title={clientProof.headline}
            align="center"
            className="mb-0"
          />
        </div>
        <div data-proof-reveal>
          <ProofComparison before={clientProof.before} after={clientProof.after} />
        </div>
        <div data-proof-reveal className="mt-10 sm:mt-12">
          <p className="font-display text-3xl tracking-tight text-text sm:text-4xl md:text-5xl">
            <span ref={savingsRef} className="text-champagne">
              {clientProof.savings.prefix}0
            </span>{" "}
            {clientProof.savings.label}
          </p>
        </div>
        <blockquote data-proof-reveal className="mx-auto mt-8 max-w-lg">
          <p className="text-sm italic leading-relaxed text-text/85 sm:text-base">
            &ldquo;{clientProof.testimonial.quote}&rdquo;
          </p>
          <footer className="mt-3 text-xs font-medium text-muted">
            {clientProof.testimonial.name} · {clientProof.testimonial.role}
          </footer>
        </blockquote>
        <div data-proof-reveal className="mt-10">
          <Link
            href={clientProof.cta.href}
            className="cursor-pointer inline-flex items-center gap-2 font-semibold text-text transition-colors hover:text-accent"
          >
            {clientProof.cta.label}
            <span aria-hidden="true" className="text-champagne">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
