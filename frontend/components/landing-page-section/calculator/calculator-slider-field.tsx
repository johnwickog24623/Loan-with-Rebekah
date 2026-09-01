"use client";

import type { CSSProperties } from "react";

interface CalculatorSliderFieldProps {
  id: string;
  label: string;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}

export function CalculatorSliderField({
  id,
  label,
  displayValue,
  min,
  max,
  step,
  value,
  onChange,
  hint,
}: CalculatorSliderFieldProps) {
  const progress = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        <span className="font-display text-lg leading-none text-text sm:text-xl">{displayValue}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calculator-range w-full"
        style={{ "--range-progress": `${progress}%` } as CSSProperties}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      {hint ? <p className="text-[11px] leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}
