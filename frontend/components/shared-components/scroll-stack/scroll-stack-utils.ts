export function calculateProgress(scrollTop: number, start: number, end: number) {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  return (scrollTop - start) / (end - start);
}

export function parsePercentage(value: string | number, containerHeight: number) {
  if (typeof value === "string" && value.includes("%")) {
    return (parseFloat(value) / 100) * containerHeight;
  }
  return typeof value === "number" ? value : parseFloat(value);
}

export interface CardTransform {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

export function transformsDiffer(a: CardTransform | undefined, b: CardTransform) {
  if (!a) return true;
  return (
    Math.abs(a.translateY - b.translateY) > 0.1 ||
    Math.abs(a.scale - b.scale) > 0.001 ||
    Math.abs(a.rotation - b.rotation) > 0.1 ||
    Math.abs(a.blur - b.blur) > 0.1
  );
}
