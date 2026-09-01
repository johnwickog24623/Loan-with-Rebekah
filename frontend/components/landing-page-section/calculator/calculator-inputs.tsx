"use client";

import { formatMortgageCurrency } from "@/lib/utils/mortgage-calculations";
import { CalculatorAdvancedPanel } from "./calculator-advanced-panel";
import { CalculatorSliderField } from "./calculator-slider-field";

const HOME_PRICE_PRESETS = [350000, 450000, 600000, 850000];

interface CalculatorInputsProps {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  annualPropertyTaxRate: number;
  annualHomeInsurance: number;
  downPaymentAmount: number;
  onHomePriceChange: (value: number) => void;
  onDownPaymentChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  onPropertyTaxRateChange: (value: number) => void;
  onHomeInsuranceChange: (value: number) => void;
}

function parseHomePriceInput(raw: string): number {
  const parsed = Number(raw.replace(/[^\d]/g, ""));
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(2500000, Math.max(100000, parsed));
}

export function CalculatorInputs({
  homePrice,
  downPaymentPercent,
  interestRate,
  loanTermYears,
  annualPropertyTaxRate,
  annualHomeInsurance,
  downPaymentAmount,
  onHomePriceChange,
  onDownPaymentChange,
  onInterestRateChange,
  onLoanTermChange,
  onPropertyTaxRateChange,
  onHomeInsuranceChange,
}: CalculatorInputsProps) {
  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <label htmlFor="home-price-input" className="text-sm font-medium text-text">
            Home Price
          </label>
          <div className="relative w-36 sm:w-40">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
            <input
              id="home-price-input"
              type="text"
              inputMode="numeric"
              value={homePrice.toLocaleString("en-US")}
              onChange={(e) => onHomePriceChange(parseHomePriceInput(e.target.value))}
              className="calculator-input cursor-text pl-7 text-right"
              aria-label="Home purchase price"
            />
          </div>
        </div>
        <CalculatorSliderField
          id="home-price"
          label="Adjust Price"
          displayValue={formatMortgageCurrency(homePrice)}
          min={100000}
          max={2500000}
          step={10000}
          value={homePrice}
          onChange={onHomePriceChange}
        />
        <div className="flex flex-wrap gap-2">
          {HOME_PRICE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onHomePriceChange(preset)}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                homePrice === preset
                  ? "border-jet bg-jet text-white"
                  : "border-[color:var(--color-line)] bg-surface text-muted hover:border-champagne/40 hover:text-text"
              }`}
            >
              {formatMortgageCurrency(preset)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <CalculatorSliderField
          id="down-payment"
          label="Down Payment"
          displayValue={`${downPaymentPercent}% · ${formatMortgageCurrency(downPaymentAmount)}`}
          min={3}
          max={50}
          step={1}
          value={downPaymentPercent}
          onChange={onDownPaymentChange}
          hint={downPaymentPercent < 20 ? "Below 20% — PMI will be included." : "20%+ — no PMI required."}
        />
        <CalculatorSliderField
          id="interest-rate"
          label="Interest Rate"
          displayValue={`${interestRate.toFixed(3)}% APR`}
          min={3}
          max={10}
          step={0.125}
          value={interestRate}
          onChange={onInterestRateChange}
        />
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium text-text">Loan Term</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[15, 20, 30].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onLoanTermChange(term)}
              className={`cursor-pointer rounded-xl border py-3.5 text-sm font-semibold transition-all ${
                loanTermYears === term
                  ? "border-jet bg-jet text-white shadow-[0_8px_24px_rgba(18,18,20,0.18)]"
                  : "border-[color:var(--color-line)] bg-surface text-muted hover:border-champagne/35 hover:text-text"
              }`}
            >
              {term} yr
            </button>
          ))}
        </div>
      </div>
      <CalculatorAdvancedPanel
        annualPropertyTaxRate={annualPropertyTaxRate}
        annualHomeInsurance={annualHomeInsurance}
        homePrice={homePrice}
        onPropertyTaxRateChange={onPropertyTaxRateChange}
        onHomeInsuranceChange={onHomeInsuranceChange}
      />
    </div>
  );
}
