export interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

export type ActiveItemCallback = (index: number) => void;
export type MovementChangeCallback = (isMoving: boolean) => void;
export type InitCallback = (instance: { run: (time?: number) => void; resize: () => void; destroy: () => void }) => void;
