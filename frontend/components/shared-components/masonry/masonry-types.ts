export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  subtitle?: string;
}

export interface MasonryGridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type MasonryAnimateFrom =
  | "bottom"
  | "top"
  | "left"
  | "right"
  | "center"
  | "random";
