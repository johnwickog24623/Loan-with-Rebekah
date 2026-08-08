"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/types/testimonial";
import { TestimonialCard } from "./testimonial-card";
import { CarouselNavButton } from "./carousel-nav-button";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const AUTO_SCROLL_SPEED = 0.5;
const RESUME_DELAY_MS = 2500;

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const loopItems = [...testimonials, ...testimonials];
  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
      setIsPaused(false);
    }, RESUME_DELAY_MS);
  }, []);
  const scrollByCard = useCallback(
    (direction: "left" | "right") => {
      const track = trackRef.current;
      if (!track) return;
      const slide = track.querySelector("[data-testimonial-slide]");
      const cardWidth = slide?.getBoundingClientRect().width ?? 380;
      track.scrollBy({
        left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16,
        behavior: "smooth",
      });
      pauseAutoScroll();
    },
    [pauseAutoScroll]
  );
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    if (showAll) return;
    const track = trackRef.current;
    if (!track) return;
    let animationId = 0;
    const tick = () => {
      if (!isPausedRef.current) {
        track.scrollLeft += AUTO_SCROLL_SPEED;
        const loopWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= loopWidth) {
          track.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [showAll]);
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);
  if (showAll) {
    return (
      <div>
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} variant="grid" />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(false)}
            className="cursor-pointer rounded-lg border border-[color:var(--color-line)] bg-surface/70 px-8 py-3 text-sm font-medium text-text transition-colors hover:border-accent/50 hover:bg-accent hover:text-ink"
            aria-label="Show testimonials carousel"
          >
            Show Carousel
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="relative md:flex md:items-center md:gap-5">
        <CarouselNavButton
          direction="left"
          onClick={() => scrollByCard("left")}
          label="Previous testimonial"
          className="absolute left-1 top-1/2 z-20 -translate-y-1/2 md:static md:translate-y-0"
        />
        <div className="relative min-w-0 md:flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/40 to-transparent md:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/40 to-transparent md:w-12" />
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-12 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 md:px-0 [&::-webkit-scrollbar]:hidden"
            onMouseEnter={() => {
              isPausedRef.current = true;
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
              setIsPaused(false);
            }}
            onTouchStart={pauseAutoScroll}
            onScroll={pauseAutoScroll}
            aria-label="Testimonials carousel"
          >
            {loopItems.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                data-testimonial-slide
                className="w-[calc(100vw-6.5rem)] max-w-[380px] shrink-0 snap-center md:w-[380px]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
        <CarouselNavButton
          direction="right"
          onClick={() => scrollByCard("right")}
          label="Next testimonial"
          className="absolute right-1 top-1/2 z-20 -translate-y-1/2 md:static md:translate-y-0"
        />
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="cursor-pointer rounded-lg bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
          aria-label="See all testimonial cards"
        >
          See More Cards
        </button>
      </div>
    </div>
  );
}
