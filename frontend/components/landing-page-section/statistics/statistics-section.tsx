"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statistics } from "@/lib/data/statistics";
import type { Statistic } from "@/lib/types/statistic";

gsap.registerPlugin(ScrollTrigger);

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: Number(match[1]), suffix: match[2] ?? "" };
}

interface StatItemProps {
  stat: Statistic;
}

function StatItem({ stat }: StatItemProps) {
  const valueRef = useRef<HTMLParagraphElement>(null);
  const { number, suffix } = parseStatValue(stat.value);
  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || number === 0) {
      el.textContent = stat.value;
      return;
    }
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: number,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.value)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [number, stat.value, suffix]);
  return (
    <div className="text-center">
      <p
        ref={valueRef}
        className="font-display text-4xl text-text md:text-5xl"
      >
        {stat.value}
      </p>
      <p className="mt-2 text-sm text-muted">{stat.label}</p>
    </div>
  );
}

export function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll("[data-stat]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(items, { opacity: 0, y: 24 });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="statistics"
      className="relative border-y border-[color:var(--color-line)] bg-surface/85 px-6 py-6 backdrop-blur-sm md:px-12 md:py-14 lg:px-16"
    >
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {statistics.map((stat) => (
          <div key={stat.id} data-stat>
            <StatItem stat={stat} />
          </div>
        ))}
      </div>
    </section>
  );
}
