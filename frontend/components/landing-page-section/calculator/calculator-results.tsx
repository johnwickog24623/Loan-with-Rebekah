"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MortgageCalculatorBreakdown } from "@/lib/types/mortgage-calculator";
import {
  formatMortgageCurrency,
  formatMortgageCurrencyPrecise,
} from "@/lib/utils/mortgage-calculations";
import { CalculatorPaymentChart } from "./calculator-payment-chart";

interface CalculatorResultsProps {
  breakdown: MortgageCalculatorBreakdown;
}

export function CalculatorResults({ breakdown }: CalculatorResultsProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--color-line)] bg-jet p-6 text-white shadow-[0_28px_80px_rgba(18,18,20,0.22)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,153,126,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent sm:inset-x-8" />
      <div className="relative space-y-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">
            Estimated Monthly Payment
          </p>
          <motion.div
            key={breakdown.monthlyPiti}
            initial={{ opacity: 0.6, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-2 flex items-baseline gap-2"
          >
            <span className="font-display text-5xl tracking-tight sm:text-6xl">
              {formatMortgageCurrency(breakdown.monthlyPiti)}
            </span>
            <span className="text-sm font-medium text-white/55">/mo</span>
          </motion.div>
          <p className="mt-2 text-xs text-white/50">
            P&I {formatMortgageCurrencyPrecise(breakdown.monthlyPrincipalAndInterest)} · Loan{" "}
            {formatMortgageCurrency(breakdown.loanAmount)}
          </p>
        </div>
        <CalculatorPaymentChart breakdown={breakdown} />
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-white/45">Loan-to-Value</p>
            <p className="mt-1 font-display text-lg text-white">{breakdown.loanToValuePercent}%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-white/45">Total Interest</p>
            <p className="mt-1 font-display text-lg text-white">
              {formatMortgageCurrency(breakdown.totalInterestPaid)}
            </p>
          </div>
        </div>
        <Link
          href="#booking"
          className="block w-full cursor-pointer rounded-xl bg-champagne py-3.5 text-center text-sm font-semibold text-jet transition-colors hover:bg-white"
        >
          Get Your Exact Rate from Rebekah
        </Link>
        <p className="text-center text-[11px] leading-relaxed text-white/40">
          Standard fixed-rate formula. Estimates only — not a loan offer.
        </p>
      </div>
    </div>
  );
}
