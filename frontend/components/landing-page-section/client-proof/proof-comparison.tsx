import type { ClientProofRate } from "@/lib/types/client-proof";

interface ProofComparisonProps {
  before: ClientProofRate;
  after: ClientProofRate;
}

function ProofRateBlock({ label, data }: { label: string; data: ClientProofRate }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-2 font-display text-4xl tracking-tight text-text sm:text-5xl md:text-6xl">
        {data.payment}
        <span className="text-2xl text-muted sm:text-3xl">/mo</span>
      </p>
      <p className="mt-1 text-sm text-muted">at {data.rate}</p>
    </div>
  );
}

export function ProofComparison({ before, after }: ProofComparisonProps) {
  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10 md:gap-14 lg:gap-20">
      <ProofRateBlock label="Before" data={before} />
      <div className="flex shrink-0 items-center justify-center" aria-hidden="true">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/35 bg-surface-raised sm:h-14 sm:w-14">
          <svg className="h-5 w-5 text-champagne sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v14m0 0l-5-5m5 5l5-5" />
          </svg>
          <svg className="hidden h-5 w-5 text-champagne sm:block sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
      <ProofRateBlock label="After" data={after} />
    </div>
  );
}
