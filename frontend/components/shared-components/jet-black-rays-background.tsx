"use client";

import { useEffect, useState } from "react";
import { SideRays } from "@/components/landing-page-section/side-rays/side-rays";

export function JetBlackRaysBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      {!reduceMotion ? (
        <>
          <div className="absolute inset-0">
            <SideRays
              origin="top-right"
              rayColor1="#c8cdd4"
              rayColor2="#96a8c4"
              speed={2.2}
              intensity={2}
              spread={2.2}
              tilt={-6}
              saturation={1.25}
              blend={0.7}
              falloff={1.25}
              opacity={0.85}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="absolute inset-0">
            <SideRays
              origin="top-left"
              rayColor1="#d5dae1"
              rayColor2="#a8b8d0"
              speed={1.8}
              intensity={1.65}
              spread={2}
              tilt={6}
              saturation={1.15}
              blend={0.65}
              falloff={1.3}
              opacity={0.7}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}
