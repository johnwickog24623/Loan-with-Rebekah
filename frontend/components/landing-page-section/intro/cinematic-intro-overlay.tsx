"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CinematicIntroOverlayProps {
  onIntroComplete?: () => void;
}

export function CinematicIntroOverlay({ onIntroComplete }: CinematicIntroOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const hasCalledCompleteRef = useRef(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIsComplete(true);
      if (onIntroComplete && !hasCalledCompleteRef.current) {
        hasCalledCompleteRef.current = true;
        onIntroComplete();
      }
      return;
    }
    let animationFrameId: number;
    let time = 0;
    const state = { scale: 1 };
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const targetScale = Math.max(350, Math.ceil(350 * (window.innerHeight / Math.max(window.innerWidth, 1))));
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      },
    });
    tl.to({}, { duration: 1.0 })
      .to(state, {
        scale: targetScale,
        duration: 1.3,
        ease: "power3.inOut",
      })
      .call(() => {
        if (onIntroComplete && !hasCalledCompleteRef.current) {
          hasCalledCompleteRef.current = true;
          onIntroComplete();
        }
      }, [], "-=0.6")
      .to(
        container,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
    const getFontString = (size: number) =>
      `900 ${size}px "Manrope", "Bodoni Moda", system-ui, -apple-system, sans-serif`;
    const render = () => {
      time += 0.005;
      const w = canvas.width;
      const h = canvas.height;
      const text = "LOANS WITH REBEKAH";
      ctx.font = getFontString(100);
      const measured = ctx.measureText(text).width;
      const targetWidth = w * 0.94;
      const fontScale = targetWidth / Math.max(measured, 1);
      const fontSize = Math.max(Math.round(100 * fontScale), 32);
      const font = getFontString(fontSize);
      ctx.font = font;
      const totalWidth = ctx.measureText(text).width;
      const prefixWidth = ctx.measureText("LOANS WI").width;
      const tWidth = ctx.measureText("T").width;
      const startX = (w - totalWidth) / 2;
      const originX = startX + prefixWidth + tWidth / 2;
      const originY = h / 2;
      ctx.save();
      ctx.clearRect(0, 0, w, h);
      ctx.translate(originX, originY);
      ctx.scale(state.scale, state.scale);
      ctx.translate(-originX, -originY);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#121214";
      ctx.fillRect(-w, -h, w * 3, h * 3);
      const grad1 = ctx.createRadialGradient(
        w * 0.5 + Math.sin(time * 0.7) * w * 0.22,
        h * 0.45 + Math.cos(time * 0.5) * h * 0.22,
        w * 0.05,
        w * 0.5,
        h * 0.5,
        w * 0.85
      );
      grad1.addColorStop(0, "rgba(168, 153, 126, 0.95)");
      grad1.addColorStop(0.4, "rgba(61, 74, 92, 0.85)");
      grad1.addColorStop(1, "rgba(18, 18, 20, 0.98)");
      ctx.fillStyle = grad1;
      ctx.fillRect(-w, -h, w * 3, h * 3);
      const grad2 = ctx.createRadialGradient(
        w * 0.35 + Math.cos(time * 0.4) * w * 0.18,
        h * 0.55 + Math.sin(time * 0.6) * h * 0.18,
        0,
        w * 0.35,
        h * 0.55,
        w * 0.55
      );
      grad2.addColorStop(0, "rgba(241, 240, 236, 0.35)");
      grad2.addColorStop(0.5, "rgba(168, 153, 126, 0.2)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(-w, -h, w * 3, h * 3);
      const grad3 = ctx.createRadialGradient(
        w * 0.68 + Math.sin(time * 0.35) * w * 0.18,
        h * 0.35 + Math.cos(time * 0.45) * h * 0.18,
        0,
        w * 0.68,
        h * 0.35,
        w * 0.45
      );
      grad3.addColorStop(0, "rgba(168, 153, 126, 0.4)");
      grad3.addColorStop(0.5, "rgba(61, 74, 92, 0.25)");
      grad3.addColorStop(1, "transparent");
      ctx.fillStyle = grad3;
      ctx.fillRect(-w, -h, w * 3, h * 3);
      ctx.globalCompositeOperation = "destination-out";
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, w / 2, h / 2);
      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      tl.kill();
    };
  }, [onIntroComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] pointer-events-none overflow-hidden bg-transparent"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
