"use client";

import { useState } from "react";
import {
  DEFAULT_PROPERTY_TAX_RATE,
  estimateAnnualHomeInsurance,
  formatMortgageCurrency,
} from "@/lib/utils/mortgage-calculations";
import { CalculatorSliderField } from "./calculator-slider-field";

interface CalculatorAdvancedPanelProps {
  annualPropertyTaxRate: number;
  annualHomeInsurance: number;
  homePrice: number;
  onPropertyTaxRateChange: (value: number) => void;
  onHomeInsuranceChange: (value: number) => void;
}

export function CalculatorAdvancedPanel({
  annualPropertyTaxRate,
  annualHomeInsurance,
  homePrice,
  onPropertyTaxRateChange,
  onHomeInsuranceChange,
}: CalculatorAdvancedPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[color:var(--color-line)] bg-surface/50">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left sm:px-5"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-text">Taxes &amp; Insurance</span>
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="hidden sm:inline">Optional adjustments</span>
          <svg
            className={`h-4 w-4 text-champagne transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen ? (
        <div className="space-y-6 border-t border-[color:var(--color-line)] px-4 py-5 sm:px-5">
          <CalculatorSliderField
            id="property-tax-rate"
            label="Annual Property Tax Rate"
            displayValue={`${annualPropertyTaxRate.toFixed(2)}%`}
            min={0.3}
            max={2.5}
            step={0.05}
            value={annualPropertyTaxRate}
            onChange={onPropertyTaxRateChange}
            hint={`National average is about ${DEFAULT_PROPERTY_TAX_RATE}% of home value.`}
          />
          <CalculatorSliderField
            id="home-insurance"
            label="Annual Home Insurance"
            displayValue={formatMortgageCurrency(annualHomeInsurance)}
            min={600}
            max={6000}
            step={50}
            value={annualHomeInsurance}
            onChange={onHomeInsuranceChange}
            hint={`Default estimate: ${formatMortgageCurrency(estimateAnnualHomeInsurance(homePrice))}/year.`}
          />
        </div>
      ) : null}
    </div>
  );
}
