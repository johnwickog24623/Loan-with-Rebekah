"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/shared-components/section-heading";
import { useSectionReveal } from "@/lib/hooks/useSectionReveal";
import {
  calculateMortgageBreakdown,
  DEFAULT_PMI_RATE,
  DEFAULT_PROPERTY_TAX_RATE,
  estimateAnnualHomeInsurance,
} from "@/lib/utils/mortgage-calculations";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResults } from "./calculator-results";

export function MortgageCalculator() {
  const sectionRef = useSectionReveal<HTMLElement>({ y: 32, stagger: 0.1 });
  const [homePrice, setHomePrice] = useState(450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [annualPropertyTaxRate, setAnnualPropertyTaxRate] = useState(DEFAULT_PROPERTY_TAX_RATE);
  const [annualHomeInsurance, setAnnualHomeInsurance] = useState(() =>
    estimateAnnualHomeInsurance(450000),
  );
  const [insuranceTouched, setInsuranceTouched] = useState(false);
  const breakdown = useMemo(
    () =>
      calculateMortgageBreakdown({
        homePrice,
        downPaymentPercent,
        annualInterestRate: interestRate,
        loanTermYears,
        annualPropertyTaxRate,
        annualHomeInsurance,
        annualPmiRate: DEFAULT_PMI_RATE,
      }),
    [
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTermYears,
      annualPropertyTaxRate,
      annualHomeInsurance,
    ],
  );
  const handleHomePriceChange = (value: number) => {
    setHomePrice(value);
    if (!insuranceTouched) {
      setAnnualHomeInsurance(estimateAnnualHomeInsurance(value));
    }
  };
  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,153,126,0.06),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div data-reveal className="mx-auto mb-10 flex max-w-2xl justify-center sm:mb-14">
          <SectionHeading
            tone="cinematic"
            title="Mortgage Payment Calculator"
            description="Slide, type, or tap a preset — your full monthly PITI updates instantly."
            align="center"
            className="mb-0"
          />
        </div>
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] border border-[color:var(--color-line)] bg-surface/90 shadow-[0_24px_72px_rgba(26,26,28,0.08)] backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute inset-0 premium-noise" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne/45 to-transparent sm:inset-x-12" />
          <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-12">
            <div className="order-1 p-6 sm:p-8 lg:col-span-7 lg:border-r lg:border-[color:var(--color-line)] lg:p-10">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
                Your Details
              </p>
              <CalculatorInputs
                homePrice={homePrice}
                downPaymentPercent={downPaymentPercent}
                interestRate={interestRate}
                loanTermYears={loanTermYears}
                annualPropertyTaxRate={annualPropertyTaxRate}
                annualHomeInsurance={annualHomeInsurance}
                downPaymentAmount={breakdown.downPaymentAmount}
                onHomePriceChange={handleHomePriceChange}
                onDownPaymentChange={setDownPaymentPercent}
                onInterestRateChange={setInterestRate}
                onLoanTermChange={setLoanTermYears}
                onPropertyTaxRateChange={setAnnualPropertyTaxRate}
                onHomeInsuranceChange={(value) => {
                  setInsuranceTouched(true);
                  setAnnualHomeInsurance(value);
                }}
              />
            </div>
            <div className="order-2 border-t border-[color:var(--color-line)] p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:sticky lg:top-24 lg:self-start lg:p-8">
              <CalculatorResults breakdown={breakdown} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
