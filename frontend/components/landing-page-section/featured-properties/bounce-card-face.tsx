import Image from "next/image";

export const DEFAULT_BOUNCE_TRANSFORMS = [
  "rotate(14deg) translate(-315px)",
  "rotate(10deg) translate(-225px)",
  "rotate(5deg) translate(-115px)",
  "rotate(-2deg) translate(-35px)",
  "rotate(2deg) translate(35px)",
  "rotate(-6deg) translate(115px)",
  "rotate(-11deg) translate(225px)",
  "rotate(-15deg) translate(315px)",
];

export function getNoRotationTransform(transformStr: string): string {
  const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
  if (hasRotate) {
    return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
  }
  if (transformStr === "none") {
    return "rotate(0deg)";
  }
  return `${transformStr} rotate(0deg)`;
}

export function getPushedTransform(baseTransform: string, offsetX: number): string {
  const translateRegex = /translate\(([-0-9.]+)px\)/;
  const match = baseTransform.match(translateRegex);
  if (match) {
    const currentX = parseFloat(match[1]);
    const newX = currentX + offsetX;
    return baseTransform.replace(translateRegex, `translate(${newX}px)`);
  }
  return baseTransform === "none"
    ? `translate(${offsetX}px)`
    : `${baseTransform} translate(${offsetX}px)`;
}

interface BounceCardFaceProps {
  src: string;
  alt: string;
  className?: string;
}

export function BounceCardFace({ src, alt, className = "" }: BounceCardFaceProps) {
  return (
    <div
      className={`card-inner overflow-hidden rounded-2xl border border-[color:var(--color-line)] ${className}`}
      style={{ boxShadow: "0 20px 48px rgba(26, 26, 28, 0.14)" }}
    >
      <div className="relative h-full w-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="280px" />
      </div>
    </div>
  );
}
