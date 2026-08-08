"use client";

import { useState, useMemo } from "react";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  const downPaymentAmount = useMemo(() => {
    return Math.round((homePrice * downPaymentPercent) / 100);
  }, [homePrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, homePrice - downPaymentAmount);
  }, [homePrice, downPaymentAmount]);

  const monthlyPrincipalAndInterest = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  }, [loanAmount, interestRate, loanTermYears]);

  const estimatedPropertyTax = useMemo(() => {
    return Math.round((homePrice * 0.012) / 12);
  }, [homePrice]);

  const estimatedHomeInsurance = useMemo(() => {
    return Math.round((homePrice * 0.0035) / 12);
  }, [homePrice]);

  const totalMonthlyPayment = useMemo(() => {
    return monthlyPrincipalAndInterest + estimatedPropertyTax + estimatedHomeInsurance;
  }, [monthlyPrincipalAndInterest, estimatedPropertyTax, estimatedHomeInsurance]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-text">
          Estimate Your Monthly Payment
        </h2>
        <p className="text-muted text-base sm:text-lg">
          Adjust home price, down payment, interest rate, and term to see your estimated monthly principal, interest, taxes, and insurance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 light-glass-card rounded-3xl p-8 sm:p-10 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-text">
                <label htmlFor="home-price">Home Purchase Price</label>
                <span className="text-base text-accent font-bold">{formatCurrency(homePrice)}</span>
              </div>
              <input
                id="home-price"
                type="range"
                min={100000}
                max={2500000}
                step={10000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-muted">
                <span>$100,000</span>
                <span>$2,500,000+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-text">
                  <label htmlFor="down-payment">Down Payment ({downPaymentPercent}%)</label>
                  <span className="text-sm text-text/80">{formatCurrency(downPaymentAmount)}</span>
                </div>
                <input
                  id="down-payment"
                  type="range"
                  min={3}
                  max={50}
                  step={1}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-text">
                  <label htmlFor="interest-rate">Interest Rate</label>
                  <span className="text-sm text-text/80">{interestRate}%</span>
                </div>
                <input
                  id="interest-rate"
                  type="range"
                  min={3.0}
                  max={10.0}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Loan Term</label>
              <div className="grid grid-cols-3 gap-3">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermYears(term)}
                    className={`py-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      loanTermYears === term
                        ? "bg-jet text-white border-jet shadow"
                        : "bg-surface text-text/70 border-line hover:border-line-hover"
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
            <span>Loan Amount: <strong className="text-text">{formatCurrency(loanAmount)}</strong></span>
            <span>Est. Rate: <strong className="text-text">{interestRate}% APR</strong></span>
          </div>
        </div>

        <div className="lg:col-span-5 light-glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-surface-raised/90 border border-line">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold text-muted tracking-wider">Estimated Payment</span>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-text">{formatCurrency(totalMonthlyPayment)}</span>
                <span className="text-muted text-sm font-medium">/ month</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-line">
              <div className="flex justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  <span className="text-text/80">Principal & Interest</span>
                </div>
                <span className="font-semibold text-text">{formatCurrency(monthlyPrincipalAndInterest)}</span>
              </div>

              <div className="flex justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-text/80">Est. Property Taxes</span>
                </div>
                <span className="font-semibold text-text">{formatCurrency(estimatedPropertyTax)}</span>
              </div>

              <div className="flex justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-text/80">Est. Home Insurance</span>
                </div>
                <span className="font-semibold text-text">{formatCurrency(estimatedHomeInsurance)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-line">
            <p className="text-xs text-muted leading-relaxed">
              Rates and payments are estimates. Connect with Rebekah for exact rate locks, custom scenario modeling, and pre-approval.
            </p>

            <a
              href="#booking"
              className="w-full block py-4 bg-accent text-white text-center text-sm font-semibold rounded-2xl shadow-lg hover:bg-accent-hover transition-colors"
            >
              Get Custom Rate Quote from Rebekah
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
