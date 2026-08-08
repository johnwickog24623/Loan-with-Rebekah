import type { MasonryAnimateFrom, MasonryGridItem } from "./masonry-types";

export function getInitialPosition(
  item: MasonryGridItem,
  container: HTMLDivElement | null,
  animateFrom: MasonryAnimateFrom,
) {
  const containerRect = container?.getBoundingClientRect();
  if (!containerRect) return { x: item.x, y: item.y };
  let direction = animateFrom;
  if (animateFrom === "random") {
    const dirs = ["top", "bottom", "left", "right"] as const;
    direction = dirs[Math.floor(Math.random() * dirs.length)];
  }
  switch (direction) {
    case "top":
      return { x: item.x, y: -200 };
    case "bottom":
      return { x: item.x, y: window.innerHeight + 200 };
    case "left":
      return { x: -200, y: item.y };
    case "right":
      return { x: window.innerWidth + 200, y: item.y };
    case "center":
      return {
        x: containerRect.width / 2 - item.w / 2,
        y: containerRect.height / 2 - item.h / 2,
      };
    default:
      return { x: item.x, y: item.y + 100 };
  }
}

export function buildMasonryGrid(
  width: number,
  columns: number,
  items: { id: string; img: string; url: string; height: number; title?: string; subtitle?: string }[],
): MasonryGridItem[] {
  if (!width) return [];
  const colHeights = new Array(columns).fill(0);
  const gap = 16;
  const totalGaps = (columns - 1) * gap;
  const columnWidth = (width - totalGaps) / columns;
  return items.map((child) => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    const x = col * (columnWidth + gap);
    const height = child.height / 2;
    const y = colHeights[col];
    colHeights[col] += height + gap;
    return { ...child, x, y, w: columnWidth, h: height };
  });
}

export function getMasonryContainerHeight(grid: MasonryGridItem[]) {
  if (!grid.length) return 0;
  return Math.max(...grid.map((item) => item.y + item.h));
}
