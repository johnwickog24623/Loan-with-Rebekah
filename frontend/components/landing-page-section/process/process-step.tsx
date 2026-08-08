import type { ProcessStep } from "@/lib/types/process-step";

interface ProcessStepCardProps {
  step: ProcessStep;
}

export function ProcessStepCard({ step }: ProcessStepCardProps) {
  return (
    <div className="liquid-glass rounded-xl border border-white/20 p-6">
      <span className="text-sm font-medium text-gray-400">{step.step}</span>
      <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-300">
        {step.description}
      </p>
    </div>
  );
}
