"use client";

import { useEffect, useRef } from "react";

export function CinematicGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const render = () => {
      time += 0.006;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#070a14";
      ctx.fillRect(0, 0, w, h);
      const grad1 = ctx.createRadialGradient(
        w * 0.5 + Math.sin(time * 0.7) * w * 0.22,
        h * 0.45 + Math.cos(time * 0.5) * h * 0.22,
        w * 0.05,
        w * 0.5,
        h * 0.5,
        w * 0.8
      );
      grad1.addColorStop(0, "rgba(20, 35, 75, 0.96)");
      grad1.addColorStop(0.45, "rgba(32, 20, 58, 0.88)");
      grad1.addColorStop(1, "rgba(7, 10, 20, 0.98)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);
      const grad2 = ctx.createRadialGradient(
        w * 0.35 + Math.cos(time * 0.4) * w * 0.18,
        h * 0.55 + Math.sin(time * 0.6) * h * 0.18,
        0,
        w * 0.35,
        h * 0.55,
        w * 0.55
      );
      grad2.addColorStop(0, "rgba(56, 189, 248, 0.2)");
      grad2.addColorStop(0.5, "rgba(99, 102, 241, 0.14)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);
      const grad3 = ctx.createRadialGradient(
        w * 0.68 + Math.sin(time * 0.35) * w * 0.18,
        h * 0.35 + Math.cos(time * 0.45) * h * 0.18,
        0,
        w * 0.68,
        h * 0.35,
        w * 0.45
      );
      grad3.addColorStop(0, "rgba(230, 200, 150, 0.18)");
      grad3.addColorStop(0.5, "rgba(139, 92, 246, 0.12)");
      grad3.addColorStop(1, "transparent");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
