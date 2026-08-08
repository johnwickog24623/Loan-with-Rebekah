"use client";

import { RefObject } from "react";

interface HeroCloudsProps {
  bgRef: RefObject<HTMLDivElement | null>;
  mgRef: RefObject<HTMLDivElement | null>;
  fgRef: RefObject<HTMLDivElement | null>;
}

const CLOUD_TEXTURE_1 = "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1800&q=80";
const CLOUD_TEXTURE_2 = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1800&q=80";

export function HeroClouds({ bgRef, mgRef, fgRef }: HeroCloudsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 overflow-hidden md:h-72 lg:h-80" aria-hidden="true">
      <div ref={bgRef} className="absolute inset-0 translate-y-6 opacity-60">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-50 mix-blend-overlay"
          style={{ 
            backgroundImage: `url(${CLOUD_TEXTURE_1})`,
            maskImage: "radial-gradient(ellipse at 50% 100%, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 100%, black 40%, transparent 80%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[#a8997e]/20 to-transparent opacity-80" />
      </div>
      <div ref={mgRef} className="absolute inset-0 translate-y-4 opacity-80">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-65 mix-blend-soft-light"
          style={{ 
            backgroundImage: `url(${CLOUD_TEXTURE_2})`,
            maskImage: "radial-gradient(ellipse at 50% 80%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 80%, black 30%, transparent 75%)"
          }}
        />
        <svg className="absolute inset-x-0 bottom-0 h-full w-full opacity-70" viewBox="0 0 1440 360" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="mistGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7f6f3" stopOpacity="0" />
              <stop offset="50%" stopColor="#ded3c1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f7f6f3" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M0,200 C300,120 600,240 900,150 C1200,60 1350,180 1440,160 L1440,360 L0,360 Z" fill="url(#mistGrad1)" />
        </svg>
      </div>
      <div ref={fgRef} className="absolute inset-0 opacity-95">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-40 mix-blend-luminosity"
          style={{ 
            backgroundImage: `url(${CLOUD_TEXTURE_1})`,
            maskImage: "radial-gradient(ellipse at 50% 90%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 90%, black 20%, transparent 70%)"
          }}
        />
        <svg className="absolute inset-x-0 bottom-0 h-full w-full" viewBox="0 0 1440 360" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="mistGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#f7f6f3" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#f7f6f3" stopOpacity="1" />
            </linearGradient>
            <filter id="softFog" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <path d="M0,220 C240,150 480,260 720,180 C960,100 1200,230 1440,190 L1440,360 L0,360 Z" fill="url(#mistGrad2)" filter="url(#softFog)" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/90 to-transparent" />
    </div>
  );
}
