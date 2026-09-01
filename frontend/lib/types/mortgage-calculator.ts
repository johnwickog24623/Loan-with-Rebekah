export interface MortgageCalculatorInputs {
  homePrice: number;
  downPaymentPercent: number;
  annualInterestRate: number;
  loanTermYears: number;
  annualPropertyTaxRate: number;
  annualHomeInsurance: number;
  annualPmiRate: number;
}

export interface MortgageCalculatorBreakdown {
  downPaymentAmount: number;
  loanAmount: number;
  loanToValuePercent: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyPiti: number;
  totalInterestPaid: number;
  totalCostOverTerm: number;
  requiresPmi: boolean;
}
