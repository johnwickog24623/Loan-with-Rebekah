"use client";

import { useEffect, useMemo, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  initialDelay?: number;
  charDelay?: number;
  transitionDuration?: number;
}

export function AnimatedHeading({
  text,
  className = "",
  style,
  initialDelay = 200,
  charDelay = 30,
  transitionDuration = 500,
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false);
  const lines = useMemo(() => text.split("\n"), [text]);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);
  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={lineIndex} className="block">
            {line.split("").map((char, charIndex) => {
              const delay =
                lineIndex * lineLength * charDelay + charIndex * charDelay;
              const displayChar = char === " " ? "\u00A0" : char;
              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? "translateX(0)" : "translateX(-18px)",
                    transitionDuration: `${transitionDuration}ms`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {displayChar}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
