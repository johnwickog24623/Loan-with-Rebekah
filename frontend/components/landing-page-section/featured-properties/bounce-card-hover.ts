import gsap from "gsap";
import type { RefObject } from "react";
import { getNoRotationTransform, getPushedTransform } from "./bounce-card-face";

export function pushBounceSiblings({
  desktopRef,
  imagesLength,
  hoveredIdx,
  transformStyles,
  enableHover,
  hasAnimated,
  onHoverIndex,
}: {
  desktopRef: RefObject<HTMLDivElement | null>;
  imagesLength: number;
  hoveredIdx: number;
  transformStyles: string[];
  enableHover: boolean;
  hasAnimated: boolean;
  onHoverIndex?: (index: number | null) => void;
}) {
  if (!enableHover || !desktopRef.current || !hasAnimated) return;
  onHoverIndex?.(hoveredIdx);
  const q = gsap.utils.selector(desktopRef);
  for (let i = 0; i < imagesLength; i++) {
    const selector = q(`.card-${i}`);
    gsap.killTweensOf(selector);
    const baseTransform = transformStyles[i] || "none";
    if (i === hoveredIdx) {
      gsap.to(selector, {
        transform: getNoRotationTransform(baseTransform),
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
      continue;
    }
    const offsetX = i < hoveredIdx ? -170 : 170;
    gsap.to(selector, {
      transform: getPushedTransform(baseTransform, offsetX),
      duration: 0.4,
      ease: "back.out(1.4)",
      delay: Math.abs(hoveredIdx - i) * 0.05,
      overwrite: "auto",
    });
  }
}

export function resetBounceSiblings({
  desktopRef,
  imagesLength,
  transformStyles,
  enableHover,
  hasAnimated,
  onHoverIndex,
}: {
  desktopRef: RefObject<HTMLDivElement | null>;
  imagesLength: number;
  transformStyles: string[];
  enableHover: boolean;
  hasAnimated: boolean;
  onHoverIndex?: (index: number | null) => void;
}) {
  if (!enableHover || !desktopRef.current || !hasAnimated) return;
  onHoverIndex?.(null);
  const q = gsap.utils.selector(desktopRef);
  for (let i = 0; i < imagesLength; i++) {
    const selector = q(`.card-${i}`);
    gsap.killTweensOf(selector);
    gsap.to(selector, {
      transform: transformStyles[i] || "none",
      duration: 0.4,
      ease: "back.out(1.4)",
      overwrite: "auto",
    });
  }
}
