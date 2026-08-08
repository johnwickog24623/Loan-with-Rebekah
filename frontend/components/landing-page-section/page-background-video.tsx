"use client";

import { useScrollControlledVideo } from "@/lib/hooks/useScrollControlledVideo";

const VIDEO_URL = "/videos/hero-scrub.mp4";

export function PageBackgroundVideo() {
  const videoRef = useScrollControlledVideo();
  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full transform-gpu object-cover"
    >
      <source src={VIDEO_URL} type="video/mp4" />
    </video>
  );
}
