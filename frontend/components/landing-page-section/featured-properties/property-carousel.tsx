"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import type { Property } from "@/lib/types/property";
import { PropertyCard } from "./property-card";

interface PropertyCarouselProps {
  properties: Property[];
}

const AUTO_SCROLL_SPEED = 0.6;
const RESUME_DELAY_MS = 2500;

export function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopItems = [...properties, ...properties];
  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);
  const normalizeOffset = useCallback(() => {
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) return;
    while (offsetRef.current >= loopWidth) {
      offsetRef.current -= loopWidth;
    }
    while (offsetRef.current < 0) {
      offsetRef.current += loopWidth;
    }
  }, []);
  const measureLoopWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    loopWidthRef.current = track.scrollWidth / 2;
  }, []);
  const pauseTemporarily = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        isPausedRef.current = false;
      }
    }, RESUME_DELAY_MS);
  }, []);
  useEffect(() => {
    measureLoopWidth();
    const track = trackRef.current;
    if (!track) return;
    const resizeObserver = new ResizeObserver(() => {
      measureLoopWidth();
      normalizeOffset();
      applyTransform();
    });
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, [applyTransform, measureLoopWidth, normalizeOffset]);
  useEffect(() => {
    let animationId = 0;
    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        offsetRef.current += AUTO_SCROLL_SPEED;
        normalizeOffset();
        applyTransform();
      }
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [applyTransform, normalizeOffset]);
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("a, button")) return;
    isDraggingRef.current = true;
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = event.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current - delta;
    normalizeOffset();
    applyTransform();
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pauseTemporarily();
  };
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent" />
      <div
        className="cursor-grab touch-pan-y select-none overflow-hidden pb-1 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          isPausedRef.current = true;
          if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        }}
        onMouseLeave={() => {
          if (!isDraggingRef.current) {
            isPausedRef.current = false;
          }
        }}
        aria-label="Featured properties carousel"
        role="region"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
        >
          {loopItems.map((property, index) => (
            <PropertyCard key={`${property.id}-${index}`} property={property} />
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Drag left or right to browse · Auto-plays when idle
      </p>
    </div>
  );
}
