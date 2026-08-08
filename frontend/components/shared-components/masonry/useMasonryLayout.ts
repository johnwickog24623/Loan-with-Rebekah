"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useMedia(queries: string[], values: number[], defaultValue: number): number {
  const queryKey = queries.join("|");
  const valueKey = values.join("|");
  const get = () => {
    const index = queries.findIndex((q) => matchMedia(q).matches);
    return values[index] ?? defaultValue;
  };
  const [value, setValue] = useState<number>(defaultValue);
  useEffect(() => {
    const sync = () => setValue(get());
    sync();
    const medias = queries.map((q) => matchMedia(q));
    medias.forEach((m) => m.addEventListener("change", sync));
    return () => medias.forEach((m) => m.removeEventListener("change", sync));
  }, [queryKey, valueKey, defaultValue]);
  return value;
}

export function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

export async function preloadImages(urls: string[]): Promise<void> {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
}
