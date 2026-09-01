import type {
  MortgageCalculatorBreakdown,
  MortgageCalculatorInputs,
} from "@/lib/types/mortgage-calculator";

export const DEFAULT_PROPERTY_TAX_RATE = 1.1;
export const DEFAULT_HOME_INSURANCE_RATE = 0.35;
export const DEFAULT_PMI_RATE = 0.5;

export function estimateAnnualHomeInsurance(homePrice: number): number {
  return roundCurrency((homePrice * DEFAULT_HOME_INSURANCE_RATE) / 100);
}

export function calculateMonthlyPrincipalAndInterest(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
): number {
  if (loanAmount <= 0) return 0;
  const totalPayments = loanTermYears * 12;
  if (annualInterestRate <= 0) return loanAmount / totalPayments;
  const monthlyRate = annualInterestRate / 100 / 12;
  const compoundFactor = Math.pow(1 + monthlyRate, totalPayments);
  return (loanAmount * monthlyRate * compoundFactor) / (compoundFactor - 1);
}

export function calculateMonthlyPmi(
  loanAmount: number,
  downPaymentPercent: number,
  annualPmiRate: number,
): number {
  if (loanAmount <= 0 || downPaymentPercent >= 20) return 0;
  return (loanAmount * (annualPmiRate / 100)) / 12;
}

export function calculateMortgageBreakdown(
  inputs: MortgageCalculatorInputs,
): MortgageCalculatorBreakdown {
  const downPaymentAmount = roundCurrency((inputs.homePrice * inputs.downPaymentPercent) / 100);
  const loanAmount = Math.max(0, roundCurrency(inputs.homePrice - downPaymentAmount));
  const loanToValuePercent =
    inputs.homePrice > 0 ? roundTo((loanAmount / inputs.homePrice) * 100, 2) : 0;
  const monthlyPrincipalAndInterest = roundCurrency(
    calculateMonthlyPrincipalAndInterest(
      loanAmount,
      inputs.annualInterestRate,
      inputs.loanTermYears,
    ),
  );
  const monthlyPropertyTax = roundCurrency(
    (inputs.homePrice * (inputs.annualPropertyTaxRate / 100)) / 12,
  );
  const monthlyHomeInsurance = roundCurrency(inputs.annualHomeInsurance / 12);
  const requiresPmi = inputs.downPaymentPercent < 20;
  const monthlyPmi = roundCurrency(
    calculateMonthlyPmi(loanAmount, inputs.downPaymentPercent, inputs.annualPmiRate),
  );
  const monthlyPiti = roundCurrency(
    monthlyPrincipalAndInterest +
      monthlyPropertyTax +
      monthlyHomeInsurance +
      monthlyPmi,
  );
  const totalPayments = inputs.loanTermYears * 12;
  const totalInterestPaid = roundCurrency(
    monthlyPrincipalAndInterest * totalPayments - loanAmount,
  );
  const totalCostOverTerm = roundCurrency(
    monthlyPiti * totalPayments + downPaymentAmount,
  );
  return {
    downPaymentAmount,
    loanAmount,
    loanToValuePercent,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPmi,
    monthlyPiti,
    totalInterestPaid,
    totalCostOverTerm,
    requiresPmi,
  };
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function formatMortgageCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatMortgageCurrencyPrecise(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
