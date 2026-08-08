import type { ReactNode } from "react";

interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export function ScrollStackItem({ children, itemClassName = "" }: ScrollStackItemProps) {
  return (
    <div
      className={`scroll-stack-card relative box-border w-full origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
