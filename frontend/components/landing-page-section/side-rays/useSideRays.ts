"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { Mesh, Renderer } from "ogl";
import {
  applySideRaysUniforms,
  createSideRaysScene,
  type SideRaysInitConfig,
  type SideRaysUniforms,
} from "./side-rays-scene";

export function useSideRays(
  containerRef: RefObject<HTMLDivElement | null>,
  config: SideRaysInitConfig,
) {
  const {
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
  } = config;
  const uniformsRef = useRef<SideRaysUniforms | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 },
    );
    observerRef.current.observe(containerRef.current);
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [containerRef]);
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    cleanupFunctionRef.current?.();
    cleanupFunctionRef.current = null;
    const initConfig: SideRaysInitConfig = {
      speed,
      rayColor1,
      rayColor2,
      intensity,
      spread,
      origin,
      tilt,
      saturation,
      blend,
      falloff,
      opacity,
    };
    const initializeWebGL = async () => {
      if (!containerRef.current) return;
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
      if (!containerRef.current) return;
      const { renderer, mesh, uniforms, updateSize } = createSideRaysScene(
        containerRef.current,
        initConfig,
      );
      rendererRef.current = renderer;
      uniformsRef.current = uniforms;
      meshRef.current = mesh;
      const loop = (time: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = time * 0.001;
        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch {
          return;
        }
      };
      window.addEventListener("resize", updateSize);
      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);
      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        window.removeEventListener("resize", updateSize);
        try {
          const canvas = renderer.gl.canvas;
          renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
          canvas.parentNode?.removeChild(canvas);
        } catch {
          return;
        }
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };
    void initializeWebGL();
    return () => {
      cleanupFunctionRef.current?.();
      cleanupFunctionRef.current = null;
    };
  }, [
    isVisible,
    containerRef,
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
  ]);
  useEffect(() => {
    if (!uniformsRef.current) return;
    applySideRaysUniforms(uniformsRef.current, {
      speed,
      rayColor1,
      rayColor2,
      intensity,
      spread,
      origin,
      tilt,
      saturation,
      blend,
      falloff,
      opacity,
    });
  }, [
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
  ]);
}
