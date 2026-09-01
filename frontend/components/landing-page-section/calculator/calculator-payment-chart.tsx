import type { MortgageCalculatorBreakdown } from "@/lib/types/mortgage-calculator";
import { formatMortgageCurrency } from "@/lib/utils/mortgage-calculations";

interface CalculatorPaymentChartProps {
  breakdown: MortgageCalculatorBreakdown;
}

interface ChartSegment {
  key: string;
  label: string;
  value: number;
  color: string;
}

export function CalculatorPaymentChart({ breakdown }: CalculatorPaymentChartProps) {
  const segments: ChartSegment[] = [
    {
      key: "pi",
      label: "Principal & Interest",
      value: breakdown.monthlyPrincipalAndInterest,
      color: "bg-white",
    },
    {
      key: "tax",
      label: "Property Taxes",
      value: breakdown.monthlyPropertyTax,
      color: "bg-champagne",
    },
    {
      key: "insurance",
      label: "Home Insurance",
      value: breakdown.monthlyHomeInsurance,
      color: "bg-white/40",
    },
  ];
  if (breakdown.requiresPmi) {
    segments.push({
      key: "pmi",
      label: "PMI",
      value: breakdown.monthlyPmi,
      color: "bg-rose-300",
    });
  }
  const total = breakdown.monthlyPiti || 1;
  return (
    <div className="space-y-4">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        {segments.map((segment) => {
          const width = (segment.value / total) * 100;
          if (width <= 0) return null;
          return (
            <div
              key={segment.key}
              className={`${segment.color} transition-all duration-500 ease-out`}
              style={{ width: `${width}%` }}
            />
          );
        })}
      </div>
      <div className="space-y-2">
        {segments.map((segment) => (
          <div key={segment.key} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-white/60">
              <span className={`h-2 w-2 shrink-0 rounded-full ${segment.color}`} />
              <span>{segment.label}</span>
            </div>
            <span className="font-semibold text-white">{formatMortgageCurrency(segment.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
