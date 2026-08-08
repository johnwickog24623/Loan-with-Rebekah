"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InfiniteGridMenu } from "./infinite-menu-grid";
import type { MenuItem } from "./infinite-menu-types";

interface InfiniteMenuProps {
  items?: MenuItem[];
  scale?: number;
}

export function InfiniteMenu({ items = [], scale = 1 }: InfiniteMenuProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(items[0] ?? null);
  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    let sketch: InfiniteGridMenu | null = null;
    sketch = new InfiniteGridMenu(
      canvas,
      items,
      (index) => {
        setActiveItem(items[index % items.length] ?? null);
      },
      setIsMoving,
      (sk) => sk.run(),
      scale,
    );
    const handleResize = () => sketch?.resize();
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      sketch?.destroy();
    };
  }, [items, scale]);
  const overlayHidden = isMoving
    ? "pointer-events-none opacity-0 duration-100"
    : "pointer-events-auto opacity-100 duration-500";
  return (
    <div className="relative flex h-full w-full flex-col lg:grid lg:grid-cols-[minmax(11rem,1fr)_minmax(16rem,1.35fr)_minmax(11rem,1fr)] lg:items-center">
      <div
        className={`z-10 flex shrink-0 items-center justify-center px-5 pb-3 pt-6 text-center transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] sm:px-8 lg:justify-end lg:px-4 lg:py-0 lg:pr-2 lg:text-right xl:pr-4 ${overlayHidden}`}
      >
        {activeItem ? (
          <h2 className="max-w-[12ch] select-none font-display text-3xl leading-[1.1] text-text sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl">
            {activeItem.title}
          </h2>
        ) : null}
      </div>
      <div className="relative min-h-[52svh] w-full flex-1 lg:h-full lg:min-h-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab overflow-hidden outline-none active:cursor-grabbing"
          aria-label="Drag to explore markets"
        />
      </div>
      <div
        className={`z-10 flex shrink-0 items-center justify-center px-5 pb-24 pt-3 text-center transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] sm:px-8 lg:justify-start lg:px-4 lg:pb-0 lg:pl-2 lg:pt-0 lg:text-left xl:pl-4 ${overlayHidden}`}
      >
        {activeItem ? (
          <p className="max-w-[28ch] select-none text-sm leading-relaxed text-muted sm:text-base lg:max-w-[18ch] xl:max-w-[22ch]">
            {activeItem.description}
          </p>
        ) : null}
      </div>
      {activeItem ? (
        <Link
          href={activeItem.link}
          className={`absolute bottom-6 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-line)] bg-accent text-ink shadow-[0_12px_32px_rgba(26,26,28,0.16)] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-jet sm:bottom-8 sm:h-14 sm:w-14 ${
            isMoving
              ? "pointer-events-none translate-y-16 scale-0 opacity-0 duration-100"
              : "pointer-events-auto scale-100 opacity-100 duration-500"
          }`}
          aria-label={`Explore ${activeItem.title}`}
        >
          <span className="select-none text-xl leading-none sm:text-2xl" aria-hidden="true">
            &#x2197;
          </span>
        </Link>
      ) : null}
    </div>
  );
}
